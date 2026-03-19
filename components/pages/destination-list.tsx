"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHeading from "@/components/common/page-heading";

export default function DestinationPage() {
    // Define state
    const [ready, setReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDestination, setSelectedDestination] = useState<string>("all");
    const [destinationList, setDestinationList] = useState<any[]>([]);
    const [countriesList, setCountriesList] = useState<any[]>([]);

    useEffect(() => {
        requestAnimationFrame(() => {
            setReady(true);
        });
    }, []);

    // Init data
    useEffect(() => {
        const controller = new AbortController();
        const fetchTours = async () => {
            try {
                // Fetch the data
                const response = await fetch("/api/destination/list", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        order_by: "name",
                        as_per_tour: true,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the JSON response
                const data = await response.json();

                // Update the state
                setCountriesList(data?.data?.countries ?? []);
                setDestinationList(data?.data?.destinations ?? []);
            } catch (error: any) {
                if (error.name !== "AbortError") {
                    console.error("Failed to fetch tours:", error);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchTours();
        return () => controller.abort();
    }, []);

    // Filter countries
    const filteredCountries = selectedDestination === "all" ? countriesList : countriesList.filter(
        (country) => country.destination_name === selectedDestination
    );

    return (
        <>
            {ready && <>
                <CommonHeader />

                <div className="max-w-7xl mx-auto px-5 md:px-0 py-6">
                    <PageHeading
                        main="Top Destinations"
                        sub="Discover the most popular destinations around the world."
                    />

                    {!isLoading ? (
                        <div className="space-y-8">
                            <div className="flex gap-3 overflow-x-auto pb-2 md:flex-wrap md:justify-start scrollbar-hide">
                                <FilterButton
                                    active={selectedDestination === "all"}
                                    label="All Destinations"
                                    onClick={() => setSelectedDestination("all")}
                                />

                                {destinationList.map((destination, index) => (
                                    <FilterButton
                                        key={index}
                                        label={destination}
                                        active={selectedDestination === destination}
                                        onClick={() =>
                                            setSelectedDestination(destination)
                                        }
                                    />
                                ))}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                {filteredCountries.map((item, index) => (
                                    <div
                                        key={index}
                                        className="relative h-48 md:h-64 rounded-lg overflow-hidden group cursor-pointer"
                                    >
                                        <Link href={`/country/${item.slug}`}>
                                            <Image
                                                src={item?.featured_image || "/placeholder.svg"}
                                                alt={item?.name || "Destination"}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-black/30 to-transparent" />

                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <h2 className="text-lg md:text-2xl font-semibold text-white">
                                                    {item.name}
                                                </h2>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-48 md:h-64"></div>
                            ))}
                        </div>
                    )}
                </div>

                <CommonFooter />
            </>}
        </>
    );
}

// Filter button
function FilterButton({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium border cursor-pointer transition
                ${active
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:border-black"
                }`}
        >
            {label}
        </button>
    );
}
