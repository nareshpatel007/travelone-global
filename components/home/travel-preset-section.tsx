"use client";

import { ArrowRight, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TravelPresetSection() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 px-4 sm:px-6 lg:px-8 py-8">
            <div className="relative flex items-center justify-center p-14 md:p-24">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://ik.imagekit.io/288weifiq/nextjs/indonesia/rock-ocean-landscape_1296-486.jpg')",
                    }}
                />

                {/* Collage Frame */}
                <div className="relative z-10 bg-white p-2 sm:p-3 shadow-xl w-full max-w-[200px] md:max-w-[420px]">
                    <div className="grid grid-cols-2 gap-3">
                        {/* Image 1 */}
                        <div className="relative aspect-square overflow-hidden">
                            <Image
                                src="https://ik.imagekit.io/288weifiq/nextjs/japan/bamboo-forest-asian-woman-wearing-japanese-traditional-kimono-bamboo-forest-kyoto-japan_335224-216.avif"
                                alt="Travel"
                                fill
                                className="object-cover hover:scale-105 transition"
                            />
                        </div>

                        {/* Image 2 */}
                        <div className="relative aspect-square overflow-hidden">
                            <Image
                                src="https://ik.imagekit.io/288weifiq/nextjs/indonesia/young-woman-standing-temple-gates-lempuyang-luhur-temple-bali-indonesia-vintage-tone_335224-365.avif"
                                alt="Travel"
                                fill
                                className="object-cover hover:scale-105 transition"
                            />
                        </div>

                        {/* Image 3 */}
                        <div className="relative aspect-square overflow-hidden">
                            <Image
                                src="https://ik.imagekit.io/288weifiq/nextjs/canada/niagara-falls-panorama_649448-3341.jpg?updatedAt=1768983789942"
                                alt="Travel"
                                fill
                                className="object-cover hover:scale-105 transition"
                            />
                        </div>

                        {/* Image 4 */}
                        <div className="relative aspect-square overflow-hidden">
                            <Image
                                src="https://ik.imagekit.io/288weifiq/nextjs/south-korea/gyeongbokgung-palace-with-cherry-blossom-spring-seoul-korea_335224-389.jpg"
                                alt="Travel"
                                fill
                                className="object-cover hover:scale-105 transition"
                            />
                        </div>

                        {/* Image 5 */}
                        <div className="relative aspect-square overflow-hidden">
                            <Image
                                src="https://ik.imagekit.io/288weifiq/nextjs/south-korea/gyeongbokgung-palace-night-seoul-korea_335224-351.jpg"
                                alt="Travel"
                                fill
                                className="object-cover hover:scale-105 transition"
                            />
                        </div>

                        {/* Image 6 */}
                        <div className="relative aspect-square overflow-hidden">
                            <Image
                                src="https://ik.imagekit.io/288weifiq/nextjs/south-korea/asian-woman-wearing-japanese-traditional-kimono-row-yellow-ginkgo-tree-autumn-autumn-park-tokyo-japan_335224-176.jpg"
                                alt="Travel"
                                fill
                                className="object-cover hover:scale-105 transition"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center px-6 sm:px-10 lg:px-20 py-16">
                <div className="space-y-6">
                    <div className="space-y-6">
                        <h1 className="text-black text-3xl lg:text-6xl leading-tight font-normal">
                            Your Soul, Our Compass.
                        </h1>

                        <span className="text-gray-600 text-base sm:text-lg">
                            Replacing static itineraries with aAgentic, breathing orchestration.
                        </span>
                    </div>

                    <p className="text-gray-600 text-base sm:text-lg">
                        Traditional travel is a series of transactions. TravelOne is a transformation. We have replaced the static itinerary with a living, breathing orchestration. By mapping your Traveler Persona—your values, your pace, and your non-negotiables—we ensure that every moment of your journey feels like it was designed exclusively for you.
                    </p>

                    <p className="text-gray-600 text-base sm:text-lg">
                        One transaction. Total accountability. Powered by Agentic AI. Driven by Human Insight.
                    </p>

                    <Link href="/about">
                        <button className="flex items-center bg-black text-white px-6 py-3 border border-black uppercase text-sm tracking-wide hover:bg-transparent hover:text-black font-semibold cursor-pointer transition">
                            About Us <MoveRight className="ml-2 w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
}
