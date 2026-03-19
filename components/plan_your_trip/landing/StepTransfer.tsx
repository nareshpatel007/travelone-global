"use client";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import QuestionHeading from "./questionHeading";

interface Props {
    planYourTripForm: any;
    setPlanYourTripForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function StepTransfer({
    planYourTripForm,
    setPlanYourTripForm,
}: Props) {
    const [selected, setSelected] = useState<string | null>(null);

    // ✅ Restore selection when coming back to this step
    useEffect(() => {
        if (planYourTripForm?.transportation) {
            setSelected(planYourTripForm.transportation);
        }
    }, [planYourTripForm?.transportation]);

    const handleChange = (value: string) => {
        setSelected(value);

        setPlanYourTripForm((prev: any) => ({
            ...prev,
            transportation: value,
        }));
    };

    return (
        <>
            <QuestionHeading title="Tell us how you’d like to travel between places" />
            <div className="space-y-4">
                <Option
                    text="Fully Private Chauffeur"
                    subText="(7-seat luxury van throughout the trip)"
                    value="Fully Private Chauffeur (7-seat luxury van throughout the trip)"
                    selected={selected}
                    onChange={handleChange}
                />

                <Option
                    text="Executive Mix"
                    subText="(Private van for tours + First Class Shinkansen between cities)"
                    value="Executive Mix (Private van for tours + First Class Shinkansen between cities)"
                    selected={selected}
                    onChange={handleChange}
                />
            </div>
        </>
    );
}

function Option({
    text,
    subText,
    value,
    selected,
    onChange,
}: any) {
    const isActive = selected === value;

    return (
        <label
            onClick={() => onChange(value)}
            className="!flex !items-center !justify-between !px-3 !py-2 !rounded-sm !cursor-pointer !transition !bg-white"
        >
            <div className="grid gap-1 !pr-6">
                <span className="text-sm md:text-base">{text}</span>
                <span className="text-sm md:text-base">{subText}</span>
            </div>
            <div className="w-6 h-6 flex items-center justify-center">
                {isActive && <Check className={`h-5 w-5`} />}
            </div>
            <input
                type="radio"
                name="transportation"
                checked={isActive}
                onChange={() => onChange(value)}
                className="hidden"
            />
        </label>
    );
}
