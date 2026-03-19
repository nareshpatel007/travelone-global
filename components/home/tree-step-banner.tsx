"use client";

import Image from "next/image";

interface Props {
    onOpenChange: (open: boolean) => void;
    setOpenInitializePersonaModel: (open: boolean) => void;
}

interface DestinationCard {
    heading: string;
    text: string;
}

const sections: DestinationCard[] = [
    {
        heading: "Step 01: Record Your 30-Marker Persona",
        text: 'Complete our digital mapping to record your specific values, pace, and travel non-negotiables into a permanent data asset.',
    },
    {
        heading: "Step 02: Generate Personalized Architectures",
        text: "Our platform analyzes your Traveler DNA to create 100% personalized itineraries synchronized with our global supply network.",
    },
    {
        heading: "Step 03: Institutional-Grade Orchestration",
        text: "We manage every logistical detail and payment as your Merchant of Record, providing real-time support and enterprise-level security."
    },
];

export default function ThreeStepBanner({ onOpenChange, setOpenInitializePersonaModel }: Props) {
    return (
        <div className="px-5 md:px-10 py-12 space-y-12">
            <div className="space-y-2 text-center">
                <h2 className="text-black text-3xl md:text-6xl leading-tight font-normal">
                    Start with Who, Not Where.
                </h2>
                <span className="text-black text-md">
                    Initialize your Traveler DNA and let our intelligence engine match your soul to the world.
                </span>
            </div>
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-10 gap-4">
                <div className="relative col-span-1 lg:col-span-7 overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[380px]">
                    <Image
                        src="https://ik.imagekit.io/288weifiq/nextjs/japan/cherry-blossoms-fuji-mountain-spring-sunrise-shizuoka-japan_335224-110.jpg"
                        alt="Featured travel destination"
                        fill
                        priority
                        className="object-cover transition-transform duration-300 hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/5 hover:bg-black/30 transition-colors" />

                    <div className="absolute inset-0 flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
                        <button
                            onClick={() => setOpenInitializePersonaModel(true)}
                            className="w-full max-w-xs sm:w-auto bg-black text-white px-6 py-3 text-sm uppercase border border-black tracking-wide font-semibold hover:bg-white hover:text-black transition cursor-pointer text-center"
                        >
                            Decode Your DNA
                        </button>

                        <button
                            onClick={() => onOpenChange(true)}
                            className="w-full max-w-xs sm:w-auto border border-black bg-white text-black px-6 py-3 text-sm uppercase tracking-wide font-semibold hover:bg-black hover:text-white transition cursor-pointer text-center"
                        >
                            Start a Journey
                        </button>
                    </div>
                </div>
                <div className="col-span-1 lg:col-span-3 flex flex-col gap-3">
                    {sections.map((destination, index) => (
                        <div
                            key={index}
                            className="flex items-center lg:flex-col lg:text-center bg-[#FFF9EE] border border-gray-300 hover:bg-white cursor-pointer hover:border-black p-5 lg:p-8"
                        >
                            <div className="space-y-2 text-center">
                                <h3 className="font-semibold text-md md:text-lg">
                                    {destination.heading}
                                </h3>
                                <span className="font-normal text-base">
                                    {destination.text}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
