"use client";

import { findTourInWishlist, updateHeaderWishlistCount } from "@/lib/auth";
import { formatPrice } from "@/lib/utils";
import { Heart, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { StartJourneyModal } from "../plan_your_trip/journey-popup";
import { CustomizeTrip } from "../tour_details/popup/customize-trip";

// Define types
interface CityNight {
    city_name: string;
    night: number;
}

// Define props
interface Props {
    id: number;
    name: string;
    slug: string;
    featured_image: string;
    tour_type: number;
    tour_sub_title: string;
    is_refundable: number;
    starting_price: string;
    city_nights: string;
    needBtn?: boolean;
    needRequestQuote?: boolean;
}

// Define functions
const safeJsonParse = <T,>(value?: string, fallback: T = [] as T): T => {
    try {
        return value ? JSON.parse(value) : fallback;
    } catch {
        return fallback;
    }
};

export function TourCard({
    id,
    name,
    slug,
    featured_image,
    tour_type,
    tour_sub_title,
    is_refundable,
    starting_price,
    city_nights,
    needBtn = false,
    needRequestQuote = false,
}: Props) {
    // Get tour summary
    const tourSummary = useMemo<string[]>(
        () => safeJsonParse<string[]>(tour_sub_title),
        [tour_sub_title]
    );

    // Get city nights
    const cityNights = useMemo<CityNight[]>(
        () => safeJsonParse<CityNight[]>(city_nights),
        [city_nights]
    );

    // Define State
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [openRequestQuote, setOpenRequestQuote] = useState(false);

    // Check if tour is wishlisted
    useEffect(() => {
        setIsWishlisted(findTourInWishlist(id));
    }, [id]);

    // Handle wishlist
    const handleWishlist = () => {
        try {
            // Get wishlist
            const stored = localStorage.getItem("wishlist");
            const wishlist: number[] = stored ? JSON.parse(stored) : [];

            // Update wishlist
            const updatedWishlist = isWishlisted ? wishlist.filter((tourId) => tourId !== id) : [...wishlist, id];

            // Set wishlist
            localStorage.setItem("wishlist", JSON.stringify([...new Set(updatedWishlist)]));

            // Update state
            setIsWishlisted((prev) => !prev);
            updateHeaderWishlistCount();
        } catch (error) {
            console.error("Wishlist error:", error);
        }
    };

    return (
        <>
            <div className="group h-full">
                <div className="flex h-full flex-col border border-gray-200 transition-all hover:shadow-md">
                    <div className="relative h-52 md:h-80 overflow-hidden">
                        <Link href={`/tour/${slug}`}>
                            <Image
                                src={featured_image || "/placeholder.svg"}
                                alt={name}
                                fill
                                draggable={false}
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </Link>

                        <button
                            onClick={handleWishlist}
                            className="absolute top-4 right-4 rounded-full bg-white/90 p-2 shadow-lg transition cursor-pointer hover:bg-white"
                        >
                            <Heart
                                size={24}
                                className={
                                    isWishlisted
                                        ? "fill-[#ef2853] text-[#ef2853]"
                                        : "text-gray-600 hover:fill-[#ef2853] hover:text-[#ef2853]"
                                }
                            />
                        </button>

                        <div className="absolute top-3 left-3 flex overflow-hidden rounded-full bg-black text-white">
                            {tour_type && (
                                <span className="px-3 py-1 text-xs border-r border-gray-200">
                                    {tour_type}
                                </span>
                            )}
                            <span className="px-3 py-1 text-xs">Free Cancellation</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col space-y-4 p-6 text-center">
                        {/* Title */}
                        <Link target="_blank" href={`/tour/${slug}`}>
                            <h2 className="line-clamp-2 text-lg font-medium text-gray-900 md:text-xl">
                                {name}
                            </h2>
                        </Link>

                        {/* Summary */}
                        {tourSummary.length > 0 && (
                            <div className="text-sm text-black">
                                {tourSummary[0]} /{" "}
                                {tourSummary[3]?.replace("Places", "Locations")} /{" "}
                                {tourSummary[1]}
                            </div>
                        )}

                        {/* City nights */}
                        {cityNights.length > 0 && (
                            <div className="text-sm text-black">
                                {cityNights.map((item, index) => (
                                    <span key={index} className="inline-flex items-center">
                                        {item.city_name}
                                        {item.night > 0 && (
                                            <span className="ml-1">
                                                ({item.night}{" "}
                                                {item.night > 1 ? "Nights" : "Night"})
                                            </span>
                                        )}
                                        {index < cityNights.length - 1 && (
                                            <MoveRight className="mx-1 h-4 w-4" />
                                        )}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Price */}
                        <Link target="_blank" href={`/tour/${slug}`}>
                            <span className="rounded-sm bg-amber-300 px-5 py-1.5 text-xs font-semibold text-black md:text-sm">
                                Starts from USD ${formatPrice(starting_price, 0)}
                            </span>
                        </Link>

                        {/* Action button */}
                        {(needBtn || needRequestQuote) && <div className={`grid ${needBtn && needRequestQuote ? "grid-cols-2" : "grid-cols-1"} gap-2 mt-2`}>
                            {needBtn && <Link target="_blank" href={`/tour/${slug}`}>
                                <button type="button" className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium cursor-pointer text-black shadow-sm hover:bg-black hover:border-black hover:text-white">
                                    Explore Itinerary Details
                                </button>
                            </Link>}

                            {needRequestQuote && <button
                                type="button"
                                onClick={() => setOpenRequestQuote(true)}
                                className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium cursor-pointer text-black shadow-sm hover:bg-black hover:border-black hover:text-white"
                            >
                                Request a Quote
                            </button>}
                        </div>}
                    </div>
                </div>
            </div>

            {/* Start Journey */}
            {needRequestQuote && <CustomizeTrip
                open={openRequestQuote}
                onOpenChange={setOpenRequestQuote}
                mainTitle="Request a Quote"
                subTitle="We can help you find the right trip for your needs."
                pageName={name}
            />}
        </>
    );
}