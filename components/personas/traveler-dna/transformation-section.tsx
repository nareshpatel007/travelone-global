export default function TransformationSection() {
    return (
        <section id="transformation" className="bg-white py-16">
            <div className="max-w-[1200px] mx-auto px-5 lg:px-0 grid lg:grid-cols-2 gap-16">
                <div>
                    {/* Badge */}
                    <div className="mb-6">
                        <span className="inline-block border border-[#d97706]/40 bg-[#d977061a] text-xs tracking-[0.2em] px-4 py-1.5 rounded-full text-[#78350f] font-semibold font-dna-landing">
                            THE TRANSFORMATION
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-2xl md:text-5xl leading-[1.1] tracking-[-0.02em] font-extrabold text-[#78350f] mb-6 font-dna-landing mb-10">
                        FROM REACTIVE SEARCH TO PREDICTIVE INTELLIGENCE.
                    </h2>

                    {/* Table Header */}
                    <div className="grid grid-cols-2 text-sm tracking-[0.1em] text-[#78350f] font-dna-landing mb-4">
                        <span className="font-semibold">OLD WORLD</span>
                        <span className="font-semibold">TRAVELONE</span>
                    </div>

                    <div className="border-t border-[#e7d4bb]"></div>

                    {/* Table Rows */}
                    <div className="divide-y divide-[#e7d4bb]">
                        {[
                            ["You search endlessly", "We find you first"],
                            ["Generic recommendations", "Soul-matched experiences"],
                            ["Algorithm-driven feeds", "Traveler DNA mapping"],
                            ["Every trip is a gamble", "Every journey guaranteed"],
                            ["You are the product", "You are the purpose"],
                        ].map((row, i) => (
                            <div key={i} className="grid grid-cols-2 py-4 text-sm font-dna-landing">
                                <span className="text-[#78350f]">{row[0]}</span>
                                <span className="text-[#d97706] font-semibold">{row[1]}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    {/* Title */}
                    <p className="text-xs tracking-[0.2em] text-[#78350f73] font-semibold font-dna-landing mb-6">
                        THE INDUSTRY GAP
                    </p>

                    {/* Cards */}
                    <div className="space-y-4">
                        {/* Card 1 */}
                        <div className="border border-[#E2D6C8] rounded bg-[#d977060d] text-sm font-semibold p-5 flex justify-between items-center font-dna-landing">
                            <div>
                                <p className="text-[#78350f] font-sm font-medium">Mega-Platforms</p>
                                <p className="text-xs text-[#78350f80]">1,000,000 choices.</p>
                            </div>
                            <span className="text-xs bg-[#d977061f] px-3 py-1 rounded text-[#78350f]">
                                ✕ No Intelligence
                            </span>
                        </div>

                        {/* Card 2 */}
                        <div className="border border-[#E2D6C8] rounded bg-[#d977060d] text-sm font-semibold p-5 flex justify-between items-center font-dna-landing">
                            <div>
                                <p className="text-[#78350f] font-sm font-medium">Human Agents</p>
                                <p className="text-xs text-[#78350f80]">Personal touch.</p>
                            </div>
                            <span className="text-xs bg-[#d977061f] px-3 py-1 rounded text-[#78350f]">
                                ✕ Bias-Driven
                            </span>
                        </div>

                        {/* Card 3 */}
                        <div className="border border-[#E2D6C8] rounded bg-[#d977060d] text-sm font-semibold p-5 flex justify-between items-center font-dna-landing">
                            <div>
                                <p className="text-[#78350f] font-sm font-medium">Tour Operators</p>
                                <p className="text-xs text-[#78350f80]">Pre-packaged boxes.</p>
                            </div>
                            <span className="text-xs bg-[#d977061f] px-3 py-1 rounded text-[#78350f]">
                                ✕ No Autonomy
                            </span>
                        </div>
                    </div>

                    {/* VS Divider */}
                    <div className="flex items-center my-10">
                        <div className="flex-1 border-t border-[#e7d4bb]" />
                        <span className="px-4 text-md font-semibold text-[#78350f66] font-dna-landing">VS</span>
                        <div className="flex-1 border-t border-[#e7d4bb]" />
                    </div>

                    {/* Highlight Card */}
                    <div className="bg-[#78350f] text-white rounded-md p-6 flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-sm font-dna-landing">TravelOne</p>
                            <p className="text-xs text-white/70 font-dna-landing">
                                Traveler DNA™ Intelligence
                            </p>
                        </div>

                        <span className="text-xs bg-[#ffc765] text-[#78350f] px-4 py-1 rounded font-bold font-dna-landing">
                            ✓ Soul-Matched
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}