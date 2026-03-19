"use client";

import Image from "next/image";
import Link from "next/link";

export default function LocalExpertise() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4 px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center px-6 sm:px-10 p-12 bg-[#FFF9EE]">
                <div className="max-w-2xl space-y-6">
                    <div className="space-y-6 text-center md:text-left">
                        <h2 className="text-3xl md:text-6xl leading-tight font-normal">
                            The Technology: Persona-Led Intelligence
                        </h2>
                    </div>

                    <p className="text-black text-base sm:text-lg">
                        We use Agentic Logic to process these 30 markers. Our intelligence doesn't just filter a database; it orchestrates a journey.
                    </p>
                    
                    <p className="text-black text-base sm:text-lg">
                        <b>Ingestion:</b> You "Initialize your Persona" through our interactive interface.
                    </p>

                    <p className="text-black text-base sm:text-lg">
                        <b>Refinement:</b> Every interaction with our platform refines your Traveler Persona Asset, making the intelligence sharper and more intuitive with every journey.
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="relative w-full h-full overflow-hidden">
                    <Image
                        src="https://ik.imagekit.io/288weifiq/nextjs/close-up-autumn-journey-elements-assortment_23-2148634117.jpg"
                        alt="Canada USA Flag"
                        fill
                        priority
                        className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="relative w-full h-full overflow-hidden">
                    <Image
                        src="https://ik.imagekit.io/288weifiq/nextjs/girl-jumping-with-excitement-doorway-with-sea_181624-20834.jpg"
                        alt="Canada USA Flag"
                        fill
                        priority
                        className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                </div>
            </div>
        </section>
    );
}