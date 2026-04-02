"use client";

import { Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { StartJourneyModal } from "../plan_your_trip/journey-popup";
import { CountryWhyPopup } from "./country-why-popup";
import UnlockPremiumAccess from "./membership/unlock-access";

// Tooltips
const perfectMatchTooltips: Record<string, string> = {
    "Soul": "This destination is your Spiritual Equal; it is selected because its deepest natural rhythm and silence align perfectly with your inner core.",
    "Climate": "This destination is your Environmental Mirror; it perfectly captures the specific temperature and atmospheric energy your DNA requires to thrive.",
    "System": "This destination is your Operational Ideal; it provides the exact level of technological precision and infrastructure your lifestyle demands.",
    "Surface": "This destination is your Cultural Match; it is chosen for its mastery of the specific artistic, culinary, and historical textures you value most."
};

type Props = {
    token: string;
    isLocked: boolean;
    resultData: any;
    destinationList: any;
    countriesList: any;
    setChoosePlan: any;
    setPlanAmount: any;
    setOpenMakePayment: any;
};

export default function CountriesList({ token, isLocked, resultData, destinationList, countriesList, setChoosePlan, setPlanAmount, setOpenMakePayment }: Props) {
    // Validation
    if (!token) return null;

    // Define state
    const [selectedDestination, setSelectedDestination] = useState("all");
    const [openStartJourney, setOpenStartJourney] = useState(false);
    const [journeyCountry, setJourneyCountry] = useState<string>("");
    const [activeCountry, setActiveCountry] = useState<any>(null);
    const [showWhyPopup, setShowWhyPopup] = useState(false);

    // Filter countries
    const filteredCountries = selectedDestination === "all" ? countriesList : countriesList.filter(
        (country: any) => country?.destination_name === selectedDestination
    );

    return (
        <>
            <div className="p-5 md:p-10 space-y-8">
                {!isLocked && (
                    <div className="max-w-5xl mx-auto space-y-2 text-center">
                        <h2 className="text-black text-3xl md:text-6xl leading-tight font-normal md:max-w-4xl md:mx-auto">
                            Territory Alignment: Your Global Destinations
                        </h2>
                        <div className="space-y-3">
                            <p className="text-black text-md md:max-w-4xl md:mx-auto">
                                The optimal geographic environments selected to host your unique Travel DNA.
                            </p>
                            <p className="text-black text-md">
                                We have identified these countries because their local infrastructure offers the most seamless alignment with your profile. By selecting a territory from this list, you are choosing a destination that is naturally 'pre-synced' to your expectations of pulse, grit, and service.
                            </p>
                        </div>
                    </div>
                )}
                <div className="space-y-8">
                    {/* Unlock Premium Access */}
                    {isLocked && <UnlockPremiumAccess
                        setChoosePlan={setChoosePlan}
                        setPlanAmount={setPlanAmount}
                        setOpenMakePayment={setOpenMakePayment}
                    />}

                    {!isLocked && (
                        <div className="flex gap-3 items-center overflow-x-auto pb-2 md:flex-wrap md:justify-center scrollbar-hide">
                            <FilterButton
                                active={selectedDestination === "all"}
                                label="Top Destinations Matching Your DNA"
                                onClick={() => setSelectedDestination("all")}
                            />

                            {destinationList && destinationList.map((destination: any, index: number) => (
                                <FilterButton
                                    key={index}
                                    label={destination}
                                    active={selectedDestination === destination}
                                    onClick={() =>
                                        setSelectedDestination(destination)
                                    }
                                />
                            ))}
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredCountries.length > 0 && filteredCountries.map((item: any, index: number) => (
                            <div key={index} className="relative w-full">
                                {/* Badge + Tooltip */}
                                {!isLocked && resultData?.data?.match_perfect && resultData?.data?.match_perfect?.[item?.id] && (
                                    <div className="absolute top-3 left-3 z-50">
                                        <span className="inline-flex items-center gap-2 px-4 py-1 text-sm md:text-base font-medium bg-yellow-400 text-black rounded-full">
                                            ★ Perfect Match - {resultData?.data?.match_perfect?.[item?.id]}

                                            <span className="relative group flex items-center">
                                                <Info size={16} className="cursor-pointer" />

                                                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 p-3 text-sm text-white bg-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition z-50">
                                                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rotate-45"></span>
                                                    {perfectMatchTooltips[resultData?.data?.match_perfect?.[item?.id]]}
                                                </span>
                                            </span>
                                        </span>
                                    </div>
                                )}

                                <div className={`relative w-full pb-[60%] overflow-hidden group ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                    <Image
                                        src={item?.featured_image || "/placeholder.svg"}
                                        alt={item?.name || "placeholder"}
                                        fill
                                        className={`object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform ${isLocked ? "blur-2xl" : ""
                                            }`}
                                    />

                                    {!isLocked && (
                                        <div className="absolute bottom-4 left-4 right-4 space-y-2">
                                            <div className="w-fit bg-black/50 rounded px-3 py-1">
                                                <h3 className="text-white text-md md:text-3xl font-medium leading-snug">
                                                    {item.name}
                                                </h3>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    onClick={() => {
                                                        setOpenStartJourney(true);
                                                        setJourneyCountry(item?.name);
                                                    }}
                                                    className="flex items-center justify-center text-sm md:text-base gap-2 px-6 py-2 bg-black text-white rounded hover:bg-yellow-400 hover:text-black cursor-pointer"
                                                >
                                                    Plan Your {item?.name} DNA Itinerary
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setActiveCountry(item);
                                                        setShowWhyPopup(true);
                                                    }}
                                                    className="flex items-center justify-center text-sm md:text-base gap-2 px-6 py-2 bg-black text-white rounded hover:bg-yellow-400 hover:text-black cursor-pointer"
                                                >
                                                    Why {item.name} for your Profile?
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Start Journey */}
            <StartJourneyModal
                selectedCountry={journeyCountry}
                open={openStartJourney}
                onOpenChange={setOpenStartJourney}
                isPersonaResult={token}
            />

            {/* Country Why */}
            <CountryWhyPopup
                open={showWhyPopup}
                onOpenChange={setShowWhyPopup}
                item={activeCountry}
            />
        </>
    );
}

// Filter button
function FilterButton({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium border cursor-pointer transition
                ${active
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:border-black"
                }`}
        >
            {label}
        </button>
    );
}