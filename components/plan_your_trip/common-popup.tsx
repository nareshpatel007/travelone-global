"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getClientIp } from "@/lib/getClientIp";
import StepLeadForm from "./common/StepLeadForm";
import StepFirstVisit from "./common/StepFirstVisit";
import StepTravelTime from "./common/StepTravelTime";
import StepTripDesign from "./common/StepTripDesign";
import StepThemes from "./common/StepThemes";
import StepThemes1 from "./common/StepThemes1";
import StepThemes2 from "./common/StepThemes2";
import StepRegions from "./common/StepRegions";
import StepDays from "./common/StepDays";
import StepBudget from "./common/StepBudget";
import StepTravelers from "./common/StepTravelers";
import StepAccommodation from "./common/StepAccommodation";
import StepMeals from "./common/StepMeals";
import StepTransfer from "./common/StepTransfer";
import StepGuide from "./common/StepGuide";
import StepSummary from "./common/StepSummary";
import { CheckCircle, ListCheck, Loader2, MoveLeft, MoveRight, X } from "lucide-react";
import StepCountries from "./common/StepCountries";
import ChoosePytFlow from "./common/ChoosePytFlow";
import StepDestinations from "./common/StepDestinations";
import StepKindOfHelp from "./common/StepKindOfHelp";
import StepCommunicationMethod from "./common/StepCommunicationMethod";
import { sendFbEvent } from "@/lib/sendFbEvent";

// Define interface
interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}

// Define form data
const defaultFormData = {
    choose_flow: "",
    destination: "",
    country: [],
    first_time_visit: "",
    season_name: "",
    travel_month: "",
    trip_design: "",
    themes_priority_1: [],
    themes_priority_2: [],
    cities_options: [],
    selected_cities: [],
    day_option: "7 - 10 Days (The Essential Experience)",
    budget: "$3000 - $5000 USD (Affordable Private Experience)",
    prefer_travel_type: "family",
    family_friends: {
        adults: 2,
        child_8_12: 0,
        child_3_7: 0,
        infant: 0,
        is_women_only: false
    },
    groups: {
        adults: 2,
        child_8_12: 0,
        child_3_7: 0,
        infant: 0,
        is_women_only: false
    },
    solo: {
        adults: 1,
        is_women_only: false
    },
    accommodation: "Budgeted 4 Star",
    meal_preferences: [],
    transportation: "",
    guide: "",
    kind_of_help: "",
    communication_method: "",
    best_day: "",
    best_time: "",
    full_name: "",
    email: "",
    mobile: "",
    privacy_policy_accepted: false,
    ip_address: "",
    is_show_history_btn: false
};

export function CommonPlanTripModal({ open, onOpenChange }: Props) {
    // Define route
    const router = useRouter();

    // Define state
    const [step, setStep] = useState(0);
    const [planYourTripForm, setPlanYourTripForm] = useState<any>(defaultFormData);
    const [errors, setErrors] = useState<string>("");
    const [leadId, setLeadId] = useState<string>("");
    const [formLoader, setFormLoader] = useState(false);

    useEffect(() => {
        if (planYourTripForm.choose_flow) {
            setStep(1);
        }
    }, [planYourTripForm.choose_flow]);

    // Handle close
    const handleClose = () => {
        setStep(0);
        setErrors("");
        setPlanYourTripForm(defaultFormData);
        onOpenChange(false);
    }

    // Validate step
    const validateStep = () => {
        // Define error
        let newErrors = "";

        // Get current step
        const steps = getFormSteps(planYourTripForm, true);
        const activeStep = steps[step];
        const flow = planYourTripForm.choose_flow;

        // Validate step
        switch (activeStep) {
            case "lead_form":
                if (
                    !planYourTripForm.full_name ||
                    !planYourTripForm.email ||
                    !planYourTripForm.mobile
                ) {
                    newErrors = "Please fill all required fields.";
                } else if (!planYourTripForm.privacy_policy_accepted) {
                    newErrors = "Please accept the Terms consent.";
                }
                break;

            case "choose_flow":
                if (!flow) {
                    newErrors = "Please select an option.";
                }
                break;

            case "destinations":
                if (flow === "i_have_destination" && !planYourTripForm.destination) {
                    newErrors = "Please select a destination.";
                }
                break;

            case "countries":
                if (
                    flow === "i_have_destination" &&
                    (!Array.isArray(planYourTripForm.country) ||
                        planYourTripForm.country.length === 0)
                ) {
                    newErrors = "Please select at least one country.";
                }
                break;

            case "first_visit":
                if (
                    flow === "i_have_destination" &&
                    !planYourTripForm.first_time_visit
                ) {
                    newErrors = "Please select an option.";
                }
                break;

            case "travel_time":
                if (!planYourTripForm.season_name) {
                    newErrors = "Please select your travel season.";
                }
                break;

            case "trip_design":
                if (!planYourTripForm.trip_design) {
                    newErrors = "Please select a trip design.";
                }
                break;

            case "themes_single":
            case "themes_priority_1":
                if (
                    !Array.isArray(planYourTripForm.themes_priority_1) ||
                    planYourTripForm.themes_priority_1.length === 0
                ) {
                    newErrors = "Please select at least one theme.";
                }
                break;

            case "themes_priority_2":
                if (
                    !Array.isArray(planYourTripForm.themes_priority_2) ||
                    planYourTripForm.themes_priority_2.length === 0
                ) {
                    newErrors = "Please select at least one theme.";
                }
                break;

            case "regions":
                if (
                    flow === "i_have_destination" &&
                    !Array.isArray(planYourTripForm.selected_cities) ||
                    planYourTripForm.selected_cities.length === 0
                ) {
                    newErrors = "Please select at least one city.";
                }
                break;

            case "days":
                if (!planYourTripForm.day_option) {
                    newErrors = "Please select trip duration.";
                }
                break;

            case "budget":
                if (!planYourTripForm.budget) {
                    newErrors = "Please select a budget.";
                }
                break;

            case "travelers":
                if (!planYourTripForm.prefer_travel_type) {
                    newErrors = "Please select travelers.";
                }
                break;

            case "accommodation":
                if (!planYourTripForm.accommodation) {
                    newErrors = "Please select accommodation preference.";
                }
                break;

            case "kind_help":
                if (!planYourTripForm.kind_of_help) {
                    newErrors = "Please select how we can help you.";
                }
                break;

            case "communication":
                if (!planYourTripForm.communication_method) {
                    newErrors = "Please select communication preference.";
                } else if (planYourTripForm.communication_method === "Call always" && (!planYourTripForm.best_day || !planYourTripForm.best_time)) {
                    newErrors = "Please select best day and time for communication.";
                }
                break;
        }

        // Set errors
        setErrors(newErrors);

        // Return response
        return newErrors === "";
    };

    // Auto save questions
    const autoSaveQuestion = () => {
        try {
            // Validation
            if (leadId === "") return;

            // Save lead questions
            fetch("/api/plan_your_trip/autosave", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    lead_id: leadId,
                    action: "plan_your_trip",
                    data: planYourTripForm
                })
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Handle submit plan your trip
    const handlSubmitPlanYourTrip = async () => {
        // Validate step
        if (!validateStep()) return;

        try {
            // Update state
            setFormLoader(true);

            // Auto save last step
            autoSaveQuestion();

            // Save lead questions
            const response = await fetch("/api/plan_your_trip", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    lead_id: leadId,
                    action: "plan_your_trip",
                    data: planYourTripForm
                })
            });

            // Get json parse
            const json_parse = await response.json();

            // Check status
            if (json_parse.status) {
                // Send FB event
                sendFbEvent({
                    eventName: "Lead",
                    email: planYourTripForm.email
                });

                // Redirect to thank you page
                router.push("/thank-you");
            } else {
                setFormLoader(false);
                setErrors(json_parse.message);
            }
        } catch (error) {
            // Set error
            setErrors("Unable to process your request. Please try again.");
        }
    };

    // Handle prev step
    const handlePreviousStep = () => {
        // Clear error
        setErrors("");

        // Update state
        if (step > 0) setStep(step - 1);
    };

    // Handle next step
    const handleNextStep = async () => {
        // Validate step
        if (!validateStep()) return;

        // Update state
        setErrors("");

        // STEP 0 → CREATE LEAD
        if (step === 0) {
            try {
                if (leadId) {
                    setStep(step + 1);
                    return;
                }

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
                setStep(0);
            } finally {
                setFormLoader(false);
            }
            return;
        }

        // NORMAL FLOW
        setStep(step + 1);
    };


    // Get next/prev active steps
    const getFormSteps = (form: any, isReturnKey = false) => {
        // Get trip design
        const isSimpleDesign = form?.trip_design === "The Focused Vision";
        const isSuggestFlow = form?.choose_flow === "suggest_destination";

        // Define keys
        let baseKeys: string[] = [];

        // If not lead exist
        if (!leadId) baseKeys = ["lead_form"];

        // Get step keys
        baseKeys = [
            ...baseKeys,
            "choose_flow",
        ];

        // For suggest destination flow
        const destinationFlowKeys = isSuggestFlow ? [] : [
            "destinations",
            "countries",
            "first_visit",
            "regions",
        ];

        // Get remaining keys
        const remainingKeys = [
            "travel_time",
            "trip_design",
            ...(isSimpleDesign
                ? ["themes_single"]
                : ["themes_priority_1", "themes_priority_2"]),
            "days",
            "budget",
            "travelers",
            "accommodation",
            "meals",
            "transfer",
            "guide",
            "summary",
            "kind_help",
            "communication",
        ];

        // Get step keys
        const stepKeys = [
            ...baseKeys,
            ...destinationFlowKeys,
            ...remainingKeys,
        ];

        // If return key
        if (isReturnKey) return stepKeys;

        // COMPONENT MAP (order must match keys)
        const componentMap: Record<string, any> = {
            lead_form: StepLeadForm,
            choose_flow: ChoosePytFlow,
            destinations: StepDestinations,
            countries: StepCountries,
            first_visit: StepFirstVisit,
            travel_time: StepTravelTime,
            trip_design: StepTripDesign,
            themes_single: StepThemes,
            themes_priority_1: StepThemes1,
            themes_priority_2: StepThemes2,
            regions: StepRegions,
            days: StepDays,
            budget: StepBudget,
            travelers: StepTravelers,
            accommodation: StepAccommodation,
            meals: StepMeals,
            transfer: StepTransfer,
            guide: StepGuide,
            summary: StepSummary,
            kind_help: StepKindOfHelp,
            communication: StepCommunicationMethod,
        };

        // Return response
        return stepKeys.map((key) => componentMap[key]);
    };

    // Handle jump to step
    const jumpToStep = (stepKey: any) => {
        const steps = getFormSteps(planYourTripForm, true);
        const index = steps.indexOf(stepKey);
        if (index !== -1) {
            setStep(index);
        }
    };

    // Get current step
    const stepsValue = getFormSteps(planYourTripForm);
    const stepsKey = getFormSteps(planYourTripForm, true);
    const CurrentStep = stepsValue[step];
    const CurrentStepKey = stepsKey[step];

    // Define button basic class
    const btnBase = "flex items-center justify-center gap-2 w-full md:w-auto " + "px-4 md:px-8 py-2 md:py-2.5 rounded-sm font-medium border cursor-pointer transition " + "disabled:opacity-50 disabled:cursor-not-allowed";

    // If not open
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
            <div className="relative w-full h-full bg-[#FFF6E5] overflow-auto">
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 z-10 p-2 rounded-full bg-[#FFC765] hover:bg-black hover:text-white cursor-pointer transition"
                >
                    <X className="h-5 w-5" />
                </button>
                <div className="min-h-full flex items-start justify-center px-4 py-16">
                    <div className="w-full max-w-4xl space-y-5">
                        {/* Screen Step */}
                        {CurrentStep && (
                            <CurrentStep
                                planYourTripForm={planYourTripForm}
                                setPlanYourTripForm={setPlanYourTripForm}
                                jumpToStep={jumpToStep}
                            />
                        )}

                        {/* Error */}
                        {errors && (
                            <div className="text-center">
                                <p className="text-red-600 text-sm md:text-base">{errors}</p>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex flex-row items-stretch md:items-center justify-center gap-2 md:gap-3 w-full">
                            {/* START */}
                            {step === 0 && !formLoader && (
                                <button
                                    disabled={formLoader}
                                    onClick={handleNextStep}
                                    className={`${btnBase} bg-black text-white border-black hover:bg-white hover:text-black`}
                                >
                                    {formLoader && <Loader2 className="w-5 h-5 animate-spin" />}
                                    Start <MoveRight className="h-4 w-4" />
                                </button>
                            )}

                            {/* PREVIOUS */}
                            {step > 1 && (
                                <button
                                    onClick={handlePreviousStep}
                                    disabled={formLoader}
                                    className={`${btnBase} bg-white text-black border-black hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    <MoveLeft className="h-4 w-4" />
                                    Previous
                                </button>
                            )}

                            {/* NEXT */}
                            {step > 0 && !formLoader && CurrentStepKey !== "communication" && (
                                <button
                                    disabled={formLoader}
                                    onClick={() => {
                                        handleNextStep();
                                        autoSaveQuestion();
                                    }}
                                    className={`${btnBase} bg-black text-white border-black hover:bg-white hover:text-black`}
                                >
                                    Next <MoveRight className="h-4 w-4" />
                                </button>
                            )}

                            {/* SKIP */}
                            {!formLoader && ["meals", "transfer", "guide"].includes(CurrentStepKey) && !["summary", "communication", "kind_help"].includes(CurrentStepKey) && (
                                <button
                                    onClick={() => {
                                        setStep(step + 1);
                                        setErrors("");
                                        autoSaveQuestion();
                                    }}
                                    className={`${btnBase} bg-white text-black border-black hover:bg-black hover:text-white`}
                                >
                                    Skip <MoveRight className="h-4 w-4" />
                                </button>
                            )}

                            {/* VIEW SUMMARY */}
                            {!formLoader && planYourTripForm?.is_show_history_btn && !["summary", "communication", "kind_help"].includes(CurrentStepKey) && (
                                <button
                                    onClick={() => jumpToStep("summary")}
                                    className={`${btnBase} hidden md:flex bg-black text-white border-black hover:bg-white hover:text-black`}
                                >
                                    <ListCheck className="h-4 w-4" />
                                    View Summary
                                </button>
                            )}

                            {/* SUBMIT */}
                            {CurrentStepKey === "communication" && (
                                <button
                                    disabled={formLoader}
                                    onClick={handlSubmitPlanYourTrip}
                                    className={`${btnBase} bg-black text-white border-black hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {formLoader ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <CheckCircle className="h-5 w-5" />
                                    )}
                                    Submit
                                </button>
                            )}
                        </div>

                        {/* VIEW SUMMARY FOR MOBILE */}
                        {!formLoader && <div className="flex md:hidden flex-row w-full">
                            {planYourTripForm?.is_show_history_btn && !["summary", "communication", "kind_help"].includes(CurrentStepKey) && (
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
    )
}
