"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import PageHeading from "../common/page-heading";
import PressSingleCard from "../press/press-card";
import MediaInquiries from "../press/media-inquiries";
import FounderSection from "../press/founder";

// Define press list
const pressList: any = [
    {
        bannerImage: "/press/1163.jpg",
        mainImage: "/press/media_1/banner.png",
        logoImage: "/press/media_1/logo.svg",
        cardTitle: "The Economic Times (ET TravelWorld)",
        headline: "TravelOne Technologies launches AI-driven Global Traveller DNA platform in $165.9B market",
        snippet: "Toronto-based Indian startup targets AI data gap in USD 165.9B travel market... bridging the gap between reactive search and predictive intelligence.",
        link: "https://travel.economictimes.indiatimes.com/news/technology/travelone-technologies-launches-ai-driven-global-traveller-dna-platform-in-1659b-market/128960290"
    },
    {
        bannerImage: "/press/427.jpg",
        mainImage: "/press/media_2/banner.png",
        logoImage: "/press/media_2/logo.png",
        cardTitle: "The Financial Express",
        headline: "The death of generic vacations: How this Indian’s Toronto startup is coding your Traveller DNA",
        snippet: "Bhavin Vora’s TravelOne is moving the industry beyond the 'one-size-fits-all' model by mapping the subconscious psychological markers of the modern traveler.",
        link: "https://www.financialexpress.com/world-news/the-death-of-generic-vacations-how-this-indians-toronto-startup-is-coding-your-traveler-dna/4161600/"
    },
    {
        bannerImage: "/press/4512.jpg",
        mainImage: "/press/media_3/banner.png",
        logoImage: "/press/media_3/logo.png",
        mainImageWidth: 80,
        cardTitle: "Travel Trade Today",
        headline: "TravelOne unveils AI-driven Global Traveller DNA platform in $165.9B market",
        snippet: "A new standard for behavioral data intelligence: TravelOne’s 30-marker framework is set to redefine personalization for OTAs, airlines, and hotel groups.",
        link: "https://traveltrade.today/travel-technology/travelone-unveils-ai-driven-global-traveller-dna-platform-in-165-9b-market/"
    }
];

export default function PressPage() {
    // Define state
    const [ready, setReady] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => { setReady(true); });
    }, []);

    return (
        <>
            {ready && <>
                <CommonHeader />

                <div className="max-w-7xl mx-auto px-5 md:px-0 pt-6">
                    <PageHeading
                        main="TravelOne in the Spotlight"
                        sub="Shaping the future of global travel through data intelligence and the power of Traveller DNA."
                    />    
                </div>

                <div className="px-4 md:px-8">
                    {pressList.map((item: any, index: number) => (
                        <PressSingleCard data={item} index={index} />
                    ))}
                </div>

                <MediaInquiries />
                <FounderSection />

                <CommonFooter />
            </>}
        </>
    );
}
