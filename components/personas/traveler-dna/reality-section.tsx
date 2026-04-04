import { Search, FileText, Clock, Dice5 } from "lucide-react";
import Image from "next/image";

export default function RealitySection() {
    return (
        <section id="realityCheck" className="relative py-16">
            <div className="max-w-[1200px] mx-auto px-5 lg:px-0 text-center space-y-12">
                <div>
                    {/* Badge */}
                    <div className="mb-8">
                        <span className="inline-block border border-[#d97706]/40 bg-[#d977061a] text-xs tracking-[0.2em] px-4 py-1.5 rounded-full text-[#78350f] font-semibold font-dna-landing">
                            THE REALITY
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-6xl leading-[1.1] tracking-[-0.02em] font-extrabold text-[#78350f] mb-6 font-dna-landing">
                        THE ALGORITHM DOESN’T <br /> KNOW WHO YOU ARE.
                    </h2>

                    {/* Description */}
                    <p className="text-md text-[#78350f] leading-[1.8] max-w-2xl mx-auto leading-[1.8] font-dna-landing">
                        Current travel platforms are built for the masses. They optimize for clicks,
                        not for connection. They sell destinations, not experiences that mirror your soul.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                    {/* Card 1 */}
                    <div className="border border-[#e7d4bb] rounded p-6 bg-[#d977060a] backdrop-blur-sm hover:shadow-md transition">
                        <Search className="text-[#D97706] mb-4" size={26} />
                        <h3 className="text-md font-semibold text-[#78350f] mb-2 font-dna-landing">
                            Generic Algorithms
                        </h3>
                        <p className="text-sm text-[#78350f] font-normal leading-relaxed font-dna-landing">
                            Social media feeds optimized for engagement, not for your soul.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="border border-[#e7d4bb] rounded p-6 bg-[#d977060a] backdrop-blur-sm hover:shadow-md transition">
                        <FileText className="text-[#D97706] mb-4" size={26} />
                        <h3 className="text-md font-semibold text-[#78350f] mb-2 font-dna-landing">
                            Top 10 Lists
                        </h3>
                        <p className="text-sm text-[#78350f] font-normal leading-relaxed font-dna-landing">
                            Mass-market recommendations that ignore who you actually are.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="border border-[#e7d4bb] rounded p-6 bg-[#d977060a] backdrop-blur-sm hover:shadow-md transition">
                        <Clock className="text-[#D97706] mb-4" size={26} />
                        <h3 className="text-md font-semibold text-[#78350f] mb-2 font-dna-landing">
                            Decision Fatigue
                        </h3>
                        <p className="text-sm text-[#78350f] font-normal leading-relaxed font-dna-landing">
                            Hours of research that still leads to uncertainty and doubt.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="border border-[#e7d4bb] rounded p-6 bg-[#d977060a] backdrop-blur-sm hover:shadow-md transition">
                        <Dice5 className="text-[#D97706] mb-4" size={26} />
                        <h3 className="text-md font-semibold text-[#78350f] mb-2 font-dna-landing">
                            Travel as a Gamble
                        </h3>
                        <p className="text-sm text-[#78350f] font-normal leading-relaxed font-dna-landing">
                            Every trip is a risk when no one truly knows your traveler identity.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Image 1 */}
                    <div className="overflow-hidden rounded">
                        <Image
                            src="/traveler-dna/home-5-img-20.jpg"
                            alt="Beach Sunset"
                            width={600}
                            height={600}
                            quality={100}
                            draggable={false}
                            className="w-full h-full object-cover transition-transform rounded-t-[180px] md:rounded-t-[300px]"
                        />
                    </div>

                    {/* Image 2 */}
                    <div className="overflow-hidden rounded">
                        <Image
                            src="/traveler-dna/home-5-img-23.jpg"
                            alt="Beach Sunset"
                            width={600}
                            height={600}
                            quality={100}
                            draggable={false}
                            className="w-full h-full object-cover transition-transform rounded-t-[180px] md:rounded-t-[300px]"
                        />
                    </div>

                    {/* Image 3 */}
                    <div className="overflow-hidden rounded">
                        <Image
                            src="/traveler-dna/custom-single-png-2.png"
                            alt="Beach Sunset"
                            width={600}
                            height={600}
                            quality={100}
                            draggable={false}
                            className="w-full h-full object-cover transition-transform rounded-t-[180px] md:rounded-t-[300px]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}