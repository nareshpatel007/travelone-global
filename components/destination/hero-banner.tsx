"use client";

import Image from "next/image";
import { StartJourneyModal } from "../plan_your_trip/journey-popup";
import { useState } from "react";

// Define props
interface Props {
    pageData: any;
}

export default function HeroBannerSection({ pageData }: Props) {
    // Define state
    const [openPlanYourTripModel, setOpenPlanYourTripModel] = useState(false);

    return (
        <>
            <section className="relative w-full h-[35vh] md:h-[80vh] overflow-hidden">
                <Image
                    src={pageData?.single?.banner_image || "/placeholder.jpg"}
                    alt={pageData?.single?.name || "Image"}
                    fill
                    priority
                    draggable="false"
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/10" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 space-y-5">
                    <div className="space-y-2 text-center">
                        <h1 className="text-white text-3xl md:text-6xl leading-tight font-normal">
                            {pageData?.single?.extra_data?.hero_main_title}
                        </h1>
                    </div>

                    <button
                        onClick={() => setOpenPlanYourTripModel(true)}
                        className="bg-black text-white hover:bg-white hover:text-black border border-black font-semibold px-7 py-3 rounded-sm cursor-pointer transition"
                    >
                        Plan Your {pageData?.single?.name} Trip
                    </button>
                </div>
            </section>

            {/* Plan Your Trip Modal */}
            <StartJourneyModal
                open={openPlanYourTripModel}
                onOpenChange={setOpenPlanYourTripModel}
                selectedCountry={pageData?.single?.name}
            />
        </>
    );
}