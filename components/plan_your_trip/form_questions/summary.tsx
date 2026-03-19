"use client";

import { Check, X } from "lucide-react";
import QuestionHeading from "./main-heading";
import { useEffect, useMemo } from "react";

interface Props {
    planYourTripForm: any;
    setPlanYourTripForm: any;
    jumpToStep: (stepKey: string) => void;
    isLandingPage?: boolean;
    selectedCountry?: string;
}

export default function StepSummary({
    planYourTripForm,
    setPlanYourTripForm,
    jumpToStep,
    isLandingPage = false,
    selectedCountry
}: Props) {
    // Show history button
    useEffect(() => {
        setPlanYourTripForm((prev: any) => ({
            ...prev,
            is_show_history_btn: true,
        }));
    }, []);

    // SUMMARY CONFIG (NEW FLOW SAFE)
    const SUMMARY_CONFIG = useMemo(() => {
        const baseConfig = [
            {
                label: "Journey Type",
                stepKey: "next_journey",
                shouldShow: (form: any) => !selectedCountry,
                isAnswered: (form: any) => !!form.choose_flow,
            },
            {
                label: "Destination",
                stepKey: "destination",
                shouldShow: (form: any) => !selectedCountry && form.choose_flow === "i_have_destination",
                isAnswered: (form: any) => !!form.destination,
            },
            {
                label: "Countries",
                stepKey: "countries",
                shouldShow: (form: any) => !selectedCountry && form.choose_flow === "i_have_destination",
                isAnswered: (form: any) =>
                    Array.isArray(form.country) &&
                    form.country.length > 0,
            },
            {
                label: "Persona Match",
                stepKey: "persona_test",
                shouldShow: (form: any) => !selectedCountry && form.choose_flow !== "i_have_destination",
                isAnswered: (form: any) => !!form.persona_test,
            },
            {
                label: "Country Preference",
                stepKey: "all_countries",
                shouldShow: (form: any) => !selectedCountry && form.choose_flow !== "i_have_destination",
                isAnswered: (form: any) => 
                    (Array.isArray(form.all_countries) && form.all_countries.length > 0) ||
                    (Array.isArray(form.country) && form.country.length > 0)
            },
            {
                label: "Travel History",
                stepKey: "travel_history",
                shouldShow: () => true,
                isAnswered: (form: any) => !!form.travel_history,
            },
            {
                label: "Travel Timing",
                stepKey: "seasons",
                shouldShow: () => true,
                isAnswered: (form: any) => !!form.travel_option,
            },
            {
                label: "Cities",
                stepKey: "regions",
                shouldShow: (form: any) => selectedCountry,
                isAnswered: (form: any) => !!form.cities,
            },
            {
                label: "Priority Selection",
                stepKey: "priority_selection",
                shouldShow: (form: any) => selectedCountry,
                isAnswered: (form: any) => !!form.priority_selection,
            },
            {
                label: "Trip Duration",
                stepKey: "days",
                shouldShow: () => true,
                isAnswered: (form: any) => !!form.days,
            },
            {
                label: "Travellers",
                stepKey: "travellers",
                shouldShow: () => true,
                isAnswered: (form: any) => !!form.travellers,
            },
            {
                label: "Budget",
                stepKey: "budget",
                shouldShow: () => true,
                isAnswered: (form: any) => !!form.budget,
            },
            {
                label: "Accommodation",
                stepKey: "accommodation",
                shouldShow: () => true,
                isAnswered: (form: any) => !!form.accommodation,
            },
            {
                label: "Guide Preference",
                stepKey: "guide",
                shouldShow: () => true,
                isAnswered: (form: any) => !!form.guide,
            },
            {
                label: "Meals",
                stepKey: "meals",
                shouldShow: () => true,
                isAnswered: (form: any) => !!form.meals,
            },
            {
                label: "Kind of Help",
                stepKey: "kind_help",
                shouldShow: () => true,
                isAnswered: (form: any) => !!form.assistance,
            },
        ];

        // Landing page adjustments
        if (isLandingPage) {
            return baseConfig.filter(
                (item) => !["destination", "countries"].includes(item.stepKey)
            );
        }
        return baseConfig;
    }, [isLandingPage]);

    // FILTER VISIBLE ITEMS
    const visibleItems = SUMMARY_CONFIG.filter((item) =>
        item.shouldShow(planYourTripForm)
    );

    return (
        <div className="space-y-5">
            <QuestionHeading title="Your Preference Summary" />

            <div className="border border-black rounded-sm p-5 bg-white/60 max-h-[60vh] overflow-y-auto space-y-3">

                {visibleItems.map((item, index) => {

                    const answered = item.isAnswered(planYourTripForm);

                    return (
                        <div
                            key={item.stepKey}
                            onClick={() => jumpToStep(item.stepKey)}
                            className="flex items-center justify-between border-b pb-3 cursor-pointer transition hover:underline"
                        >
                            <span className="text-sm md:text-base text-black">
                                Preference {index + 1}: {item.label}
                            </span>

                            {answered ? (
                                <div className="flex items-center gap-2 text-green-700">
                                    <Check className="h-5 w-5" />
                                    <span>Completed</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-orange-500">
                                    <X className="h-5 w-5" />
                                    <span>Incomplete</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}