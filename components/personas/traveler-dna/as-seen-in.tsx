import Link from "next/link";

export default function AsSeenIn() {
    return (
        <section id="asSeenIn" className="relative py-16 border-b border-[#d37300]/30">
            <div className="max-w-[1200px] mx-auto px-5 lg:px-0 space-y-10">
                <div className="text-center font-dna-landing">
                    <h2 className="text-3xl tracking-[0.1em] font-extrabold text-[#78350f]">
                        AS SEEN IN
                    </h2>
                    <div className="w-10 h-[2px] bg-[#d97706] mx-auto mt-4" />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="border border-[#d9770633] rounded p-6 bg-white/40 backdrop-blur-sm hover:shadow-md transition space-y-5">
                        <h3 className="text-xl font-semibold text-[#78350f] text-center font-dna-landing">
                            economic<span className="text-[#d97706]">times</span>
                        </h3>
                        <div className="border-t border-[#E7DED2] pt-4">
                            <Link href="https://travel.economictimes.indiatimes.com/news/technology/travelone-technologies-launches-ai-driven-global-traveller-dna-platform-in-1659b-market/128960290" target="_blank">
                                <p className="text-[13px] text-[#9C8B7A] font-dna-landing mb-2">
                                    March 3, 2026
                                </p>

                                <p className="text-[15px] text-[#78350f] font-medium leading-relaxed mb-5 hover:underline underline-offset-2 decoration-[#D97706]">
                                    TravelOne Technologies Launches AI-Driven Global Traveller DNA Platform in $165.9B Market
                                </p>

                                <button className="text-[12px] tracking-[0.08em] font-semibold text-[#d97706] hover:underline cursor-pointer">
                                    READ ARTICLE →
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="border border-[#d9770633] rounded p-6 bg-white/40 backdrop-blur-sm hover:shadow-md transition space-y-5">
                        <h3 className="text-xl font-semibold text-[#78350f] text-center font-dna-landing">
                            The <span className="text-[#d97706]">Financial</span> Express
                        </h3>
                        <div className="border-t border-[#E7DED2] pt-4">
                            <Link href="https://www.financialexpress.com/world-news/the-death-of-generic-vacations-how-this-indians-toronto-startup-is-coding-your-traveler-dna/4161600/" target="_blank">
                                <p className="text-[13px] text-[#9C8B7A] font-dna-landing mb-2">
                                    March 3, 2026
                                </p>

                                <p className="text-[15px] text-[#78350f] font-medium leading-relaxed mb-5 hover:underline underline-offset-2 decoration-[#D97706]">
                                    The death of generic vacations: How this Indian's Toronto startup is coding your 'Traveler DNA'
                                </p>

                                <button className="text-[12px] tracking-[0.08em] font-semibold text-[#d97706] hover:underline cursor-pointer">
                                    READ ARTICLE →
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="border border-[#d9770633] rounded p-6 bg-white/40 backdrop-blur-sm hover:shadow-md transition space-y-5">
                        <h3 className="text-xl font-semibold text-[#78350f] text-center font-dna-landing">
                            Travel <span className="text-[#d97706]">Trade</span> Today
                        </h3>
                        <div className="border-t border-[#E7DED2] pt-4">
                            <Link href="https://traveltrade.today/travel-technology/travelone-unveils-ai-driven-global-traveller-dna-platform-in-165-9b-market/" target="_blank">
                                <p className="text-[13px] text-[#9C8B7A] font-dna-landing mb-2">
                                    March 6, 2026
                                </p>

                                <p className="text-[15px] text-[#78350f] font-medium leading-relaxed mb-5 hover:underline underline-offset-2 decoration-[#D97706]">
                                    TravelOne Unveils AI-Driven Global Traveller DNA Platform in $165.9B Market
                                </p>

                                <button className="text-[12px] tracking-[0.08em] font-semibold text-[#d97706] hover:underline cursor-pointer">
                                    READ ARTICLE →
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}