"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import { CustomizeTrip } from "./popup/customize-trip";

// Define Props
interface Props {
    isAdsLanding?: boolean;
}

export default function TravelExpert({ isAdsLanding }: Props) {
    // Define state
    const [openCustomizeTrip, setOpenCustomizeTrip] = useState<boolean>(false);

    return (
        <>
            <div className="bg-[#FFF9EE] py-12 md:py-18 px-5 md:px-0">
                <div className="max-w-7xl mx-auto px-5 md:px-0">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
                            <div className="md:w-1/3 flex items-center justify-center">
                                <div className="relative w-34 md:w-60 aspect-square">
                                    <Image
                                        src="/common/bella_pic.png"
                                        alt="Louise Berg"
                                        fill
                                        className="object-cover rounded-full"
                                    />
                                </div>
                            </div>
                            <div className="md:w-2/3 space-y-4">
                                <p className="text-sm md:text-lg text-black font-medium text-center md:text-left">
                                    Louise Berg
                                </p>

                                <h3 className="text-black text-3xl md:text-5xl leading-tight font-normal text-center md:text-left">
                                    Not sure where to start? Speak to a Travel Expert
                                </h3>

                                <p className="text-black text-base md:text-lg leading-relaxed text-center md:text-left">
                                    Our dedicated Travel Expert will take the time to understand your personal preferences and curate a
                                    custom travel itinerary that's perfectly suited to you.
                                </p>

                                <div className="space-y-4">
                                    <div className="hidden md:flex items-center gap-4">
                                        <button
                                            onClick={() => setOpenCustomizeTrip(true)}
                                            className="px-6 md:px-8 py-3 bg-black text-white text-sm font-medium tracking-wide hover:bg-black/90 transition uppercase cursor-pointer"
                                        >
                                            {isAdsLanding ? 'Inquire Now' : 'Customize Your Trip'}
                                        </button>

                                        <Link href="/press" target="_blank">
                                            <button
                                                className="px-6 md:px-8 py-3 bg-black text-white text-sm font-medium tracking-wide hover:bg-black/90 transition uppercase cursor-pointer"
                                            >
                                                The Global Standard: See Our Press
                                            </button>
                                        </Link>
                                    </div>

                                    <span className="hidden md:block text-black font-normal text-base">
                                        OR CALL <Link href="tel:1-631-292-8833" className="hover:underline">+1 631 292 8833</Link>
                                    </span>

                                    <div className="block md:hidden space-y-3 text-center">
                                        <button
                                            onClick={() => setOpenCustomizeTrip(true)}
                                            className="px-6 md:px-8 py-3 bg-black text-white text-xs font-medium tracking-wide hover:bg-black/90 transition uppercase cursor-pointer"
                                        >
                                            {isAdsLanding ? 'Inquire Now' : 'Customize Your Trip'}
                                        </button>
                                        <Link href="/press" target="_blank">
                                            <button
                                                className="px-6 md:px-8 py-3 bg-black text-white text-xs font-medium tracking-wide hover:bg-black/90 transition uppercase cursor-pointer"
                                            >
                                                The Global Standard: See Our Press
                                            </button>
                                        </Link>
                                        <span className="text-black font-normal text-base block mt-3">
                                            OR CALL <Link href="tel:1-631-292-8833" className="hover:underline">+1 631 292 8833</Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            <CustomizeTrip
                open={openCustomizeTrip}
                onOpenChange={setOpenCustomizeTrip}
                mainTitle="Register Your Interest"
            />
        </>
    )
}