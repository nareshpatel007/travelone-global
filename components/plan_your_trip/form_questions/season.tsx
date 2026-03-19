"use client";

import { useEffect, useState } from "react";
import QuestionHeading from "./main-heading";
import { Check } from "lucide-react";

interface Props {
    planYourTripForm: any;
    setPlanYourTripForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function StepSeasons({
    planYourTripForm,
    setPlanYourTripForm,
}: Props) {
    // Define state
    const [activeTab, setActiveTab] = useState<"date" | "season" | "flexible">("date");
    const [travelOption, setTravelOption] = useState<string>("");

    // RESTORE STATE (ONLY ONCE)
    useEffect(() => {
        if (!planYourTripForm) return;

        if (planYourTripForm.travel_option_type) {
            setActiveTab(planYourTripForm.travel_option_type);
        }

        if (planYourTripForm.travel_option) {
            setTravelOption(planYourTripForm.travel_option);
        }
    }, []);

    // HANDLE TAB CHANGE
    const handleTabChange = (tab: "date" | "season" | "flexible") => {
        setActiveTab(tab);

        // Clear value when switching type
        setTravelOption("");

        setPlanYourTripForm((prev: any) => ({
            ...prev,
            travel_option_type: tab,
            travel_option: "",
        }));
    };

    // HANDLE VALUE CHANGE
    const handleChange = (value: string) => {
        setTravelOption(value);

        setPlanYourTripForm((prev: any) => ({
            ...prev,
            travel_option_type: activeTab,
            travel_option: value,
        }));
    };

    return (
        <div className="space-y-5">
            <QuestionHeading title="When would you like to travel?" />

            <div className="max-h-[55vh] overflow-y-auto space-y-4">

                {/* TABS */}
                <div className="grid grid-cols-3 gap-3 text-center">
                    <Tab
                        label="Specific Dates"
                        active={activeTab === "date"}
                        onClick={() => handleTabChange("date")}
                    />
                    <Tab
                        label="By Season"
                        active={activeTab === "season"}
                        onClick={() => handleTabChange("season")}
                    />
                    <Tab
                        label="I’m Flexible"
                        active={activeTab === "flexible"}
                        onClick={() => handleTabChange("flexible")}
                    />
                </div>

                {/* DATE TAB */}
                {activeTab === "date" && (
                    <div className="border px-5 py-4 rounded-sm bg-white">
                        <input
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            value={travelOption}
                            onChange={(e) => handleChange(e.target.value)}
                            className="w-full outline-none"
                        />
                    </div>
                )}

                {/* SEASON TAB */}
                {activeTab === "season" && (
                    <div className="space-y-3">
                        {["Spring", "Summer", "Autumn", "Winter"].map((season) => (
                            <Option
                                key={season}
                                text={season}
                                value={season}
                                selected={travelOption}
                                onChange={handleChange}
                            />
                        ))}
                    </div>
                )}

                {/* FLEXIBLE TAB */}
                {activeTab === "flexible" && (
                    <Option
                        text="I’m flexible with timing"
                        value="Flexible"
                        selected={travelOption}
                        onChange={handleChange}
                    />
                )}
            </div>
        </div>
    );
}

// TAB COMPONENT
function Tab({ label, active, onClick }: any) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`py-2.5 rounded-sm border border-black transition text-sm md:text-base cursor-pointer ${active
                    ? "bg-black text-white"
                    : "bg-white text-black border-black/30"
                }`}
        >
            {label}
        </button>
    );
}

// OPTION COMPONENT
function Option({ text, value, selected, onChange }: any) {
    const isActive = selected === value;

    return (
        <label
            onClick={() => onChange(value)}
            className={`flex items-center justify-between border px-5 py-4 rounded-sm cursor-pointer transition ${isActive ? "border-black bg-white" : "border-black/30 bg-white"
                }`}
        >
            <span>{text}</span>

            <div className="w-6 h-6 flex items-center justify-center">
                {isActive && <Check className="h-5 w-5 text-black" />}
            </div>

            <input
                type="radio"
                checked={isActive}
                onChange={() => onChange(value)}
                className="hidden"
            />
        </label>
    );
}