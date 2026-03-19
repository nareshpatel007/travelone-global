"use client";

import { useEffect, useState } from "react";
import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import PageHeading from "@/components/common/page-heading";
import { TourListingGrid } from "@/components/tours/tour-listing-grid";
import { HeartOff } from "lucide-react";

export default function WishlistPage() {
    // Define state
    const [ready, setReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [toursData, setToursData] = useState<any[]>([]);

    useEffect(() => {
        requestAnimationFrame(() => setReady(true));
    }, []);

    useEffect(() => {
        if (!ready) return;

        const controller = new AbortController();

        const fetchWishlist = async () => {
            try {
                setIsLoading(true);

                const stored = localStorage.getItem("wishlist");
                const wishlist: number[] = stored ? JSON.parse(stored) : [];

                // No wishlist → no API call
                if (wishlist.length === 0) {
                    setToursData([]);
                    return;
                }

                // Fetch the data
                const response = await fetch("/api/wishlist/list", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ tour_ids: wishlist }),
                    signal: controller.signal,
                });

                // Check response
                if (!response.ok) return;

                // Parse the JSON response
                const data = await response.json();

                // Update the state
                if (data?.status) {
                    setToursData(data?.data ?? []);
                } else {
                    setToursData([]);
                }
            } catch (error: any) {
                if (error.name !== "AbortError") {
                    console.error("Failed to fetch wishlist:", error);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchWishlist();
        return () => controller.abort();
    }, [ready]);

    return (
        <>
            {ready && (
                <>
                    <CommonHeader />

                    <div className="max-w-7xl mx-auto px-5 md:px-0 py-6">
                        <PageHeading
                            main="Wishlist"
                            sub="View and manage all your wishlist in one place."
                        />

                        {/* Loader */}
                        {isLoading && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-48 md:h-64 rounded-lg bg-gray-200 animate-pulse"
                                    />
                                ))}
                            </div>
                        )}

                        {/* Data */}
                        {!isLoading && toursData.length > 0 && (
                            <TourListingGrid tourList={toursData} />
                        )}

                        {/* Empty state */}
                        {!isLoading && toursData.length === 0 && (
                            <div className="mx-auto max-w-4xl py-20 text-center space-y-5">
                                <HeartOff
                                    size={120}
                                    className="mx-auto text-[#ef2853] opacity-15"
                                />
                                <h2 className="text-3xl font-medium text-black">
                                    Your wishlist is empty
                                </h2>
                                <p className="text-base text-black max-w-2xl mx-auto">
                                    Add tours to your wishlist to start planning your perfect trip.
                                </p>
                            </div>
                        )}
                    </div>

                    <CommonFooter />
                </>
            )}
        </>
    );
}
