"use client";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import QuestionHeading from "./main-heading";

interface Props {
    planYourTripForm: any;
    setPlanYourTripForm: React.Dispatch<React.SetStateAction<any>>;
    personaResult?: any;
}

export default function StepPrioritySelection({
    planYourTripForm,
    setPlanYourTripForm,
    personaResult
}: Props) {
    // Define state
    const [selected, setSelected] = useState<string | null>(null);

    // Restore selection when coming back to this step
    useEffect(() => {
        if (planYourTripForm?.priority_selection) {
            setSelected(planYourTripForm.priority_selection);
        }
    }, [planYourTripForm?.priority_selection]);

    const handleChange = (value: string) => {
        setSelected(value);

        setPlanYourTripForm((prev: any) => ({
            ...prev,
            priority_selection: value,
        }));
    };

    return (
        <div className="space-y-3 md:space-y-5">
            <QuestionHeading
                title="How would you like to balance your journey's energy?"
            />
            <div className="max-h-[55vh] md:max-h-[60vh] overflow-y-auto space-y-2 md:space-y-3">
                <Option
                    text={`Prioritize ${personaResult?.primary?.truth_name}`}
                    subText={`70% ${personaResult?.primary?.truth_name} / 30% ${personaResult?.secondary?.truth_name}`}
                    value="Prioritize Primary"
                    selected={selected}
                    onChange={handleChange}
                />

                <Option
                    text="Perfect Balance"
                    subText={`50% ${personaResult?.primary?.truth_name} / 50% ${personaResult?.secondary?.truth_name}`}
                    value="Perfect Balance"
                    selected={selected}
                    onChange={handleChange}
                />

                <Option
                    text={`Prioritize ${personaResult?.secondary?.truth_name}`}
                    subText={`30% ${personaResult?.primary?.truth_name} / 70% ${personaResult?.secondary?.truth_name}`}
                    value="Prioritize Secondary"
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