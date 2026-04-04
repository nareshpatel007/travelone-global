import Image from "next/image";

export default function WhyTravelBroken() {
    return (
        <section id="whyTravelBroken" className="relative py-16 border-b border-[#d37300]/30">
            <div className="max-w-[1200px] mx-auto px-5 lg:px-0 space-y-16">
                <div>
                    {/* Badge */}
                    <div className="mb-10">
                        <div className="inline-block border border-[#d97706]/40 bg-[#d977061a] text-xs tracking-[0.2em] px-4 py-1.5 rounded-full text-[#78350f] font-semibold font-dna-landing">
                            WHY TRAVEL IS BROKEN
                        </div>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-6xl leading-[1.05] tracking-[-0.02em] font-extrabold text-[#78350f] max-w-4xl mb-16 font-dna-landing">
                        THE TRAVEL INDUSTRY HAS REACHED A BREAKING POINT.
                    </h2>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-10 items-start">
                    {/* LEFT IMAGE */}
                    <div className="overflow-hidden rounded">
                        <Image
                            src="/traveler-dna/home-1-d.category-2.jpg"
                            alt="Travel Landscape"
                            width={600}
                            height={600}
                            quality={100}
                            draggable={false}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="space-y-8">
                        {/* Highlight Quote Box */}
                        <div className="bg-[#fcf5ed] border-l-[4px] border-[#d97706] p-6 mb-8 rounded-sm font-dna-landing">
                            <p className="text-xl italic text-[#78350f] font-semibold leading-relaxed">
                                “For decades, 'innovation' in travel meant one thing: making the search bar faster.”
                            </p>
                        </div>

                        {/* Secondary Quote */}
                        <div className="border-l-[4px] border-[#d9770666] pl-5 mb-6 font-dna-landing">
                            <p className="text-lg italic text-[#78350f] leading-relaxed">
                                "More speed without more intelligence just leads to faster exhaustion."
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-md text-[#78350f] leading-[1.5] mb-8 font-dna-landing">
                            We've been forced to act like our own travel agents — scrolling through endless "Top 10" lists and generic social media feeds that have nothing to do with who we actually are.
                        </p>

                        {/* Divider */}
                        <div className="border-t border-[#d37300]/30 mb-6" />

                        {/* Bottom Statement */}
                        <p className="text-sm tracking-[0.2em] font-semibold text-[#78350f] font-dna-landing">
                            WE’VE BEEN FORCED TO ACT AS OUR OWN TRAVEL AGENTS.
                        </p>
                    </div>
                </div>

                <div className="bg-[#78350f] rounded px-6 md:px-10 text-white font-dna-landing">
                    {/* Header */}
                    <div className="py-6 space-y-4 md:space-y-4 text-center md:text-left">
                        <h2 className="text-[24px] sm:text-[28px] md:text-[34px] lg:text-[42px] font-bold text-[#ffc765] tracking-[0.02em] leading-[1.2]">
                            MODERN TRAVEL IS PLANNED BY STRANGERS
                        </h2>
                        <p className="text-[14px] md:text-lg font-semibold text-white">
                            The "Influence Gap" is costing travelers billions in misaligned experiences.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[#A16207]/40 mb-8 md:mb-10"></div>

                    {/* Grid */}
                    <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#A16207]/40">
                        {/* Column 1 */}
                        <div className="md:pr-8 py-6 md:py-0 text-center md:text-left">
                            <h3 className="text-[32px] md:text-[44px] font-extrabold text-[#ffc765] mb-3 md:mb-4">
                                $4,000+
                            </h3>
                            <p className="text-[10px] md:text-[11px] tracking-[0.2em] text-[#FDE68A] font-semibold mb-2 md:mb-3">
                                THE COPY-PASTE TRAP
                            </p>
                            <p className="text-[13px] md:text-sm text-white leading-relaxed">
                                The average traveler spends $4,000+ per trip — only to recreate a generic "Top 10"
                                list or Instagram Reel that doesn't fit their individual persona.
                            </p>
                        </div>

                        {/* Column 2 */}
                        <div className="md:px-8 py-6 md:py-0 text-center md:text-left">
                            <h3 className="text-[32px] md:text-[44px] font-extrabold text-[#ffc765] mb-3 md:mb-4">
                                38+
                            </h3>
                            <p className="text-[10px] md:text-[11px] tracking-[0.2em] text-[#FDE68A] font-semibold mb-2 md:mb-3">
                                THE PLANNING TAX
                            </p>
                            <p className="text-[13px] md:text-sm text-white leading-relaxed">
                                Travelers visit 38+ websites over a 45-day period just to filter out noise.
                                This isn't "discovery", it's a second job.
                            </p>
                        </div>

                        {/* Column 3 */}
                        <div className="md:pl-8 py-6 md:py-0 text-center md:text-left">
                            <h3 className="text-[32px] md:text-[44px] font-extrabold text-[#ffc765] mb-3 md:mb-4">
                                Hit/Miss
                            </h3>
                            <p className="text-[10px] md:text-[11px] tracking-[0.2em] text-[#FDE68A] font-semibold mb-2 md:mb-3">
                                FOUNDATION OF SAND
                            </p>
                            <p className="text-[13px] md:text-sm text-white leading-relaxed">
                                Decisions are currently built on External Envy and Generic Data, leading to a
                                "Hit or Miss" outcome where the traveler's identity is lost.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Divider */}
                    <div className="border-t border-[#A16207]/40 mt-6 py-6 text-center md:text-left">
                        <p className="text-[12px] md:text-sm text-white italic">
                            Source: Expedia Group Media Solutions, “The Path to Purchase” Behavioral Study.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}