"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
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
import { DownloadBrochure } from "@/components/tour_details/popup/download-brochure";
import { BookingCart } from "@/components/tour_details/popup/booking-cart";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { getLoginCookie } from "@/lib/auth";
import ToursSlider from "@/components/home/tours-slider";
import VideoHeroSection from "@/components/tour_details/video-hero";
import { EyeClosed, SearchAlert } from "lucide-react";

// Define Props
interface Props {
    slug: string
}

export default function SingleTourPage({ slug }: Props) {
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
                <CommonHeader />

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

                        <BestValueGuarantee />
                        <Reviews reviews={tourData?.tour_reviews ?? []} />
                        <WhyTravelOne />
                        <TrustedBy />
                        <FAQsList data={tourData?.tour_terms ?? []} />
                        <ToursSlider
                            title="You may also like"
                            subTitle="We are committed to providing you with the best possible experience."
                            toursList={tourData?.related_tours}
                            bgColor="bg-white"
                        />
                        <VideoHeroSection
                            tour={tourData?.tour ?? {}}
                            videos={tourData?.tour_videos ?? []}
                        />
                        <TravelExpert />
                        <PageHelpful
                            pageName={`tour/${tourData?.tour?.slug}`}
                        />

                        {showStickyFooter && (
                            <div className="hidden md:block fixed bottom-0 left-0 right-0 bg-gray-100 shadow-lg border-t border-gray-300 z-50">
                                <div className="max-w-7xl mx-auto py-3 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={tourData?.tour?.featured_image || "/placeholder-500x500.svg"}
                                            alt={tourData?.tour?.name}
                                            width={70}
                                            height={50}
                                            className="object-cover rounded"
                                        />
                                        <span className="text-black text-base font-normal">
                                            Call us now on <Link href="tel:+1 703-200-3901" className="hover:underline cursor-pointer">+1 703 200 3901</Link>
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setOpenBookingCartPopup(true)}
                                            className="bg-[#ef2853] hover:bg-white text-white hover:text-[#ef2853] border border-[#ef2853] px-6 py-2 rounded text-base font-medium cursor-pointer transition"
                                        >
                                            Book {tourData?.tour_packages && tourData?.tour_packages.find((p: any) => p.no === selectedPackage)?.name}
                                        </button>

                                        <button className="bg-white text-black border border-black hover:bg-black hover:text-white px-6 py-2 rounded text-base font-medium cursor-pointer transition" onClick={() => setOpenCustomizeTripPopup(true)}>
                                            Customize Trip
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
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

                {/* Popup modals */}
                <BookingCart
                    tour={tourData?.tour ?? {}}
                    selectedPackage={selectedPackage}
                    open={openBookingCartPopup}
                    onOpenChange={setOpenBookingCartPopup}
                />
                <CustomizeTrip tour={tourData?.tour ?? {}} open={openCustomizeTripPopup} onOpenChange={setOpenCustomizeTripPopup} />
                <DownloadBrochure tour={tourData?.tour ?? {}} open={openDownloadBrochurePopup} onOpenChange={setOpenDownloadBrochurePopup} />
                {/* <QuoteBrochure
                    tour={tourData?.tour ?? {}}
                    open={openQuotePopup}
                    onOpenChange={setOpenQuotePopup}
                /> */}

                <CommonFooter isStickyShow={true} />
            </>}
        </>
    );
}