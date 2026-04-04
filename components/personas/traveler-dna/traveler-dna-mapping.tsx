export default function TravelerDNASection() {
    const stats = [
        { label: "Adventure Level", value: 87 },
        { label: "Cultural Depth", value: 94 },
        { label: "Solitude Preference", value: 62 },
        { label: "Luxury Index", value: 78 },
        { label: "Discovery Hunger", value: 96 },
    ];

    return (
        <section
            id="travelerDnaMapping"
            className="py-20 bg-[#451a03]"
            style={{
                backgroundImage: `linear-gradient(rgba(255, 199, 101, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 199, 101, 0.07) 1px, transparent 1px)`,
                backgroundSize: `45px 45px`
            }}
        >
            <div className="max-w-[1200px] mx-auto px-5 lg:px-0 grid lg:grid-cols-2 gap-16 items-center">
                {/* LEFT CONTENT */}
                <div className="space-y-6">
                    {/* Badge */}
                    <span className="bg-[#d977061a] text-xs tracking-[0.2em] px-4 py-1.5 rounded-full font-semibold font-dna-landing inline-block border border-[#ffc765]/40 text-[#ffc765]">
                        CORE TECHNOLOGY
                    </span>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-7xl leading-[1.1] tracking-[-0.02em] font-extrabold text-[#78350f] mb-6 font-dna-landing">
                        <span className="text-white block">MAPPING YOUR</span>
                        <span className="text-[#ffc765] block">TRAVELER DNA™</span>
                    </h2>

                    {/* Description */}
                    <p className="text-[#fff9eebf] font-dna-landing text-md leading-[1.8]">
                        Our mission is to match every traveler to experiences that mirror their soul, not a social media algorithm. We aren't just selling trips — we are mapping the Traveler DNA to ensure every journey is a guaranteed success, not a gamble.
                    </p>

                    {/* Chips */}
                    <div className="flex flex-wrap gap-3">
                        {["FLIGHTS", "HOTELS", "ACTIVITIES", "GUIDES"].map((item) => (
                            <span
                                key={item}
                                className="border border-[#fff9ee33] bg-[#fff9ee0d] text-[#fff9ee] text-xs px-4 py-1.5 rounded"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* RIGHT CARD */}
                <div className="border border-[#ffc76533] bg-[#fff9ee0a] rounded p-8">
                    <p className="text-[12px] tracking-[0.2em] text-[#ffc765] font-dna-landing font-semibold mb-6">
                        YOUR TRAVELER PROFILE
                    </p>

                    <div className="space-y-6">
                        {stats.map((item, i) => (
                            <div key={i}>
                                {/* Label */}
                                <div className="flex justify-between text-sm font-dna-landing mb-2">
                                    <span className="text-[#fff9eecc]">{item.label}</span>
                                    <span className="text-[#ffc765]">{item.value}%</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full h-[6px] bg-white/10 rounded">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#F59E0B] to-[#ffc765] rounded"
                                        style={{ width: `${item.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom */}
                    <div className="border-t border-[#ffc765]/20 mt-8 pt-4 text-center">
                        <p className="text-[12px] tracking-[0.15em] text-[#ffc765]">
                            INTELLIGENCE MATCH: 96% ACCURACY
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}