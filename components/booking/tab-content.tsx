"use client";

import { useEffect, useState } from "react";
import { ItineraryTab } from "./itinerary-tab";
import { WalletNotesTab } from "./wallet-notes";
import { TermsTab } from "./terms-tab";
import TravellerInfoTab from "./traveller-info";
import PaymentsTab from "./payments-tab";

// Define props
interface Props {
    activeTab?: string;
    orderData: any;
    cartData: any;
    itineraryData: any;
    travellerData: any;
    walletNotes: any;
    termsData: any;
    paymentSchedule: any;
    paymentHistory: any;
    cancellationPolicy: any;
}

export default function TabContent({
    activeTab = "itinerary",
    orderData,
    cartData,
    itineraryData,
    travellerData,
    walletNotes,
    termsData,
    paymentSchedule,
    paymentHistory,
    cancellationPolicy,
}: Props) {
    // Define state
    const [activeMainTab, setActiveMainTab] = useState("itinerary");

    // Default active tab
    useEffect(() => {
        if(activeTab === "travellers_info") {
            setActiveMainTab("travellers_info");
        } else if(activeTab === "payments") {
            setActiveMainTab("payments");
        } else if(activeTab === "wallet_notes") {
            setActiveMainTab("wallet_notes");
        } else if(activeTab === "terms") {
            setActiveMainTab("terms");
        } else {
            setActiveMainTab("itinerary");
        }
    }, [activeTab]);

    // Define tabs
    const tabs = [
        { key: "itinerary", label: "Itinerary" },
        { key: "travellers_info", label: "Traveller's Info" },
        { key: "payments", label: "Payments" },
        { key: "wallet_notes", label: "Credit / Debit Notes" },
        { key: "terms", label: "Terms" },
    ];

    return (
        <div className="bg-[#FFF9EE] p-4 md:px-10 md:py-8">
            <div className="border-b border-[#d9cec1]">
                <div className="flex gap-6 md:gap-12 overflow-x-auto md:overflow-visible whitespace-nowrap scroll-smooth no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveMainTab(tab.key)}
                            className={`
                                pb-3 md:pb-4
                                text-sm md:text-lg
                                font-medium
                                transition-all
                                cursor-pointer
                                ${activeMainTab === tab.key
                                    ? "text-black border-b-2 border-black"
                                    : "text-gray-700 hover:text-black hover:border-b-2 hover:border-black"
                                }
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                {activeMainTab === "itinerary" && (
                    <ItineraryTab itineraryData={itineraryData} />
                )}
                {activeMainTab === "travellers_info" && <TravellerInfoTab
                    orderData={orderData}
                    cartData={cartData}
                    travellerData={travellerData}
                />}
                {activeMainTab === "payments" && <PaymentsTab
                    orderData={orderData}
                    paymentHistory={paymentHistory}
                />}
                {activeMainTab === "wallet_notes" && (
                    <WalletNotesTab walletNotes={walletNotes} />
                )}
                {activeMainTab === "terms" && (
                    <TermsTab
                        termsData={termsData}
                        paymentSchedule={paymentSchedule}
                        cancellationPolicy={cancellationPolicy}
                    />
                )}
            </div>
        </div>
    );
}