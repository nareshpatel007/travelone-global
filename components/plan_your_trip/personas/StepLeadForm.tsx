"use client"

import { useEffect, useState } from "react";
import QuestionHeading from "./questionHeading";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface Props {
    planYourTripForm: any;
    setPlanYourTripForm: React.Dispatch<React.SetStateAction<any>>;
    handleDisableButton: (disabled: boolean) => void;
}

export default function StepLeadForm({
    planYourTripForm,
    setPlanYourTripForm,
    handleDisableButton,
}: Props) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [acceptPrivacy, setAcceptPrivacy] = useState(false);
    const [countryProvince, setCountryProvince] = useState<string>("");
    const [userCountry, setUserCountry] = useState<string>("");

    // Restore values when coming back to this step
    useEffect(() => {
        if (planYourTripForm?.full_name) {
            setFullName(planYourTripForm.full_name);
        }
        if (planYourTripForm?.email) {
            setEmail(planYourTripForm.email);
        }
        if (planYourTripForm?.mobile) {
            setMobile(planYourTripForm.mobile);
        }
        if (planYourTripForm?.privacy_policy_accepted !== undefined) {
            setAcceptPrivacy(planYourTripForm.privacy_policy_accepted);
        }
    }, [planYourTripForm]);

    // If choose province
    useEffect(() => {
        if (typeof handleDisableButton === "function") {
            handleDisableButton(countryProvince === "Ontario");
        }
    }, [countryProvince]);

    const updateForm = (key: string, value: any) => {
        setPlanYourTripForm((prev: any) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className="space-y-3 md:space-y-5">
            <QuestionHeading
                title="Find Your Persona Now!"
                subtitle="Let us know a bit about you so we can find the right personas for you."
            />
            <div className="border border-black rounded-sm p-5 space-y-3 md:space-y-5 bg-white/60">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="block text-md text-black">
                            Full Name <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => {
                                setFullName(e.target.value);
                                updateForm("full_name", e.target.value);
                            }}
                            placeholder="Enter your full name"
                            className="w-full rounded-sm px-4 py-2 bg-white border border-gray-900"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-md text-black">
                            Email Address <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                updateForm("email", e.target.value);
                            }}
                            placeholder="Enter your email"
                            className="w-full rounded-sm px-4 py-2 bg-white border border-gray-900"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-md text-black">
                            Mobile Number <span className="text-red-600">*</span>
                        </label>
                        <PhoneInput
                            defaultCountry="us"
                            value={mobile}
                            onChange={(value: any, data: any) => {
                                updateForm("mobile", value);
                                setUserCountry(data?.country?.iso2);
                                setCountryProvince('');
                                handleDisableButton(false);
                            }}
                            placeholder="Enter your phone number"
                            className="w-full rounded-sm py-1 px-3 text-sm md:text-md text-black font-medium bg-white border border-black"
                            inputClassName="w-full !border-0 text-sm md:text-md !border-white"
                        />
                    </div>
                    {userCountry && userCountry == 'ca' && <>
                        <div className="space-y-1">
                            <label className="block text-md text-black">
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
                </div>
                <div className="flex items-start gap-2 pt-2">
                    <input
                        type="checkbox"
                        checked={acceptPrivacy}
                        onChange={(e) => {
                            setAcceptPrivacy(e.target.checked);
                            updateForm(
                                "privacy_policy_accepted",
                                e.target.checked
                            );
                        }}
                        className="mt-1 cursor-pointer"
                    />
                    <label className="text-xs md:text-sm text-black">
                        I agree to the <a href="/legal/terms-service" target="_blank" className="underline">T&Cs</a> and <a href="/legal/privacy-policy" target="_blank" className="underline">Privacy Policy</a>, and consent to receive communications from TravelOne Global Travel Services, LLC (USA), including follow-up call and text messages for quotes, scheduling, and call reminders, regarding my inquiry. Std msg & data rates apply. Text STOP to cancel, HELP for info. By continuing, you acknowledge that travel services are fulfilled by TravelOne Global Travel Services, LLC (USA).
                    </label>
                </div>
            </div>
        </div>
    );
}