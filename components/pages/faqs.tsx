"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import PageHeading from "@/components/common/page-heading";
import { ChevronDown } from "lucide-react";

// Define faqs
const data = [
    {
        question: "What is TravelOne?",
        answer: "TravelOne is a premier U.S.-based travel orchestration platform. We utilize a proprietary 30-Marker Traveler DNA framework—architected by our partners at TravelOne Technologies Inc.—to connect international travelers with a vetted network of premier providers, hotels, and tour operators.",
    },
    {
        question: "Who manages my travel bookings and payments?",
        answer: `All travel counseling, bookings, and financial transactions are managed exclusively by TravelOne Global Travel Services LLC, a United States-incorporated entity and the designated Merchant of Record (MoR). While our core "Traveler DNA" technology is developed by our partners in Canada, all travel-related services and contracts are governed by U.S. law.`,
    },
    {
        question: "Is TravelOne registered with TICO (Ontario)?",
        answer: `No. TravelOne Global Travel Services LLC is a foreign entity incorporated in the United States. We do not provide travel counseling or travel services from within Ontario, Canada. Consequently, we are not registered with the Travel Industry Council of Ontario (TICO), and transactions are not covered by the Ontario Travel Industry Compensation Fund.`,
    },
    {
        question: `How does the "Traveler DNA" work?`,
        answer: `Our platform uses architectural precision to skip traditional search bars. By decoding your unique Traveler DNA, we orchestrate itineraries perfectly matched to your persona. This high-fidelity matching is powered by the intelligence engine built at our Toronto B2B Innovation Hub.`,
    },
    {
        question: `Can TravelOne provide the best travel deals?`,
        answer: `Yes. Our AI engine scans our global partner network in real-time to surface the highest-value options. This is particularly effective for bespoke packages and luxury stays where our "DNA" matching ensures you get the right value for your specific travel style.`,
    },
    {
        question: `Is my data safe?`,
        answer: `Absolutely. We utilize AES-256 encryption and architectural siloing. Your financial data is handled securely by our U.S. Merchant of Record and is never accessible to the R&D systems in our Canadian tech hub. We comply with global privacy standards, including GDPR, CCPA, and PIPEDA.`,
    },
    {
        question: `How do I modify or cancel my bookings?`,
        answer: `You can manage your itinerary directly through the TravelOne platform. Changes and cancellations are subject to the specific terms of the travel provider, which are clearly disclosed by our U.S. service team at the time of booking.`,
    },
    {
        question: `How does TravelOne guarantee quality?`,
        answer: `We only partner with established, tier-one Destination Management Companies (DMCs) and suppliers. Our "Local Soul" data units feed real-time quality scores into our system to ensure our partners maintain the highest international standards.`,
    },
    {
        question: `What payment methods are accepted?`,
        answer: `As the Merchant of Record, TravelOne Global Travel Services LLC (USA) accepts all major credit/debit cards (Visa, Mastercard, Amex), as well as secure digital payment options like PayPal.`,
    },
    {
        question: `How is your customer service structured?`,
        answer: `Our global support framework includes email and live chat. For travelers on the road, our U.S. Service Hub, led by CEO Pranav Amin, provides dedicated assistance to ensure every detail of your "DNA-matched" journey is executed perfectly.`,
    }
];

export default function FAQPage() {
    // Define state
    const [ready, setReady] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    useEffect(() => {
        requestAnimationFrame(() => {
            setReady(true);
        });
    }, []);

    return (
        <>
            {ready && <>
                <CommonHeader />

                <div className="max-w-5xl mx-auto px-5 md:px-0 py-6">
                    <PageHeading
                        main="FAQs"
                        sub="Frequently Asked Questions"
                    />
                    <div className="space-y-5">
                        {data.map((item: any, index: number) => (
                            <div key={index}>
                                <button
                                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                    className="w-full p-4 flex items-center justify-between border border-gray-200 transition-colors duration-200 text-left group hover:bg-gray-100 cursor-pointer"
                                >
                                    <span className="text-sm md:text-base font-medium text-black pr-4 flex-1 group-hover:text-[#1E1E1E] block">
                                        {item?.question}
                                    </span>
                                    <ChevronDown
                                        size={24}
                                        className={`text-black flex-shrink-0 transition-transform duration-300 ${expandedIndex === index ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                {expandedIndex === index && (
                                    <div className="p-4 border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <p className="text-black leading-relaxed text-base">{item?.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <CommonFooter />
            </>}
        </>
    );
}
