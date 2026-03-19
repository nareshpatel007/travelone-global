"use client"

import { useEffect, useState } from "react";
import { Check, MoveRight } from "lucide-react";
import 'react-loading-skeleton/dist/skeleton.css';
import { formatPrice } from "@/lib/utils";
import { findTourInWishlist, updateHeaderWishlistCount } from "@/lib/auth";
import { LoginModal } from "../common/login-modal";
import { sendFbEvent } from "@/lib/sendFbEvent";
import GallerySlider from "./gallery-slider";

// Define props
interface Props {
    isAdsLanding?: boolean;
    tour: any;
    metaData: any;
    packages: any;
    city_nights: any;
    selectedPackage: any;
    setSelectedPackage: (value: any) => void;
    setOpenCustomizeTripPopup: (value: any) => void;
    setOpenDownloadBrochurePopup: (value: any) => void;
    setOpenQuotePopup: (value: any) => void;
    setOpenBookingCartPopup: (value: any) => void;
}

export default function HeroTour({
    isAdsLanding,
    tour,
    metaData,
    packages,
    city_nights,
    selectedPackage,
    setSelectedPackage,
    setOpenCustomizeTripPopup,
    setOpenDownloadBrochurePopup,
    setOpenQuotePopup,
    setOpenBookingCartPopup
}: Props) {
    // Define state
    const [openLogin, setOpenLogin] = useState<boolean>(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Check if tour is wishlisted
    useEffect(() => {
        setIsWishlisted(findTourInWishlist(tour?.id));
    }, [tour]);

    // Handle wishlist
    const handleWishlist = () => {
        try {
            // Get wishlist
            const stored = localStorage.getItem("wishlist");
            const wishlist: number[] = stored ? JSON.parse(stored) : [];

            // Update wishlist
            const updatedWishlist = isWishlisted ? wishlist.filter((tourId) => tourId !== tour?.id) : [...wishlist, tour?.id];

            // Set wishlist
            localStorage.setItem("wishlist", JSON.stringify([...new Set(updatedWishlist)]));

            // Update state
            setIsWishlisted((prev) => !prev);
            updateHeaderWishlistCount();

            // Send FB event
            sendFbEvent({
                eventName: "AddToWishlist"
            });
        } catch (error) {
            console.error("Wishlist error:", error);
        }
    };

    // Gallery images
    const galleryImages = tour?.media_gallery?.sightseeing && tour.media_gallery.sightseeing.length > 0 ? tour.media_gallery.sightseeing : ["/placeholder.svg"];

    return (
        <>
            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 items-stretch">
                    <GallerySlider
                        galleryImages={galleryImages}
                        isAdsLanding={isAdsLanding}
                        isWishlisted={isWishlisted}
                        handleWishlist={handleWishlist}
                    />

                    <div className="flex flex-col h-full">
                        <div className="bg-[#FFF9EE] text-white p-5 md:p-6 border-b border-[#d9cec1]">
                            <div className="max-w-7xl mx-auto">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-black text-xl md:text-2xl leading-tight font-medium">
                                                {tour?.name}
                                            </span>

                                            {/* For Normal Landing */}
                                            {!isAdsLanding && <span className="inline-block bg-[#ef2853] px-3 py-0.5 md:py-1 rounded text-sm font-semibold text-white">
                                                {tour?.tour_type}
                                            </span>}

                                            {/* For Ads Landing */}
                                            {isAdsLanding && <>
                                                <span className="inline-block bg-amber-200 px-3 py-0.5 md:py-1 rounded text-sm font-semibold text-black border border-amber-300">
                                                    {tour?.tour_type} of 16
                                                </span>
                                                <span className="inline-block bg-amber-200 px-3 py-0.5 md:py-1 rounded text-sm font-semibold text-black border border-amber-300">
                                                    Start Date: 17 Oct '26
                                                </span>
                                                <span className="inline-block bg-amber-200 px-3 py-0.5 md:py-1 rounded text-sm font-semibold text-black border border-amber-300">
                                                    Only 8 Seats Left
                                                </span>
                                            </>}
                                        </div>

                                        <p className="text-sm md:text-base text-black">
                                            {tour?.tour_sub_title && tour?.tour_sub_title?.join(" → ")}
                                        </p>

                                        <p className="text-sm md:text-md text-black">
                                            {city_nights && city_nights.map((item: any, index: number) => (
                                                <span key={index} className="inline-flex items-center">
                                                    {item.name}
                                                    {item.night > 0 && (
                                                        <span>&nbsp;({item.night} {item.night > 1 ? "Nights" : "Night"})
                                                        </span>
                                                    )}
                                                    {index < city_nights.length - 1 && (
                                                        <MoveRight className="h-4 w-4 mx-1 inline-flex" />
                                                    )}
                                                </span>
                                            ))}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#FFF9EE]/50 p-5 md:p-6 flex-1 border-b border-[#d9cec1] space-y-5">
                            {packages.length > 1 && <span className="text-md md:text-lg font-medium text-gray-900 mb-3 block">
                                Select Your Package
                            </span>}

                            {/* For Ads Landing */}
                            {isAdsLanding && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {packages.map((pkg: any) => (
                                    <div
                                        key={pkg.no}
                                        onClick={() => setSelectedPackage(pkg.no)}
                                        className={`border-1 rounded-sm p-3 space-y-2 cursor-pointer transition-all text-center ${selectedPackage === pkg.no
                                            ? "border-[#2F5D50] bg-white shadow-lg"
                                            : "border-gray-300 bg-white/50 hover:border-[#2F5D50]"
                                            }`}
                                    >
                                        {packages.length > 1 && <div className="flex justify-center">
                                            {selectedPackage === pkg.no ? (
                                                <div className="w-6 h-6 bg-[#ef2853] rounded-full flex items-center justify-center text-white font-bold">
                                                    <Check className="h-4 w-4" />
                                                </div>
                                            ) : (
                                                <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                                            )}
                                        </div>}

                                        {/* For Desktop */}
                                        <div className="hidden md:block">
                                            <span className="font-medium text-gray-900 block">{pkg.name}</span>
                                            <div className="space-y-1">
                                                <p className="text-xs text-gray-600 line-through">${formatPrice(Number(pkg.price) + 500, 0)}</p>
                                                <p className="text-xl md:text-lg font-semibold text-black">${formatPrice(pkg.price, 0)}</p>
                                                <p className="text-xs text-gray-600">Per Person</p>
                                            </div>
                                            {pkg.no != 1 && <p className="text-xs text-gray-600 font-normal">Double Sharing</p>}
                                        </div>

                                        {/* For Mobile */}
                                        <div className="block md:hidden">
                                            <span className="font-semibold text-md text-gray-900">
                                                {pkg.name} - US$ {formatPrice(pkg.price, 0)}
                                            </span>
                                            {pkg.no == 1 && <p className="text-xs text-gray-600 font-normal">Per Person</p>}
                                            {pkg.no != 1 && <p className="text-xs text-gray-600 font-normal">Per Person Double Sharing</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>}

                            {/* Non Ads Landing */}
                            {!isAdsLanding && <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {packages.map((pkg: any) => (
                                    <div
                                        key={pkg.no}
                                        onClick={() => setSelectedPackage(pkg.no)}
                                        className={`border-1 rounded-sm p-3 space-y-2 cursor-pointer transition-all text-center ${selectedPackage === pkg.no
                                            ? "border-[#2F5D50] bg-white shadow-lg"
                                            : "border-gray-300 bg-white/50 hover:border-[#2F5D50]"
                                            }`}
                                    >
                                        <div className="flex justify-center">
                                            {selectedPackage === pkg.no ? (
                                                <div className="w-6 h-6 bg-[#ef2853] rounded-full flex items-center justify-center text-white font-bold">
                                                    <Check className="h-4 w-4" />
                                                </div>
                                            ) : (
                                                <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                                            )}
                                        </div>

                                        <span className="font-medium text-gray-900 block">{pkg.name}</span>

                                        <div className="space-y-1">
                                            <p className="text-xs text-gray-600 line-through">${formatPrice(Number(pkg.price) + 500, 0)}</p>
                                            <p className="text-xl md:text-lg font-semibold text-black">${formatPrice(pkg.price, 0)}</p>
                                            <p className="text-xs text-gray-600">Per Person</p>
                                        </div>

                                        {pkg.no != 1 && <p className="text-xs text-gray-600 font-normal">Double Sharing</p>}
                                    </div>
                                ))}
                            </div>}

                            {/* For Ads */}
                            {isAdsLanding && <div className="flex justify-center md:justify-start text-center md:text-left flex-wrap mb-3">
                                <button className="bg-[#ef2853] border-1 border-[#ef2853] hover:bg-white hover:text-[#ef2853] text-white px-4 py-2 rounded font-semibold text-sm cursor-pointer" onClick={() => setOpenCustomizeTripPopup(true)}>
                                    Inquire Now
                                </button>
                            </div>}

                            {/* For Non-Ads */}
                            {!isAdsLanding && <div className="flex gap-3 flex-wrap mb-3">
                                <button className="bg-[#ef2853] border-1 border-[#ef2853] hover:bg-white hover:text-[#ef2853] text-white px-4 py-2 rounded font-semibold text-sm cursor-pointer" onClick={() => setOpenBookingCartPopup(true)}>
                                    Book {packages.find((p: any) => p.no === selectedPackage)?.name}
                                </button>

                                <button className="bg-white border-1 border-black text-black hover:bg-black hover:text-white hover:border-[#333] cursor-pointer px-4 py-2 rounded font-semibold text-sm" onClick={() => setOpenCustomizeTripPopup(true)}>
                                    Customize Trip
                                </button>

                                <button className="bg-white border-1 border-black text-black hover:bg-black hover:text-white hover:border-[#333] cursor-pointer px-4 py-2 rounded font-semibold text-sm" onClick={() => setOpenDownloadBrochurePopup(true)}>
                                    Download Brochure
                                </button>
                            </div>}

                            {/* For Non-Ads */}
                            {!isAdsLanding && <div className="space-y-2">
                                {metaData?.package_line && <p className="text-sm text-gray-900">{metaData?.package_line}</p>}
                                <p className="text-sm text-gray-900">*Rates may change if the tour is customized</p>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>

            <LoginModal open={openLogin} onOpenChange={setOpenLogin} />
        </>
    )
}
