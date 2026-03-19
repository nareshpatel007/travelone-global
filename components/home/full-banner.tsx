import Image from "next/image";
import { useState } from "react";
import { CustomizeTrip } from "../tour_details/popup/customize-trip";

interface Props {
    onOpenChange: (open: boolean) => void;
    setOpenInitializePersonaModel: (open: boolean) => void;
}

export default function FullBannerSection({ onOpenChange, setOpenInitializePersonaModel }: Props) {
    // Define state
    const [openCustomizeTripPopup, setOpenCustomizeTripPopup] = useState(false);

    return (
        <>
            <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://ik.imagekit.io/288weifiq/nextjs/attractive-girl-sunglasses-hat-lies-warm-sand_231208-4782.jpg"
                        alt="Travel Banner"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center"
                    />
                </div>
                <div className="relative z-10 flex items-center justify-center h-full px-8 text-center">
                    <div className="max-w-2xl space-y-6">
                        <h2 className="text-white text-3xl sm:text-4xl lg:text-6xl leading-tight font-normal">
                            Journeys Tailored to Your Persona.
                        </h2>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
                            <button
                                onClick={() => setOpenCustomizeTripPopup(true)}
                                className="w-full sm:w-auto border border-black text-black bg-white px-6 py-3 text-sm uppercase tracking-wide font-semibold hover:bg-black hover:text-white transition cursor-pointer"
                            >
                                Request a Quote
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popup Modal */}
            <CustomizeTrip
                open={openCustomizeTripPopup}
                onOpenChange={setOpenCustomizeTripPopup}
                mainTitle="Request a Quote"
                subTitle="We can help you find the right trip for your needs."
                pageName="Homepage"
            />
        </>
    );
}