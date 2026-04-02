"use client";

import { useState } from "react";
import { FeedbackPopup } from "./feedback-popup";
import { BehindBlueprint } from "./behind-blueprint";
import Link from "next/link";
import { MessageCircle, Dna, BrainCircuit, ExternalLink } from "lucide-react";

interface Props {
    token: string;
    isLocked: boolean;
    faqs: any[];
}

export default function ActionButton({ token, isLocked, faqs }: Props) {
    // Define state
    const [openFeedbackPopup, setOpenFeedbackPopup] = useState(false);
    const [openBlueprintPopup, setOpenBlueprintPopup] = useState(false);

    return (
        <>
            <section className="p-10 md:p-14 px-5 md:px-0">
                <div className="max-w-7xl mx-auto">
                    <div className={`grid grid-cols-1 ${isLocked ? "md:grid-cols-2" : "md:grid-cols-3"} gap-6`}>
                        <div className="group relative rounded-2xl border border-gray-200 bg-[#d9eed8] p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex flex-col items-center text-center gap-4">

                                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white text-black group-hover:scale-110 transition">
                                    <MessageCircle size={26} />
                                </div>

                                <h3 className="text-lg font-semibold">
                                    Your Feedback
                                </h3>

                                <p className="text-sm text-black leading-relaxed">
                                    Tell us how accurate your Traveler DNA results feel and help
                                    improve future personalization.
                                </p>

                                <button
                                    onClick={() => setOpenFeedbackPopup(true)}
                                    className="mt-2 px-6 py-2 rounded bg-black text-white text-sm font-medium tracking-wide hover:bg-black/80 cursor-pointer transition"
                                >
                                    Give Feedback
                                </button>
                            </div>
                        </div>

                        {!isLocked && (
                            <div className="group relative rounded-2xl border border-gray-200 bg-[#d9eed8] p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="flex flex-col items-center text-center gap-4">
                                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white text-black group-hover:scale-110 transition">
                                        <Dna size={26} />
                                    </div>

                                    <h3 className="text-lg font-semibold">
                                        Manage Your DNA
                                    </h3>

                                    <p className="text-sm text-black leading-relaxed">
                                        Update your Traveler DNA preferences to refine future
                                        destination matches and insights.
                                    </p>

                                    <Link href="/manage-traveller-dna" target="_blank">
                                        <button className="flex items-center gap-2 mt-2 px-6 py-2 rounded bg-black text-white text-sm font-medium tracking-wide hover:bg-black/80 cursor-pointer transition">
                                            Manage DNA <ExternalLink size={16} />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        <div className="group relative rounded-2xl border border-gray-200 bg-[#d9eed8] p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white text-black group-hover:scale-110 transition">
                                    <BrainCircuit size={26} />
                                </div>

                                <h3 className="text-lg font-semibold">
                                    Behind The Blueprint
                                </h3>

                                <p className="text-sm text-black leading-relaxed">
                                    Discover the methodology and intelligence behind how your
                                    Traveler DNA profile was generated.
                                </p>

                                <button
                                    onClick={() => setOpenBlueprintPopup(true)}
                                    className="mt-2 px-6 py-2 rounded bg-black text-white text-sm font-medium tracking-wide hover:bg-black/80 cursor-pointer transition"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* POPUPS */}

            <FeedbackPopup
                open={openFeedbackPopup}
                onOpenChange={setOpenFeedbackPopup}
                token={token}
                faqs={faqs}
            />

            <BehindBlueprint
                open={openBlueprintPopup}
                onOpenChange={setOpenBlueprintPopup}
            />
        </>
    );
}