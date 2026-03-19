"use client";

import { ThumbsDown, ThumbsUp, Video } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ConnectTravelone } from "../common/connect-travelone";

interface Props {
    token: string;
    text: string;
}

export default function EthosSection({ token, text }: Props) {
    // Define state
    const [openConnectTravelone, setOpenConnectTravelone] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null);

    // Send feedback
    const sendFeedback = async (type: "like" | "dislike") => {
        setFeedback(type);
        fetch("/api/plan_your_trip/persona-result/rating", {
            method: "POST",
            body: JSON.stringify({
                token,
                action: 'ethos_rating',
                type
            }),
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-5 md:px-0 py-0 md:py-6 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="relative min-h-[300px] md:min-h-[600px] px-6 md:px-10 flex items-center justify-center text-center">
                    <div className="max-w-5xl mx-auto space-y-5">
                        <h2 className="text-4xl md:text-6xl font-normal leading-tight tracking-tight text-black">
                            The Core Ethos: Your Travel Psychography
                        </h2>

                        <p className="max-w-4xl md:max-w-3xl mx-auto text-base md:text-lg text-black leading-relaxed">
                            {text}
                        </p>

                        <div className="flex justify-center">
                            <button
                                onClick={() => setOpenConnectTravelone(true)}
                                className="flex items-center justify-center gap-2 px-6 py-2 bg-black text-white rounded hover:bg-yellow-400 hover:text-black cursor-pointer"
                            >
                                <Video className="w-5 h-5" /> Consult Your Travel Architect
                            </button>
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
                <div className="relative h-[330px] md:h-[600px] text-center overflow-hidden">
                    <Image
                        src="/common/about-img-2.png"
                        alt="TravelOne"
                        fill
                        priority
                        loading="eager"
                        sizes="50vw"
                        className="object-cover"
                    />
                </div>
            </div>

            <ConnectTravelone open={openConnectTravelone} onOpenChange={setOpenConnectTravelone} />
        </div>
    );
}
