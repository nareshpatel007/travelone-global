"use client"

import { useState } from "react";
import { TermsTabContent } from "./terms-tab-content";

// Define tab name
const tabs = [
    {
        name: "Inclusions & Exclusions",
        key: "inclusions-exclusions",
    },
    {
        name: "Terms & Conditions",
        key: "terms-conditions",
    },
    {
        name: "Payment Schedule",
        key: "payment-schedule",
    },
    {
        name: "Cancellation Policy",
        key: "cancellation-policy",
    },
    {
        name: "Important Notes",
        key: "important-notes",
    }
];

// Define props
type Props = {
    termsData: any;
    paymentSchedule: any;
    cancellationPolicy: any;
}

export function TermsTab({ termsData, paymentSchedule, cancellationPolicy }: Props) {
    // If data empty, return null
    if (!termsData) return null;

    // Define state
    const [activeTab, setActiveTab] = useState("inclusions-exclusions");

    return (
        <div className="bg-[#FFF9EE] py-5 md:py-7">
            <div className="hidden md:grid lg:grid grid-cols-1 md:grid-cols-4 gap-3 min-h-96">
                <div className="col-span-1 flex flex-col gap-2">
                    {tabs.map((tab, index) => {
                        return (
                            <button
                                key={index}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-4 py-3 text-left font-medium rounded border border-black cursor-pointer transition-all text-sm md:text-base ${activeTab === tab.key
                                    ? "bg-black text-white"
                                    : "bg-white text-black !border-[#d9cec1] hover:bg-black hover:text-white"
                                    }`}
                            >
                                {tab.name}
                            </button>
                        );
                    })}
                </div>
                <div className="col-span-3 bg-white border-1 border-[#d9cec1] rounded !p-8">
                    <TermsTabContent
                        activeTab={activeTab}
                        termsData={termsData}
                        paymentSchedule={paymentSchedule}
                        cancellationPolicy={cancellationPolicy}
                    />
                </div>
            </div>
            <div className="block md:hidden lg:hidden space-y-4">
                <div className="col-span-1 flex flex-col gap-2">
                    <select
                        value={activeTab}
                        onChange={(e) => setActiveTab(e.target.value)}
                        className="border border-[#d9cec1] p-3 rounded-sm font-semibold text-sm"
                    >
                        {tabs.map((tab, index) => (
                            <option key={index} value={tab.key}>
                                {tab.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="bg-white border-1 border-[#d9cec1] rounded p-4">
                    <TermsTabContent
                        activeTab={activeTab}
                        termsData={termsData}
                        paymentSchedule={paymentSchedule}
                        cancellationPolicy={cancellationPolicy}
                    />
                </div>
            </div>
        </div>
    )
}
