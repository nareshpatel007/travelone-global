"use client";

import { CheckCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Props {
    token: string;
    userData?: any;
    headline: string;
    paragraph: string;
    climateFilter: string;
    serviceStyle: string;
}

export default function FeaturedSection({
    token,
    userData,
    headline,
    paragraph,
    climateFilter,
    serviceStyle,
}: Props) {
    // Define state
    const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null);

    // Send feedback
    const sendFeedback = async (type: "like" | "dislike") => {
        setFeedback(type);
        fetch("/api/plan_your_trip/persona-result/rating", {
            method: "POST",
            body: JSON.stringify({
                token,
                action: 'heading_rating',
                type
            }),
        });
    };

    return (
        <div className="p-5 md:p-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="relative h-[300px] md:h-[660px] overflow-hidden">
                    <Image
                        src="/common/home2-banner-1.jpg"
                        alt="TravelOne"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />

                    <div className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 text-white uppercase">
                        {userData?.first_name && (
                            <h3 className="text-xl md:text-3xl font-light tracking-[0.1em] text-center w-full shadow-lg">
                                {userData?.first_name},
                            </h3>
                        )}

                        <h1 className="text-2xl md:text-5xl font-light tracking-[0.1em] text-center w-full shadow-lg">
                            You are unique
                        </h1>
                    </div>
                </div>

                <div className="relative min-h-[300px] md:min-h-[660px] py-5 md:py-32 px-6 md:px-10 flex items-center justify-center text-center">
                    <div className="max-w-5xl mx-auto space-y-5">
                        <div className="flex flex-wrap justify-center">
                            <span className="px-5 py-2 rounded-full bg-yellow-400 text-black font-medium text-sm flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" /> Your Travel DNA
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-normal leading-tight tracking-tight text-black">
                            {headline}
                        </h2>

                        <p className="max-w-3xl mx-auto text-base md:text-lg text-black leading-relaxed">
                            {paragraph}
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            <span className="px-5 py-2 rounded-full bg-black/10 text-black font-medium text-sm">
                                Climate: {climateFilter}
                            </span>

                            <span className="px-5 py-2 rounded-full bg-black/10 text-black font-medium text-sm">
                                Service Style: {serviceStyle}
                            </span>
                        </div>

                        <div className="flex flex-wrap justify-center pt-2 gap-4">
                            <button
                                onClick={() => sendFeedback("like")}
                                className={`w-10 h-10 flex items-center justify-center rounded-full border shadow-sm transition cursor-pointer ${feedback === "like" ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-600 hover:bg-green-50"}`}
                            >
                                <ThumbsUp size={18} />
                            </button>
                            <button
                                onClick={() => sendFeedback("dislike")}
                                className={`w-10 h-10 flex items-center justify-center rounded-full border shadow-sm transition cursor-pointer ${feedback === "dislike" ? "bg-red-600 text-white border-red-600" : "bg-white text-gray-600 hover:bg-red-50"}`}
                            >
                                <ThumbsDown size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}