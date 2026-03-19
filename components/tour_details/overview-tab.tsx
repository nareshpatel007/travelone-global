"use client"

import { ArrowRight, MoveRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Define props
type Props = {
    activeTab: string;
    tour: any;
    metaData: any;
    city_nights: any;
    tour_packages: any;
    attractions: any;
    tour_terms: any;
    payment_schedule: any;
    cancellation_payment: any;
}

export function OverviewTabContent({ activeTab, tour, metaData, city_nights, tour_packages, attractions, tour_terms, payment_schedule, cancellation_payment }: Props) {
    // Define cities
    const cities = Object.keys(attractions);

    // Define state
    const [activeCity, setActiveCity] = useState(cities[0]);

    return (
        <>
            {activeTab === "highlights" && (
                <div className="space-y-5">
                    <span className="text-base md:text-2xl block font-semibold md:font-medium text-black">Highlights</span>
                    <ul className="space-y-1">
                        {tour?.tour_highlights && tour?.tour_highlights.map((highlight: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-gray-700">
                                <span className="text-black font-bold">✓</span>
                                <span>{highlight}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t border-gray-300"></div>
                    <span className="text-base md:text-2xl block font-semibold md:font-medium text-black">Trip Flow</span>
                    <p className="text-gray-700 text-sm md:text-base">
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

            {activeTab === "hotels" && (
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
                                            <li key={idx} className="flex items-start gap-2 md:gap-3 text-gray-700 text-sm md:text-base">
                                                <span className="text-green-700 font-bold">
                                                    <ArrowRight className="w-4 h-4 text-black inline-block" />
                                                </span>
                                                <div>
                                                    {metaData?.is_remove_similar_in_hotel == "true" ? (
                                                        <>
                                                            <span className="font-semibold text-black">{city}:</span> {" "}{hotels.join(", ")}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="font-semibold text-black">{city}:</span> {" "}{hotels.join(", ")} or similar
                                                        </>
                                                    )}
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

            {activeTab === "activities" && (
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
                                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm md:text-base border transition cursor-pointer ${activeCity === city
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

            {activeTab === "inclusions-&-exclusions" && (
                <div className="space-y-6">
                    <div className="space-y-5">
                        <span className="text-base md:text-2xl block font-semibold md:font-medium text-black">Inclusions</span>
                        <ul className="space-y-1">
                            {tour_terms?.what_is_included && tour_terms?.what_is_included.map((item: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
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
                                <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
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

            {activeTab === "terms-&-conditions" && (
                <div className="space-y-6">
                    <div className="space-y-5">
                        <span className="text-base md:text-2xl block font-semibold md:font-medium text-black">Terms & Conditions</span>
                        <ul className="space-y-1">
                            {tour_terms?.terms_conditions && tour_terms?.terms_conditions.map((item: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                                    <span className="text-green-700 font-bold">
                                        <ArrowRight className="w-4 h-4 text-black inline-block" />
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-5">
                        <span className="text-base md:text-2xl block font-semibold md:font-medium text-black">Important Notes</span>
                        <ul className="space-y-1">
                            {tour_terms?.important_notes && tour_terms?.important_notes.map((item: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                                    <span className="text-red-700">
                                        <ArrowRight className="w-4 h-4 text-black inline-block" />
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {activeTab === "payment-&-cancellation" && (
                <div className="space-y-6">
                    <div className="space-y-5">
                        <span className="text-base md:text-2xl block font-semibold md:font-medium text-black">Payment Schedule</span>
                        <span className="text-md block text-gray-700 text-sm md:text-base">The payment schedule below outlines the required installments to confirm and maintain your reservation. Each payment ensures hotel, guide, and transport allocations are secured as per your confirmed itinerary. All payments are non-transferable and must be made in U.S. Dollars (USD) via bank transfer or approved payment link.</span>
                        <ul className="space-y-1">
                            {payment_schedule && payment_schedule.map((item: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
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
                            <li className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                                <span className="text-red-700">
                                    <ArrowRight className="w-4 h-4 text-black inline-block" />
                                </span>
                                <span>
                                    Late Payments: May result in cancellation & loss of deposit
                                </span>
                            </li>
                        </ul>

                        <span className="text-md block text-gray-700 text-sm md:text-base">“Non-transferable” = payment can’t be reused, reassigned, or moved to another booking or person.</span>
                    </div>
                    <div className="space-y-5">
                        <span className="text-base md:text-2xl block font-semibold md:font-medium text-black">Cancellation Policy</span>

                        <span className="text-md block text-gray-700 text-sm md:text-base">The following cancellation fees apply per person in the event of trip cancellation after booking confirmation. These charges are designed to cover non-refundable costs incurred with hotels, transportation, and local partners:</span>

                        <ul className="space-y-1">
                            {cancellation_payment?.slice().sort((a: any, b: any) => {
                                const getOrder = (d: string) => d.includes("+") ? 999 : parseInt(d.split("-")[0]);
                                return getOrder(b.days) - getOrder(a.days);
                            }).map((item: any, index: number) => (
                                <li key={index} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
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
        </>
    )
}
