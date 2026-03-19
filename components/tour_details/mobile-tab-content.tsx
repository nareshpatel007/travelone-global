"use client"

import { useEffect, useState } from "react";
import { OverviewTabContent } from "./overview-tab";
import { ItineraryTab } from "./itinerary-tab";
import { ArrowRight, MoveRight, X } from "lucide-react";
import Image from "next/image";

// Define tabs
const tabs1 = [
    "Highlights",
    "Hotels",
    "Activities",
];

const tabs2 = [
    "Inclusions & Exclusions",
    "Payment & Cancellation",
];

// Define props
interface Props {
    tour: any;
    city_nights: any;
    tour_packages: any;
    attractions: any;
    tour_terms: any;
    payment_schedule: any;
    cancellation_payment: any;
}

export default function MobileTabContent({ tour, city_nights, tour_packages, attractions, tour_terms, payment_schedule, cancellation_payment }: Props) {
    // Define cities
    const cities = Object.keys(attractions);

    // Define state
    const [itineraryLoading, setItineraryLoading] = useState<boolean>(false);
    const [activeMainTab, setActiveMainTab] = useState("package_details");
    const [activeTab1, setActiveTab1] = useState("highlights");
    const [activeTab2, setActiveTab2] = useState("inclusions-&-exclusions");
    const [itineraryData, setItineraryData] = useState<any>([]);
    const [activeCity, setActiveCity] = useState(cities[0]);

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
        <div id="packageDetails" className="bg-[#FFF9EE] p-5 md:px-10 md:py-8 space-y-5">
            <div className="grid grid-cols-2 gap-0">
                <button
                    onClick={() => setActiveMainTab("package_details")}
                    className={`px-2 py-2 text-base font-medium transition-colors capitalize border border-amber-300 cursor-pointer ${activeMainTab === "package_details" ? "text-black bg-amber-200 " : "bg-white text-black"}`}
                >
                    Package Details
                </button>
                <button
                    onClick={() => setActiveMainTab("itinerary")}
                    className={`px-2 py-2 text-base font-medium transition-colors capitalize border border-amber-300 cursor-pointer ${activeMainTab === "itinerary" ? "text-black bg-amber-200 " : "bg-white text-black"}`}
                >
                    Tour Itinerary
                </button>
            </div>

            {activeMainTab === "package_details" && (
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-1 items-center">
                        {tabs1.map((tab) => {
                            const tabKey1 = tab.toLowerCase().replace(/\s+/g, "-");
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab1(tabKey1)}
                                    className={`px-2 py-2 text-sm font-medium transition-colors capitalize border cursor-pointer ${activeTab1 === tabKey1 ? "text-white bg-black border-black" : "bg-white text-black border-gray-300"}`}
                                >
                                    {tab}
                                </button>
                            );
                        })}
                    </div>
                    <div className="bg-white border-1 border-black rounded p-4">
                        {/* Highlights */}
                        {activeTab1 === "highlights" && (
                            <div className="space-y-5">
                                <span className="text-base md:text-2xl block font-semibold md:font-medium text-black">Highlights</span>
                                <ul className="space-y-1">
                                    {tour?.tour_highlights && tour?.tour_highlights.map((highlight: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2 md:gap-3 text-base text-gray-700">
                                            <span className="text-black font-bold">✓</span>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="border-t border-gray-300"></div>
                                <span className="text-base md:text-2xl block font-semibold md:font-medium text-black">Trip Flow</span>
                                <p className="text-gray-700 text-base">
                                    {city_nights.map((item: any, index: number) => (
                                        <span key={index} className="inline-flex items-center">
                                            {item.name}
                                            {item.night > 0 && (
                                                <span>&nbsp;({item.night} {item.night > 1 ? "Nights" : "Night"})
                                                </span>
                                            )}
                                            {index < city_nights.length - 1 && (
                                                <MoveRight className="h-4 w-4 mx-1 inline-flex" />
                                            )}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        )}

                        {/* Hotels */}
                        {activeTab1 === "hotels" && (
                            <div className="space-y-6">
                                {tour_packages && tour_packages.map((item: any, index: number) => {
                                    if (item.name === 'Without Stay') return null;
                                    const accommodation = typeof item.accommodation === "string" ? JSON.parse(item.accommodation) : item.accommodation;
                                    return (
                                        <div key={index} className="space-y-4">
                                            <span className="text-base md:text-2xl block font-semibold md:font-medium text-black">
                                                {item.name}
                                            </span>
                                            <ul className="space-y-1">
                                                {Object.entries(accommodation).map(
                                                    ([city, hotels]: [string, any], idx: number) => (
                                                        <li key={idx} className="flex items-start gap-2 md:gap-3 text-gray-700 text-base">
                                                            <span className="text-green-700 font-bold">
                                                                <ArrowRight className="w-4 h-4 text-black inline-block" />
                                                            </span>
                                                            <div>
                                                                <span className="font-semibold text-black">{city}:</span>
                                                                {" "}{hotels.join(", ")} or similar
                                                            </div>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {activeTab1 === "activities" && (
                            <div className="space-y-6">
                                {/* SECTION TITLE */}
                                <span className="text-base md:text-2xl block font-semibold text-black">
                                    Activities
                                </span>

                                {/* TABS */}
                                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                                    {cities.map((city) => (
                                        <button
                                            key={city}
                                            onClick={() => setActiveCity(city)}
                                            className={`whitespace-nowrap px-5 py-2 rounded-full text-base border transition cursor-pointer ${activeCity === city
                                                ? "bg-black text-white border-black"
                                                : "bg-white text-black border-gray-300 hover:border-black"
                                                }`}
                                        >
                                            {city}
                                        </button>
                                    ))}
                                </div>

                                {/* ATTRACTIONS GRID */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {attractions[activeCity]?.map((place: any, index: number) => (
                                        <div
                                            key={index}
                                            className="group relative rounded-sm overflow-hidden aspect-square cursor-pointer"
                                        >
                                            {/* IMAGE */}
                                            <Image
                                                src={place.image}
                                                alt={place.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />

                                            {/* GRADIENT OVERLAY */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />

                                            {/* CENTERED TITLE */}
                                            <div className="absolute inset-0 flex items-center justify-center px-3">
                                                <p className="text-white text-sm md:text-xl font-medium text-center leading-snug drop-shadow-md">
                                                    {place.name}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* For Tab 2 Section */}
                    <div className="grid grid-cols-2 gap-1 items-center">
                        {tabs2.map((tab) => {
                            const tabKey2 = tab.toLowerCase().replace(/\s+/g, "-");
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab2(tabKey2)}
                                    className={`px-2 py-2 text-sm font-medium transition-colors capitalize border cursor-pointer ${activeTab2 === tabKey2 ? "text-white bg-black border-black" : "bg-white text-black border-gray-300"}`}
                                >
                                    {tab}
                                </button>
                            );
                        })}
                    </div>
                    <div className="bg-white border-1 border-black rounded p-4">
                        {/* INCLUSIONS & EXCLUSIONS */}
                        {activeTab2 === "inclusions-&-exclusions" && (
                            <div className="space-y-6">
                                <div className="space-y-5">
                                    <span className="text-base md:text-2xl block font-semibold md:font-medium text-black">Inclusions</span>
                                    <ul className="space-y-1">
                                        {tour_terms?.what_is_included && tour_terms?.what_is_included.map((item: any, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3 text-gray-700 text-base">
                                                <span className="text-green-700 font-bold">✓</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="space-y-5">
                                    <span className="text-base md:text-2xl block font-semibold md:font-medium text-black">Exclusions</span>
                                    <ul className="space-y-1">
                                        {tour_terms?.what_is_not_included && tour_terms?.what_is_not_included.map((item: any, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3 text-gray-700 text-base">
                                                <span className="text-red-700">
                                                    <X className="w-4 h-4 inline-block" />
                                                </span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* PAYMENT SCHEDULE */}
                        {activeTab2 === "payment-&-cancellation" && (
                            <div className="space-y-6">
                                <div className="space-y-5">
                                    <span className="text-base md:text-2xl block font-semibold md:font-medium text-black">Payment Schedule</span>
                                    <span className="text-md block text-gray-700 text-base">The payment schedule below outlines the required installments to confirm and maintain your reservation. Each payment ensures hotel, guide, and transport allocations are secured as per your confirmed itinerary. All payments are non-transferable and must be made in U.S. Dollars (USD) via bank transfer or approved payment link.</span>
                                    <ul className="space-y-1">
                                        {payment_schedule && payment_schedule.map((item: any, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3 text-gray-700 text-base">
                                                <span className="text-red-700">
                                                    <ArrowRight className="w-4 h-4 text-black inline-block" />
                                                </span>
                                                <span>
                                                    {idx === 0 ? (
                                                        <>Deposit - {item.percentage}% at booking</>
                                                    ) : (
                                                        <>
                                                            {item.percentage}% payment - {item.days} days before departure
                                                        </>
                                                    )}
                                                </span>
                                            </li>
                                        ))}
                                        <li className="flex items-start gap-3 text-gray-700 text-base">
                                            <span className="text-red-700">
                                                <ArrowRight className="w-4 h-4 text-black inline-block" />
                                            </span>
                                            <span>
                                                Late Payments: May result in cancellation & loss of deposit
                                            </span>
                                        </li>
                                    </ul>

                                    <span className="text-md block text-gray-700 text-base">“Non-transferable” = payment can’t be reused, reassigned, or moved to another booking or person.</span>
                                </div>
                                <div className="space-y-5">
                                    <span className="text-base md:text-2xl block font-semibold md:font-medium text-black">Cancellation Policy</span>

                                    <span className="text-md block text-gray-700 text-base">The following cancellation fees apply per person in the event of trip cancellation after booking confirmation. These charges are designed to cover non-refundable costs incurred with hotels, transportation, and local partners:</span>

                                    <ul className="space-y-1">
                                        {cancellation_payment?.slice().sort((a: any, b: any) => {
                                            const getOrder = (d: string) => d.includes("+") ? 999 : parseInt(d.split("-")[0]);
                                            return getOrder(b.days) - getOrder(a.days);
                                        }).map((item: any, index: number) => (
                                            <li key={index} className="flex items-start gap-3 text-gray-700 text-base">
                                                <span className="text-red-700">
                                                    <ArrowRight className="w-4 h-4 text-black inline-block" />
                                                </span>
                                                <span>
                                                    {item.days} days{" "}
                                                    {item.days.includes("+") ? "prior to departure" : "before departure"}
                                                    :{" "}
                                                    {index === 0 ? "USD 500 per person." : `${item.percentage === 0 ? 100 : item.percentage}% of the total price.`}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeMainTab === "itinerary" && <ItineraryTab
                isAdsLanding={true}
                itineraryLoading={itineraryLoading}
                itineraryData={itineraryData}
            />}
        </div>
    )
}
