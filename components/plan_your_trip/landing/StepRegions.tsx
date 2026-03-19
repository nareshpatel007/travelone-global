"use client";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import QuestionHeading from "./questionHeading";

interface Props {
    planYourTripForm: any;
    setPlanYourTripForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function StepRegions({
    planYourTripForm,
    setPlanYourTripForm,
}: Props) {
    const regions = [
        "The Classic Route (Tokyo, Kyoto, Osaka, Nara)",
        "The Japanese Alps (Hakone/Mt. Fuji, Takayama, Kanazawa)",
        "The Deep South (Hiroshima, Fukuoka, Nagasaki, Kyushu)",
        "Tropical Islands (Okinawa, Ishigaki, Miyakojima)",
        "The Wild North (Hokkaido, Sapporo, Hakodate)",
        "I’d like a curated recommendation based on my Vibe",
    ];

    const [selected, setSelected] = useState<string[]>([]);

    // ✅ Restore previously selected regions
    useEffect(() => {
        if (Array.isArray(planYourTripForm?.cities_options)) {
            setSelected(planYourTripForm.cities_options);
        }
    }, [planYourTripForm?.cities_options]);

    const toggleRegion = (region: string) => {
        setSelected((prev) => {
            const updated = prev.includes(region)
                ? prev.filter((r) => r !== region)
                : [...prev, region];

            // ✅ Save to parent state
            setPlanYourTripForm((form: any) => ({
                ...form,
                cities_options: updated,
            }));

            return updated;
        });
    };

    return (
        <>
            <QuestionHeading title="Which parts of Japan would you like to explore?" />
            <div className="!grid !md:grid-cols-2 !gap-0">
                {regions.map((region, i) => {
                    const isActive = selected.includes(region);
                    const { title, subtitle } = formatRegion(region);

                    return (
                        <label
                            key={i}
                            onClick={() => toggleRegion(region)}
                            className="!flex !items-center !justify-between !px-3 !py-2 !rounded-sm !cursor-pointer !transition !bg-white"
                        >
                            <div className="grid gap-1 pr-4">
                                <span className="text-sm md:text-base">{title}</span>
                                <span className="text-sm md:text-base">{subtitle}</span>
                            </div>
                            <div className="w-6 h-6 flex items-center justify-center">
                                {isActive && <Check className={`h-5 w-5`} />}
                            </div>
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={() => toggleRegion(region)}
                                className="hidden"
                            />
                        </label>
                    );
                })}
            </div>
        </>
    );
}

// Format region
function formatRegion(region: string) {
    const match = region.match(/^(.+?)\s*\((.+)\)$/);

    if (!match) {
        return {
            title: region,
            subtitle: null,
        };
    }

    return {
        title: match[1],
        subtitle: `(${match[2]})`,
    };
}
