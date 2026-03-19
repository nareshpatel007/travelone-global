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
        answer: "TravelOne is an online platform that connects travelers with travel providers, such as travel agencies, hotels, and tour operators, to provide a one-stop solution for all their travel needs.",
    },
    {
        question: "How does TravelOne work, and what are the benefits?",
        answer: "TravelOne works by aggregating a wide range of travel products and services, including hotels, car rentals, and travel packages, into one convenient platform. This allows travelers to easily compare prices and options, book their travel, and manage their itinerary all in one place. The benefits of a smart travel marketplace include convenience, time-saving, and cost-effectiveness.",
    },
    {
        question: "Can TravelOne provide the best travel deals?",
        answer: "Yes, TravelOne allows travelers to compare prices from multiple travel providers and find the best deals available. This can be especially beneficial for those looking to book hotels, travel packages or other travel services during peak periods when prices can be high.",
    },
    {
        question: "Is my personal and financial data safe on TravelOne?",
        answer: "TravelOne uses advanced security measures, such as encryption technology, to protect the personal and financial information of their users. Additionally, TravelOne complies with strict data privacy laws and regulations to ensure the protection of customer information.",
    },
    {
        question: "Does TravelOne charge hidden fees?",
        answer: "No, there are no hidden fees when booking through TravelOne. The prices displayed on the platform are all-inclusive and transparent.",
    },
    {
        question: "Can TravelOne simply modify or cancel my bookings?",
        answer: "Yes, TravelOne allows travelers to make changes or cancellations to their bookings through the platform, although this may be subject to the terms and conditions of the travel provider.",
    },
    {
        question: "How can TravelOne guarantee travel quality?",
        answer: "TravelOne typically have partnered with reputable and established travel providers to ensure the quality of travel services. TravelOne also has customer feedback systems and review mechanisms to help travelers make informed decisions about the quality of the services they book.",
    },
    {
        question: "How does TravelOne satisfy customers?",
        answer: "TravelOne aims to provide excellent customer satisfaction by offering a seamless and user-friendly booking experience. TravelOne has a customer support team available to assist with any questions or issues that may arise during the booking process.",
    },
    {
        question: "TravelOne accepts which payments?",
        answer: "TravelOne accepts a variety of payment methods, including credit/debit cards, PayPal, and bank transfers.",
    },
    {
        question: "How's TravelOne's customer service?",
        answer: "The customer support experience on TravelOne platform includes a range of options such as email, phone, and live chat support. TravelOne also have online help center and FAQs to assist customers in resolving common issues.",
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
