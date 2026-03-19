"use client";

import { MousePointerClick, ThumbsDown, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Item = {
    title: string;
    description: string;
};

type Props = {
    token: string;
    valueTable: {
        yes: Item[];
        no: Item[];
    };
};

export default function ValueTable({ token, valueTable }: Props) {
    // Validation
    if (!valueTable) {
        return null;
    }

    // Define state
    const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null);

    // Send feedback
    const sendFeedback = async (type: "like" | "dislike") => {
        setFeedback(type);

        fetch("/api/plan_your_trip/persona-result/rating", {
            method: "POST",
            body: JSON.stringify({
                token,
                action: "ethos_rating",
                type,
            }),
        });
    };

    return (
        <div className="py-8 bg-[#faf7f2] space-y-6 md:space-y-3">
            <div className="max-w-7xl mx-auto px-5 md:px-0 py-0 md:py-6 space-y-12">
                <div className="space-y-8 max-w-4xl mx-auto">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl md:text-6xl text-black">
                            Your Travel DNA Matrix
                        </h2>
                        <p className="text-gray-600">
                            Priorities vs. Filters
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-[#d9eed8] pt-20 pb-10 px-10 rounded-t-[200px] rounded-b-xl shadow-sm">
                            <h3 className="text-2xl font-semibold text-green-800 mb-6 text-center">
                                What We Prioritize
                            </h3>
                            <div className="space-y-6">
                                {valueTable?.yes?.map((item, index) => (
                                    <div key={index} className="flex gap-3">
                                        <span className="text-green-700 text-xl">✓</span>
                                        <div>
                                            <p className="font-semibold text-black">
                                                {item.title}
                                            </p>
                                            <p className="text-base text-gray-700">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-red-100 pt-20 pb-10 px-10 rounded-t-[200px] rounded-b-xl shadow-sm">
                            <h3 className="text-2xl font-semibold text-red-700 mb-6 text-center">
                                What We Filter Out
                            </h3>
                            <div className="space-y-6">
                                {valueTable?.no?.map((item, index) => (
                                    <div key={index} className="flex gap-3">
                                        <span className="text-red-600 text-xl">✕</span>
                                        <div>
                                            <p className="font-semibold text-black">
                                                {item.title}
                                            </p>
                                            <p className="text-base text-gray-700">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-4">
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
            <div className="flex justify-center">
                <Link href="/manage-traveller-dna" target="_blank">
                    <button
                        className="flex items-center justify-center gap-2 px-6 py-2 bg-black text-white rounded hover:bg-yellow-400 hover:text-black cursor-pointer"
                    >
                        <MousePointerClick className="w-5 h-5" /> Manage My Traveller DNA
                    </button>
                </Link>
            </div>
        </div>
    );
}