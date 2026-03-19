"use client";

import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import QuestionHeading from "./main-heading";

interface Props {
    planYourTripForm: any;
    setPlanYourTripForm: React.Dispatch<React.SetStateAction<any>>;
    personaCities: any[];
}

export default function StepRegions({
    planYourTripForm,
    setPlanYourTripForm,
    personaCities
}: Props) {
    // Define state
    const [selectedCities, setSelectedCities] = useState<any[]>([]);

    // Restore once
    useEffect(() => {
        if (planYourTripForm?.cities?.length > 0) {
            setSelectedCities(planYourTripForm?.cities || []);
        }
    }, [planYourTripForm?.cities]);

    useEffect(() => {
        setPlanYourTripForm((prev: any) => ({
            ...prev,
            cities: selectedCities
        }));
    }, [selectedCities]);

    // Toggle region
    const toggleRegion = (city: any) => {
        setSelectedCities((prev: any[]) => {
            let updated;

            const exists = prev.find((c) => c.id === city.id);

            if (exists) {
                updated = prev.filter((c) => c.id !== city.id);
            } else {
                updated = [...prev, city];
            }

            // sync immediately
            setPlanYourTripForm((prevForm: any) => ({
                ...prevForm,
                cities: updated
            }));

            return updated;
        });
    };

    // Remove city
    const removeCity = (city: any) => {
        setSelectedCities((prev: any[]) =>
            prev.filter((c) => c.id !== city.id)
        );
    };

    return (
        <div className="space-y-3 md:space-y-5">
            <QuestionHeading
                title="Which parts would you like to explore?"
                subtitle="The cities mentioned are selected as per your TravelDNA"
            />

            <div className="max-h-[55vh] md:max-h-[60vh] overflow-y-auto space-y-2 md:space-y-3">
                {selectedCities.length > 0 && (
                    <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap no-scrollbar pb-1">
                        {selectedCities.map((row: any) => (
                            <span
                                key={row.id}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-black text-white rounded-sm"
                            >
                                {row.name}
                                <button
                                    onClick={() => removeCity(row)}
                                    className="ml-1 hover:text-gray-300 cursor-pointer"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </span>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {personaCities.map((region: any) => {
                        const isActive = selectedCities.some(
                            (c) => c.id === region.id
                        );
                        return (
                            <label
                                key={region?.id}
                                onClick={() => toggleRegion(region)}
                                className={`flex items-center justify-between border px-5 py-3 rounded-sm cursor-pointer bg-white ${isActive
                                    ? "border-black"
                                    : "border-black/30"
                                    }`}
                            >
                                <div className="grid gap-1 text-sm md:text-base text-black">
                                    <span className="text-sm md:text-base">{region?.name}</span>
                                    <span className="text-sm md:text-base">{region?.vibe_logic}</span>
                                </div>
                                {isActive && <Check className="h-5 w-5" />}
                            </label>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}