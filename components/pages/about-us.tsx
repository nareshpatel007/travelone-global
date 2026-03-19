"use client";

import { useEffect, useState } from "react";
import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import HeroSection from "@/components/about/hero-section";
import OurVision from "@/components/about/our-vision";
import TravelOneJourney from "@/components/about/timeline-journey";
import LeadershipTeam from "@/components/about/leadership-team";
import LocalExpertise from "@/components/about/local-expertise";
import ArchitectureModern from "@/components/about/architecture-modern";
import OurCommitment from "@/components/about/our-commitment";
import WhoWeAreSection from "@/components/about/who-we-are";
import TeamGlobalIntelSection from "@/components/about/team-global";
import StickyHomeHeader from "@/components/header/sticky-home-header";
import EconomicTimesSection from "../contact/economic-times";

export default function AboutPage() {
    // Define state
    const [ready, setReady] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => { setReady(true); });
    }, []);

    return (
        <>
            {ready && <>
                <CommonHeader />
                <HeroSection />
                <ArchitectureModern />
                <WhoWeAreSection />
                {/* <OurVision /> */}
                <EconomicTimesSection bgColor={"bg-white"} />
                <TravelOneJourney />
                <LeadershipTeam />
                <LocalExpertise />
                {/* <OurCommitment /> */}
                {/* <TeamGlobalIntelSection /> */}
                <CommonFooter isStickyShow={true} />
                <StickyHomeHeader />
            </>}
        </>
    );
}
