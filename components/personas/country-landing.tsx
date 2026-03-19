"use client";

import { CheckCircle, Key } from "lucide-react";
import { useEffect, useState } from "react";
import CommonHeader from "../header/common-header";
import CommonFooter from "../footer/common-footer";
import Image from "next/image";

// Define inferface
interface Props {
    country: string;
}

export default function PersonasCountryLanding({ country }: Props) {
    // Get query parms
    const token = getQuery("token", "");

    // Define state
    const [ready, setReady] = useState(false);
    const [resultData, rowResultData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

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
            const response = await fetch(`/api/plan_your_trip/persona-landing`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    country,
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
                        <div className="space-y-8">
                            {/* Sovereign Alignment */}
                            <div className="w-full grid grid-cols-1 md:grid-cols-[60%_40%]">
                                <div className="relative h-[60vh]">
                                    <Image
                                        src={resultData?.country?.featured_image || "/placeholder.svg"}
                                        alt={resultData?.country?.name || "Image"}
                                        fill
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex items-center justify-center px-6 md:px-16 py-12">
                                    <div className="text-center space-y-8 max-w-2xl">
                                        <div className="relative z-10 flex items-center justify-center h-full">
                                            <h1 className="text-black text-4xl md:text-8xl font-normal tracking-wide text-center">
                                                {resultData?.country?.name}
                                            </h1>
                                        </div>

                                        <h2 className="text-3xl md:text-5xl leading-tight font-normal">
                                            Sovereign Alignment
                                        </h2>

                                        <div className="flex justify-center">
                                            <span className="w-20 h-1 bg-black" />
                                        </div>

                                        <p className="text-base md:text-xl leading-relaxed">
                                            {resultData?.sovereign_alignment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="max-w-7xl mx-auto px-5 md:px-0 py-12 space-y-12">
                                {resultData?.cities?.length > 0 && (
                                    <div className="space-y-8">
                                        <div className="space-y-2 text-center">
                                            <h2 className="text-black text-3xl md:text-6xl leading-tight font-normal md:max-w-4xl md:mx-auto">
                                                Recommended Cities
                                            </h2>
                                            <div className="space-y-3">
                                                <p className="text-black text-md md:max-w-4xl md:mx-auto">
                                                    We have found {resultData?.cities?.length} cities for you.
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`grid grid-cols-1 ${resultData?.cities?.length > 2 ? "md:grid-cols-3" : `md:grid-cols-${resultData?.cities?.length}`} gap-4`}>
                                            {resultData?.cities?.map((city: any, index: number) => (
                                                <div key={index} className="group h-full">
                                                    <div className="flex h-full flex-col border border-gray-200 transition-all hover:shadow-md">
                                                        {/* <div className="relative h-52 md:h-80 overflow-hidden">
                                                            <Image
                                                                src={city?.featured_image || "/placeholder.svg"}
                                                                alt={city?.name}
                                                                fill
                                                                draggable={false}
                                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                            />

                                                            {city?.perfect_match && (
                                                                <div className="absolute top-3 left-3">
                                                                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-400 text-black rounded-full">
                                                                        ★ Perfect Match
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div> */}
                                                        <div className="flex flex-1 flex-col space-y-4 p-6 text-center">
                                                            <h2 className="line-clamp-2 text-md md:text-xl font-medium text-gray-900 md:text-xl">
                                                                {city?.name}
                                                            </h2>

                                                            {city?.heading && (
                                                                <div className="text-sm md:text-base text-black">
                                                                    {city?.heading}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
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