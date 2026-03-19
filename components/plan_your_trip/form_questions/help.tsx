"use client";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import QuestionHeading from "./main-heading";

// Define options
const HELP_OPTIONS = [
    'Complete "White-Glove" Planning (End-to-End: Hotels, Transports, Visas, & Tours)',
    "Itinerary Design Only (Strategic planning and curated bookings)",
    "Specific Support (Just Hotels, Just Transport, or Just Activities)",
    "Consultation Only (I need expert advice before I decide)",
]

interface Props {
    planYourTripForm: any;
    setPlanYourTripForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function StepKindOfHelp({
    planYourTripForm,
    setPlanYourTripForm,
}: Props) {
    // Define state
    const [selected, setSelected] = useState<string | null>(null);

    // Restore selection when coming back to this step
    useEffect(() => {
        if (planYourTripForm?.assistance) {
            setSelected(planYourTripForm.assistance);
        }
    }, [planYourTripForm?.assistance]);

    // Handle change
    const handleChange = (value: string) => {
        // Prevent reselect / deselect
        if (selected === value) return;

        setSelected(value);

        setPlanYourTripForm((prev: any) => ({
            ...prev,
            assistance: value,
        }));
    };

    return (
        <div className="space-y-3 md:space-y-5">
            <QuestionHeading
                title="What level of assistance do you require from our team?"
            />
            <div className="max-h-[55vh] md:max-h-[60vh] overflow-y-auto space-y-1 md:space-y-3">
                {HELP_OPTIONS.map((option, index) => (
                    <Option
                        key={index}
                        text={option}
                        value={option}
                        selected={selected}
                        onChange={handleChange}
                    />
                ))}
            </div>
        </div>
    );
}

function Option({
    key,
    text,
    subText,
    value,
    selected,
    onChange,
}: any) {
    const isActive = selected === value;

    return (
        <label
            key={key}
            onClick={() => onChange(value)}
            className={`flex items-center justify-between border px-5 py-4 rounded-sm cursor-pointer transition bg-white ${isActive ? "border-black" : "border-black/30"}`}
        >
            <div className="grid gap-1 text-sm md:text-base text-black">
                <span>{text}</span>
                {subText && <span>{subText}</span>}
            </div>
            <div className="w-6 h-6 flex items-center justify-center">
                {isActive && <Check className="h-5 w-5 font-semibold text-black" />}
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