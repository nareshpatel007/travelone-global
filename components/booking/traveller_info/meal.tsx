"use client";

import { CheckCircle, X } from "lucide-react";
import { useState } from "react";

// Define props
type Props = {
    open: boolean;
    setOpenChange: (open: boolean) => void;
    handleChange: (key: string, value: any, autoUpdate?: boolean) => void;
    formData: any;
};

const MEAL_OPTIONS = [
    "Vegetarian",
    "Non-Vegetarian",
    "Vegan",
    "Jain",
    "Gluten-Free",
    "Halal",
    "Kosher",
    "Other",
];

export function MealPreference({ open, setOpenChange, handleChange, formData }: Props) {
    // If data empty, return null
    if (!open) return null;

    // Normalize data
    const normalized = normalizeMealData(formData);

    // Define state
    const [selectedMeals, setSelectedMeals] = useState<string[]>(normalized?.meal_preferences || []);
    const [notes, setNotes] = useState(normalized?.meal_dietary_notes || "");
    const [error, setError] = useState<string | null>(null);

    // Handle close
    const handleClose = () => setOpenChange(false);

    // Toggle meal
    const toggleMeal = (meal: string) => {
        setSelectedMeals((prev) =>
            prev.includes(meal)
                ? prev.filter((m) => m !== meal)
                : [...prev, meal]
        );
    };

    // Handle submit
    const handleSubmit = () => {
        if (selectedMeals.length === 0) {
            setError("Please select at least one meal preference");
            return;
        }

        handleChange("meal_json", {
            meal_preferences: selectedMeals,
            meal_dietary_notes: notes || "none",
        }, true);

        handleClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-8">
            <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

            <div className="relative w-full max-w-xl bg-white max-h-[60vh] overflow-y-auto rounded-md shadow-lg">
                <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
                    <h3 className="text-md md:text-lg font-medium">Meal Details</h3>
                    <button className="cursor-pointer" onClick={handleClose}>
                        <X />
                    </button>
                </div>
                <div className="px-5 py-5 space-y-4">
                    <div className="space-y-3">
                        <p className="text-sm md:text-base font-medium">
                            Meal preferences <span className="text-red-500">*</span>
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            {MEAL_OPTIONS.map((meal) => (
                                <label key={meal} className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={selectedMeals.includes(meal)}
                                        onChange={() => toggleMeal(meal)}
                                        className="accent-blue-800"
                                    />
                                    {meal}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm md:text-base font-medium">
                            Do you have any dietary restrictions or preferences
                        </label>
                        <textarea
                            rows={4}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Please enter any dietary restrictions or preferences"
                            className="w-full border border-black rounded-sm p-3 text-sm md:text-base focus:outline-none focus:ring-1 focus:ring-black"
                        />
                    </div>
                    <div className="text-xs md:text-sm text-black space-y-3">
                        <p>
                            1. Your answers help us personalize your experience, allowing our
                            hotel and restaurant partners, as well as local guides, to arrange
                            suitable meals or recommend appropriate dining options for you.
                        </p>
                        <p>
                            2. We rely fully on the accuracy and completeness of the information
                            you provide. Please note that our company cannot be held responsible
                            for any health-related issues, adverse reactions, or additional
                            charges that may occur due to undisclosed, inaccurate, or last-minute
                            dietary changes.
                        </p>
                    </div>

                    {error && (
                        <p className="text-red-600 text-sm">{error}</p>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t sticky bottom-0 bg-white">
                    <button
                        onClick={handleSubmit}
                        className="px-5 py-1.5 bg-black text-sm md:text-base text-white border border-black rounded-sm flex items-center gap-2 cursor-pointer hover:bg-black/90"
                    >
                        <CheckCircle size={16} />
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

// Normalize data
const normalizeMealData = (data: any) => {
    if (!data) {
        return {
            meal_preferences: [],
            meal_dietary_notes: "",
        };
    }

    if (typeof data === "string") {
        try {
            data = JSON.parse(data);
        } catch {
            return {
                meal_preferences: [],
                meal_dietary_notes: "",
            };
        }
    }

    return {
        meal_preferences: data.meal_preferences || [],
        meal_dietary_notes: data.meal_dietary_notes || "",
    };
};
