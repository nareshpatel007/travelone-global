interface Props {
    setInitializePersonaModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FinalHeroCTA({ setInitializePersonaModalOpen }: Props) {
    return (
        <section
            className="py-28 text-center bg-[#fff9ee]"
            style={{
                backgroundImage: `linear-gradient(rgba(217, 119, 6, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(217, 119, 6, 0.08) 1px, transparent 1px)`,
                backgroundSize: `45px 45px`
            }}
        >
            <div className="max-w-[1200px] mx-auto px-6 space-y-6">
                {/* Badge */}
                <span className="inline-block border border-[#d97706]/40 bg-[#d977061a] text-xs tracking-[0.2em] px-4 py-1.5 rounded-full text-[#78350f] font-semibold font-dna-landing">
                    IT’S TIME
                </span>

                {/* Heading */}
                <h2 className="text-3xl md:text-8xl leading-[1.1] tracking-[-0.02em] font-extrabold font-dna-landing">
                    <span className="block text-[#78350f]">STOP SEARCHING.</span>
                    <span className="block text-[#D97706]">START BEING FOUND.</span>
                </h2>

                {/* Subtext */}
                <p className="text-md text-[#78350f] leading-[1.8] max-w-[500px] mx-auto leading-[1.8] font-dna-landing">
                    Join the intelligence revolution. Let TravelOne map your Traveler DNA and match you
                    to the journeys your soul has been waiting for.
                </p>

                {/* CTA Button */}
                <button
                    onClick={() => setInitializePersonaModalOpen(true)}
                    className="bg-[#78350f] text-white text-[13px] tracking-[0.08em] px-8 py-4 rounded font-semibold hover:opacity-90 transition cursor-pointer"
                >
                    DECODE YOUR TRAVEL DNA →
                </button>
            </div>
        </section>
    );
}