"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import HeroSection from "@/components/personas/itinerary/hero-section";
import HeroContent from "@/components/personas/itinerary/hero-content";
import CityPortfolios from "@/components/personas/itinerary/city-portfolios";
import InvestmentLogistics from "@/components/personas/itinerary/InvestmentLogistics";
import PrivateDesign from "@/components/personas/itinerary/PrivateDesign";
import MembershipTiers from "@/components/personas/itinerary/membership-tiers";
import CulinaryConcierge from "@/components/personas/itinerary/culinary-concierge";
import { Search } from "lucide-react";

export default function Page() {
    // Get query parms
    const token = getQuery("token", "");

    // Define state
    const [ready, setReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [resultData, rowResultData] = useState<any>(null);

    useEffect(() => {
        requestAnimationFrame(() => { setReady(true); });
    }, []);

    useEffect(() => {
        if (!token) {
            return;
        }
        fetchPersonasResult(token);
    }, [token]);

    // Fetch personas result
    const fetchPersonasResult = async (token: string) => {
        try {
            // Update state
            setIsLoading(true);

            // API Call
            const response = await fetch(`/api/plan_your_trip/persona-itinerary`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token
                })
            });

            // Convert into JSON
            const data = await response.json();

            // Check response
            if (data?.status) {
                rowResultData(data?.data);
            }
        } finally {
            // Update state
            setIsLoading(false);
        }
    };

    // If not ready
    if (!ready) return null;

    return (
        <div className="min-h-screen">
            <CommonHeader />

            {/* Loading */}
            {isLoading && !resultData && <div className="max-w-7xl mx-auto px-5 md:px-0 py-6">
                <div className="grid grid-cols-1 space-y-4">
                    <div className="animate-pulse bg-gray-200 rounded h-20 md:h-30"></div>
                    <div className="animate-pulse bg-gray-200 rounded h-40 md:h-50"></div>
                    <div className="animate-pulse bg-gray-200 rounded h-40 md:h-50"></div>
                </div>
            </div>}

            {/* Result */}
            {!isLoading && resultData && (
                <>
                    <HeroSection
                        score={resultData?.score}
                        country={resultData?.country}
                        content={resultData?.hero_section}
                    />
                    <HeroContent data={resultData?.hero_section} />
                    <CityPortfolios
                        country={resultData?.country}
                        cities={resultData?.cities}
                    />
                    <CulinaryConcierge />
                    <PrivateDesign
                        country={resultData?.country}
                    />
                    <InvestmentLogistics data={resultData?.investment_logistics} />
                    <MembershipTiers />
                </>
            )}

            {/* Result not found */}
            {!isLoading && !resultData && <div className="mx-auto max-w-4xl py-20 text-center space-y-5">
                <Search
                    size={120}
                    className="mx-auto text-[#ef2853] opacity-15"
                />
                <h2 className="text-3xl font-medium text-black">
                    Itinerary not found
                </h2>
                <p className="text-base text-black max-w-2xl mx-auto">
                    We could not find the itinerary you are looking for. Please try again.
                </p>
            </div>}

            <CommonFooter />
        </div>
    );
}

// Get query
export const getQuery = (key: string, fallback = "") =>
    typeof window === "undefined"
        ? fallback
        : new URLSearchParams(window.location.search).get(key) ?? fallback;