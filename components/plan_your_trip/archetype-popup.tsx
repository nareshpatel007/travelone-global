"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getClientIp } from "@/lib/getClientIp";
import {
    CheckCircle,
    ListCheck,
    Loader2,
    MoveLeft,
    MoveRight,
    X,
} from "lucide-react";
import { sendFbEvent } from "@/lib/sendFbEvent";
import { getLoginCookie, isLoggedIn } from "@/lib/auth";

/* ---- Import Steps ---- */
import StepLeadForm from "./form_questions/lead-form";
import StepNextJourney from "./form_questions/next-journey";
import StepDestinations from "./form_questions/destination";
import StepCountries from "./form_questions/countries";
import StepPersonaTest from "./form_questions/personas-test";
import StepAllCountries from "./form_questions/all-countries";
import StepTravelHistory from "./form_questions/travel-history";
import StepSeasons from "./form_questions/season";
import StepDays from "./form_questions/days";
import StepTravelers from "./form_questions/travelers";
import StepBudget from "./form_questions/budget";
import StepAccommodation from "./form_questions/accommodation";
import StepGuide from "./form_questions/guide";
import StepMeals from "./form_questions/meals";
import StepKindOfHelp from "./form_questions/help";
import StepCommunicationMethod from "./form_questions/communication";
import StepSummary from "./form_questions/summary";

// Define Props
interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedCountry?: string;
}

// Default Data
const defaultFormData = {
    pre_selected_country: false,
    choose_flow: "",
    destination: "",
    country: [],
    persona_test: "",
    travel_history: "",
    travel_option_type: "",
    travel_option: "",
    days: "",
    travellers: "",
    budget: "",
    accommodation: "",
    guide: "",
    meals: "",
    assistance: "",
    communication: "",
    full_name: "",
    email: "",
    mobile: "",
    privacy_policy_accepted: false,
    is_show_history_btn: false,
};

export function archetypePopupModal({
    open,
    onOpenChange,
    selectedCountry,
}: Props) {
    // Hooks
    const router = useRouter();
    const isAuthLogin = isLoggedIn();
    const authData = getLoginCookie();

    // Define state
    const [step, setStep] = useState(0);
    const [stepsKey, setStepsKey] = useState<string[]>([]);
    const [planYourTripForm, setPlanYourTripForm] = useState<any>(defaultFormData);
    const [leadId, setLeadId] = useState("");
    const [errors, setErrors] = useState("");
    const [formLoader, setFormLoader] = useState(false);

    // Stable Form Steps
    const getFormSteps = (form: any) => {
        // Get selected value
        const haveDestination = form?.choose_flow === "i_have_destination";

        // Define steps
        let stepKeys: string[] = [
            "lead_form",
            "next_journey",
            ...(haveDestination && !selectedCountry ? ["destination", "countries"] : []),
            ...(!haveDestination ? ["persona_test"] : []),
            ...(!haveDestination && !selectedCountry ? ["all_countries"] : []),
            "travel_history",
            "seasons",
            "days",
            "travellers",
            "budget",
            "accommodation",
            "guide",
            "meals",
            "kind_help",
            "communication",
            "summary",
        ];

        // If login user
        if (isAuthLogin) {
            stepKeys = stepKeys.filter((key) => key !== "lead_form");
        }

        // Return steps
        return stepKeys;
    };

    // Set pre selected country
    useEffect(() => {
        const updated = getFormSteps(planYourTripForm);
        setStepsKey(updated);

        if (step >= updated.length) {
            setStep(updated.length - 1);
        }
    }, [planYourTripForm.choose_flow, selectedCountry, isAuthLogin]);

    // Set pre selected country
    useEffect(() => {
        let countryValue = selectedCountry || "";

        if (!countryValue) {
            const fromPath = window.location.pathname
                .replace("/country/", "")
                .replace(/-/g, " ");

            if (fromPath) {
                countryValue = fromPath.replace(/\b\w/g, (l) => l.toUpperCase());
            }
        }

        if (countryValue) {
            setPlanYourTripForm((prev: any) => ({
                ...prev,
                pre_selected_country: true,
                country: [countryValue],
            }));
        }
    }, [selectedCountry]);

    // Set pre selected country
    const componentMap: Record<string, any> = {
        lead_form: StepLeadForm,
        next_journey: StepNextJourney,
        destination: StepDestinations,
        countries: StepCountries,
        persona_test: StepPersonaTest,
        all_countries: StepAllCountries,
        travel_history: StepTravelHistory,
        seasons: StepSeasons,
        days: StepDays,
        travellers: StepTravelers,
        budget: StepBudget,
        accommodation: StepAccommodation,
        guide: StepGuide,
        meals: StepMeals,
        kind_help: StepKindOfHelp,
        communication: StepCommunicationMethod,
        summary: StepSummary,
    };

    // Get current step
    const CurrentStepKey = stepsKey[step];
    const CurrentStep = componentMap[CurrentStepKey];

    // Validate step
    const validateStep = () => {
        // Define error
        let error = "";

        // Validate
        switch (CurrentStepKey) {
            case "lead_form":
                if (!leadId && !isAuthLogin) {
                    if (!planYourTripForm.full_name ||
                        !planYourTripForm.email ||
                        !planYourTripForm.mobile) {
                        error = "Please fill all required fields.";
                    }
                    else if (!planYourTripForm.privacy_policy_accepted) {
                        error = "Please accept the Terms consent.";
                    }
                }
                break;

            case "next_journey":
                if (!planYourTripForm.choose_flow)
                    error = "Please select your journey type.";
                break;

            case "destination":
                if (!selectedCountry && !planYourTripForm.destination)
                    error = "Please select destination.";
                break;

            case "countries":
                if (!selectedCountry &&
                    (!planYourTripForm.country ||
                        planYourTripForm.country.length === 0))
                    error = "Please select at least one country.";
                break;

            case "persona_test":
                if (!planYourTripForm.persona_test)
                    error = "Please complete persona test.";
                break;

            case "travel_history":
                if (!planYourTripForm.travel_history)
                    error = "Please select travel history.";
                break;

            case "seasons":
                if (!planYourTripForm.travel_option)
                    error = "Please select travel timing.";
                break;

            case "days":
                if (!planYourTripForm.days)
                    error = "Please select trip duration.";
                break;

            case "travellers":
                if (!planYourTripForm.travellers)
                    error = "Please select travellers.";
                break;

            case "budget":
                if (!planYourTripForm.budget)
                    error = "Please select budget.";
                break;

            case "communication":
                if (!planYourTripForm.communication)
                    error = "Please select communication method.";
                break;
        }

        setErrors(error);
        return error === "";
    };

    // Handle next step
    const handleNextStep = async () => {
        // Validate
        if (!validateStep()) return;

        // Reset error
        setErrors("");

        // Lead Creation
        if (CurrentStepKey === "lead_form" && !leadId && !isAuthLogin) {
            try {
                setFormLoader(true);

                const res = await fetch("/api/plan_your_trip/create_lead", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        full_name: planYourTripForm.full_name,
                        email: planYourTripForm.email,
                        mobile: planYourTripForm.mobile,
                        ip_address: await getClientIp(),
                    }),
                });

                const data = await res.json();

                if (!data?.success) {
                    setErrors("Unable to process your request.");
                    return;
                }

                setLeadId(data.data.lead_id);
                setStep(step + 1);

            } catch {
                setErrors("Something went wrong.");
            } finally {
                setFormLoader(false);
            }

            return;
        }

        // Go to next step
        setStep((prev) => prev + 1);
    };

    // Handle submit
    const handleSubmit = async () => {
        try {
            // Update state
            setFormLoader(true);

            // API Call
            const response = await fetch("/api/plan_your_trip", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    lead_id: leadId,
                    data: planYourTripForm,
                }),
            });

            // Convert json
            const json = await response.json();

            // If success, redirect
            if (json.status) {
                sendFbEvent({
                    eventName: "Lead",
                    email: planYourTripForm.email
                });

                // Redirect
                router.push("/thank-you");
            } else {
                setErrors(json.message);
            }
        } catch {
            setErrors("Unable to process request.");
        } finally {
            setFormLoader(false);
        }
    };

    // Handle jump to step
    const jumpToStep = (stepKey: any) => {
        const steps = getFormSteps(planYourTripForm);
        const index = steps.indexOf(stepKey);
        if (index !== -1) {
            setStep(index);
        }
    };

    // Handle close
    const handleClose = () => {
        setStep(0);
        setErrors("");
        setPlanYourTripForm(defaultFormData);
        onOpenChange(false);
        setFormLoader(false);
    };

    if (!open) return null;

    const btnBase = "flex items-center justify-center gap-2 w-full md:w-auto px-6 py-2 rounded-sm font-medium border border-black transition cursor-pointer disabled:opacity-50";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative w-full h-full bg-[#FFF6E5] overflow-auto">
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 p-2 cursor-pointer bg-[#FFC765] rounded-full hover:bg-black hover:text-white"
                >
                    <X size={18} />
                </button>

                {stepsKey.length > 0 && <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {Array.from({ length: stepsKey.length }).map((_, index: number) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full transition-colors ${index === step ? "bg-amber-400" : index < step ? "bg-black/60" : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>}

                <div className="min-h-full flex items-start justify-center px-4 py-16 md:py-22">
                    <div className="w-full max-w-4xl space-y-5">
                        {CurrentStep && (
                            <CurrentStep
                                planYourTripForm={planYourTripForm}
                                setPlanYourTripForm={setPlanYourTripForm}
                                jumpToStep={jumpToStep}
                                selectedCountry={selectedCountry}
                            />
                        )}

                        {errors && (
                            <p className="text-center text-red-600">
                                {errors}
                            </p>
                        )}

                        <div className="flex justify-center gap-3">
                            {/* START */}
                            {step === 0 && !isAuthLogin && (
                                <button
                                    disabled={formLoader}
                                    onClick={handleNextStep}
                                    className={`${btnBase} bg-black text-white border-black hover:bg-white hover:text-black`}
                                >
                                    {formLoader && <Loader2 className="w-5 h-5 animate-spin" />}
                                    Start <MoveRight className="h-4 w-4" />
                                </button>
                            )}

                            {step > (isAuthLogin ? 0 : 1) && !formLoader && (
                                <button
                                    onClick={() => setStep(step - 1)}
                                    className={`${btnBase} bg-white border-black hover:bg-black hover:text-white`}
                                >
                                    <MoveLeft size={16} /> Previous
                                </button>
                            )}

                            {(step > 0 || isAuthLogin) && CurrentStepKey !== "summary" && (
                                <button
                                    disabled={formLoader}
                                    onClick={handleNextStep}
                                    className={`${btnBase} bg-black text-white hover:bg-white hover:text-black`}
                                >
                                    {formLoader && <Loader2 className="animate-spin" size={16} />}
                                    Next <MoveRight size={16} />
                                </button>
                            )}

                            {/* VIEW SUMMARY */}
                            {!formLoader && planYourTripForm?.is_show_history_btn && !["summary"].includes(CurrentStepKey) && (
                                <button
                                    onClick={() => jumpToStep("summary")}
                                    className={`${btnBase} hidden md:flex bg-black text-white border-black hover:bg-white hover:text-black`}
                                >
                                    <ListCheck className="h-4 w-4" />
                                    View Summary
                                </button>
                            )}

                            {CurrentStepKey === "summary" && (
                                <button
                                    disabled={formLoader}
                                    onClick={handleSubmit}
                                    className={`${btnBase} bg-black text-white hover:bg-black/80`}
                                >
                                    {formLoader && <Loader2 className="animate-spin" size={18} />}
                                    {!formLoader && <CheckCircle size={18} />}
                                    Submit
                                </button>
                            )}
                        </div>

                        {/* VIEW SUMMARY FOR MOBILE */}
                        {!formLoader && <div className="flex md:hidden flex-row w-full">
                            {planYourTripForm?.is_show_history_btn && !["summary"].includes(CurrentStepKey) && (
                                <button
                                    onClick={() => jumpToStep("summary")}
                                    className={`${btnBase} bg-black text-white border-black hover:bg-white hover:text-black`}
                                >
                                    <ListCheck className="h-4 w-4" />
                                    View Summary
                                </button>
                            )}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}