"use client";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import QuestionHeading from "./questionHeading";

interface Props {
    planYourTripForm: any;
    setPlanYourTripForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function StepTravelTime({
    planYourTripForm,
    setPlanYourTripForm,
}: Props) {
    const [selected, setSelected] = useState<string | null>(null);
    const [month, setMonth] = useState<string>("");

    const options = [
        "Spring 2026 (Cherry Blossoms)",
        "Autumn 2026 (Maple Leaves)",
        "Winter 2025/26 (Snow & Ski)",
        "Summer 2026 (Festivals)",
    ];

    // Restore values when coming back
    useEffect(() => {
        if (planYourTripForm?.season_name) {
            setSelected(planYourTripForm.season_name);
        }
        if (planYourTripForm?.travel_month) {
            setMonth(planYourTripForm.travel_month);
        }
    }, [planYourTripForm]);

    const handleChange = (value: string) => {
        setSelected(value);

        setPlanYourTripForm((prev: any) => ({
            ...prev,
            season_name: value, // travel season
        }));
    };

    const handleMonthChange = (value: string) => {
        setMonth(value);
        setPlanYourTripForm((prev: any) => ({
            ...prev,
            travel_month: value
        }));
    };

    // Mapping options to months
    const monthMap: Record<string, string[]> = {
        "Spring 2026 (Cherry Blossoms)": ["March", "April"],
        "Autumn 2026 (Maple Leaves)": ["September", "October", "November"],
        "Winter 2025/26 (Snow & Ski)": ["December", "January", "February"],
        "Summer 2026 (Festivals)": ["May", "June", "July", "August"],
    };

    const allMonths = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];

    const monthsToShow = selected ? monthMap[selected] || allMonths : allMonths;

    return (
        <>
            <QuestionHeading title="When do you plan to travel?" />
            <div className="space-y-3">
                {options.map((item, i) => (
                    <Option
                        key={i}
                        text={item}
                        value={item}
                        selected={selected}
                        onChange={handleChange}
                    />
                ))}
            </div>
            <div className="!mt-6">
                <label className="!block !text-md !font-normal !mb-2">Choose your travel month (optional)</label>
                <select
                    value={month}
                    onChange={(e) => handleMonthChange(e.target.value)}
                    className="!w-full !rounded-md !px-4 !py-2 !bg-white"
                >
                    <option value="">Select month</option>
                    {monthsToShow.map((m) => (
                        <option key={m} value={m}>
                            {m}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}

function Option({
    text,
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
            </div>
            <div className="w-6 h-6 flex items-center justify-center">
                {isActive && <Check className={`h-5 w-5`} />}
            </div>
            <input
                type="radio"
                name="travel_time"
                checked={isActive}
                onChange={() => onChange(value)}
                className="hidden"
            />
        </label>
    );
}