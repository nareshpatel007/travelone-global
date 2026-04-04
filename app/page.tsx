"use client";

import CommonFooter from "@/components/footer/common-footer";
import HomeMobileHeader from "@/components/header/home-mobile-header";
import LandingMarqueeSection from "@/components/home/hero-section";
import { useEffect, useState } from "react";
import GlobalFinancialSection from "@/components/home/global-financial";
import BlogSlider from "@/components/home/blog-slider";
import StickyHomeHeader from "@/components/header/sticky-home-header";
import WhyTravelOne from "@/components/home/why-travelone";
import { InitializePersonaModal } from "@/components/plan_your_trip/initialize-persona";
import { StartJourneyModal } from "@/components/plan_your_trip/journey-popup";
import EconomicTimesSection from "@/components/contact/economic-times";
import TheRealityCheck from "@/components/home/the-reality-check";

export default function HomePage() {
    // Define state
    const [ready, setReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [blogList, setBlogList] = useState<any[]>([]);
    const [openPlanYourTripModel, setOpenPlanYourTripModel] = useState<boolean>(false);
    const [openInitializePersonaModel, setOpenInitializePersonaModel] = useState<boolean>(false);

    useEffect(() => {
        requestAnimationFrame(() => { setReady(true); });
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        const loadInitData = async () => {
            setIsLoading(true);
            try {
                // API call
                const response = await fetch("/api/blog/list", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    signal: controller.signal,
                });

                // Parse response
                const blogData = await response.json();

                // Check response
                if (blogData?.status) {
                    setBlogList(blogData?.data?.result ?? []);
                }
            } finally {
                setIsLoading(false);
            }
        };
        loadInitData();
        return () => controller.abort();
    }, []);

    // If not ready, return null
    if (!ready) return null;

    return (
        <>
            <HomeMobileHeader />
            <LandingMarqueeSection
                setOpenPlanYourTripModel={setOpenPlanYourTripModel}
                setOpenInitializePersonaModel={setOpenInitializePersonaModel}
            />
            <EconomicTimesSection bgColor={"bg-white"} />
            <TheRealityCheck />
            <WhyTravelOne />
            <GlobalFinancialSection />
            {!isLoading && <BlogSlider blogList={blogList} />}
            <CommonFooter isStickyShow={true} />
            <StickyHomeHeader />
            <StartJourneyModal
                open={openPlanYourTripModel}
                onOpenChange={setOpenPlanYourTripModel}
            />
            <InitializePersonaModal
                open={openInitializePersonaModel}
                onOpenChange={setOpenInitializePersonaModel}
            />
        </>
    );
}
