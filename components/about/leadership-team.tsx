"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";

// Leadership Team
const leadership = [
    // {
    //     name: "Vipul Shah",
    //     role: "Chief Technology Officer (CTO) - TravelOne Technologies Inc. (Canada)",
    //     image: "/about/img_team_63e33ba779f7f6-39405930-32732924.webp"
    // },
    {
        name: "Pranav Amin",
        role: "CEO - TravelOne Global Travel Services, LLC. (USA)",
        image: "/about/img_team_63e33bb2382cf1-81493713-48358927.webp"
    },
    // {
    //     name: "Michael Bronfman",
    //     role: "Regional Director of Growth - Canada",
    //     image: "/about/img_team_63e33bceb55f81-24897182-80425447.webp"
    // },
    // {
    //     name: "Naresh Patel",
    //     role: " Lead Systems Architect - India",
    //     image: "/about/img_team_674b22f265e656-43103817-78454512.webp"
    // },
    {
        name: "Louise Berg",
        // role: "Head of Destination Strategy & Social - Germany",
        role: "Head of Global Data & Destination Insights",
        image: "/about/img_team_63e33bbf427638-77996729-78363986.webp"
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
                    {/* IMAGE */}
                    <div className="flex justify-center items-center">
                        <div className="relative h-[280px] md:h-[380px] aspect-square rounded-xl overflow-hidden">
                            <Image
                                src="https://ik.imagekit.io/288weifiq/nextjs/bhavin-vora.jpeg"
                                alt="Bhavin Vora"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 280px, 380px"
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

                        {/* <p className="text-base md:text-lg text-black leading-relaxed max-w-xl">
                            I created TravelOne to bridge that gap. We use architectural precision to orchestrate the world, but we use your 30-Marker Persona to make it feel like home.
                        </p> */}

                        <p className="text-base md:text-lg text-black leading-relaxed max-w-xl">
                            Welcome to the future of travel. Welcome to TravelOne.
                        </p>

                        <div className="flex justify-center lg:justify-start">
                            <Link
                                href="https://www.linkedin.com/in/bhavinofficial/"
                                rel="nofollow"
                                target="_blank"
                                className="inline-flex items-center gap-2 border border-black rounded-full p-3 hover:bg-black hover:text-white transition"
                            >
                                <Linkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
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
            </div>
        </section>
    );
}
