"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import FAQsList from "@/components/tour_details/faqs";
import HeroTour from "@/components/tour_details/hero-tour";
import TabContent from "@/components/tour_details/tab-content";
import BestValueGuarantee from "@/components/tour_details/best-value-guarantee";
import Reviews from "@/components/tour_details/reviews";
import WhyTravelOne from "@/components/tour_details/why-travelone";
import TrustedBy from "@/components/tour_details/trusted-by";
import TravelExpert from "@/components/tour_details/travel-experts";
import PageHelpful from "@/components/common/helpful";
import { CustomizeTrip } from "@/components/tour_details/popup/customize-trip";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { getLoginCookie } from "@/lib/auth";
import VideoHeroSection from "@/components/tour_details/video-hero";
import { SearchAlert } from "lucide-react";
import AdsLandingHeader from "../header/ads-header";
import AdsLandingFooter from "../footer/ads-footer";
import MobileTabContent from "../tour_details/mobile-tab-content";
import EconomicTimesSection from "../contact/economic-times";

// Define Props
interface Props {
    slug: string;
}

export default function AdsSingleTourPage({ slug }: Props) {
    // Define state
    const [ready, setReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [tourData, setTourData] = useState<any>({});
    const [selectedPackage, setSelectedPackage] = useState(1);
    const [showStickyFooter, setShowStickyFooter] = useState(false);
    const [openCustomizeTripPopup, setOpenCustomizeTripPopup] = useState(false);
    const [openDownloadBrochurePopup, setOpenDownloadBrochurePopup] = useState(false);
    const [openQuotePopup, setOpenQuotePopup] = useState(false);
    const [openBookingCartPopup, setOpenBookingCartPopup] = useState(false);
    const pageRef = useRef(null);

    useEffect(() => {
        // Wait one frame after hydration
        requestAnimationFrame(() => {
            setReady(true);
        });

        const handleScroll = () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            setShowStickyFooter(scrollPercentage > 10);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Init data
    useEffect(() => {
        const controller = new AbortController();
        const loadInitData = async () => {
            try {
                // Get user data
                const user = getLoginCookie();

                // Fetch the data
                const response = await fetch("/api/tours/single", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        slug,
                        user_id: user?.user_id
                    }),
                });

                // Parse the JSON response
                const data = await response.json();

                // Check response
                if (data.status) {
                    // Fetch packages
                    if (data?.data?.tour_packages?.length > 0) {
                        setSelectedPackage(data?.data?.tour_packages[0]?.no ?? 1);
                    }

                    // Update the state
                    setTourData(data?.data ?? []);
                }
            } catch (error: any) {
                if (error.name !== "AbortError") {
                    console.error("Failed to fetch single tour:", error);
                }
            } finally {
                setIsLoading(false);
            }
        };
        loadInitData();
        return () => controller.abort();
    }, []);

    return (
        <>
            {ready && <>
                <AdsLandingHeader />

                {isLoading && (
                    <>
                        <div className="block md:hidden p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Skeleton height={300} />
                            <Skeleton height={100} />
                            <Skeleton height={100} />
                        </div>

                        <div className="hidden md:grid p-6 grid-cols-1 md:grid-cols-2 gap-6">
                            <Skeleton height={500} />
                            <Skeleton height={500} />
                        </div>
                    </>
                )}

                {!isLoading && tourData?.tour && (
                    <div ref={pageRef} className="min-h-screen bg-white">
                        <HeroTour
                            isAdsLanding={true}
                            tour={tourData?.tour ?? {}}
                            metaData={tourData?.meta_data ?? {}}
                            city_nights={tourData?.city_nights ?? {}}
                            packages={tourData?.tour_packages ?? []}
                            selectedPackage={selectedPackage}
                            setSelectedPackage={setSelectedPackage}
                            setOpenCustomizeTripPopup={setOpenCustomizeTripPopup}
                            setOpenDownloadBrochurePopup={setOpenDownloadBrochurePopup}
                            setOpenQuotePopup={setOpenQuotePopup}
                            setOpenBookingCartPopup={setOpenBookingCartPopup}
                        />

                        <div className="md:hidden text-center bg-amber-200 space-y-2 border-b-2 border-[#d9cec1] p-3 shadow-md">
                            <p className="text-black font-semibold text-xl">Best Price Guaranteed</p>
                            <p className="text-black font-normal text-sm">
                                4 Star Stays | All Private Transportations | All Meals | Fully Guided
                            </p>
                        </div>

                        <div className="block md:hidden">
                            <TrustedBy isAdsLanding={true} />
                        </div>

                        <div className="hidden md:block">
                            <TabContent
                                tour={tourData?.tour ?? {}}
                                metaData={tourData?.meta_data ?? {}}
                                city_nights={tourData?.city_nights ?? {}}
                                tour_packages={tourData?.tour_packages ?? []}
                                tour_terms={tourData?.tour_terms ?? {}}
                                attractions={tourData?.attractions || {}}
                                payment_schedule={tourData?.payment_schedule ?? []}
                                cancellation_payment={tourData?.cancellation_payment ?? []}
                            />
                        </div>
                        <div className="block md:hidden">
                            <MobileTabContent
                                tour={tourData?.tour ?? {}}
                                city_nights={tourData?.city_nights ?? {}}
                                tour_packages={tourData?.tour_packages ?? []}
                                tour_terms={tourData?.tour_terms ?? {}}
                                attractions={tourData?.attractions || {}}
                                payment_schedule={tourData?.payment_schedule ?? []}
                                cancellation_payment={tourData?.cancellation_payment ?? []}
                            />
                        </div>

                        <div className="hidden md:block">
                            <TrustedBy isAdsLanding={true} />
                        </div>

                        <EconomicTimesSection />
                        <Reviews reviews={tourData?.tour_reviews ?? []} />
                        <BestValueGuarantee />
                        <WhyTravelOne />
                        <FAQsList data={tourData?.tour_terms ?? []} />
                        <VideoHeroSection
                            tour={tourData?.tour ?? {}}
                            videos={tourData?.tour_videos ?? []}
                        />
                        <TravelExpert isAdsLanding={true} />
                        <PageHelpful
                            pageName={`package/${tourData?.tour?.slug}`}
                        />

                        {/* Sticky Call to Action */}
                        {showStickyFooter && <>
                            <div className="hidden md:block fixed bottom-0 left-0 right-0 bg-gray-100 shadow-lg border-t border-gray-300 z-50">
                                <div className="max-w-7xl mx-auto py-2.5 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={tourData?.tour?.featured_image || "/placeholder-500x500.svg"}
                                            alt={tourData?.tour?.name}
                                            width={70}
                                            height={50}
                                            className="object-cover rounded"
                                        />
                                        <span className="text-black text-base font-normal">
                                            Call <Link href="tel:+1-631-292-8833" className="hover:underline cursor-pointer">+1 631 292 8833</Link> | <Link href="mailto:connect@traveloneglobal.com" className="hover:underline cursor-pointer">connect@traveloneglobal.com</Link>
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setOpenCustomizeTripPopup(true)}
                                            className="bg-[#ef2853] border-1 border-[#ef2853] hover:bg-white hover:text-[#ef2853] text-white px-4 py-2 rounded font-semibold text-sm cursor-pointer"
                                        >
                                            Inquire Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="block md:hidden fixed bottom-0 left-0 right-0 bg-[#FFF9EE] shadow-lg border-t border-gray-300 z-50">
                                <div className="w-full px-3 py-2 flex flex-col items-center justify-center text-center gap-1">
                                    <span className="text-black text-sm md:text-base font-normal">
                                        Call {" "}
                                        <Link
                                            href="tel:+1-631-292-8833"
                                            className="hover:underline cursor-pointer"
                                        >
                                            +1 631 292 8833
                                        </Link>
                                    </span>

                                    <button
                                        onClick={() => setOpenCustomizeTripPopup(true)}
                                        className="bg-[#ef2853] border-1 border-[#ef2853] hover:bg-white hover:text-[#ef2853] text-white px-4 py-2 rounded font-semibold text-sm cursor-pointer"
                                    >
                                        Inquire Now
                                    </button>
                                </div>
                            </div>
                        </>}
                    </div>
                )}

                {!isLoading && !tourData?.tour && (
                    <div className="mx-auto max-w-4xl py-20 text-center space-y-5">
                        <SearchAlert
                            size={120}
                            className="mx-auto text-[#ef2853] opacity-15"
                        />
                        <h2 className="text-3xl font-medium text-black">
                            Tour not found
                        </h2>
                        <p className="text-base text-black max-w-2xl mx-auto">
                            The tour you are looking for does not exist. It might have been removed or the URL might be incorrect. Please check the URL or explore our other tours.
                        </p>
                    </div>
                )}

                <CustomizeTrip
                    tour={tourData?.tour ?? {}}
                    open={openCustomizeTripPopup}
                    onOpenChange={setOpenCustomizeTripPopup}
                    mainTitle="Register Your Interest"
                />

                <AdsLandingFooter />
            </>}
        </>
    );
}