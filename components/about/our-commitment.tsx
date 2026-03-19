"use client";

import Image from "next/image";

export default function OurCommitment() {
    return (
        <section className="bg-[#FFF9EE] py-12">
            <div className="max-w-7xl mx-auto px-5 md:px-0">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
                        {/* IMAGE */}
                        <div className="md:w-1/3 flex items-center justify-center">
                            <div className="relative w-24 sm:w-28 md:w-full aspect-square">
                                <Image
                                    src="https://ik.imagekit.io/288weifiq/nextjs/8781245.jpg?updatedAt=1770732335541"
                                    alt="Our Commitment"
                                    fill
                                    className="object-cover rounded-full"
                                />
                            </div>
                        </div>

                        {/* TEXT */}
                        <div className="md:w-2/3 space-y-4">
                            <h2 className="text-3xl md:text-6xl leading-tight font-normal">
                                Our Commitment to You
                            </h2>

                            <p className="text-black text-base sm:text-lg leading-relaxed">
                                Whether you are a consumer discovering your next destination on travelone.io or a travel professional leveraging our architecture at agent.travelone.io, our mission remains the same: To make travel as intelligent as the people who take it.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
