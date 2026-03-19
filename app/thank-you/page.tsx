"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import PageHeading from "@/components/common/page-heading";
import { useEffect, useState } from "react";

export default function Page() {
    // Define state
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        requestAnimationFrame(() => {
            setReady(true);
        });
    }, []);

    return (
        <>
            {ready && <>
                <CommonHeader />

                <div className="max-w-7xl mx-auto px-5 md:px-0 py-12 md:py-18">
                    <PageHeading
                        main="Your Private Journey is Now in Design"
                    />
                    <div className="text-center space-y-8 text-black text-base md:text-lg">
                        <p>
                            Thank you for sharing your vision. We’ve received your preferences, and our team is already reviewing your "vibe" and "flow" requirements.
                        </p>

                        <div className="space-y-3">
                            <p>
                                At TravelOne, we believe luxury is found in the details that AI cannot see. Unlike automated platforms, we are a Design & Delivery House. This means we don’t just plan your route; we own the execution on the ground.
                            </p>
                            <p>✓ We secure your Private 7-seat Luxury Van.</p>
                            <p>✓ We vet your English-speaking Chauffeur.</p>
                            <p>✓ We hand-pick your Elite Local Guides.</p>
                        </div>

                        <div className="space-y-3">
                            <p>The next step is to move from a concept to a signature plan. Because 2026 availability for top-tier Ryokans and private drivers is already tightening, we recommend a brief 15-minute Vision Consultation.</p>
                        </div>

                        <div className="space-y-3">
                            <p>On this call, we will:</p>
                            <p>1. Review your "Design Wizard" inputs.</p>
                            <p>2. Share 2–3 exclusive route concepts tailored to your pace.</p>
                            <p>3. Discuss the "Signature Touches" that will make your trip unique.</p>
                        </div>

                        {/* <p>Select a time for your Complimentary Vision Consultation:</p> */}
                    </div>
                </div>

                <CommonFooter />
            </>}
        </>
    );
}
