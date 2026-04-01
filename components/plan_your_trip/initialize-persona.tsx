"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getClientIp } from "@/lib/getClientIp";
import { CheckCircle, Loader2, MoveLeft, MoveRight, X } from "lucide-react";
import { sendFbEvent } from "@/lib/sendFbEvent";
import Question1 from "./personas/Question1";
import Question2 from "./personas/Question2";
import Question3 from "./personas/Question3";
import Question4 from "./personas/Question4";
import Question5 from "./personas/Question5";
import Question6 from "./personas/Question6";
import Question7 from "./personas/Question7";
import Question8 from "./personas/Question8";
import Question9 from "./personas/Question9";
import Question10 from "./personas/Question10";
import StepLeadForm from "./personas/StepLeadForm";
import { getLoginCookie, isLoggedIn, setCookieData, setLoginCookie } from "@/lib/auth";
import { isValidEmail } from "@/lib/utils";

// Define interface
interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}

// Define form data
const defaultFormData = {
    question_1: "",
    question_2: "",
    question_3: "",
    question_4: "",
    question_5: "",
    question_6: "",
    question_7: "",
    question_8: "",
    question_9: "",
    question_10: "",
    user_id: "",
    full_name: "",
    email: "",
    mobile: "",
    privacy_policy_accepted: false,
    ip_address: ""
};

export function InitializePersonaModal({ open, onOpenChange }: Props) {
    // Define route
    const router = useRouter();

    // Define state
    const [step, setStep] = useState(0);
    const [planYourTripForm, setPlanYourTripForm] = useState<any>(defaultFormData);
    const [errors, setErrors] = useState<string>("");
    const [leadId, setLeadId] = useState<string>("");
    const [formLoader, setFormLoader] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);

    // Get login data
    const isAuthLogin = isLoggedIn();
    const loginData = getLoginCookie();

    // Handle close
    const handleClose = () => {
        setStep(0);
        setErrors("");
        setPlanYourTripForm(defaultFormData);
        onOpenChange(false);
        setFormLoader(false);
    }

    // Handle disable button
    const handleDisableButton = (isDisabled: boolean) => {
        setDisableSubmit(isDisabled);
    };

    // Validate step
    const validateStep = () => {
        // Define error
        let newErrors = "";

        // Get current step
        const steps = getFormSteps(true);
        const activeStep = steps[step];

        // Validate step
        switch (activeStep) {
            case "lead_form":
                if (
                    !isAuthLogin &&
                    !leadId &&
                    (!planYourTripForm?.full_name || !planYourTripForm?.email || !planYourTripForm?.mobile)
                ) {
                    newErrors = "Please fill all required fields.";
                } else if (!isValidEmail(planYourTripForm?.email)) {
                    newErrors = "Please enter a valid email.";
                } else if (planYourTripForm?.mobile?.length < 10) {
                    newErrors = "Please enter a valid mobile number.";
                } else if (!leadId && !planYourTripForm?.privacy_policy_accepted) {
                    newErrors = "Please accept the Terms consent.";
                }
                break;

            case "question_1":
                if (!planYourTripForm?.question_1) {
                    newErrors = "Please select an option.";
                }
                break;

            case "question_2":
                if (!planYourTripForm?.question_2) {
                    newErrors = "Please select an option.";
                }
                break;

            case "question_3":
                if (!planYourTripForm?.question_3) {
                    newErrors = "Please select an option.";
                }
                break;

            case "question_4":
                if (!planYourTripForm?.question_4) {
                    newErrors = "Please select an option.";
                }
                break;

            case "question_5":
                if (!planYourTripForm?.question_5) {
                    newErrors = "Please select an option.";
                }
                break;

            case "question_6":
                if (!planYourTripForm?.question_6) {
                    newErrors = "Please select an option.";
                }
                break;

            case "question_7":
                if (!planYourTripForm?.question_7) {
                    newErrors = "Please select an option.";
                }
                break;

            case "question_8":
                if (!planYourTripForm?.question_8) {
                    newErrors = "Please select an option.";
                }
                break;

            case "question_9":
                if (!planYourTripForm?.question_9) {
                    newErrors = "Please select an option.";
                }
                break;

            case "question_10":
                if (!planYourTripForm?.question_10) {
                    newErrors = "Please select an option.";
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
                    action: "personas-form",
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

        // Define value
        let updatedFormData = planYourTripForm;

        // If login user
        if (isAuthLogin) {
            updatedFormData = {
                ...planYourTripForm,
                user_id: loginData?.user_id,
                email: loginData?.email,
                name: `${loginData?.first_name} ${loginData?.last_name}`
            }
        }

        try {
            // Update state
            setFormLoader(true);

            // Auto save last step
            autoSaveQuestion();

            // Save lead questions
            const response = await fetch("/api/plan_your_trip", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    lead_id: leadId,
                    user_id: updatedFormData?.user_id,
                    action: "personas-form",
                    data: updatedFormData,
                    ip_address: await getClientIp(),
                })
            });

            // Get json parse
            const data = await response.json();

            // Check status
            if (data?.status && data?.data?.token) {
                // Send FB event
                sendFbEvent({
                    eventName: "Lead",
                    email: planYourTripForm?.email
                });

                // Auto login
                if (data?.data?.user && data?.data?.user?.user_id) {
                    setLoginCookie(data?.data?.user);
                }

                // Update state
                setFormLoader(false);

                // Redirect to page
                router.push(`/persona-result/?token=${data?.data?.token}`);
            } else {
                // Update state
                setFormLoader(false);
                setErrors(data.message || "Unable to process your request. Please try again.");
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

        // Reset errors
        setErrors("");

        // Create lead ONLY if no leadId AND user not logged in
        if (step === 0 && !leadId && !isAuthLogin) {
            try {
                setFormLoader(true);

                // Create lead
                const res = await fetch("/api/plan_your_trip/create_lead", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        user_id: loginData?.user_id,
                        full_name: planYourTripForm?.full_name,
                        email: planYourTripForm?.email,
                        mobile: planYourTripForm?.mobile,
                        ip_address: await getClientIp(),
                    }),
                });

                // Convert json
                const data = await res.json();

                // Check status
                if (!data?.success) {
                    setErrors("Something went wrong. Please try again. If the problem persists, please contact us.");
                    return;
                }

                // Save lead
                setCookieData("lead_id", data?.data?.lead_id);
                setLeadId(data?.data?.lead_id);
            } catch {
                setErrors("Something went wrong. Please try again. If the problem persists, please contact us.");
                setStep(0);
                return;
            } finally {
                setFormLoader(false);
            }
        }

        // Move to next step (common flow)
        setStep(step + 1);
    };

    // Get next/prev active steps
    const getFormSteps = (isReturnKey = false) => {
        // Define step keys
        let stepKeys: string[] = [
            "lead_form",
            "question_1",
            "question_2",
            "question_3",
            "question_4",
            "question_5",
            "question_6",
            "question_7",
            "question_8",
            "question_9",
            "question_10",
        ];

        // If already login, remove lead form
        if (isAuthLogin) {
            stepKeys = stepKeys.filter((key) => key !== "lead_form");
        };

        // If return key
        if (isReturnKey) return stepKeys;

        // Component map (order must match keys)
        const componentMap: Record<string, any> = {
            lead_form: StepLeadForm,
            question_1: Question1,
            question_2: Question2,
            question_3: Question3,
            question_4: Question4,
            question_5: Question5,
            question_6: Question6,
            question_7: Question7,
            question_8: Question8,
            question_9: Question9,
            question_10: Question10,
        };

        // Return response
        return stepKeys.map((key) => componentMap[key]);
    };

    // Handle jump to step
    const jumpToStep = (stepKey: any) => {
        const steps = getFormSteps(true);
        const index = steps.indexOf(stepKey);
        if (index !== -1) {
            setStep(index);
        }
    };

    // Get current step
    const stepsValue = getFormSteps();
    const stepsKey = getFormSteps(true);
    const CurrentStep = stepsValue[step];
    const CurrentStepKey = stepsKey[step];

    // Define button basic class
    const btnBase = "flex items-center justify-center gap-2 w-full md:w-auto px-4 md:px-8 py-2 md:py-2.5 rounded-sm font-medium border cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed";

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
                        {/* Screen Step */}
                        {CurrentStep && (
                            <CurrentStep
                                planYourTripForm={planYourTripForm}
                                setPlanYourTripForm={setPlanYourTripForm}
                                jumpToStep={jumpToStep}
                                isLandingPage={true}
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

                        {/* Navigation */}
                        <div className="flex flex-row items-stretch md:items-center justify-center gap-2 md:gap-3 w-full">
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

                            {/* PREVIOUS */}
                            {step > (isAuthLogin ? 0 : 1) && !formLoader && (
                                <button
                                    onClick={handlePreviousStep}
                                    className={`${btnBase} bg-white text-black border-black hover:bg-black hover:text-white`}
                                >
                                    <MoveLeft className="h-4 w-4" />
                                    Previous
                                </button>
                            )}

                            {/* NEXT */}
                            {(step > 0 || isAuthLogin) && CurrentStepKey !== "question_10" && (
                                <button
                                    disabled={formLoader || disableSubmit}
                                    onClick={() => {
                                        handleNextStep();
                                        autoSaveQuestion();
                                    }}
                                    className={`${btnBase} bg-black text-white border-black hover:bg-white hover:text-black`}
                                >
                                    Next <MoveRight className="h-4 w-4" />
                                </button>
                            )}

                            {/* SUBMIT */}
                            {CurrentStepKey === "question_10" && (
                                <button
                                    disabled={formLoader || disableSubmit}
                                    onClick={handlSubmitPlanYourTrip}
                                    className={`${btnBase} bg-black text-white border-black hover:bg-white hover:text-black`}
                                >
                                    {formLoader ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <CheckCircle className="h-5 w-5" />
                                    )}
                                    Reveal The Truth
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
