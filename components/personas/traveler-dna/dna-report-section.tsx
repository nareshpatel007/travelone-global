"use client";
import { Clock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Props {
    setInitializePersonaModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DNAReportSection({ setInitializePersonaModalOpen }: Props) {
    // Define state
    const [tab, setTab] = useState(1);

    return (
        <section
            id="dnaReport"
            className="py-18 bg-[#F5EFE7]"
            style={{
                backgroundImage: `linear-gradient(rgba(217, 119, 6, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(217, 119, 6, 0.08) 1px, transparent 1px)`,
                backgroundSize: `45px 45px`
            }}
        >
            <div className="max-w-[1200px] mx-auto px-5 lg:px-0 space-y-10">
                {/* Header */}
                <div className="mb-10 space-y-8">
                    <div className="flex gap-3">
                        <span className="inline-block border border-[#d97706]/40 bg-[#d977061a] text-xs tracking-[0.2em] px-4 py-1.5 rounded-full text-[#78350f] font-semibold font-dna-landing">
                            THE DNA REPORT
                        </span>
                        <span className="inline-block border border-[#d97706]/40 bg-[#d977061a] text-xs tracking-[0.2em] px-4 py-1.5 rounded text-[#d97706] font-extrabold font-dna-landing">
                            SAMPLE PREVIEW
                        </span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        <h2 className="text-3xl md:text-6xl leading-[1.1] tracking-[-0.02em] font-extrabold text-[#78350f] font-dna-landing">
                            YOUR TRAVEL DNA.
                            <br />
                            <span className="text-[#D97706]">DECODED.</span>
                        </h2>

                        <p className="text-md text-[#78350f] leading-[1.8] font-dna-landing">
                            When you Decode Your DNA on TravelOne, you receive a full intelligence report.
                            Here is a preview of what's inside — your traveler archetype, DNA matrix,
                            and perfectly matched global destinations.
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border border-[#d9770633] rounded overflow-hidden text-sm font-dna-landing">
                    {[
                        { id: 1, label: "01 — TRAVELER ARCHETYPE" },
                        { id: 2, label: "02 — DNA MATRIX" },
                        { id: 3, label: "03 — TERRITORY ALIGNMENT" },
                    ].map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`flex-1 py-3 cursor-pointer ${t.id !== 1 ? "border-l border-[#d9770633]" : ""} ${tab === t.id ? "bg-[#78350f] text-white" : "bg-white text-[#9C8B7A]"}`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* TAB 1 */}
                {tab === 1 && (
                    <div className="grid lg:grid-cols-2 rounded overflow-hidden border border-[#d9770633]">
                        {/* LEFT */}
                        <div
                            className="bg-[#78350f] text-white px-10 py-16 flex flex-col items-start justify-center text-left"
                            style={{
                                backgroundImage: `linear-gradient(rgba(255, 199, 101, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 199, 101, 0.07) 1px, transparent 1px)`,
                                backgroundSize: `32px 32px`
                            }}
                        >
                            {/* Badge */}
                            <div className="text-xs font-semibold font-dna-landing tracking-[0.15em] bg-[#ffc76526] px-4 py-2 rounded border border-[#ffc7654d] mb-6 text-[#FCD34D]">
                                YOUR TRAVEL DNA
                            </div>

                            {/* Heading */}
                            <h3 className="text-4xl font-extrabold leading-[1.3] font-dna-landing mb-8">
                                The Serene Nature Explorer
                                <br />
                                <span className="text-[#FCD34D]">with an Urban Pulse</span>
                            </h3>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-3 font-dna-landing">
                                <span className="border border-white/30 px-4 py-2 text-xs bg-[#fff9ee0f] rounded">
                                    Climate: Alpine / Cold
                                </span>
                                <span className="border border-white/30 px-4 py-2 text-xs bg-[#fff9ee0f] rounded">
                                    Service Style: Independent
                                </span>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="bg-white px-10 py-12 space-y-5">
                            {/* Title */}
                            <p className="text-[12px] tracking-[0.15em] text-[#D97706] font-dna-landing font-semibold">
                                THE CORE ETHOS: YOUR TRAVEL PSYCHOGRAPHY
                            </p>

                            {/* Paragraph */}
                            <p className="text-md text-[#78350f] leading-[1.6] font-dna-landing">
                                You are someone who values serene landscapes and quiet sanctuaries to recharge. However,
                                you are equally drawn to the modern world — you seek out urban pulse hubs and frictionless
                                living to enjoy total ease without the effort. You want the best of both worlds: the silence
                                of crisp, alpine air and the vibrant energy of a high-tech city, as long as the journey
                                between them is entirely seamless.
                            </p>

                            {/* Items */}
                            <div className="space-y-6 font-dna-landing">
                                {/* Item 1 */}
                                <div>
                                    <div className="flex items-center gap-2 text-[#7B3F00] text-sm font-semibold mb-1">
                                        <span className="text-[#D97706]">✦</span>
                                        <span>The “Why”</span>
                                    </div>
                                    <p className="text-[14px] text-[#9C8B7A]">
                                        Remote seclusion with high-tech, frictionless living.
                                    </p>
                                    <div className="border-t border-[#E7DED2] mt-4"></div>
                                </div>

                                {/* Item 2 */}
                                <div>
                                    <div className="flex items-center gap-2 text-[#7B3F00] text-sm font-semibold mb-1">
                                        <span className="text-[#D97706]">◇</span>
                                        <span>The Sensory Match</span>
                                    </div>
                                    <p className="text-[14px] text-[#9C8B7A]">
                                        Deep fjords meet ultra-modern architectural stays.
                                    </p>
                                    <div className="border-t border-[#E7DED2] mt-4"></div>
                                </div>

                                {/* Item 3 */}
                                <div>
                                    <div className="flex items-center gap-2 text-[#7B3F00] text-sm font-semibold mb-1">
                                        <span className="text-[#D97706]">◎</span>
                                        <span>Primary Match</span>
                                    </div>
                                    <p className="text-[14px] text-[#9C8B7A]">
                                        Your DNA prioritizes remote seclusion and vast, quiet vistas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2 */}
                {tab === 2 && (
                    <div>
                        {/* Heading */}
                        <h3 className="text-3xl font-extrabold font-dna-landing text-[#78350f] text-center mb-3">
                            YOUR TRAVEL DNA MATRIX
                        </h3>

                        <p className="text-center text-sm text-[#78350f] leading-[1.8] font-dna-landing mb-10">
                            What TravelOne amplifies — and what it removes from your journey.
                        </p>

                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* LEFT - PRIORITIZE */}
                            <div className="border border-[#CFE3D2] rounded overflow-hidden bg-[#F3F8F4]">
                                {/* Header */}
                                <div className="bg-[#E8F3EA] px-6 py-4 border-b border-[#CFE3D2]">
                                    <p className="text-[#2F6F3E] text-sm font-semibold tracking-[0.1em] font-dna-landing">
                                        WHAT WE PRIORITIZE
                                    </p>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-6">
                                    {[
                                        ["Quiet Sanctuaries", "Worlds with zero acoustic or visual distractions."],
                                        ["Serene Landscapes", "Vast, quiet vistas and natural beauty."],
                                        ["Colder Climates", "The sharp, clean energy of alpine and crisp air."],
                                        ["Frictionless Living", "Service that responds to you instantly and easily."],
                                        ["Urban Pulse", "High-energy hubs at the center of the modern world."]
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-3 font-dna-landing">
                                            {/* Icon */}
                                            <div className="mt-1 w-5 h-5 rounded-full bg-[#DDEFE1] flex items-center justify-center text-[#2F6F3E] text-[12px]">
                                                ✓
                                            </div>

                                            {/* Text */}
                                            <div>
                                                <p className="font-semibold text-[#2F6F3E] text-[14px]">
                                                    {item[0]}
                                                </p>
                                                <p className="text-[#2F6F3E] text-[13px]">
                                                    {item[1]}
                                                </p>
                                            </div>

                                        </div>
                                    ))}

                                </div>
                            </div>

                            {/* RIGHT - FILTER OUT */}
                            <div className="border border-[#F1C7C7] rounded overflow-hidden bg-[#FBF3F3]">

                                {/* Header */}
                                <div className="bg-[#F8E6E6] px-6 py-4 border-b border-[#F1C7C7]">
                                    <p className="text-[#C0392B] text-sm font-semibold tracking-[0.1em] font-dna-landing">
                                        WHAT WE FILTER OUT
                                    </p>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-6">

                                    {[
                                        ["Urban Noise", "High-traffic centers that lack a sense of calm."],
                                        ["Chaotic Crowds", "Over-saturated hubs and disorganized sites."],
                                        ["Tropical Heat", "Humidity, intense heat, or tropical climates."],
                                        ["Manual Friction", "Logistics that require waiting or paperwork."],
                                        ["Dull Locations", "Inactive locations with no social energy."]
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-3 font-dna-landing">

                                            {/* Icon */}
                                            <div className="mt-1 w-5 h-5 rounded-full bg-[#FDE2E2] flex items-center justify-center text-[#C0392B] text-[12px]">
                                                ✕
                                            </div>

                                            {/* Text */}
                                            <div>
                                                <p className="font-semibold text-[#C0392B] text-[14px]">
                                                    {item[0]}
                                                </p>
                                                <p className="text-[#C0392B] text-[13px]">
                                                    {item[1]}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 3 */}
                {tab === 3 && (
                    <div>
                        {/* Heading */}
                        <h3 className="text-3xl font-extrabold font-dna-landing text-[#78350f] mb-3">
                            TERRITORY ALIGNMENT: YOUR GLOBAL DESTINATIONS
                        </h3>

                        <p className="text-sm max-w-xl text-[#78350f] leading-[1.8] font-dna-landing mb-10">
                            The optimal geographic environments selected to host your unique Travel DNA. Each destination is pre-synced to your expectations of pulse, grit, and service.
                        </p>

                        {/* Grid */}
                        <div className="grid md:grid-cols-2 gap-6 font-dna-landing">

                            {[
                                {
                                    name: "Norway",
                                    tag: "Perfect Match — Climate",
                                    desc: "The world leader in remote seclusion with high-tech, frictionless living.",
                                    img: "/traveler-dna/photo-1531366936337-7c912a4589a7.jpg",
                                },
                                {
                                    name: "New Zealand",
                                    tag: "Perfect Match — Soul",
                                    desc: "Deep fjords meet ultra-modern architectural stays.",
                                    img: "/traveler-dna/photo-1507699622108-4be3abd695ad.jpg",
                                },
                                {
                                    name: "Japan",
                                    tag: "Perfect Match — Surface",
                                    desc: "Precision, calm, and frictionless service at every altitude.",
                                    img: "/traveler-dna/photo-1490806843957-31f4c9a91c65.jpg",
                                },
                                {
                                    name: "Singapore",
                                    tag: "Perfect Match — System",
                                    desc: "Urban pulse meets seamless infrastructure and world-class design.",
                                    img: "/traveler-dna/photo-1525625293386-3f8f99389edd.jpg",
                                },
                            ].map((item, i) => (

                                <div
                                    key={i}
                                    className="relative rounded-md overflow-hidden group"
                                >
                                    {/* Image */}
                                    <Image
                                        src={item.img}
                                        className="w-full h-[260px] object-cover transition duration-700 group-hover:scale-105"
                                        alt={item.name}
                                        width={500}
                                        height={500}
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                    {/* Content */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-between">

                                        {/* Tag */}
                                        <div>
                                            <span className="inline-flex items-center gap-1 bg-[#ffc765] text-[#78350f] text-[11px] px-3 py-1 rounded font-semibold shadow-sm">
                                                ★ {item.tag}
                                            </span>
                                        </div>

                                        {/* Bottom Content */}
                                        <div>
                                            <h4 className="text-white text-[20px] font-semibold mb-1">
                                                {item.name}
                                            </h4>
                                            <p className="text-white/80 text-[13px] leading-[1.6] max-w-[90%]">
                                                {item.desc}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="bg-[#451a03] rounded px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* LEFT TEXT */}
                    <div>
                        <h3 className="text-white text-md font-semibold mb-1 font-dna-landing">
                            THIS IS YOUR REPORT. GET YOURS NOW.
                        </h3>
                        <p className="text-white/60 text-sm font-dna-landing">
                            Answer 10 questions. Receive your full Traveler DNA Report — free.
                        </p>
                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={() => setInitializePersonaModalOpen(true)}
                        className="bg-[#ffc765] text-[#78350f] font-dna-landing text-[13px] tracking-[0.08em] px-6 py-3 rounded font-semibold hover:opacity-90 transition cursor-pointer"
                    >
                        DECODE YOUR TRAVEL DNA →
                    </button>
                </div>
            </div>
        </section>
    );
}