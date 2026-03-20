"use client";

import Image from "next/image";

export default function FounderSection() {
    return (
        <section className="w-full py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-6xl leading-tight font-normal">
                        Meet the Founder
                    </h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://ik.imagekit.io/288weifiq/nextjs/bhavin-vora.jpeg"
                                alt="Bhavin Vora"
                                width={600}
                                height={700}
                                className="object-cover w-full"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-white shadow-xl rounded-xl px-6 py-4">
                            <p className="font-semibold text-lg">Bhavin Vora</p>
                            <p className="text-sm text-black">
                                Founder & CEO - TravelOne Technologies Inc. (Canada)
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl p-6 shadow-md border space-y-3">
                            <h3 className="text-xl font-medium">
                                The Architect of Traveller DNA
                            </h3>
                            <p className="text-gray-600 text-base leading-relaxed">
                                Bhavin Vora is the Founder and CEO of TravelOne Technologies, a Toronto-based venture at the forefront of the $165.9B AI travel revolution. An Indian-born entrepreneur with a global vision, Bhavin’s career has been defined by a single disruptive question: why, in an era of hyper-intelligence, is travel planning still so generic?
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md border space-y-3">
                            <h3 className="text-xl font-medium">
                                The Innovation
                            </h3>
                            <p className="text-gray-600 text-base leading-relaxed">
                                Recognizing that 70% of AI travel projects fail due to poor data quality, Bhavin developed the proprietary 30-Marker Traveller DNA Framework. This methodology moves the industry beyond reactive search to predictive intelligence where systems understand who the traveler truly is.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md border space-y-3">
                            <h3 className="text-xl font-medium">
                                The Mission
                            </h3>
                            <p className="text-gray-600 text-base leading-relaxed">
                                Based in Canada with a strategic footprint in India and the United States, Bhavin is scaling TravelOne to become the behavioral data infrastructure for the next generation of OTAs, airlines, and luxury hospitality groups—ensuring no two journeys are ever the same.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}