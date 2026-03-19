import Image from "next/image";
import { useState } from "react";
import { StartJourneyModal } from "../plan_your_trip/journey-popup";

export default function FullBannerSection() {
    // Define state
    const [openPlanYourTripModel, setOpenPlanYourTripModel] = useState(false);

    return (
        <>
            <div className="relative w-full h-100 md:h-150 overflow-hidden">
                <Image
                    src="https://ik.imagekit.io/288weifiq/nextjs/vietnam/sailboat-sea-evening-sunlight-beautiful-big-mountains-luxury-summer-adventure-active-vacation-mediterranean-sea-turkey_158595-6875.jpg"
                    alt="TravelOne"
                    fill
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-100"
                />
                <div className="relative h-full flex items-center justify-center px-5 md:px-0">
                    <div className="text-center text-white space-y-5">
                        <h2 className="text-3xl md:text-6xl leading-tight font-normal">
                            Travel is a Result of Your Persona.
                        </h2>
                        <p className="text-base md:text-lg">
                            Join the world’s most discerning travelers in a world that is perfectly synchronized to you.
                        </p>
                        <button
                            onClick={() => setOpenPlanYourTripModel(true)}
                            className="px-5 py-2 bg-black text-md text-white cursor-pointer hover:bg-white hover:text-black transition"
                        >
                            Launch Your Journey
                        </button>
                    </div>
                </div>
            </div>

            {/* Plan Your Trip Modal */}
            <StartJourneyModal open={openPlanYourTripModel} onOpenChange={setOpenPlanYourTripModel} />
        </>
    );
}
