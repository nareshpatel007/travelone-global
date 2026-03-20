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
        answer: "TravelOne is a global AI-driven travel orchestration platform. We utilize a proprietary 30-Marker Traveler DNA framework to connect international travelers with a vetted network of premier travel providers, hotels, and tour operators.",
    },
    {
        question: "How does TravelOne work?",
        answer: "Our platform, architected by our B2B Tech Hub in Toronto, aggregates global travel products into a synchronized ecosystem. This allows travelers to skip traditional search bars and receive itineraries perfectly matched to their Persona. All travel fulfillment and financial transactions are managed exclusively by TravelOne Global Travel Services LLC (USA).",
    },
    {
        question: "Can TravelOne provide the best travel deals?",
        answer: 'Yes. Our AI engine scans our global partner network in real-time to surface the highest-value options. This is particularly effective for bespoke packages and luxury stays where our "DNA" matching ensures you get the right value for your specific travel style.',
    },
    {
        question: "Is my data safe on TravelOne?",
        answer: "Absolutely. We utilize AES-256 encryption and architectural siloing. Your financial data is handled by the U.S. Merchant of Record and is never accessible to the AI systems in our Canadian tech hub. We comply with global privacy standards, including GDPR, CCPA, and PIPEDA.",
    },
    {
        question: "Does TravelOne charge hidden fees?",
        answer: "No. Transparency is a core pillar of our Trust Centre. The prices displayed include all known taxes and fees. Our AI orchestration ensures you see the total cost before you authorize a transaction.",
    },
    {
        question: "How do I modify or cancel my bookings?",
        answer: "You can manage your itinerary directly through the TravelOne platform. Changes and cancellations are subject to the specific terms of the travel provider, which are clearly disclosed by TravelOne USA at the time of booking.",
    },
    {
        question: "How does TravelOne guarantee quality?",
        answer: 'We only partner with established, tier-one Destination Management Companies (DMCs) and suppliers. Our "Local Soul" data units feed real-time quality scores into our AI to ensure our partners maintain the highest international standards.',
    },
    {
        question: "How does TravelOne satisfy customers?",
        answer: 'We provide a seamless, high-fidelity experience by removing the "friction" of traditional travel planning. Our U.S.-based Service Team is available to assist with any logistical questions during your journey.',
    },
    {
        question: "Which payment methods are accepted?",
        answer: "As the Merchant of Record, TravelOne Global Travel Services LLC (USA) accepts all major credit/debit cards (Visa, Mastercard, Amex), as well as secure digital payment options like PayPal.",
    },
    {
        question: "How is TravelOne’s customer service?",
        answer: 'Our global support framework includes email and live chat. For travelers on the road, our U.S. Service Hub provides dedicated assistance to ensure every detail of your "DNA-matched" journey is executed perfectly.',
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

                <div className="max-w-7xl mx-auto px-5 md:px-0 py-6">
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
