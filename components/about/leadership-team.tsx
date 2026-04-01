"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Leadership Team
const leadership = [
    {
        name: "Louise Berg",
        role: "Head of Global Destination Insights - USA",
        image: "/about/img_team_63e33bbf427638-77996729-78363986.webp"
    },
    {
        name: "Princess B",
        role: "Destination Expert - USA",
        image: "/about/img_team_63e33bbf427638-77996729-5421454.png"
    },
    {
        name: "Himani Bhatt",
        role: "Senior Intelligence Specialist - India",
        image: "/about/img_team_674b22f265e656-43103817-78894512.webp"
    },
];

export default function LeadershipTeam() {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-5 md:px-0 space-y-15">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex justify-center items-center">
                        <div className="relative h-150 rounded-xl overflow-hidden">
                            <Image
                                src="/about/pranav-amin.jpg"
                                alt="Pranav Amin"
                                width={500}
                                height={900}
                                quality={100}
                                draggable={false}
                                className="rounded-3xl relative z-10 object-cover border border-[#d9cec1]"
                            />
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="space-y-4 text-center lg:text-left">
                        <h2 className="text-3xl md:text-6xl leading-tight font-normal">
                            The Gold Standard of Execution
                        </h2>

                        <h3 className="text-lg font-medium text-black">
                            Hi, I’m Pranav Amin. CEO — TravelOne Global Travel Services LLC (USA)
                        </h3>

                        <p className="text-base md:text-lg text-black leading-relaxed max-w-xl">
                            With decades of deep-rooted experience in the global travel industry, I’ve seen firsthand how the gap between "booking" and "experiencing" has widened. While technology provides the map, it takes human expertise and operational excellence to navigate the journey.
                        </p>

                        <p className="text-base md:text-lg text-black leading-relaxed max-w-xl">
                            As head of our U.S. headquarters, I lead the delivery of Persona-Led Journeys. My focus is ensuring that every itinerary we orchestrate is backed by a robust, secure, and world-class service infrastructure. By leveraging the advanced intelligence built by our partners at TravelOne Technologies Inc. (Canada), we turn data into high-touch travel reality for our clients worldwide.
                        </p>

                        <p className="text-base md:text-lg text-black leading-relaxed max-w-xl">
                            We don’t just process trips; we manage the integrity of your travel experience.
                        </p>

                        <p className="text-base md:text-lg text-black leading-relaxed max-w-xl">
                            Experience the Orchestration. Welcome to TravelOne Global.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {leadership.map((member, index) => (
                        <div key={index} className="text-center space-y-6">
                            <div className="relative flex justify-center">
                                <div className="absolute -inset-2 rounded-lg bg-[#FFF9EE] border border-amber-200 opacity-90 blur-[1px]" />
                                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                            <div className="space-y-0">
                                <p className="font-semibold text-md md:text-lg text-black">{member.name}</p>
                                <p className="text-sm md:text-base text-black">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* IMAGE */}
                    <div className="flex justify-center items-center">
                        <div className="relative h-full rounded-xl overflow-hidden">
                            <Image
                                src="/common/bhavin-vora.jpg"
                                alt="Bhavin Vora"
                                width={500}
                                height={700}
                                draggable={false}
                                className="rounded-3xl relative z-10 object-cover border border-[#d9cec1]"
                            />
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="space-y-4 text-center lg:text-left">
                        <h2 className="text-3xl md:text-6xl leading-tight font-normal">
                            A Vision for the $9T Industry
                        </h2>

                        <h3 className="text-lg font-medium text-black">
                            Hi, I’m Bhavin Vora. Founder & CEO - TravelOne Technologies Inc. (Canada)
                        </h3>

                        <p className="text-base md:text-lg text-black leading-relaxed max-w-xl">
                            After two decades architecting digital transformations for global institutional leaders, I realized that travel technology had lost its soul. The industry became obsessed with "search results" but forgot the traveler.
                        </p>

                        <p className="text-base md:text-lg text-black leading-relaxed max-w-xl">
                            I created the Traveler DNA framework to bridge that gap. At our Toronto B2B Innovation Hub, we use architectural precision to build the tech that orchestrates the world. Our mission is to provide the intelligence that makes travel feel like home for the U.S. and international markets served by our partners at TravelOne Global Travel Services LLC (USA).
                        </p>

                        <p className="text-base md:text-lg text-black leading-relaxed max-w-xl">
                            Welcome to the future of travel. Welcome to TravelOne.
                        </p>

                        <Link target='_blank' href="/operational-disclosure" className="flex items-center gap-2 text-black underline-offset-4 underline">
                            Operational Disclosure <ExternalLink className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
