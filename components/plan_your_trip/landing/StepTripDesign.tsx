"use client";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import QuestionHeading from "./questionHeading";

interface Props {
    planYourTripForm: any;
    setPlanYourTripForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function StepTripDesign({
    planYourTripForm,
    setPlanYourTripForm,
}: Props) {
    const [selected, setSelected] = useState<string | null>(null);

    // Restore selection when coming back to this step
    useEffect(() => {
        if (planYourTripForm?.trip_design) {
            setSelected(planYourTripForm.trip_design);
        }
    }, [planYourTripForm?.trip_design]);

    const handleChange = (value: string) => {
        setSelected(value);

        setPlanYourTripForm((prev: any) => ({
            ...prev,
            trip_design: value,
        }));
    };

    return (
        <>
            <QuestionHeading title="How would you like to receive your trip design?" />
            <div className="space-y-4">
                <Option
                    text="The Focused Vision:"
                    subText="One expert-led itinerary optimized for your interests."
                    value="The Focused Vision"
                    selected={selected}
                    onChange={handleChange}
                />

                <Option
                    text="The Dual Perspective:"
                    subText="Two distinct versions with different themes or paces."
                    value="The Dual Perspective"
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
            className="!flex !items-center !justify-between !px-3 !py-3 !rounded-sm !cursor-pointer !transition !bg-white"
        >
            <div className="grid gap-1 pr-4">
                <span className="text-sm md:text-base">{text}</span>
                <span className="text-sm md:text-base">{subText}</span>
            </div>
            <div className="w-6 h-6 flex items-center justify-center">
                {isActive && <Check className={`h-5 w-5`} />}
            </div>
            <input
                type="radio"
                name="trip_design"
                checked={isActive}
                onChange={() => onChange(value)}
                className="hidden"
            />
        </label>
    );
}