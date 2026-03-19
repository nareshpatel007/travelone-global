"use client";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import QuestionHeading from "./questionHeading";

interface Props {
    planYourTripForm: any;
    setPlanYourTripForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function StepGuide({
    planYourTripForm,
    setPlanYourTripForm,
}: Props) {
    const [selected, setSelected] = useState<string | null>(null);

    // ✅ Restore selection when coming back to this step
    useEffect(() => {
        if (planYourTripForm?.guide) {
            setSelected(planYourTripForm.guide);
        }
    }, [planYourTripForm?.guide]);

    const handleChange = (value: string) => {
        setSelected(value);

        setPlanYourTripForm((prev: any) => ({
            ...prev,
            guide: value,
        }));
    };

    return (
        <>
            <QuestionHeading title="Select your preferred guide style" />
            <div className="space-y-4">
                <Option
                    text="The Specialist"
                    subText="(Academic, deep historical knowledge)"
                    value="The Specialist (Academic, deep historical knowledge)"
                    selected={selected}
                    onChange={handleChange}
                />

                <Option
                    text="The Local Insider"
                    subText="(Casual, lifestyle-focused, hidden spots)"
                    value="The Local Insider (Casual, lifestyle-focused, hidden spots)"
                    selected={selected}
                    onChange={handleChange}
                />

                <Option
                    text="Maximum Independence"
                    subText="(Private transport only, self-guided exploration)"
                    value="Maximum Independence (Private transport only, self-guided exploration)"
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
            <div className="grid gap-1 pr-4">
                <span className="text-sm md:text-base">{text}</span>
                <span className="text-sm md:text-base">{subText}</span>
            </div>
            <div className="w-6 h-6 flex items-center justify-center">
                {isActive && <Check className={`h-5 w-5`} />}
            </div>
            <input
                type="radio"
                name="guide"
                checked={isActive}
                onChange={() => onChange(value)}
                className="hidden"
            />
        </label>
    );
}
