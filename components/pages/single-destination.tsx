"use client";

import { useEffect, useState } from "react";
import HeroBannerSection from "@/components/destination/hero-banner";
import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import IntroSection from "@/components/destination/intro-section";
import TrustedBy from "@/components/tour_details/trusted-by";
import WhyTravelOne from "@/components/tour_details/why-travelone";
import Reviews from "@/components/tour_details/reviews";
import TopCities from "@/components/destination/top-cities";
import ThreeBoxSection from "@/components/destination/three-box-section";
import FAQsSection from "@/components/destination/faqs";
import PageHelpful from "@/components/common/helpful";
import RelatedTours from "@/components/destination/related-tours-slider";

// Define props
interface Props {
    slug: string;
}

export default function SingleDestination({ slug }: Props) {
    // Define state
    const [ready, setReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [pageData, setPageData] = useState<any>([]);

    useEffect(() => {
        requestAnimationFrame(() => { setReady(true); });
    }, []);

    // Init data
    useEffect(() => {
        const controller = new AbortController();
        const loadInitdata = async () => {
            try {
                // Fetch the data
                const response = await fetch("/api/destination/single", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ slug })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the JSON response
                const data = await response.json();

                // Update the state
                if (data?.status) {
                    setPageData(data?.data ?? []);
                }
            } catch (error: any) {
                if (error.name !== "AbortError") {
                    console.error("Failed to fetch single destination:", error);
                }
            } finally {
                setIsLoading(false);
            }
        };
        loadInitdata();
        return () => controller.abort();
    }, []);

    return (
        <>
            {ready && <>
                <CommonHeader landingPytrip={true} />

                {isLoading ? (
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-48 md:h-100"></div>
                        ))}
                    </div>
                ) : (
                    <>
                        <HeroBannerSection pageData={pageData} />
                        <IntroSection pageData={pageData} />
                        <RelatedTours
                            title={`Handcrafted ${pageData?.single?.name} Itineraries`}
                            tours={pageData?.related_tours || []}
                        />
                        <TrustedBy />
                        <WhyTravelOne />
                        <Reviews reviews={pageData?.reviews ?? []} />
                        <TopCities country={pageData?.single?.name} cities={pageData?.top_cities ?? []} />
                        <ThreeBoxSection pageData={pageData} />
                        <FAQsSection pageData={pageData} />
                        <PageHelpful pageName={`country/${slug}`} />
                    </>
                )}

                <CommonFooter />
            </>}
        </>
    );
}
