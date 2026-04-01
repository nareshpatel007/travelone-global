"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getClientIp } from "@/lib/getClientIp";
import { CheckCircle, ListCheck, Loader2, MoveLeft, MoveRight, X } from "lucide-react";
import { sendFbEvent } from "@/lib/sendFbEvent";
import { getCookieData, getLoginCookie, isLoggedIn } from "@/lib/auth";
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
import StepSummary from "./form_questions/summary";
import StepRegions from "./form_questions/step-regions";
import StepPrioritySelection from "./form_questions/priority-selection";

// Define Props
interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedCountry?: string;
    isPersonaResult?: string;
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
    cities: [],
    priority_selection: "",
    days: "",
    travellers: "",
    budget: "",
    accommodation: "",
    guide: "",
    meals: "",
    assistance: "",
    full_name: "",
    email: "",
    mobile: "",
    communication: "",
    privacy_policy_accepted: false,
    is_show_history_btn: false,
};

export function StartJourneyModal({
    open,
    onOpenChange,
    selectedCountry,
    isPersonaResult
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
    const [personaCities, setPersonaCities] = useState<any>(null);
    const [personaResult, setPersonaResult] = useState<any>(null);
    const [disableSubmit, setDisableSubmit] = useState(false);

    // Get cookie value
    const cookieLeadId = getCookieData("lead_id");

    // Set lead id
    useEffect(() => {
        if (cookieLeadId) {
            setLeadId(cookieLeadId);
        }
    }, [cookieLeadId]);

    // Stable Form Steps
    const getFormSteps = (form: any) => {
        // Get selected value
        const haveDestination = form?.choose_flow === "i_have_destination";

        // Define steps
        let stepKeys: string[] = [
            "lead_form",
            ...(!selectedCountry ? ["next_journey"] : []),
            ...(haveDestination && !selectedCountry ? ["destination", "countries"] : []),
            ...(!haveDestination && !selectedCountry ? ["persona_test", "all_countries"] : []),
            "travel_history",
            "seasons",
            ...(selectedCountry && personaCities ? ["regions"] : []),
            ...(selectedCountry && personaCities ? ["priority_selection"] : []),
            "days",
            "travellers",
            "budget",
            "accommodation",
            "guide",
            "meals",
            "kind_help",
            "summary",
        ];

        // If login user
        if (isAuthLogin || leadId) {
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
        // Define value
        let countryValue = selectedCountry || "";

        // Get from path
        if (!countryValue) {
            const fromPath = window.location.pathname.replace("/country/", "").replace(/-/g, " ");
            if (fromPath) {
                countryValue = fromPath.replace(/\b\w/g, (l) => l.toUpperCase());
            }
        }

        // Remove "/" from array
        countryValue = countryValue.replace("/", "");

        // Set country value
        if (countryValue) {
            fetchInitCities();
            setPlanYourTripForm((prev: any) => ({
                ...prev,
                pre_selected_country: true,
                country: countryValue ? [countryValue] : [],
            }));
        }
    }, [selectedCountry, isPersonaResult]);

    // Fetch persona result cities
    const fetchInitCities = async () => {
        if (isPersonaResult && selectedCountry) {
            // API call
            const [resCities, resPersona] = await Promise.all([
                fetch("/api/plan_your_trip/persona-result/cities", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        token: isPersonaResult,
                        country: selectedCountry
                    }),
                }),
                fetch("/api/plan_your_trip/persona-result", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        token: isPersonaResult,
                        country: selectedCountry
                    }),
                })
            ]);

            // Convert json
            const citiesData = await resCities.json();
            const personaData = await resPersona.json();

            if (citiesData?.status) {
                setPersonaCities(citiesData?.data);
            }

            if (personaData?.status) {
                setPersonaResult(personaData?.data?.data);
            }
        }
    };

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
        regions: StepRegions,
        days: StepDays,
        priority_selection: StepPrioritySelection,
        travellers: StepTravelers,
        budget: StepBudget,
        accommodation: StepAccommodation,
        guide: StepGuide,
        meals: StepMeals,
        kind_help: StepKindOfHelp,
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
                        !planYourTripForm.mobile ||
                        !planYourTripForm.communication) {
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

            case "regions":
                if (personaCities && !planYourTripForm.cities)
                    error = "Please select cities.";
                break;

            case "priority_selection":
                if (personaResult && !planYourTripForm.priority_selection)
                    error = "Please select priority selection.";
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

            case "accommodation":
                if (!planYourTripForm.accommodation)
                    error = "Please select accommodation.";
                break;

            case "guide":
                if (!planYourTripForm.guide)
                    error = "Please select guide.";
                break;

            case "meals":
                if (!planYourTripForm.meals)
                    error = "Please select meals.";
                break;

            case "kind_help":
                if (!planYourTripForm.assistance)
                    error = "Please select kind of help.";
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

                // Create lead
                const res = await fetch("/api/plan_your_trip/create_lead", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        full_name: planYourTripForm?.full_name,
                        email: planYourTripForm?.email,
                        mobile: planYourTripForm?.mobile,
                        assistance: planYourTripForm?.assistance,
                        communication: planYourTripForm?.communication,
                        ip_address: await getClientIp(),
                    }),
                });

                // Convert json
                const data = await res.json();

                // Check success
                if (!data?.success) {
                    setErrors("Unable to process your request.");
                    return;
                }

                // Update state
                setLeadId(data?.data?.lead_id);
                setStep(step + 1);
            } catch {
                setErrors("Something went wrong. Please try again.");
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
                    user_id: authData?.user_id,
                    persona_token: isPersonaResult,
                    data: planYourTripForm
                }),
            });

            // Convert json
            const json = await response.json();

            // If success, redirect
            if (json?.status) {
                if (json?.data?.is_itinerary_generated && json?.data?.token) {
                    window.location.href = `/persona-itinerary?token=${json?.data?.token}`;
                } else {
                    window.location.href = `/thank-you`;
                }
            } else {
                setErrors(json?.message || "Unable to process request.");
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

    // Handle disable button
    const handleDisableButton = (isDisabled: boolean) => {
        setDisableSubmit(isDisabled);
    };

    // Handle close
    const handleClose = () => {
        setStep(0);
        setErrors("");
        setPlanYourTripForm(defaultFormData);
        onOpenChange(false);
        setPersonaCities([]);
        setPersonaResult([]);
        setFormLoader(false);
    };

    if (!open) return null;

    const btnBase = "flex items-center justify-center gap-2 w-full md:w-auto px-6 py-2 rounded-sm font-medium border border-black transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

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
                                personaCities={personaCities}
                                personaResult={personaResult}
                                handleDisableButton={handleDisableButton}
                            />
                        )}

                        {/* Errors */}
                        {errors && (
                            <p className="text-center text-base text-red-600">
                                {errors}
                            </p>
                        )}

                        {/* Disable submit */}
                        {disableSubmit && (
                            <p className="text-center text-base text-red-600">
                                TravelOne Global Travel Services, LLC (USA) does not market to or provide travel services to residents of Ontario, Canada. This platform is strictly for the U.S. and international markets. For technology inquiries, please visit travelone.io.
                            </p>
                        )}

                        <div className="flex justify-center gap-3">
                            {/* START */}
                            {step === 0 && !isAuthLogin && (
                                <button
                                    disabled={formLoader || disableSubmit}
                                    onClick={handleNextStep}
                                    className={`${btnBase} bg-black text-white border-black hover:bg-white hover:text-black`}
                                >
                                    {formLoader && <Loader2 className="w-5 h-5 animate-spin" />}
                                    Start <MoveRight className="h-4 w-4" />
                                </button>
                            )}

                            {step > (isAuthLogin ? 0 : 1) && !formLoader && (
                                <button
                                    disabled={disableSubmit}
                                    onClick={() => setStep(step - 1)}
                                    className={`${btnBase} bg-white border-black hover:bg-black hover:text-white`}
                                >
                                    <MoveLeft size={16} /> Previous
                                </button>
                            )}

                            {(step > 0 || isAuthLogin) && CurrentStepKey !== "summary" && (
                                <button
                                    disabled={formLoader || disableSubmit}
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
                                    disabled={formLoader || disableSubmit}
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