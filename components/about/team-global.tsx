"use client";

import Image from "next/image";

export default function TeamSection() {
    return (
        <>
            <section className="bg-white py-12 space-y-12">
                <div className="max-w-7xl mx-auto px-5 sm:px-0 space-y-12">
                    <div className="max-w-5xl mx-auto text-center space-y-4">
                        <div className="space-y-1">
                            <h2 className="text-3xl md:text-6xl leading-tight font-normal">
                                The Team<br />Global Intel, Human-in-the-loop
                            </h2>
                        </div>

                        <p className="text-black text-base sm:text-lg leading-relaxed">
                            Technology provides the speed, but people provide the judgment.
                        </p>

                        <p className="text-black text-base sm:text-lg leading-relaxed">
                            Leadership & R&D (North America) Our core team consists of Data Scientists, Systems Architects, and Travel Operations veterans based across Toronto, the USA, and India. This group focuses on the integrity of our Persona-Led Intelligence and the security of our Merchant of Record framework—ensuring every transaction is seamless, secure, and legally sound.
                        </p>
                    </div>
                    <div className="bg-[#FFF9EE] grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="p-8 md:p-10 space-y-5 text-center md:text-left">
                            <h3 className="text-black text-xl md:text-2xl font-medium">
                                Leadership & R&D (North America)
                            </h3>

                            <p className="text-black text-base sm:text-lg leading-relaxed">
                                Our core team consists of Data Scientists, AI Architects, and Travel Operations veterans based in Toronto, the USA and India. This group focuses on the integrity of the Agentic AI and the security of our Merchant of Record framework, ensuring that every transaction is seamless and legally sound.
                            </p>
                        </div>
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                                src="https://ik.imagekit.io/288weifiq/nextjs/canada-day-celebration-with-maple-leaf-symbol_23-2151440520.jpg"
                                alt="Leadership and R&D team"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-white py-12 space-y-12">
                <div className="max-w-7xl mx-auto px-5 sm:px-0 space-y-12">
                    <div className="max-w-5xl mx-auto text-center space-y-4">
                        <div className="space-y-1">
                            <h2 className="text-3xl md:text-6xl leading-tight font-normal">
                                On-Ground Intelligence<br />(Global Strategic Zones)
                            </h2>
                        </div>

                        <p className="text-black text-base sm:text-lg leading-relaxed">
                            We have built a dedicated support network across the globe. These aren't just partners; they are local intelligence units who feed real-world, real-time data back into our AI to ensure our "Local Soul" remains accurate.
                        </p>
                    </div>

                    {/* REGION GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "The Asian Frontier",
                                text: "Specialist teams in Japan, South Korea, Vietnam, Indonesia, Thailand, and India.",
                                image: "https://ik.imagekit.io/288weifiq/nextjs/china-arch_1127-3673.jpg",
                            },
                            {
                                title: "The European Heartland",
                                text: "Local experts across Italy, Spain, Portugal, Greece, France, and Switzerland.",
                                image: "https://ik.imagekit.io/288weifiq/nextjs/munich-marienplatz_181624-9114.jpg",
                            },
                            {
                                title: "The Nordic & Arctic Circles",
                                text: "Navigational experts in Norway, Iceland, Denmark, Sweden, and Finland.",
                                image: "https://ik.imagekit.io/288weifiq/nextjs/norway/view-red-cottages-by-coastline-hamnoy-lofoten-islands-norway_181624-33160.jpg?updatedAt=1768983789930",
                            },
                            {
                                title: "The African Wild",
                                text: "Safari and conservation specialists in Kenya.",
                                image: "https://ik.imagekit.io/288weifiq/nextjs/24254.jpg",
                            },
                            {
                                title: "The North American Home",
                                text: "Comprehensive logistical support across Canada and the USA.",
                                image: "https://ik.imagekit.io/288weifiq/nextjs/canada/niagara-falls-panorama_649448-3341.jpg?updatedAt=1768983789942",
                            },
                        ].map((region, index) => (
                            <div
                                key={index}
                                className="group border border-gray-200 overflow-hidden"
                            >
                                <div className="relative h-44 overflow-hidden">
                                    <Image
                                        src={region.image}
                                        alt={region.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                <div className="p-6 space-y-2 text-center md:text-left">
                                    <h3 className="font-medium text-black">
                                        {region.title}
                                    </h3>
                                    <p className="text-black text-sm sm:text-base leading-relaxed">
                                        {region.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
