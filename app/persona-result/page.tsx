"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import { Key } from "lucide-react";
import PageHelpful from "@/components/common/helpful";
import FeaturedSection from "@/components/personas/featured-section";
import EthosSection from "@/components/personas/ethos";
import ValueTable from "@/components/personas/value-table";
import TravelExpert from "@/components/personas/travel-experts";
import ActionButton from "@/components/personas/action-button";
import CountriesList from "@/components/personas/countries-list";
import ReferralEarn from "@/components/personas/referral-earn";
import StripeProvider from "@/components/providers/StripeProvider";
import MakePaymentModal from "@/components/personas/membership/payment-popup";

export default function Page() {
    // Get query parms
    const token = getQuery("token", "");

    // Define state
    const [ready, setReady] = useState<boolean>(false);
    const [resultData, rowResultData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [destinationList, setDestinationList] = useState<any[]>([]);
    const [countriesList, setCountriesList] = useState<any[]>([]);

    // Define state
    const [openMakePayment, setOpenMakePayment] = useState<boolean>(false);
    const [choosePlan, setChoosePlan] = useState<string>("");
    const [planAmount, setPlanAmount] = useState<string>("95");

    useEffect(() => {
        requestAnimationFrame(() => { setReady(true); });
    }, []);

    // Prevent right click
    // useEffect(() => {
    //     const preventContextMenu = (e: any) => e.preventDefault();
    //     const preventCopy = (e: any) => e.preventDefault();
    //     const preventPaste = (e: any) => e.preventDefault();
    //     const preventCut = (e: any) => e.preventDefault();
    //     const preventKeys = (e: any) => {
    //         if (
    //             e.ctrlKey &&
    //             ["c", "v", "x", "u", "s", "a"].includes(e.key.toLowerCase())
    //         ) {
    //             e.preventDefault();
    //         }
    //     };

    //     document.addEventListener("contextmenu", preventContextMenu);
    //     document.addEventListener("copy", preventCopy);
    //     document.addEventListener("paste", preventPaste);
    //     document.addEventListener("cut", preventCut);
    //     document.addEventListener("keydown", preventKeys);

    //     return () => {
    //         document.removeEventListener("contextmenu", preventContextMenu);
    //         document.removeEventListener("copy", preventCopy);
    //         document.removeEventListener("paste", preventPaste);
    //         document.removeEventListener("cut", preventCut);
    //         document.removeEventListener("keydown", preventKeys);
    //     };
    // }, []);

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
            const response = await fetch(`/api/plan_your_trip/persona-result`, {
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
                setDestinationList(data?.data?.destination ?? []);

                // Get values
                const originalCountries = data?.data?.data?.inventory || [];
                const perfectMatchCountries = Object.keys(data?.data?.data?.match_perfect || {}).map(Number);

                // Sort countries so perfect matches come first
                const sortedCountries = [...originalCountries].sort((a, b) => {
                    const aMatch = perfectMatchCountries.includes(a.id) ? 1 : 0;
                    const bMatch = perfectMatchCountries.includes(b.id) ? 1 : 0;
                    return bMatch - aMatch;
                });

                // Update state
                setCountriesList(sortedCountries);
            }
        } finally {
            // Update state
            setIsLoading(false);
        }
    };

    // Check if user has membership
    const isLocked = !resultData?.user_data?.is_membership;

    return (
        <>
            {ready && <>
                <div className="min-h-screen bg-white">
                    <CommonHeader />

                    {/* Loading */}
                    {isLoading && <div className="max-w-7xl mx-auto px-5 md:px-0 py-6">
                        <div className="grid grid-cols-1 space-y-4">
                            <div className="animate-pulse bg-gray-200 rounded h-20 md:h-30"></div>
                            <div className="animate-pulse bg-gray-200 rounded h-40 md:h-50"></div>
                            <div className="animate-pulse bg-gray-200 rounded h-40 md:h-50"></div>
                        </div>
                    </div>}

                    {/* Result */}
                    {!isLoading && resultData && (
                        <>
                            <FeaturedSection
                                token={token}
                                userData={resultData?.user_data}
                                headline={resultData?.data?.headline}
                                paragraph={resultData?.data?.paragraph}
                                climateFilter={resultData?.data?.climate_filter}
                                serviceStyle={resultData?.data?.service_style}
                            />
                            <EthosSection
                                token={token}
                                isLocked={isLocked}
                                text={resultData?.data?.ethos}
                            />
                            <ValueTable
                                token={token}
                                isLocked={isLocked}
                                valueTable={resultData?.data?.matrix_table}
                            />
                            <CountriesList
                                token={token}
                                isLocked={isLocked}
                                resultData={resultData}
                                destinationList={destinationList}
                                countriesList={countriesList}
                                setChoosePlan={setChoosePlan}
                                setPlanAmount={setPlanAmount}
                                setOpenMakePayment={setOpenMakePayment}
                            />
                            <ReferralEarn token={token} />
                            <ActionButton
                                token={token}
                                faqs={resultData?.data?.faqs}
                                isLocked={isLocked}
                            />
                            <TravelExpert />
                            <PageHelpful
                                text="Was this TravelDNA report helpful?"
                                pageName={`persona-result?token=/${token}`}
                            />
                        </>
                    )}

                    {/* Result not found */}
                    {!isLoading && !resultData && <div className="mx-auto max-w-4xl py-20 text-center space-y-5">
                        <Key
                            size={120}
                            className="mx-auto text-[#ef2853] opacity-15"
                        />
                        <h2 className="text-3xl font-medium text-black">
                            Result not found
                        </h2>
                        <p className="text-base text-black max-w-2xl mx-auto">
                            Requested token is not valid. Please check your token.
                        </p>
                    </div>}

                    {/* Membership Payment */}
                    <StripeProvider>
                        <MakePaymentModal
                            open={openMakePayment}
                            onOpenChange={setOpenMakePayment}
                            token={token}
                            plan={choosePlan}
                            amount={planAmount}
                        />
                    </StripeProvider>

                    <CommonFooter />
                </div>
            </>}
        </>
    );
}

// Get query
export const getQuery = (key: string, fallback = "") =>
    typeof window === "undefined"
        ? fallback
        : new URLSearchParams(window.location.search).get(key) ?? fallback;