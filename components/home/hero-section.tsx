"use client";

import { useMemo } from "react";
import HomeHeader from "../header/home-header";
import Link from "next/link";
import VerticalSlider from "./vertical-marquee";
import MobileSlider from "./mobile-slider";

interface Props {
    setOpenPlanYourTripModel: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenInitializePersonaModel: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LandingMarqueeSection({
    setOpenPlanYourTripModel,
    setOpenInitializePersonaModel,
}: Props) {
    // Get all images
    const allImages = [
        "/home/slider-img-1.png",
        "/home/slider-img-2.png",
        "/home/slider-img-3.png",
        "/home/slider-img-4.png",
        "/home/slider-img-5.png",
        "/home/slider-img-7.png",
    ];

    // Get 3 random unique images
    const randomImages = useMemo(() => {
        const shuffled = [...allImages].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    }, []);

    // Define images
    const images1 = [randomImages[0], randomImages[0]];
    const images2 = [randomImages[1], randomImages[1]];
    const images3 = [randomImages[2], randomImages[2]];

    return (
        <>
            {/* Desktop */}
            <section className="hidden md:grid min-h-screen grid-cols-1 bg-[#FFF9EE] md:grid-cols-[48%_52%]">
                <div className="flex flex-col">
                    <HomeHeader />

                    <div className="flex flex-1 items-center px-18">
                        <div className="max-w-xl space-y-6 text-center md:text-left">

                            <h1 className="text-black text-3xl md:text-6xl leading-tight font-normal">
                                We Record Your 30-Marker Persona to Create Personalized Travel Plans.
                            </h1>

                            <p className="text-black text-base sm:text-lg leading-relaxed">
                                We don’t just book trips; we architect them. By mapping your unique 30-Marker Traveler Persona,
                                we eliminate the guesswork of search bars to deliver a journey perfectly synchronized with who you are.
                            </p>

                            <div className="space-y-3">

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setOpenInitializePersonaModel(true)}
                                        className="bg-black text-white px-4 py-2.5 text-sm uppercase border border-black tracking-wide font-semibold hover:bg-transparent hover:text-black transition cursor-pointer"
                                    >
                                        Decode Your DNA
                                    </button>

                                    <button
                                        onClick={() => setOpenPlanYourTripModel(true)}
                                        className="border border-black text-black px-4 py-2.5 text-sm uppercase tracking-wide font-semibold hover:bg-black hover:text-white transition cursor-pointer"
                                    >
                                        Start a Journey
                                    </button>
                                </div>

                                <div className="flex items-center text-center">
                                    <Link
                                        href="/traveler-dna"
                                        className="text-sm font-medium text-black underline underline-offset-4"
                                    >
                                        Science of Persona-Led Travel
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Sliders */}
                <div className="flex flex-col">
                    <div className="flex flex-1 gap-8 lg:gap-10 justify-center">
                        <VerticalSlider images={images1} direction="down" />
                        <VerticalSlider images={images2} direction="up" />
                        <VerticalSlider images={images3} direction="down" />
                    </div>
                </div>
            </section>

            {/* Mobile */}
            <section className="block md:hidden py-12 space-y-12 bg-[#FFF9EE]">
                <div className="flex flex-col">
                    <HomeHeader />
                    <div className="flex flex-1 items-center justify-center px-6 sm:px-8 lg:px-12">
                        <div className="max-w-xl space-y-6 text-center md:text-left">
                            <p className="text-black text-3xl leading-tight font-normal">
                                We Record Your 30-Marker Persona to Create Personalized Travel Plans.
                            </p>

                            <p className="text-black text-base sm:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                                We don’t just book trips; we architect them. By mapping your unique 30-Marker Traveler Persona,
                                we eliminate the guesswork of search bars to deliver a journey perfectly synchronized with who you are.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <button
                                    onClick={() => setOpenInitializePersonaModel(true)}
                                    className="bg-black text-white px-4 py-2.5 text-sm uppercase border border-black tracking-wide font-semibold hover:bg-transparent hover:text-black transition cursor-pointer"
                                >
                                    Decode Your DNA
                                </button>

                                <button
                                    onClick={() => setOpenPlanYourTripModel(true)}
                                    className="border border-black text-black px-4 py-2.5 text-sm uppercase tracking-wide font-semibold hover:bg-black hover:text-white transition cursor-pointer"
                                >
                                    Start a Journey
                                </button>

                                <Link
                                    href="/intelligence"
                                    className="text-sm font-medium text-black underline underline-offset-4"
                                >
                                    Science of Persona-Led Travel
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <MobileSlider />
                </div>
            </section>
        </>
    );
}