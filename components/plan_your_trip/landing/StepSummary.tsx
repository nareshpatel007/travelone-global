"use client";
import { Check } from "lucide-react";
import QuestionHeading from "./questionHeading";

interface Props {
    planYourTripForm: any;
    jumpToStep: (stepKey: any) => void;
}

const SUMMARY_CONFIG = [
    {
        label: "First time visiting",
        stepKey: "first_visit",
        shouldShow: () => true,
        isAnswered: (form: any) => !!form.first_time_visit,
    },
    {
        label: "Travel season",
        stepKey: "travel_time",
        shouldShow: () => true,
        isAnswered: (form: any) => !!form.season_name,
    },
    {
        label: "Trip design",
        stepKey: "trip_design",
        shouldShow: () => true,
        isAnswered: (form: any) => !!form.trip_design,
    },
    {
        label: "Theme options",
        stepKey: "themes_single",
        shouldShow: (form: any) => form.trip_design === "The Focused Vision",
        isAnswered: (form: any) => Array.isArray(form.themes_priority_1) && form.themes_priority_1.length > 0,
    },
    {
        label: "Theme priority 1",
        stepKey: "themes_priority_1",
        shouldShow: (form: any) => form.trip_design === "The Dual Perspective",
        isAnswered: (form: any) => Array.isArray(form.themes_priority_1) && form.themes_priority_1.length > 0,
    },
    {
        label: "Theme priority 2",
        stepKey: "themes_priority_2",
        shouldShow: (form: any) => form.trip_design === "The Dual Perspective",
        isAnswered: (form: any) => Array.isArray(form.themes_priority_2) && form.themes_priority_2.length > 0,
    },
    {
        label: "Regions",
        stepKey: "regions",
        shouldShow: () => true,
        isAnswered: (form: any) => Array.isArray(form.cities_options) && form.cities_options.length > 0,
    },
    {
        label: "Trip duration",
        stepKey: "days",
        shouldShow: () => true,
        isAnswered: (form: any) => !!form.day_option,
    },
    {
        label: "Budget",
        stepKey: "budget",
        shouldShow: () => true,
        isAnswered: (form: any) => !!form.budget,
    },
    {
        label: "Travelers",
        stepKey: "travelers",
        shouldShow: () => true,
        isAnswered: (form: any) => !!form.prefer_travel_type,
    },
    {
        label: "Accommodation",
        stepKey: "accommodation",
        shouldShow: () => true,
        isAnswered: (form: any) => !!form.accommodation,
    },
    {
        label: "Meals",
        stepKey: "meals",
        shouldShow: () => true,
        isAnswered: (form: any) => !!form.meal_preferences,
    },
    {
        label: "Transfer",
        stepKey: "transfer",
        shouldShow: () => true,
        isAnswered: (form: any) => !!form.transportation,
    },
    {
        label: "Guide",
        stepKey: "guide",
        shouldShow: () => true,
        isAnswered: (form: any) => !!form.guide,
    },
];

export default function StepSummary({ planYourTripForm, jumpToStep }: Props) {
    const visibleItems = SUMMARY_CONFIG.filter((item) =>
        item.shouldShow(planYourTripForm)
    );

    return (
        <>
            <QuestionHeading title="Question Summary" />

            <div className="space-y-3">
                {visibleItems.map((item, index) => {
                    const answered = item.isAnswered(planYourTripForm);

                    return (
                        <div
                            key={item.label}
                            onClick={() => answered && jumpToStep(item.stepKey)}
                            className="flex items-center justify-between border-b pb-2"
                        >
                            <span className="text-[15px] font-medium">
                                Question {index + 1}: {item.label}
                            </span>
                            <span className="w-6 h-6 flex items-center justify-center">
                                {answered ? '✅' : '❌'}
                            </span>
                        </div>
                    );
                })}
            </div>
        </>
    );
}