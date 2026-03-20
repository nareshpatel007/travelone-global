"use client";

import QuestionHeading from "@/components/plan_your_trip/common/questionHeading";
import { getUserIp } from "@/lib/getClientIp";
import { CheckCircle, Loader2, MoveLeft, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PhoneInput } from "react-international-phone";
import { InlineWidget } from "react-calendly";
import "react-international-phone/style.css";
import { isValidEmail } from "@/lib/utils";
import { sendFbEvent } from "@/lib/sendFbEvent";

interface Props {
    tour?: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mainTitle?: string;
    subTitle?: string;
    pageName?: string;
}

// Define initial form data
const initialFormData = {
    name: "",
    email: "",
    phone: "",
    communication: "",
    best_day: "",
    best_time: "",
    accept_terms: false,
};

export function CustomizeTrip({ tour = {}, open, onOpenChange, mainTitle, subTitle, pageName }: Props) {
    // If not open
    if (!open) return null;

    // Define state
    const [formData, setFormData] = useState(initialFormData);
    const [formLoading, setFormLoading] = useState(false);
    const [errors, setErrors] = useState("");
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<"meeting" | "inquiry">("inquiry");
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [countryProvince, setCountryProvince] = useState<string>("");
    const [userCountry, setUserCountry] = useState<string>("");

    // Handle close
    const handleClose = () => {
        onOpenChange(false);
        setErrors("");
        setIsSubmitted(false);
        setFormData(initialFormData);
        setFormLoading(false);
    };

    // If choose province
    useEffect(() => {
        setDisableSubmit(countryProvince === "Ontario");
    }, [countryProvince]);

    // Handle form submit
    const handleSubmit = async () => {
        // Get ip address
        const ipAddress = await getUserIp();

        // Validation
        if (!formData.name || !formData.email || !formData.phone || !formData.communication) {
            setErrors("Please fill in all the required fields.");
            return;
        } else if (!isValidEmail(formData.email)) {
            setErrors("Please enter valid email address.");
            return;
        } else if (formData.communication === "Call always" && (!formData.best_day || !formData.best_time)) {
            setErrors("Please select a best day and time.");
            return;
        } else if (!formData.accept_terms) {
            setErrors("Please accept the Terms consent to submit your request.");
            return;
        }

        try {
            // Update state
            setErrors("");
            setFormLoading(true);

            // Send data to API route
            const response = await fetch("/api/tours/customize_trip", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tour_id: tour?.id || null,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    communication: formData.communication,
                    best_day: formData.best_day,
                    best_time: formData.best_time,
                    page_name: pageName || "Single Tour Page",
                    ip_address: ipAddress
                })
            });

            // Parse the JSON response
            const data = await response.json();

            // Check response
            if (data?.status) {
                // Send FB event
                sendFbEvent({
                    eventName: "Lead",
                    email: formData.email
                });

                // Update state
                setIsSubmitted(true);
            } else {
                // Update state
                setErrors(data?.message || "Failed to submit form. Please try again later.");
            }
        } catch (error: any) {
            if (error.name !== "AbortError") {
                setErrors("Failed to submit form. Please try again later.");
            }
        } finally {
            setFormLoading(false);
        }
    }

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
                <div className="min-h-full flex flex-col items-center md:justify-center px-4 md:px-8 py-10 md:py-20 space-y-2 md:space-y-5">
                    <div className="w-full max-w-4xl space-y-1 md:space-y-5">
                        <QuestionHeading
                            title={`${isSubmitted ? "Thank you for your inquiry!" : (mainTitle || "Register Your Interest")}`}
                            subtitle={subTitle}
                            className="mb-3 md:mb-6"
                        />

                        {/* Tabs */}
                        {!isSubmitted && (
                            <div className="flex border-b border-black">
                                <button
                                    onClick={() => setActiveTab("inquiry")}
                                    className={`flex-1 py-2 md:py-3 text-sm md:text-base font-medium transition cursor-pointer ${activeTab === "inquiry"
                                        ? "bg-black text-white"
                                        : "bg-white text-black hover:bg-black/10"
                                        }`}
                                >
                                    Submit Inquiry
                                </button>
                                <button
                                    onClick={() => setActiveTab("meeting")}
                                    className={`flex-1 py-2 md:py-3 text-sm md:text-base font-medium transition cursor-pointer ${activeTab === "meeting"
                                        ? "bg-black text-white"
                                        : "bg-white text-black hover:bg-black/10"
                                        }`}
                                >
                                    Setup Virtual Meeting
                                </button>
                            </div>
                        )}

                        {activeTab === "meeting" && (
                            <div className="border border-[#2F5D50] rounded-sm p-5 space-y-4 bg-white/60">
                                <InlineWidget
                                    url="https://calendly.com/travelone/30min"
                                    styles={{ height: "500px", width: "100%" }}
                                />
                            </div>
                        )}

                        {activeTab === "inquiry" && (
                            <div className="border border-[#2F5D50] rounded-sm p-5 space-y-4 bg-white/60">
                                {!isSubmitted ? (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                            <div>
                                                <label className="block text-base md:text-md font-medium text-[#333] mb-1">
                                                    Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    placeholder="Enter your name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full px-4 py-2 rounded-sm border border-[#2F5D50] bg-white outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-base md:text-md font-medium text-[#333] mb-1">
                                                    Phone Number <span className="text-red-500">*</span>
                                                </label>
                                                <PhoneInput
                                                    defaultCountry="us"
                                                    placeholder="Enter your phone number"
                                                    value={formData.phone}
                                                    onChange={(value: any, data: any) => {
                                                        setFormData({ ...formData, phone: value });
                                                        setUserCountry(data?.country?.iso2);
                                                    }}
                                                    className="w-full px-4 py-0.5 text-base rounded-sm border border-[#2F5D50] bg-white outline-none"
                                                    inputClassName="w-full !border-0 text-sm md:text-md !border-white"
                                                />
                                            </div>
                                            {userCountry && userCountry == 'ca' && <>
                                                <div>
                                                    <label className="block text-base md:text-md font-medium text-[#333] mb-1">
                                                        Choose Province <span className="text-red-500">*</span>
                                                    </label>
                                                    <select
                                                        className="w-full px-4 py-2 rounded-sm border border-[#2F5D50] bg-white outline-none"
                                                        onChange={(e) => {
                                                            setCountryProvince(e.target.value);
                                                        }}
                                                    >
                                                        <option value="">Select province</option>
                                                        <option value="Alberta">Alberta</option>
                                                        <option value="British Columbia">British Columbia</option>
                                                        <option value="Manitoba">Manitoba</option>
                                                        <option value="New Brunswick">New Brunswick</option>
                                                        <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                                                        <option value="Northwest Territories">Northwest Territories</option>
                                                        <option value="Nova Scotia">Nova Scotia</option>
                                                        <option value="Nunavut">Nunavut</option>
                                                        <option value="Ontario">Ontario</option>
                                                        <option value="Prince Edward Island">Prince Edward Island</option>
                                                        <option value="Quebec">Quebec</option>
                                                        <option value="Saskatchewan">Saskatchewan</option>
                                                    </select>
                                                </div>
                                            </>}
                                            <div>
                                                <label className="block text-base md:text-md font-medium text-[#333] mb-1">
                                                    Email <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    placeholder="Enter your email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-4 py-2 rounded-sm border border-[#2F5D50] bg-white outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-base md:text-md font-medium text-[#333] mb-1">
                                                    Preferred Method of Communication <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    className="w-full px-4 py-2 rounded-sm border border-[#2F5D50] bg-white outline-none"
                                                    onChange={(e) => {
                                                        setFormData({
                                                            ...formData,
                                                            communication: e.target.value,
                                                            best_day: (e.target.value !== "Call always") ? "" : formData.best_day,
                                                            best_time: (e.target.value !== "Call always") ? "" : formData.best_time
                                                        });
                                                    }}
                                                >
                                                    <option>Select option</option>
                                                    <option value="Text me">Text me</option>
                                                    <option value="WhatsApp">WhatsApp</option>
                                                    <option value="Email">Email is fine</option>
                                                    <option value="Call always">Call always</option>
                                                </select>
                                            </div>

                                            {/* If communication method is "Call always" */}
                                            {formData.communication === "Call always" && (
                                                <>
                                                    <div>
                                                        <label className="block text-base md:text-md font-medium text-[#333] mb-1">
                                                            Best Day to Call You <span className="text-red-500">*</span>
                                                        </label>
                                                        <select
                                                            className="w-full px-4 py-2 rounded-sm border border-[#2F5D50] bg-white outline-none"
                                                            onChange={(e) => setFormData({ ...formData, best_day: e.target.value })}
                                                        >
                                                            <option>Select option</option>
                                                            <option value="Weekdays">Weekdays</option>
                                                            <option value="Weekends">Weekends</option>
                                                            <option value="Call me now">Call me now</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-base md:text-md font-medium text-[#333] mb-1">
                                                            Best Time to Call You <span className="text-red-500">*</span>
                                                        </label>
                                                        <select
                                                            className="w-full px-4 py-2 rounded-sm border border-[#2F5D50] bg-white outline-none"
                                                            onChange={(e) => setFormData({ ...formData, best_time: e.target.value })}
                                                        >
                                                            <option>Select option</option>
                                                            <option value="Morning - 9 am to 12 pm">Morning - 9 am to 12 pm</option>
                                                            <option value="Afternoon - 12 pm to 3 pm">Afternoon - 12 pm to 3 pm</option>
                                                            <option value="Afternoon - 3 pm to 6 pm">Afternoon - 3 pm to 6 pm</option>
                                                            <option value="Evening - 6 pm to 9 pm">Evening - 6 pm to 9 pm</option>
                                                        </select>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <div className="flex items-start gap-2 pt-2">
                                            <input
                                                type="checkbox"
                                                id="terms"
                                                className="mt-1 cursor-pointer"
                                                onChange={(e) => setFormData({ ...formData, accept_terms: e.target.checked })}
                                            />
                                            <label className="text-xs md:text-sm text-gray-700">
                                                I agree to the <Link href="/legal/terms-service" target="_blank" className="underline">T&Cs</Link> and <Link href="/legal/privacy-policy" target="_blank" className="underline">Privacy Policy</Link>, and consent to receive communications from TravelOne Global Travel Services, LLC (USA), including follow-up call and text messages for quotes, scheduling, and call reminders, regarding my inquiry. Std msg & data rates apply. Text STOP to cancel, HELP for info. By continuing, you acknowledge that travel services are fulfilled by TravelOne Global Travel Services, LLC (USA).
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-4 text-center py-4">
                                        <div className="flex justify-center items-center">
                                            <div className="h-16 w-16 rounded-full bg-[#2F5D50]/10 flex items-center justify-center">
                                                <CheckCircle className="h-8 w-8 text-[#2F5D50]" />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <span className="text-md md:text-lg font-medium text-black block">We’ve received your request and our travel experts are already reviewing your details to prepare a personalized itinerary for you.</span>
                                            <span className="text-sm md:text-base text-black block">We’ll be in touch very soon to begin planning your trip.</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {errors && (
                        <span className="text-sm md:text-base text-red-500">{errors}</span>
                    )}

                    {/* Disable submit */}
                    {disableSubmit && (
                        <p className="max-w-4xl mx-auto text-center text-base text-red-600">
                            TravelOne Global Travel Services, LLC (USA) does not market to or provide travel services to residents of Ontario, Canada. This platform is strictly for the U.S. and international markets. For technology inquiries, please visit travelone.io.
                        </p>
                    )}

                    {!isSubmitted && <div className="flex items-center">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={formLoading || disableSubmit}
                            className="flex items-center justify-center gap-2 px-7 py-1.5 md:py-2 rounded font-medium transition-colors border border-black cursor-pointer bg-black text-white text-base hover:text-black hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {formLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {!formLoading && <CheckCircle className="w-4 h-4" />}
                            Submit Request
                        </button>
                    </div>}

                    {isSubmitted && <div className="flex items-center">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex items-center justify-center gap-2 px-7 py-1.5 rounded font-medium transition-colors border border-black cursor-pointer bg-black text-white text-base hover:text-black hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <MoveLeft className="w-4 h-4" /> Back to Itinerary
                        </button>
                    </div>}
                </div>
            </div>
        </div>
    );
}
