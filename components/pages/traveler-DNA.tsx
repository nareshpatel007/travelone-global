"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import { InitializePersonaModal } from "../plan_your_trip/initialize-persona";

export default function TravelerDNAPage() {
    // Get query parms
    const reference = getQuery("ref", "");
    const token = getQuery("token", "");

    // Define state
    const [ready, setReady] = useState(false);
    const [initializePersonaModalOpen, setInitializePersonaModalOpen] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => { setReady(true); });
    }, []);

    // If not ready, return null
    if (!ready) return null;

    return (
        <>
            <CommonHeader />

            {/* Section 1 */}
            <section className="relative bg-[#FFF9EE] text-black overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-0 py-16 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        {/* Badge */}
                        <div className="inline-block px-4 py-1 text-xs font-semibold bg-black/5 border border-black/10 rounded-full">
                            🧬 Traveler DNA Intelligence
                        </div>

                        {/* Headline */}
                        <h2 className="text-4xl md:text-6xl font-normal leading-tight tracking-tight text-black">
                            Travel is a Science. Stop Searching, Start Being.
                        </h2>

                        {/* Subheadline */}
                        <p className="text-gray-700 text-base leading-relaxed max-w-xl">
                            Eliminate the <span className="font-semibold">$47B Planning Tax</span>.
                            Our proprietary <span className="font-semibold">30-Marker Traveler Persona</span>
                            maps your unique DNA to architect journeys with mathematical precision.
                        </p>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <button
                                onClick={() => setInitializePersonaModalOpen(true)}
                                className="px-8 py-3 rounded-full text-base font-medium bg-black text-white hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                            >
                                Discover Your Traveler DNA (Deposit $95)
                            </button>

                            <span className="text-sm text-gray-500">
                                ✔ 100% Redeemable Travel Credit
                            </span>
                        </div>
                    </div>
                    <div className="relative flex justify-center">
                        {/* Premium Card */}
                        <div className="relative w-full max-w-md bg-white/70 border border-black/10 backdrop-blur rounded-3xl p-6 shadow-xl">

                            {/* DNA Visual */}
                            <div className="h-48 flex items-center justify-center relative">
                                <div className="w-28 h-28 border-4 border-black rounded-full animate-spin"></div>
                                <div className="absolute w-16 h-16 border-4 border-yellow-400 rounded-full animate-spin-slow"></div>
                            </div>

                            {/* Divider */}
                            <div className="my-4 border-t border-black/10"></div>

                            {/* Output Preview */}
                            <div className="space-y-3 text-sm">

                                <div className="flex justify-between bg-black/5 rounded-lg px-3 py-2">
                                    <span>DNA Markers</span>
                                    <span className="font-semibold">30/30</span>
                                </div>

                                <div className="flex justify-between bg-black/5 rounded-lg px-3 py-2">
                                    <span>Global Hubs</span>
                                    <span className="font-semibold">5 Identified</span>
                                </div>

                                <div className="flex justify-between bg-black/5 rounded-lg px-3 py-2">
                                    <span>Report</span>
                                    <span className="font-semibold">12 Pages</span>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="mt-4 text-sm text-gray-500 text-center">
                                ● System Ready for Synthesis
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <div className="relative bg-white py-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-5 md:px-0 text-center space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-6xl font-normal leading-tight tracking-tight text-black">
                            Why Modern Travel Planning is Broken
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-base">
                            What should feel like anticipation has become cognitive overload.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="group bg-white rounded-2xl p-6 text-left shadow-sm hover:shadow-xl transition border border-gray-100">
                            <div className="text-3xl mb-4">🔍</div>

                            <h3 className="text-base md:text-base font-medium mb-2">
                                The Search Trap
                            </h3>

                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                You’ve visited 40+ sites and are stuck in a loop of identical, copy-paste itineraries that offer no real clarity.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="group bg-white rounded-2xl p-6 text-left shadow-sm hover:shadow-xl transition border border-gray-100">
                            <div className="text-3xl mb-4">📊</div>

                            <h3 className="text-base md:text-base font-medium mb-2">
                                The Data-Integrity Crisis
                            </h3>

                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                Generic AI tools and OTAs only know what you bought, not who you are.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="group bg-white rounded-2xl p-6 text-left shadow-sm hover:shadow-xl transition border border-gray-100">
                            <div className="text-3xl mb-4">🧠</div>

                            <h3 className="text-base md:text-base font-medium mb-2">
                                The Mental Load
                            </h3>

                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                Planning a high-value trip has become a stressful second job.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Statement */}
                    <div className="pt-6">
                        <p className="text-gray-700 text-sm md:text-lg max-w-3xl mx-auto">
                            This is the <span className="font-semibold text-black">Planning Tax</span>—a hidden cost paid in time, stress, and uncertainty.
                        </p>
                    </div>
                </div>
            </div>

            {/* Section 3 */}
            <div className="relative bg-[#FFF9EE] text-black py-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-5 md:px-0 space-y-8">
                    {/* Headline */}
                    <div className="text-center space-y-4 max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-normal leading-tight tracking-tight text-black">
                            Your Traveler DNA: The Industry’s Most Accurate Persona Asset
                        </h2>

                        <p className="text-gray-600 text-base leading-relaxed">
                            We don’t rely on filters or assumptions. We map 30 unique behavioral markers
                            that legacy platforms completely ignore.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-white border border-black/10 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition">

                            <div className="text-3xl">🌍</div>

                            <h3 className="text-base md:text-base font-medium mb-2">
                                Risk Tolerance & Social Energy
                            </h3>

                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                Are you seeking calculated adventure or curated seclusion?
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white border border-black/10 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition">

                            <div className="text-3xl">🧠</div>

                            <h3 className="text-base md:text-base font-medium mb-2">
                                Decision-Making Patterns
                            </h3>

                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                Do you value spontaneous discovery or structural certainty?
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white border border-black/10 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition">

                            <div className="text-3xl">⚙️</div>

                            <h3 className="text-base md:text-base font-medium mb-2">
                                Logistical Preferences
                            </h3>

                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                From transit-logic to experiential priorities.
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-black to-transparent"></div>
                    </div>
                    <div className="text-center max-w-3xl mx-auto space-y-4">
                        <p className="text-xl md:text-2xl font-medium leading-relaxed">
                            This is not a profile.
                        </p>

                        <p className="text-2xl md:text-4xl font-semibold leading-tight">
                            <span className="bg-yellow-400 px-2">
                                It is a foundational data asset.
                            </span>
                        </p>

                        <p className="text-gray-600 text-base">
                            One that makes the search bar obsolete.
                        </p>
                    </div>
                </div>
            </div>

            {/* Section 4 */}
            <div className="relative bg-white text-black py-16 overflow-hidden">
                <div className="max-w-4xl mx-auto px-5 md:px-0 space-y-8">
                    {/* Heading */}
                    <div className="text-center space-y-4 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-normal leading-tight tracking-tight text-black">
                            From Search to Science
                        </h2>
                        <p className="text-gray-600 text-base">
                            A structured system that replaces guesswork with precision.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-black/10"></div>
                        <div className="space-y-8">
                            {/* Step 1 */}
                            <div className="grid md:grid-cols-2 gap-10 items-center">
                                <div className="space-y-4 md:text-right">
                                    <h3 className="text-xl md:text-2xl font-semibold">
                                        The Synthesis
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base">
                                        Complete our behavioral diagnostic to record your
                                        <span className="font-semibold"> 30 unique markers</span>.
                                    </p>
                                </div>

                                {/* Node */}
                                <div className="flex justify-center md:justify-start">
                                    <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-lg font-semibold shadow-md">
                                        1
                                    </div>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="grid md:grid-cols-2 gap-10 items-center">

                                {/* Node */}
                                <div className="flex justify-center md:justify-end order-2 md:order-1">
                                    <div className="w-16 h-16 rounded-full bg-yellow-400 text-black flex items-center justify-center text-lg font-semibold shadow-md">
                                        2
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-4 order-1 md:order-2">
                                    <h3 className="text-xl md:text-2xl font-semibold">
                                        The Dossier
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base">
                                        Receive a <span className="font-semibold">12-page Traveler DNA Synthesis</span>—
                                        your permanent travel intelligence asset.
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="grid md:grid-cols-2 gap-10 items-center">

                                {/* Content */}
                                <div className="space-y-4 md:text-right">
                                    <h3 className="text-xl md:text-2xl font-semibold">
                                        The Execution
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base">
                                        Your DNA syncs with our global network for
                                        <span className="font-semibold"> 100% aligned fulfillment</span>.
                                    </p>
                                </div>

                                {/* Node */}
                                <div className="flex justify-center md:justify-start">
                                    <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-lg font-semibold shadow-md">
                                        3
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-700 text-base max-w-3xl mx-auto">
                            What once required hours of searching is now reduced to a precise, repeatable system.
                        </p>
                    </div>
                </div>
            </div>

            {/* Section 5 */}
            <div className="relative bg-[#FFF9EE] text-black py-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-5 md:px-0 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        {/* Headline */}
                        <h2 className="text-4xl md:text-6xl font-normal leading-tight tracking-tight text-black">
                            Built on <span className="border-b-4 border-yellow-400">Mission-Critical Architecture</span>
                        </h2>

                        {/* Description */}
                        <p className="text-gray-700 text-base leading-relaxed">
                            Architected by <span className="font-semibold">Bhavin Vora</span>,
                            a Technology Architect with 20+ years of experience delivering systems
                            for global enterprises.
                        </p>

                        {/* Company Tags */}
                        <div className="flex flex-wrap gap-3 text-sm">
                            <span className="px-3 py-1 bg-black/5 rounded-full border border-black/10">
                                Fidelity Investments
                            </span>
                            <span className="px-3 py-1 bg-black/5 rounded-full border border-black/10">
                                MetLife
                            </span>
                            <span className="px-3 py-1 bg-black/5 rounded-full border border-black/10">
                                Coca-Cola
                            </span>
                        </div>

                        {/* Core Value */}
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            We apply the same <span className="font-semibold">classconsequence-thinking</span> used in enterprise fintech to your personal travel intelligence.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="bg-white border border-black/10 rounded-3xl p-8 shadow-lg text-center space-y-4 w-full max-w-sm">
                            {/* Avatar */}
                            <div className="w-24 h-24 mx-auto rounded-full bg-yellow-400 flex items-center justify-center text-2xl font-bold text-black">
                                BV
                            </div>

                            {/* Name */}
                            <h3 className="text-xl md:text-2xl font-semibold">Bhavin Vora</h3>

                            {/* Role */}
                            <p className="text-gray-600 text-sm">
                                Technology Architect • 20+ Years
                            </p>

                            {/* Highlight */}
                            <div className="bg-black/5 rounded-xl p-3 text-sm text-gray-700">
                                Built systems where failure is not an option.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 6 */}
            <div className="relative bg-white text-black py-16 overflow-hidden">
                <div className="max-w-4xl mx-auto px-5 md:px-10 text-center space-y-6">
                    {/* Badge */}
                    <div className="inline-block px-4 py-1 text-xs font-semibold bg-black/5 border border-black/10 rounded-full">
                        🔐 Identity Access Gateway
                    </div>

                    {/* Headline */}
                    <h2 className="text-4xl md:text-6xl font-normal leading-tight tracking-tight text-black">
                        A Self-Funding Gateway to Precision
                    </h2>

                    {/* Description */}
                    <p className="text-gray-700 text-base leading-relaxed max-w-2xl mx-auto">
                        Your <span className="font-semibold">$95 Persona Synthesis</span> is not a cost.
                        It is a <span className="font-semibold">100% redeemable credit</span> toward your first TravelOne journey—
                        transforming your identity into a lasting asset.
                    </p>

                    {/* Highlight Line */}
                    <p className="text-lg md:text-xl font-medium">
                        You’re not buying a report.{" "}
                        <span className="bg-yellow-400 px-2">
                            You’re funding your travel intelligence.
                        </span>
                    </p>

                    {/* CTA */}
                    <div className="pt-4 space-y-3">
                        <button className="px-10 py-3 rounded-full text-base font-medium bg-black text-white hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer">
                            Secure Your Identity Asset
                        </button>

                        {/* Trust Line */}
                        <p className="text-xs text-gray-500">
                            ✔ 100% Redeemable • ✔ Instant Access • ✔ No Risk Entry
                        </p>
                    </div>
                </div>
            </div>

            <InitializePersonaModal
                open={initializePersonaModalOpen}
                onOpenChange={setInitializePersonaModalOpen}
                reference={reference}
                referenceToken={token}
            />

            <CommonFooter />
        </>
    );
}

// Get query
export const getQuery = (key: string, fallback = "") =>
    typeof window === "undefined"
        ? fallback
        : new URLSearchParams(window.location.search).get(key) ?? fallback;