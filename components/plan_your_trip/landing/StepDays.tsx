"use client";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import QuestionHeading from "./questionHeading";

interface Props {
    planYourTripForm: any;
    setPlanYourTripForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function StepDays({
    planYourTripForm,
    setPlanYourTripForm,
}: Props) {
    const [selected, setSelected] = useState<string | null>(null);

    // Restore selection when coming back to this step
    useEffect(() => {
        if (planYourTripForm?.day_option) {
            setSelected(planYourTripForm.day_option);
        }
    }, [planYourTripForm?.day_option]);

    const handleChange = (value: string) => {
        setSelected(value);

        setPlanYourTripForm((prev: any) => ({
            ...prev,
            day_option: value,
        }));
    };

    return (
        <>
            <QuestionHeading title="How many days would you like to dedicate to this journey?" />
            <div className="space-y-4">
                <Option
                    number="1"
                    text="7 – 10 Days"
                    subText="The Essential Experience"
                    value="7 – 10 Days (The Essential Experience)"
                    selected={selected}
                    onChange={handleChange}
                />

                <Option
                    number="2"
                    text="10 – 14 Days"
                    subText="The Signature Journey"
                    value="10 – 14 Days (The Signature Journey)"
                    selected={selected}
                    onChange={handleChange}
                />
                
                <Option
                    number="3"
                    text="14 – 21 Days"
                    subText="The Deep Immersion"
                    value="14 – 21 Days (The Deep Immersion)"
                    selected={selected}
                    onChange={handleChange}
                />
                
                <Option
                    number="4"
                    text="21+ Days"
                    subText="The Grand Tour"
                    value="21+ Days (The Grand Tour)"
                    selected={selected}
                    onChange={handleChange}
                />
                
                <Option
                    number="5"
                    text="I am flexible"
                    subText="Need a recommendation"
                    value="I am flexible / Need a recommendation"
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
                name="first_visit"
                checked={isActive}
                onChange={() => onChange(value)}
                className="hidden"
            />
        </label>
    );
}
