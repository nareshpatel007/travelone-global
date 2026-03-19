"use client";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import QuestionHeading from "./questionHeading";

interface Props {
    planYourTripForm: any;
    setPlanYourTripForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function StepAccommodation({
    planYourTripForm,
    setPlanYourTripForm,
}: Props) {
    const [selected, setSelected] = useState<string | null>(null);

    // ✅ Restore selection when coming back to this step
    useEffect(() => {
        if (planYourTripForm?.accommodation) {
            setSelected(planYourTripForm.accommodation);
        }
    }, [planYourTripForm?.accommodation]);

    const handleChange = (value: string) => {
        setSelected(value);

        setPlanYourTripForm((prev: any) => ({
            ...prev,
            accommodation: value,
        }));
    };

    return (
        <>
            <QuestionHeading title="What kind of accommodation do you prefer?" />
            <div className="space-y-4">
                <Option
                    text="Premium 4-Star"
                    subText="Boutique Hotels (Curated comfort)"
                    value="Premium 4-Star Boutique Hotels (Curated comfort)"
                    selected={selected}
                    onChange={handleChange}
                />

                <Option
                    text="Luxury 5-Star"
                    subText="International Hotels (Ultimate service)"
                    value="Luxury 5-Star International Hotels (Ultimate service)"
                    selected={selected}
                    onChange={handleChange}
                />
                
                <Option
                    text="Authentic Five-Star"
                    subText="Ryokans (Traditional stays with private in-room Onsens)"
                    value="Authentic Five-Star Ryokans (Traditional stays with private in-room Onsens)"
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
                name="accommodation"
                checked={isActive}
                onChange={() => onChange(value)}
                className="hidden"
            />
        </label>
    );
}
