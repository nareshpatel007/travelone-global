"use client";

import { useEffect, useState } from "react";
import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { MapPin, Landmark, Activity, Utensils, BedDouble, SearchAlertIcon } from "lucide-react";
import Image from "next/image";
import { StartJourneyModal } from "../plan_your_trip/journey-popup";
import { capitalize } from "@/lib/utils";

// Define Props
interface Props {
    type: string;
    country: string;
}

export default function ArchetypeLanding({ type, country }: Props) {
    // Define state
    const [ready, setReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [openCommonPlanTrip, setOpenCommonPlanTrip] = useState(false);
    const [countryData, setCountryData] = useState<any | null>(null);
    const [otherData, setOtherData] = useState<any | null>(null);
    const [activeTab, setActiveTab] = useState("cities");
    const [selectedCountry, setSelectedCountry] = useState("");

    useEffect(() => {
        requestAnimationFrame(() => {
            setReady(true);
        });
    }, []);

    useEffect(() => {
        if (!ready) return;

        const controller = new AbortController();

        const fetchInitData = async () => {
            try {
                setIsLoading(true);

                const response = await fetch("/api/plan_your_trip/archetype", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ type, country }),
                    signal: controller.signal,
                });

                const data = await response.json();

                if (data?.status) {
                    setCountryData(data?.data?.country);
                    setOtherData(data?.data?.other);
                }
            } catch (error: any) {
                if (error.name !== "AbortError") {
                    console.error("Failed to fetch data:", error);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitData();
        return () => controller.abort();
    }, [ready, type, country]);

    const renderGrid = (
        title: string,
        icon: any,
        data: any,
        color = "text-black"
    ) => {
        if (!data) return null;
        const entries = Object.entries(data);
        if (entries.length === 0) return null;

        return (
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    {icon}
                    <h2 className="text-2xl md:text-2xl font-medium">
                        {title}
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {entries.map(([name, description]: any, index) => (
                        <div
                            key={index}
                            className="group bg-white border rounded hover:shadow-xl transition duration-300 space-y-3"
                        >
                            <div className="h-40 overflow-hidden">
                                <Image
                                    src="placeholder.svg"
                                    alt="Avatar"
                                    width={500}
                                    height={100}
                                    className="w-full h-full rounded-t object-cover"
                                />
                            </div>
                            <div className="p-6">
                                {<h3 className={`font-semibold text-xl ${color}`}>
                                    {name}
                                </h3>}
                                {description && (
                                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                        {description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    };

    // Get tab content
    const tabContent = otherData ? (otherData[activeTab] || []) : [];

    console.log(selectedCountry);

    return (
        <>
            {ready && (
                <>
                    <CommonHeader />

                    {/* Loading */}
                    {isLoading && (
                        <div className="max-w-7xl mx-auto px-6 py-20 space-y-6">
                            <div className="animate-pulse bg-gray-200 rounded h-32"></div>
                            <div className="animate-pulse bg-gray-200 rounded h-60"></div>
                            <div className="animate-pulse bg-gray-200 rounded h-60"></div>
                        </div>
                    )}

                    {/* Result */}
                    {!isLoading && (countryData || otherData) && (
                        <div className="max-w-7xl mx-auto px-5 md:px-0 py-6 md:py-16 space-y-12">
                            {/* Country */}
                            {countryData && <div className="space-y-10">
                                {/* HERO SECTION */}
                                <div className="text-center space-y-6">
                                    <p className="uppercase tracking-widest text-sm text-gray-500">
                                        {type.replace("-", " ")} Destination Guide
                                    </p>
                                    <h1 className="text-black text-3xl md:text-6xl leading-tight font-normal capitalize">
                                        {country.replace("-", " ")}
                                    </h1>
                                </div>

                                {/* CONTENT SECTIONS */}
                                {renderGrid(
                                    "Cities to Explore",
                                    <MapPin className="w-6 h-6 text-amber-500" />,
                                    countryData?.cities
                                )}

                                {renderGrid(
                                    "Iconic Places",
                                    <Landmark className="w-6 h-6 text-amber-500" />,
                                    countryData?.places
                                )}

                                {renderGrid(
                                    "Experiences & Activities",
                                    <Activity className="w-6 h-6 text-amber-500" />,
                                    countryData?.activities
                                )}

                                {renderGrid(
                                    "Where to Eat",
                                    <Utensils className="w-6 h-6 text-amber-500" />,
                                    countryData?.eat
                                )}

                                {renderGrid(
                                    "Where to Stay",
                                    <BedDouble className="w-6 h-6 text-amber-500" />,
                                    countryData?.stay
                                )}
                            </div>}

                            {/* Button */}
                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedCountry(capitalize(countryData?.country));
                                        setOpenCommonPlanTrip(true);
                                    }}
                                    className="px-6 py-2 rounded bg-black border border-black text-white font-medium hover:bg-white hover:text-black transition duration-300 cursor-pointer"
                                >
                                    Start a Journey
                                </button>
                            </div>

                            <section className="space-y-10">
                                <div className="text-center space-y-4">
                                    <p className="uppercase tracking-widest text-sm text-gray-500">
                                        Discover More Destinations
                                    </p>
                                    <div className="space-y-2 text-center">
                                        <h2 className="text-black text-3xl md:text-6xl leading-tight font-normal capitalize">
                                            Explore Beyond {country}
                                        </h2>
                                        <span className="text-black text-md">
                                            Expand your journey with curated destinations that match your archetype energy.
                                        </span>
                                    </div>
                                </div>

                                {/* Tabs */}
                                <div className="flex flex-wrap justify-center gap-4">
                                    {["cities", "places", "activities", "eat", "stay"].map(
                                        (tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`px-5 py-2 rounded-full text-sm font-medium transition cursor-pointer ${activeTab === tab
                                                    ? "bg-amber-500 text-white"
                                                    : "bg-gray-100 hover:bg-gray-200"
                                                    }`}
                                            >
                                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                            </button>
                                        )
                                    )}
                                </div>

                                {/* Compact Card Grid */}
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {tabContent &&
                                        Object.entries(tabContent).map(([key, value]: any, i) => (
                                            <div
                                                key={i}
                                                className="group bg-white border rounded hover:shadow-xl transition duration-300 space-y-3"
                                            >
                                                <div className="h-40 overflow-hidden">
                                                    <Image
                                                        src="placeholder.svg"
                                                        alt="Avatar"
                                                        width={500}
                                                        height={100}
                                                        className="w-full h-full rounded-t object-cover"
                                                    />
                                                </div>
                                                <div className="p-6">
                                                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                                        {value}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </section>
                        </div>
                    )}

                    {/* Not Found */}
                    {!isLoading && (!countryData && !otherData) && (
                        <div className="mx-auto max-w-4xl py-24 text-center space-y-6">
                            <SearchAlertIcon
                                size={120}
                                className="mx-auto text-amber-500 opacity-20"
                            />
                            <h2 className="text-3xl font-semibold">
                                Page not found
                            </h2>
                            <p className="text-gray-600">
                                The country showcase you are looking for does not exist.
                            </p>
                        </div>
                    )}

                    <StartJourneyModal
                        open={openCommonPlanTrip}
                        onOpenChange={setOpenCommonPlanTrip}
                        selectedCountry={selectedCountry}
                    />

                    <CommonFooter />
                </>
            )}
        </>
    );
}