"use client";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import QuestionHeading from "./main-heading";

interface Props {
    planYourTripForm: any;
    setPlanYourTripForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function StepPersonaTest({
    planYourTripForm,
    setPlanYourTripForm,
}: Props) {
    const [selected, setSelected] = useState<string | null>(null);

    // Restore selection when coming back to this step
    useEffect(() => {
        if (planYourTripForm?.persona_test) {
            setSelected(planYourTripForm.persona_test);
        }
    }, [planYourTripForm?.persona_test]);

    const handleChange = (value: string) => {
        setSelected(value);

        setPlanYourTripForm((prev: any) => ({
            ...prev,
            persona_test: value,
        }));
    };

    return (
        <div className="space-y-3 md:space-y-5">
            <QuestionHeading
                title="What is the primary soul of this specific journey?"
            />
            <div className="max-h-[55vh] md:max-h-[60vh] overflow-y-auto space-y-2 md:space-y-3">
                <Option
                    text="Restoratio"
                    subText="To disconnect, heal, and find silence."
                    value="Restoratio"
                    selected={selected}
                    onChange={handleChange}
                />

                <Option
                    text="Discovery"
                    subText="To learn, explore history, and gain insight."
                    value="Discovery"
                    selected={selected}
                    onChange={handleChange}
                />
                
                <Option
                    text="Vibrancy"
                    subText="To feel the pulse of a city and its subcultures."
                    value="Vibrancy"
                    selected={selected}
                    onChange={handleChange}
                />
                
                <Option
                    text="Adventure"
                    subText="To push limits and see the untamed world."
                    value="Adventure"
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
                name="first_visit"
                checked={isActive}
                onChange={() => onChange(value)}
                className="hidden"
            />
        </label>
    );
}