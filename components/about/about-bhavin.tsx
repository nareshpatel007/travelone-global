"use client";

import { FacebookIcon, Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutBhavin() {
    return (
        <div className="max-w-7xl mx-auto px-5 md:px-0 py-0 md:py-16 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="flex justify-center">
                    <div className="relative w-full max-w-[520px] aspect-[4/3]">
                        <Image
                            src="https://ik.imagekit.io/288weifiq/nextjs/bhavin_solo.jpg"
                            alt="About TravelOne"
                            fill
                            priority
                            className="object-cover rounded-md shadow-xl"
                        />
                    </div>
                </div>
                <div className="text-center lg:text-left max-w-xl mx-auto space-y-6">
                    <h2 className="text-black text-3xl md:text-6xl leading-tight font-normal">
                        The Leadership
                    </h2>

                    <p className="text-black text-base sm:text-lg leading-relaxed">
                        Bhavin Vora | Founder & CEO
                    </p>

                    <p className="text-black text-base sm:text-lg leading-relaxed">
                        With nearly two decades of experience leading digital transformation for global retail icons like the Flamingo Transworld, Riya Travel, Bhavin Vora brings "Big Data" precision to the world of travel. An expert in AI Orchestration and consumer behavior, Bhavin founded TravelOne to solve the "Complexity Crisis" in the travel industry and bring high-scale personalization to North America.
                    </p>

                    {/* Social Icons */}
                    <div className="flex justify-center lg:justify-start gap-4 pt-4">
                        <Link href="https://www.linkedin.com/in/bhavinofficial/" rel="nofollow" target="_blank">
                            <span className="w-10 h-10 rounded-full bg-amber-50 text-black border hover:bg-black hover:text-white flex items-center justify-center cursor-pointer">
                                <Linkedin className="h-5 w-5" />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
