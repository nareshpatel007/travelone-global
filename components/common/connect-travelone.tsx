"use client";

import QuestionHeading from "@/components/plan_your_trip/common/questionHeading";
import { X } from "lucide-react";
import { InlineWidget } from "react-calendly";
import "react-international-phone/style.css";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ConnectTravelone({ open, onOpenChange }: Props) {
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
                    onClick={handleClose}
                    className="absolute top-6 right-6 z-10 p-2 rounded-full bg-[#FFC765] hover:bg-black hover:text-white cursor-pointer transition"
                >
                    <X className="h-5 w-5" />
                </button>
                <div className="min-h-full flex flex-col items-center md:justify-center px-4 md:px-8 py-10 md:py-20 space-y-2 md:space-y-5">
                    <div className="w-full max-w-4xl space-y-1 md:space-y-5">
                        <QuestionHeading
                            title="Connect with Travelone"
                            subtitle="Fill the form below and we will get back to you."
                        />

                        <div className="border border-[#2F5D50] rounded-sm p-5 space-y-4 bg-white/60">
                            <InlineWidget
                                url="https://calendly.com/travelone/30min"
                                styles={{ height: "500px", width: "100%" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
