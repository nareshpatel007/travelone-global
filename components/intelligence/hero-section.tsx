import Image from "next/image";
import { useState } from "react";
import { InitializePersonaModal } from "../plan_your_trip/initialize-persona";

export default function HeroSection() {
    // Define state
    const [openInitializePersonaModel, setOpenInitializePersonaModel] = useState(false);

    return (
        <>
            <div className="relative bg-[#FFF9EE] h-[300px] md:h-[380px] overflow-hidden">
                <div className="absolute inset-0 flex max-w-5xl mx-auto px-10 md:px-0 items-center justify-center">
                    <div className="text-center text-black space-y-4">
                        <h1 className="text-3xl md:text-6xl leading-tight font-normal">
                            Beyond Search. Into Sync.
                        </h1>
                        <span className="text-md flex max-w-2xl mx-auto">
                            The industry is built on "search results." TravelOne is built on Synchronization. We don't ask where you want to go; our intelligence understands who you are, and the world aligns to meet you.
                        </span>
                        <div>
                            <button
                                onClick={() => setOpenInitializePersonaModel(true)}
                                className="bg-black text-white px-4 py-2 text-base border border-black tracking-wide font-medium hover:bg-transparent hover:text-black transition cursor-pointer"
                            >
                                Decode Your Travel DNA
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <InitializePersonaModal
                open={openInitializePersonaModel}
                onOpenChange={setOpenInitializePersonaModel}
            />
        </>
    );
}
