"use client";

import Image from "next/image";

export default function AboutTravelone() {
    return (
        <div className="max-w-7xl mx-auto px-5 md:px-0 py-16 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="flex justify-center items-center">
                    <div className="relative h-[280px] md:h-[380px] aspect-square rounded-xl overflow-hidden">
                        <Image
                            src="https://ik.imagekit.io/288weifiq/nextjs/bhavin-vora.jpeg"
                            alt="About TravelOne"
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 280px, 380px"
                        />
                    </div>
                </div>
                <div className="text-center lg:text-left max-w-xl mx-auto space-y-4">
                    <h2 className="text-black text-3xl md:text-6xl leading-tight font-normal">
                        A Vision for the $9T Industry
                    </h2>

                    <p className="text-black text-base sm:text-lg leading-relaxed">
                        Hi, I’m Bhavin Vora. Founder & CEO - TravelOne Technologies Inc. (Canada)
                    </p>

                    <p className="text-black text-base sm:text-lg leading-relaxed">
                        After two decades architecting digital transformations for global institutional leaders, I realized that travel technology had lost its soul. The industry became obsessed with "search results" but forgot the traveler.
                    </p>

                    <p className="text-black text-base sm:text-lg leading-relaxed">
                        I created the Traveler DNA framework to bridge that gap. At our Toronto B2B Innovation Hub, we use architectural precision to build the tech that orchestrates the world. Our mission is to provide the intelligence that makes travel feel like home for the U.S. and international markets served by our partners at TravelOne Global Travel Services LLC (USA).
                    </p>

                    <p className="text-black text-base sm:text-lg leading-relaxed">
                        Welcome to the future of travel. Welcome to TravelOne.
                    </p>

                    {/* <div className="flex justify-center lg:justify-start">
                        <Link href="https://www.linkedin.com/in/bhavinofficial/" rel="nofollow" target="_blank">
                            <span className="w-10 h-10 rounded-full text-black border hover:bg-black hover:text-white flex items-center justify-center cursor-pointer">
                                <Linkedin className="h-5 w-5" />
                            </span>
                        </Link>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
