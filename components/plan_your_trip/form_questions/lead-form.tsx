"use client"

import { useEffect, useState } from "react";
import QuestionHeading from "./main-heading";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface Props {
    planYourTripForm: any;
    setPlanYourTripForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function StepLeadForm({
    planYourTripForm,
    setPlanYourTripForm,
}: Props) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [communication, setCommunication] = useState("");
    const [acceptPrivacy, setAcceptPrivacy] = useState(false);

    // ✅ Restore values when coming back to this step
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
        if (planYourTripForm?.communication) {
            setCommunication(planYourTripForm.communication);
        }
        if (planYourTripForm?.privacy_policy_accepted !== undefined) {
            setAcceptPrivacy(planYourTripForm.privacy_policy_accepted);
        }
    }, [planYourTripForm]);

    const updateForm = (key: string, value: any) => {
        setPlanYourTripForm((prev: any) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className="space-y-3 md:space-y-5">
            <QuestionHeading
                title="Secure Your Custom Design"
                subtitle="Our Lead Designer will review your profile personally"
            />
            <div className="border border-black rounded-sm p-5 space-y-3 md:space-y-5 bg-white/60">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <label className="block text-md text-black">
                            Full name <span className="text-red-500">*</span>
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
                            Email address <span className="text-red-500">*</span>
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
                            Mobile number <span className="text-red-500">*</span>
                        </label>
                        <PhoneInput
                            defaultCountry="us"
                            value={mobile}
                            onChange={(e) => {
                                setMobile(e);
                                updateForm("mobile", e);
                            }}
                            placeholder="Enter your phone number"
                            className="w-full rounded-sm py-0.5 px-3 text-sm md:text-md text-black font-medium bg-white border border-black"
                            inputClassName="w-full !border-0 text-sm md:text-md !border-white"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-md text-black">
                            Preferred Method of Communication <span className="text-red-500">*</span>
                        </label>
                        <select
                            className="w-full px-4 py-2 rounded-sm border border-[#2F5D50] bg-white outline-none"
                            onChange={(e) => {
                                setCommunication(e.target.value);
                                updateForm("communication", e.target.value);
                            }}
                        >
                            <option>Select option</option>
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="Email">Email</option>
                            <option value="Phone Call">Phone Call</option>
                            <option value="Text Message">Text Message</option>
                        </select>
                    </div>
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