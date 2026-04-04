import Image from "next/image";

export default function IntelligenceLayer() {
    return (
        <section id="intelligenceLayer" className="bg-[#fff9ee] relative py-16">
            <div className="max-w-[1200px] mx-auto px-5 lg:px-0 text-center space-y-12">
                <div>
                    {/* Badge */}
                    <div className="mb-8">
                        <span className="inline-block border border-[#d97706]/40 bg-[#d977061a] text-xs tracking-[0.2em] px-4 py-1.5 rounded-full text-[#78350f] font-semibold font-dna-landing">
                            HOW IT WORKS
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-6xl leading-[1.1] tracking-[-0.02em] font-extrabold text-[#78350f] mb-6 font-dna-landing">
                        THE INTELLIGENCE LAYER.
                    </h2>

                    {/* Description */}
                    <p className="text-md text-[#78350f] leading-[1.8] max-w-2xl mx-auto leading-[1.8] font-dna-landing">
                        Four layers of intelligence that transform travel from a transaction into a transformation.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left font-dna-landing">
                    {/* Card 1 */}
                    <div className="border border-[#E2D6C8] rounded-md p-8 bg-[#d977060d]">
                        <div className="text-[36px] font-bold text-[#d9770640] mb-4">01</div>
                        <h3 className="text-[16px] font-semibold text-[#78350f] mb-3">
                            Data Ingestion
                        </h3>
                        <p className="text-sm text-[#78350f] font-normal leading-relaxed">
                            We learn from your travel history, preferences, and behavioral signals.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="border border-[#E2D6C8] rounded-md p-8 bg-[#d977060d]">
                        <div className="text-[36px] font-bold text-[#d9770640] mb-4">02</div>
                        <h3 className="text-[16px] font-semibold text-[#78350f] mb-3">
                            DNA Mapping
                        </h3>
                        <p className="text-sm text-[#78350f] font-normal leading-relaxed">
                            We build a rich, multidimensional profile of your unique traveler identity.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="border border-[#E2D6C8] rounded-md p-8 bg-[#d977060d]">
                        <div className="text-[36px] font-bold text-[#d9770640] mb-4">03</div>
                        <h3 className="text-[16px] font-semibold text-[#78350f] mb-3">
                            Predictive Matching
                        </h3>
                        <p className="text-sm text-[#78350f] font-normal leading-relaxed">
                            Our AI surfaces experiences before you even know you want them.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="border border-[#E2D6C8] rounded-md p-8 bg-[#d977060d]">
                        <div className="text-[36px] font-bold text-[#d9770640] mb-4">04</div>
                        <h3 className="text-[16px] font-semibold text-[#78350f] mb-3">
                            Guaranteed Journey
                        </h3>
                        <p className="text-sm text-[#78350f] font-normal leading-relaxed">
                            Every recommendation is a curated match — not a guess.
                        </p>
                    </div>
                </div>

                <div className="relative rounded overflow-hidden">
                    {/* Background Image */}
                    <Image
                        src="/traveler-dna/home3-img-1.jpg"
                        alt="Travel Banner"
                        width={1920}
                        height={1080}
                        className="w-full h-[260px] md:h-[400px] object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30" />

                    {/* Center Content */}
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 font-dna-landing space-y-6"
                        style={{
                            background: `rgba(120, 53, 15, 0.25)`
                        }}
                    >
                        {/* Main Text */}
                        <h2 className="text-white text-2xl md:text-5xl font-semibold tracking-[0.12em]">
                            FLIGHTS • HOTELS • ACTIVITIES • GUIDES
                        </h2>

                        {/* Sub Text */}
                        <p className="text-white text-sm md:text-md tracking-[0.18em]">
                            ALL POWERED BY YOUR TRAVELER DNA™
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
}