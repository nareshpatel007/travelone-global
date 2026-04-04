"use client";

import { useEffect, useState } from "react";
import { InitializePersonaModal } from "../plan_your_trip/initialize-persona";
import HeroSection from "../personas/traveler-dna/hero-section";
import AsSeenIn from "../personas/traveler-dna/as-seen-in";
import WhyTravelBroken from "../personas/traveler-dna/why-travel-broken";
import RealitySection from "../personas/traveler-dna/reality-section";
import TransformationSection from "../personas/traveler-dna/transformation-section";
import TravelerDNASection from "../personas/traveler-dna/traveler-dna-mapping";
import DNAReportSection from "../personas/traveler-dna/dna-report-section";
import IntelligenceLayer from "../personas/traveler-dna/intelligence-layer";
import FounderSection from "../personas/traveler-dna/founder-section";
import FinalHeroCTA from "../personas/traveler-dna/final-cta-section";
import DnaHeader from "../header/dna-header";
import DnaFooter from "../footer/dna-footer";

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
            <DnaHeader />
            <HeroSection setInitializePersonaModalOpen={setInitializePersonaModalOpen} />
            <AsSeenIn />
            <WhyTravelBroken />
            <RealitySection />
            <IntelligenceLayer />
            <TransformationSection />
            <TravelerDNASection />
            <DNAReportSection setInitializePersonaModalOpen={setInitializePersonaModalOpen} />
            <FounderSection />
            <FinalHeroCTA setInitializePersonaModalOpen={setInitializePersonaModalOpen} />
            <DnaFooter />

            <InitializePersonaModal
                open={initializePersonaModalOpen}
                onOpenChange={setInitializePersonaModalOpen}
                reference={reference}
                referenceToken={token}
            />
        </>
    );
}

// Get query
export const getQuery = (key: string, fallback = "") =>
    typeof window === "undefined"
        ? fallback
        : new URLSearchParams(window.location.search).get(key) ?? fallback;