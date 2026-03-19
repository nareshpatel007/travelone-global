"use client";

import { useEffect, useState } from "react";
import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import StickyHomeHeader from "@/components/header/sticky-home-header";
import HeroSection from "../intelligence/hero-section";
import ArchitectureModern from "../intelligence/architecture-modern";
import WhoWeAreSection from "../intelligence/who-we-are";
import LocalExpertise from "../intelligence/local-expertise";
import OurVision from "../intelligence/our-vision";
import TeamGlobalIntelSection from "../intelligence/team-global";

export default function IntelligencePage() {
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
                <LocalExpertise />
                <OurVision />
                <TeamGlobalIntelSection />
                <CommonFooter isStickyShow={true} />
                <StickyHomeHeader />
            </>}
        </>
    );
}
