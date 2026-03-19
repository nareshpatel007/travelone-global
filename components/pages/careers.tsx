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

                <div className="max-w-7xl mx-auto px-5 md:px-0 py-6">
                    <PageHeading
                        main="Careers"
                        sub="Join our team and make your travel dreams come true."
                    />
                    <div className="text-center space-y-8 text-black text-base md:text-lg">
                        <p>
                            JOINING OUR TEAM
                        </p>
                        
                        <p>
                            Finding your niche in the travel industry as a travel professional
                        </p>
                        
                        <p>
                            When you advance in your career, we advance as a company because we are a dynamic organisation that is committed to the professional progress of all of our employees. At TravelOne, you will have the opportunity to make an impact in a setting that recognises individual career aspirations and provides chances for professional development to promote ongoing advancement. Connect with us at connect@traveloneglobal.com if you think that being a part of a high-performing team that is also very creative and entertaining sounds like something that you would enjoy doing. Find out what your dreams are with our help, and then let's work together to make them a reality.
                        </p>
                        
                        <p>
                            We are the creators of dreams...
                        </p>
                        
                        <p>
                            All of us.
                        </p>
                    </div>
                </div>

                <FullBannerSection />
                <CommonFooter />
            </>}
        </>
    );
}
