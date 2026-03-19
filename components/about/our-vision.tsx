import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { StartJourneyModal } from "../plan_your_trip/journey-popup";

export default function OurVision() {
    // Define state
    const [openPlanYourTripModel, setOpenPlanYourTripModel] = useState(false);

    return (
        <>
            <div className="max-w-7xl mx-auto px-5 md:px-0 py-12">
                <div className="flex flex-col lg:flex-row gap-10 items-center">
                    <div className="text-center flex-1 space-y-6">
                        <div className="text-black">
                            <h2 className="text-3xl md:text-6xl leading-tight font-normal">
                                The Persona-First Era
                            </h2>
                        </div>

                        <p className="text-base text-black leading-relaxed">
                            The era of generic travel search is over. TravelOne is pioneering the Traveler Persona Asset.
                        </p>

                        <p className="text-base text-black leading-relaxed">
                            We don’t just book trips; we record and refine your travel DNA—your values, your pace, and your non-negotiables. By building this proprietary data asset, we ensure every subsequent trip is more accurate, more effortless, and more personal than the last.
                        </p>

                        <button
                            onClick={() => setOpenPlanYourTripModel(true)}
                            className="bg-black text-white w-full py-2 md:w-auto md:px-4 md:py-2.5 text-sm uppercase border border-black tracking-wide font-semibold hover:bg-transparent hover:text-black transition cursor-pointer mr-5"
                        >
                            Begin Your Persona Mapping
                        </button>

                        <Link href="/country">
                            <button
                                className="border border-black text-black w-full py-2 md:w-auto md:px-4 md:py-2.5 text-sm uppercase tracking-wide font-semibold hover:bg-black hover:text-white transition cursor-pointer"
                            >
                                Explore Signature Collections
                            </button>
                        </Link>
                    </div>
                    <div className="w-full max-w-[500px] mx-auto lg:mx-0">
                        <Image
                            src="https://ik.imagekit.io/288weifiq/nextjs/travel-explore-global-destination-trip-adventure-concept_53876-121559.avif"
                            alt="Travelers enjoying an experience"
                            width={500}
                            height={500}
                            className="w-full h-auto rounded-sm shadow-lg"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Plan Your Trip Modal */}
            <StartJourneyModal open={openPlanYourTripModel} onOpenChange={setOpenPlanYourTripModel} />
        </>
    );
}
