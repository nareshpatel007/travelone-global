"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import PageHeading from "@/components/common/page-heading";
import FullBannerSection from "@/components/about/full-banner";

export default function CareersPage() {
    // Define state
    const [ready, setReady] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => {
            setReady(true);
        });
    }, []);

    return (
        <>
            {ready && <>
                <CommonHeader />

                <div className="max-w-7xl mx-auto px-5 md:px-0 py-12">
                    <PageHeading
                        main="Join the Architecture of Global Travel"
                        sub="At TravelOne, we don’t just dream; we engineer the intelligence that makes those dreams a reality."
                    />
                    <div className="text-center space-y-8 text-black text-base md:text-lg">
                        <p className="font-semibold">
                            Innovate with Our Global B2B Technology Team (Canada)
                        </p>

                        <p>
                            We are a dynamic organization committed to the professional progress of our innovators. At <b>TravelOne Technologies Inc. (Canada)</b>, you have the opportunity to make an impact in a setting that recognizes individual career aspirations in <b>data science, AI orchestration, and software architecture</b>.
                        </p>

                        <p>
                            Connect with us at <b>careers@travelone.io</b> if you are ready to join a high-performing R&D team that is redefining the "Science of Travel."
                        </p>

                        <p className="font-semibold">
                            Join Our Global Service & Strategy Team (USA)
                        </p>

                        <p>
                            For those looking to advance their career as a travel professional within a secure, global service framework, our U.S. entity <b>TravelOne Global Travel Services LLC (USA)</b> is looking for experts in global logistics and destination strategy.
                        </p>

                        <p>
                            Connect with us at <b>connect@traveloneglobal.com</b> to explore opportunities within our international service and fulfillment team.
                        </p>
                    </div>
                </div>

                <FullBannerSection />
                <CommonFooter />
            </>}
        </>
    );
}
