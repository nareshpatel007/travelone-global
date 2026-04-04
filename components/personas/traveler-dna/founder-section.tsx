import Image from "next/image";
import Link from "next/link";

export default function FounderSection() {
    return (
        <section id="founder" className="bg-white py-20">
            <div className="max-w-[1200px] mx-auto px-5 lg:px-0 grid lg:grid-cols-2 gap-16 items-center">
                {/* LEFT IMAGE */}
                <div className="relative">
                    <Image
                        src="/traveler-dna/founder-bhavin-v2_442aec98.jpg"
                        alt="Founder"
                        width={500}
                        height={500}
                        draggable={false}
                        className="w-full max-w-[500px] rounded-md"
                    />

                    <div className="absolute bottom-[-20px] right-40 bg-[#78350f] text-white px-6 py-4 text-[12px] tracking-[0.1em] leading-relaxed font-dna-landing font-semibold">
                        FOUNDER & CEO <br />
                        TRAVELONE <br />
                        TECHNOLOGIES INC.
                    </div>
                </div>

                {/* RIGHT CONTENT */}
                <div>
                    {/* Badge */}
                    <div className="mb-6">
                        <span className="inline-block border border-[#d97706]/40 bg-[#d977061a] text-xs tracking-[0.2em] px-4 py-1.5 rounded-full text-[#78350f] font-semibold font-dna-landing">
                            THE FOUNDER
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-6xl leading-[1.1] tracking-[-0.02em] font-extrabold text-[#78350f] mb-6 font-dna-landing mb-10">
                        A VISION FOR THE <br />
                        <span className="text-[#D97706]">$9T INDUSTRY.</span>
                    </h2>

                    {/* Intro */}
                    <div className="border-l-4 border-[#D97706] pl-4 mb-6 font-dna-landing">
                        <p className="font-semibold text-[#78350f]">
                            Hi, I’m Bhavin Vora.
                        </p>
                        <p className="text-[14px] text-[#78350f]">
                            Founder & CEO — TravelOne Technologies Inc. (Canada)
                        </p>
                    </div>

                    {/* Paragraphs */}
                    <p className="text-[15px] text-[#78350f] leading-[1.8] mb-5 font-dna-landing">
                        After two decades architecting digital transformations for global institutional leaders,
                        I realized that travel technology had lost its soul. The industry became obsessed with
                        "search results" but forgot the traveler.
                    </p>

                    <p className="text-[15px] text-[#78350f] leading-[1.8] mb-5 font-dna-landing">
                        I created the Traveler DNA framework to bridge that gap. At our Toronto B2B Innovation Hub,
                        we use architectural precision to build the tech that orchestrates the world. Our mission is
                        to provide the intelligence that makes travel feel like home for the U.S. and international markets.
                    </p>

                    {/* Quote */}
                    <p className="italic text-[#d97706] font-medium mb-8">
                        “Welcome to the future of travel. Welcome to TravelOne.”
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4">
                        <Link href="https://traveloneglobal.com/" target="_blank">
                            <button className="bg-[#78350f] text-left text-white px-6 py-3 text-sm font-semibold tracking-[0.08em] rounded font-dna-landing cursor-pointer">
                                TRAVELONEGLOBAL.COM <br />
                                <span className="text-[10px] text-[#CCC]">
                                    DECODE YOUR TRAVEL DNA
                                </span>
                            </button>
                        </Link>

                        <Link href="https://travelone.io" target="_blank">
                            <button className="border border-[#78350f] text-left text-[#78350f] px-6 py-3 font-semibold text-sm fonr-semibold tracking-[0.08em] font-dna-landing rounded cursor-pointer">
                                TRAVELONE.IO <br />
                                <span className="text-[10px] text-[#78350f]">
                                    B2B TECHNOLOGY HUB
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}