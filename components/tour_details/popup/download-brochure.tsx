"use client"

import { useEffect, useState } from "react";
import { CheckCircle, Download, Loader } from "lucide-react";
import QuestionHeading from "@/components/plan_your_trip/landing/questionHeading";
import Link from "next/link";
import { getUserIp } from "@/lib/getClientIp";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface Props {
    tour: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DownloadBrochure({ tour, open, onOpenChange }: Props) {
    // Define state
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState("");
    const [errors, setErrors] = useState("");
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [countryProvince, setCountryProvince] = useState<string>("");
    const [userCountry, setUserCountry] = useState<string>("");

    // If choose province
    useEffect(() => {
        setDisableSubmit(countryProvince === "Ontario");
    }, [countryProvince]);

    // Handle form submit
    const handleSubmit = async () => {
        try {
            // Validation
            if (!phone) {
                setErrors("Please enter valid phone number.");
                return;
            } else if (!email) {
                setErrors("Please enter valid email address.");
                return;
            } else if (!acceptTerms) {
                setErrors("Please accept the Terms consent to submit your inquiry.");
                return;
            }

            // Get ip address
            const ipAddress = await getUserIp();

            // Update state
            setErrors("");
            setDownloadUrl("");
            setFormLoading(true);

            // Send data to API route
            const response = await fetch("/api/tours/brochure_download", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tour_id: tour?.id,
                    email,
                    phone,
                    ip_address: ipAddress
                }),
            });

            // Check response
            if (!response.ok) {
                setErrors("Failed to submit form. Please try again later.");
            }

            // Parse the JSON response
            const data = await response.json();

            // Check response
            if (data?.status) {
                // Update the state
                setIsSubmitted(true);
                setDownloadUrl(data?.data?.itinerary_pdf || "");
            } else {
                // Set errors
                setErrors(data?.message || "Failed to submit form. Please try again later.");
            }
        } catch (error: any) {
            if (error.name !== "AbortError") {
                console.error("Failed to submit form data:", error);
            }
        } finally {
            setFormLoading(false);
        }
    }

    return (
        <>
            {open && <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4">
                <div
                    className="relative w-full max-w-[380px] bg-[#d9eed8] shadow-xl overflow-visible"
                    style={{
                        borderTopLeftRadius: "180px",
                        borderTopRightRadius: "180px",
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                    }}
                >
                    <div className="absolute top-16 right-10 translate-x-1/2 -translate-y-1/2 z-50 cursor-pointer">
                        <svg
                            className="absolute inset-0 w-10 h-10"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 110 110"
                            fill="#a6c5a9"
                        >
                            <path d="M109.2,72.8c-1.9,5.2-11.5,6.4-14.7,10.6c-3.4,4.3-2,13.5-6.5,16.6c-4.6,3.1-13.1-1.3-18.4,0.3c-5.3,1.6-9.7,9.8-15.4,9.7c-5.5-0.1-9.6-8.4-15.1-10.2C33.6,98,25,102.1,20.6,99c-4.5-3.3-2.8-12.4-5.9-16.8c-3.2-4.4-12.8-5.9-14.4-11.1c-1.6-5.1,5.3-11.5,5.4-16.9C5.8,49-1.1,42.4,0.8,37.2s11.5-6.4,14.7-10.6c3.4-4.3,2-13.5,6.5-16.6c4.6-3.1,13.1,1.3,18.4-0.3c5.3-1.6,9.7-9.8,15.4-9.7c5.5,0.1,9.6,8.4,15.1,10.2C76.4,12,85,7.9,89.4,11c4.5,3.3,2.8,12.4,5.9,16.8c3.2,4.4,12.8,5.9,14.4,11.1c1.6,5.1-5.3,11.5-5.4,16.9C104.2,61,111.1,67.6,109.2,72.8z" />
                        </svg>

                        <button
                            aria-label="Close"
                            className="relative w-10 h-10 flex items-center justify-center text-white text-sm font-semibold cursor-pointer"
                            onClick={() => {
                                onOpenChange(false);
                                setEmail("");
                                setPhone("");
                                setAcceptTerms(false);
                                setIsSubmitted(false);
                                setDisableSubmit(false);
                            }}
                        >
                            ✕
                        </button>
                    </div>
                    <div className="p-8">
                        <QuestionHeading
                            title="Download Brochure"
                            subtitle="Get detailed information about tour."
                        />
                        {!isSubmitted ? (
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="block text-md text-sm md:text-base text-black">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <PhoneInput
                                        defaultCountry="us"
                                        placeholder="Enter your phone number"
                                        value={phone}
                                        onChange={(value: any, data: any) => {
                                            setPhone(value);
                                            setUserCountry(data?.country?.iso2);
                                        }}
                                        className="w-full px-4 py-0.5 text-base rounded-sm border border-gray-900 bg-white outline-none"
                                        inputClassName="w-full !border-0 text-sm md:text-md !border-white"
                                    />
                                </div>

                                {userCountry && userCountry == 'ca' && <>
                                    <div className="space-y-1">
                                        <label className="block text-md text-sm md:text-base text-black">
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

                                <div className="space-y-1">
                                    <label className="block text-md text-sm md:text-base text-black">
                                        Email address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="off"
                                        placeholder="Enter your email"
                                        className="w-full rounded-sm px-4 py-2 bg-white border border-gray-900"
                                    />
                                </div>

                                {!disableSubmit && <div className="flex items-start gap-2">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="mt-1 cursor-pointer"
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                    />
                                    <label className="text-xs md:text-sm text-gray-700">
                                        I agree to the <Link href="/legal/terms-service" target="_blank" className="underline">T&Cs</Link> and <Link href="/legal/privacy-policy" target="_blank" className="underline">Privacy Policy</Link>, and consent to receive communications from TravelOne Global Travel Services, LLC (USA), including follow-up call and text messages for quotes, scheduling, and call reminders, regarding my inquiry. Std msg & data rates apply. Text STOP to cancel, HELP for info. By continuing, you acknowledge that travel services are fulfilled by TravelOne Global Travel Services, LLC (USA).
                                    </label>
                                </div>}

                                {/* Error */}
                                {errors && <p className="text-center text-sm text-red-600">{errors}</p>}

                                {/* Disable submit */}
                                {disableSubmit && (
                                    <p className="text-center text-sm text-red-600">
                                        TravelOne Global Travel Services, LLC (USA) does not market to or provide travel services to residents of Ontario, Canada. This platform is strictly for the U.S. and international markets. For technology inquiries, please visit travelone.io.
                                    </p>
                                )}

                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={formLoading || disableSubmit}
                                    className="w-full flex items-center justify-center bg-black text-sm md:text-base text-white font-normal py-2 rounded-md hover:bg-black/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {formLoading && <Loader className="w-4 h-4 mr-2 animate-spin" />}
                                    {!formLoading && <CheckCircle className="w-4 h-4 mr-2" />}
                                    Download Brochure
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4 text-center py-4">
                                <div className="flex justify-center">
                                    <div className="h-16 w-16 rounded-full bg-[#2F5D50]/10 flex items-center justify-center">
                                        <CheckCircle className="h-8 w-8 text-[#2F5D50]" />
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xl font-semibold text-black block mb-2">Check your email</span>
                                    <span className="text-sm text-gray-700 block">We've sent an email to {email}.</span>
                                </div>
                                <div className="text-center">
                                    <span className="text-sm text-gray-700 leading-relaxed">
                                        <Link href={downloadUrl} target="_blank">
                                            <button
                                                type="button"
                                                className="w-full flex items-center justify-center bg-black text-white border border-black font-semibold mt-3 py-2.5 rounded-md hover:bg-white hover:text-black transition-colors cursor-pointer"
                                            >
                                                <Download className="w-4 h-4 mr-2" /> Download PDF
                                            </button>
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>}
        </>
    )
}
