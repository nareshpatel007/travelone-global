"use client";

import QuestionHeading from "@/components/plan_your_trip/common/questionHeading";
import { CheckCircle, Loader2, X } from "lucide-react";
import { useState } from "react";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function BehindBlueprint({ open, onOpenChange }: Props) {
    // If not open
    if (!open) return null;

    // Handle close
    const handleClose = () => {
        onOpenChange(false);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
            <div className="relative w-full h-full bg-[#FFF6E5] overflow-auto">
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute top-6 right-6 z-10 p-2 rounded-full bg-[#FFC765] hover:bg-black hover:text-white cursor-pointer transition"
                >
                    <X className="h-5 w-5" />
                </button>
                <div className="min-h-full flex flex-col items-center md:justify-center px-4 md:px-8 py-10 md:py-20 space-y-2 md:space-y-5">
                    <div className="w-full max-w-4xl space-y-1 md:space-y-5">
                        <QuestionHeading
                            title="Behind the Blueprint: The Science of Your Selection"
                        />

                        <div className="border border-[#2F5D50] rounded-sm p-8 space-y-7 bg-white/60">
                            <p className="text-base sm:text-lg text-black leading-relaxed">
                                To derive your Signature Results, our engine moves beyond traditional destination filtering and enters the realm of Agentic Reasoning. We cross-referenced your 30 Marker Points—a high-fidelity diagnostic of your Cognitive Travel Architecture. This includes an algorithmic analysis of your Environmental Resonance (climate-resilience and sensory-density scores) and your Service-Friction Index (the precise balance between 'Invisible Tech' and 'Curated Human Intervention').
                            </p>

                            <p className="text-base sm:text-lg text-black leading-relaxed">
                                Our proprietary engine then performed a Multi-Layered Asset Match, scanning global infrastructure data to identify the exact coordinates where the local landscape, hotel architecture, and transit velocity align with your psychological needs. These are not merely vacations; they are Adaptive Ecosystems built to respond to the unique frequency of your Travel DNA.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
