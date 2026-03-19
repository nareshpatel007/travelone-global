"use client";

import { useState } from "react";
import { InitializePersonaModal } from "../plan_your_trip/initialize-persona";
import { StartJourneyModal } from "../plan_your_trip/journey-popup";

// Define props
interface Props {
    isAdsLanding?: boolean;
}

export default function FooterCurveSection({ isAdsLanding = false }: Props) {
    // Define state
    const [openPlanYourTripModel, setOpenPlanYourTripModel] = useState(false);
    const [openInitializePersonaModel, setOpenInitializePersonaModel] = useState(false);

    return (
        <>
            <div className="relative overflow-hidden bg-white">
                <div className="relative z-10 max-w-6xl mb-[-100px] md:mb-[-140px] mx-auto pt-24 md:pt-32 mb-6">
                    <div className="hidden md:block absolute left-4 md:left-29 top-16 md:top-77">
                        <img
                            src="/footer/Landing-marquee-img-5.png"
                            alt="Image"
                            className="w-24 h-32 md:w-40 md:h-50 object-contain"
                            draggable="false"
                        />
                    </div>

                    <div className="hidden md:block absolute right-4 md:right-21 top-12 md:top-30">
                        <img
                            src="/footer/Landing-marquee-img-6.png"
                            alt="Image"
                            className="w-24 h-24 md:w-57 md:h-70 object-contain"
                            draggable="false"
                        />
                    </div>

                    <div className="flex justify-center">
                        <img
                            src="/footer/Landing-marquee-img-7.png"
                            alt="Image"
                            className="w-56 h-80 md:w-110 md:h-[580px] object-contain"
                            draggable="false"
                        />
                    </div>
                </div>
                <section className="relative w-full overflow-hidden px-5 md:px-0 pt-34 md:pt-40">
                    <div
                        className="absolute inset-0 bg-no-repeat bg-top bg-cover"
                        style={{ backgroundImage: "url('https://ik.imagekit.io/288weifiq/nextjs/footer-curve-design.png')" }}
                    />
                    <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                        <h2 className="text-3xl !text-black md:text-5xl font-normal leading-tight">
                            Every Traveler’s Story<br />Deserves a Masterpiece.
                        </h2>

                        <p className="max-w-xl text-black">Create the journey your unique persona truly deserves with TravelOne, a modern orchestration platform designed to harmonize global exploration with your individual soul.</p>

                        {!isAdsLanding && <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setOpenInitializePersonaModel(true)}
                                className="bg-black text-white px-6 py-3 text-sm uppercase border border-black tracking-wide font-semibold hover:bg-transparent hover:text-black transition cursor-pointer"
                            >
                                Decode Your DNA
                            </button>

                            <button
                                onClick={() => setOpenPlanYourTripModel(true)}
                                className="border border-black text-black px-6 py-3 text-sm uppercase tracking-wide font-semibold hover:bg-black hover:text-white transition cursor-pointer"
                            >
                                Start a Journey
                            </button>
                        </div>}
                    </div>
                </section>
            </div>

            {/* Popup Modal */}
            <StartJourneyModal open={openPlanYourTripModel} onOpenChange={setOpenPlanYourTripModel} />
            <InitializePersonaModal open={openInitializePersonaModel} onOpenChange={setOpenInitializePersonaModel} />
        </>
    );
}
