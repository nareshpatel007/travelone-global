"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

// Define inferface
interface Props {
    pageData: any;
}

export default function FAQsSection({ pageData }: Props) {
    // Define state
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    // If no data, return null
    if (!pageData?.single?.extra_data?.faqs) return null;

    return (
        <section className="max-w-7xl mx-auto px-5 md:px-0 py-12 space-y-12">
            <div className="text-center space-y-1">
                <h2 className="text-black text-3xl md:text-6xl leading-tight font-normal">
                    People Also Ask
                </h2>
                <span className="text-sm md:text-lg text-black">
                    Frequently Asked Questions
                </span>
            </div>
            <div className="space-y-5">
                {pageData?.single?.extra_data?.faqs.length > 0 && pageData?.single?.extra_data?.faqs.map((item: any, index: number) => (
                    <div key={index}>
                        <button
                            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                            className="w-full p-4 flex items-center justify-between border border-gray-200 transition-colors duration-200 text-left group hover:bg-gray-100 cursor-pointer"
                        >
                            <h3 className="text-sm md:text-base font-medium text-black pr-4 flex-1 group-hover:text-[#1E1E1E] block">
                                {item?.question}
                            </h3>
                            <ChevronDown
                                size={24}
                                className={`text-black flex-shrink-0 transition-transform duration-300 ${expandedIndex === index ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        {expandedIndex === index && (
                            <div className="p-4 border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-300">
                                <p className="text-black leading-relaxed text-base">
                                    {item?.answer || item?.answers}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}