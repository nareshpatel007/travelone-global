"use client"

import { useEffect, useState } from "react";
import { OverviewTabContent } from "./overview-tab";
import { ItineraryTab } from "./itinerary-tab";

const tabs = [
    "Highlights",
    "Hotels",
    "Activities",
    "Inclusions & Exclusions",
    "Terms & Conditions",
    "Payment & Cancellation",
];

// Define props
interface Props {
    tour: any;
    metaData: any;
    city_nights: any;
    tour_packages: any;
    attractions: any;
    tour_terms: any;
    payment_schedule: any;
    cancellation_payment: any;
}

export default function TabContent({ tour, metaData, city_nights, tour_packages, attractions, tour_terms, payment_schedule, cancellation_payment }: Props) {
    // Define state
    const [itineraryLoading, setItineraryLoading] = useState<boolean>(false);
    const [activeMainTab, setActiveMainTab] = useState("package_details");
    const [activeTab, setActiveTab] = useState("highlights");
    const [itineraryData, setItineraryData] = useState<any>([]);

    // On click load itinerary tab
    useEffect(() => {
        const controller = new AbortController();
        const fetchTours = async () => {
            if (activeMainTab === "itinerary" && itineraryData.length === 0) {
                setItineraryLoading(true);
                try {
                    // Fetch the data
                    const response = await fetch("/api/tours/single/itinerary", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ tour_id: tour?.id })
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    // Parse the JSON response
                    const data = await response.json();

                    // Update the state
                    setItineraryData(data?.data ?? []);
                } catch (error: any) {
                    if (error.name !== "AbortError") {
                        console.error("Failed to fetch single tour:", error);
                    }
                } finally {
                    setItineraryLoading(false);
                }
            }
        };
        fetchTours();
        return () => controller.abort();
    }, [activeMainTab]);

    return (
        <div id="packageDetails" className="bg-[#FFF9EE] p-5 md:px-10 md:py-8">
            <div className="border-b border-[#d9cec1]">
                <div className="flex gap-8">
                    <button
                        onClick={() => setActiveMainTab("package_details")}
                        className={`pb-4 text-lg font-medium transition-colors capitalize cursor-pointer ${activeMainTab === "package_details" ? "text-black border-b-2 border-black" : "text-black hover:border-b-2 hover:border-black"
                            }`}
                    >
                        Package Details
                    </button>
                    <button
                        onClick={() => setActiveMainTab("itinerary")}
                        className={`pb-4 text-lg font-medium transition-colors capitalize cursor-pointer ${activeMainTab === "itinerary" ? "text-black border-b-2 border-black" : "text-black hover:border-b-2 hover:border-black"
                            }`}
                    >
                        Itinerary
                    </button>
                </div>
            </div>

            {activeMainTab === "package_details" && (
                <div className="py-7">
                    <div className="hidden md:grid lg:grid grid-cols-1 md:grid-cols-4 gap-4 min-h-96">
                        <div className="col-span-1 flex flex-col gap-2">
                            {tabs.map((tab) => {
                                const tabKey = tab.toLowerCase().replace(/\s+/g, "-");
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tabKey)}
                                        className={`px-4 py-3 text-left font-medium rounded border border-black cursor-pointer transition-all text-sm md:text-base ${activeTab === tabKey
                                            ? "bg-black text-white"
                                            : "bg-white text-black !border-[#d9cec1] hover:bg-black hover:text-white"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="col-span-3 bg-white border-1 border-[#d9cec1] rounded-sm p-8">
                            <OverviewTabContent
                                activeTab={activeTab}
                                tour={tour}
                                metaData={metaData}
                                city_nights={city_nights}
                                tour_packages={tour_packages}
                                attractions={attractions}
                                tour_terms={tour_terms}
                                payment_schedule={payment_schedule}
                                cancellation_payment={cancellation_payment}
                            />
                        </div>
                    </div>
                    <div className="block md:hidden lg:hidden">
                        <div className="col-span-1 flex flex-col gap-2">
                            <select
                                value={activeTab}
                                onChange={(e) => setActiveTab(e.target.value)}
                                className="border border-black p-3 rounded-sm font-semibold mb-4 text-sm"
                            >
                                {tabs.map((tab) => (
                                    <option key={tab} value={tab.toLowerCase().replace(/\s+/g, "-")}>
                                        {tab}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="bg-white border-1 border-black rounded p-4">
                            <OverviewTabContent
                                activeTab={activeTab}
                                tour={tour}
                                metaData={metaData}
                                city_nights={city_nights}
                                tour_packages={tour_packages}
                                attractions={attractions}
                                tour_terms={tour_terms}
                                payment_schedule={payment_schedule}
                                cancellation_payment={cancellation_payment}
                            />
                        </div>
                    </div>
                </div>
            )}

            {activeMainTab === "itinerary" && <ItineraryTab
                itineraryLoading={itineraryLoading}
                itineraryData={itineraryData}
            />}
        </div>
    )
}
