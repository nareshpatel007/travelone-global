"use client";

import QuestionHeading from "@/components/plan_your_trip/common/questionHeading";
import { X, Sparkles, Map, Compass, Settings, Crown } from "lucide-react";
import Image from "next/image";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    item: any;
}

export function CountryWhyPopup({ open, onOpenChange, item }: Props) {

    if (!open || !item) return null;

    const handleClose = () => {
        onOpenChange(false);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Container */}
            <div className="relative w-full h-full bg-[#FFF6E5] overflow-auto">
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 z-10 p-2 rounded-full bg-[#FFC765] hover:bg-black hover:text-white cursor-pointer transition"
                >
                    <X className="h-5 w-5" />
                </button>
                <div className="min-h-full flex flex-col items-center md:justify-center px-4 md:px-8 py-18 md:py-20 space-y-6">
                    <div className="w-full max-w-4xl space-y-3 md:space-y-6">
                        <QuestionHeading
                            title={`Why ${item.name} for your Profile?`}
                        />
                        <div className="border border-[#2F5D50]/30 rounded-md p-6 md:p-8 space-y-6 bg-white shadow-sm">
                            <InfoRow
                                icon={<Sparkles size={18} />}
                                title='The "Why"'
                                text={item?.dna_superlative}
                            />

                            <InfoRow
                                icon={<Map size={18} />}
                                title="The Sensory Match"
                                text={item?.sensory_match}
                            />

                            <InfoRow
                                icon={<Compass size={18} />}
                                title="Primary Match"
                                text={item?.primary_match}
                            />

                            <InfoRow
                                icon={<Settings size={18} />}
                                title="System Match"
                                text={item?.system_match}
                            />

                            <InfoRow
                                icon={<Crown size={18} />}
                                title="Elite Match"
                                text={item?.elite_match}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoRow({
    icon,
    title,
    text
}: any) {
    if (!text) return null;
    return (
        <div className="flex gap-4">
            <div className="mt-1 text-[#2F5D50]">
                {icon}
            </div>
            <div className="space-y-1">
                <h4 className="font-semibold text-black">
                    {title}
                </h4>
                <p className="text-gray-700 leading-relaxed">
                    {text}
                </p>
            </div>
        </div>
    );
}