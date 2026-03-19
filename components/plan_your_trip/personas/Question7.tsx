"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import QuestionHeading from "./questionHeading";

interface Props {
    planYourTripForm: any;
    setPlanYourTripForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function Question7({
    planYourTripForm,
    setPlanYourTripForm,
}: Props) {
    const [selected, setSelected] = useState<string | null>(null);

    // Restore selection when coming back to this step
    useEffect(() => {
        if (planYourTripForm?.question_7) {
            setSelected(planYourTripForm.question_7);
        }
    }, [planYourTripForm?.question_7]);

    const handleChange = (value: string) => {
        // Prevent reselect / deselect
        if (selected === value) return;

        setSelected(value);

        setPlanYourTripForm((prev: any) => ({
            ...prev,
            question_7: value,
        }));
    };

    return (
        <div className="space-y-3 md:space-y-5">
            <QuestionHeading
                title='Which sensory detail is most important for your relaxation?'
            />
            <div className="max-h-[55vh] md:max-h-[60vh] overflow-y-auto space-y-2 md:space-y-3">
                <Option
                    text='Acoustic perfection—I need absolute silence and sound-masking.'
                    value="Option A"
                    selected={selected}
                    onChange={handleChange}
                />

                <Option
                    text='Natural light—I want floor-to-ceiling windows and open skies.'
                    value="Option B"
                    selected={selected}
                    onChange={handleChange}
                />
                
                <Option
                    text="Tactile luxury—I care about the quality of the fabrics, stone, and wood."
                    value="Option C"
                    selected={selected}
                    onChange={handleChange}
                />
            </div>
        </div>
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
            className={`flex items-center justify-between border px-5 py-4 rounded-sm cursor-pointer transition bg-white ${isActive ? "border-black" : "border-black/30"}`}
        >
            <div className="grid gap-1 text-sm md:text-base text-black">
                <span>{text}</span>
                <span>{subText}</span>
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