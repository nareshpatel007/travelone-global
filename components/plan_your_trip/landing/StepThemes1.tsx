"use client";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import QuestionHeading from "./questionHeading";

interface Props {
    planYourTripForm: any;
    setPlanYourTripForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function StepThemes1({
    planYourTripForm,
    setPlanYourTripForm,
}: Props) {
    const themes = [
        "Historical & Heritage Sites",
        "Adventure & Outdoor Activities",
        "Nature & Scenic Experiences",
        "Food & Culinary Experiences",
        "Cruises & Water Journeys",
        "Seasonal & Holiday Trips",
        "Luxury & Romantic Getaways",
        "Spiritual & Religious Journeys",
        "Eco & Sustainable Travel",
        "Nightlife & Festivals",
        "Local Culture & Traditions",
        "Sports & Active Travel",
    ];

    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        if (Array.isArray(planYourTripForm?.themes_priority_1)) {
            setSelected(planYourTripForm.themes_priority_1);
        }
    }, [planYourTripForm?.themes_priority_1]);

    const toggleTheme = (theme: string) => {
        setSelected((prev) => {
            const updated = prev.includes(theme)
                ? prev.filter((t) => t !== theme)
                : [...prev, theme];

            setPlanYourTripForm((form: any) => ({
                ...form,
                themes_priority_1: updated,
            }));

            return updated;
        });
    };

    return (
        <>
            <QuestionHeading title="What theme do you want for the first itinerary?" />
            <div
                className="
                    mt-2
                    max-h-[55vh] md:max-h-[60vh]
                    overflow-y-auto
                    pr-1
                    space-y-2
                "
            >
                {themes.map((theme, i) => (
                    <ThemeItem
                        key={theme}
                        index={i}
                        theme={theme}
                        isActive={selected.includes(theme)}
                        onToggle={toggleTheme}
                    />
                ))}
            </div>
        </>
    );
}

function ThemeItem({
    theme,
    isActive,
    onToggle,
}: any) {
    return (
        <label
            onClick={() => onToggle(theme)}
            className="!flex !items-center !justify-between !px-3 !py-1.5 !rounded-sm !cursor-pointer !transition !bg-white"
        >
            <div className="!flex !items-center !gap-4">
                <span className="text-sm md:text-base">{theme}</span>
            </div>
            <div className="w-6 h-6 flex items-center justify-center">
                {isActive && <Check className={`h-5 w-5`} />}
            </div>
            <input
                type="checkbox"
                checked={isActive}
                onChange={() => onToggle(theme)}
                className="hidden"
            />
        </label>
    );
}