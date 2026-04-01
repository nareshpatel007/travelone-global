"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Send, Star, ExternalLink } from "lucide-react";
import Link from "next/link";
import PageHeading from "@/components/common/page-heading";
import StickyHomeHeader from "@/components/header/sticky-home-header";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { sendFbEvent } from "@/lib/sendFbEvent";
import StartWithWho from "../contact/start-with-who";
import EconomicTimesSection from "../contact/economic-times";
import { isValidEmail } from "@/lib/utils";

export default function ContactPage() {
    // Define state
    const [ready, setReady] = useState(false);
    const [isFormLoading, setIsFormLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [countryProvince, setCountryProvince] = useState<string>("");
    const [userCountry, setUserCountry] = useState<string>("");
    const [errors, setErrors] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        reference_no: "",
        message: "",
    });

    useEffect(() => {
        requestAnimationFrame(() => {
            setReady(true);
        });
    }, []);

    // If choose province
    useEffect(() => {
        setDisableSubmit(countryProvince === "Ontario");
    }, [countryProvince]);

    // Handle form submit
    const handleSubmit = async () => {
        // Validation
        if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
            setErrors("Please fill in all the required fields.");
            return;
        } else if (!isValidEmail(formData.email)) {
            setErrors("Please enter valid email address.");
            return;
        } else if (formData?.phone.length < 10) {
            setErrors("Please enter valid phone number.");
            return;
        }

        // Update state
        setIsFormLoading(true);
        setErrors("");

        try {
            // API call
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            // Update state
            const data = await res.json();

            // Handle response
            if (data.status) {
                // Send FB event
                sendFbEvent({
                    eventName: "Inquiry",
                    email: formData?.email
                });

                // Update state
                setIsSubmitted(true);
            } else {
                // Set error
                setErrors(data.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            // Set error
            setErrors("Something went wrong. Please try again.");
        } finally {
            // Update state
            setIsFormLoading(false);
        }
    }

    return (
        <>
            {ready && <>
                <CommonHeader />

                <div className="max-w-7xl mx-auto px-5 md:px-0 py-6">
                    <PageHeading
                        main="Contact"
                        sub="We're here to help. Reach out to us through any of the channels below."
                    />
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <div className="rounded-xl p-5 md:p-8 border border-gray-200 space-y-7">
                                {isSubmitted ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-[#FFF9EE] rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Send className="h-8 w-8 text-[#ffa200]" />
                                        </div>
                                        <span className="text-xl font-semibold text-gray-900 block mb-2">Message Sent!</span>
                                        <span className="text-gray-600 !block !mb-6">
                                            Thank you for contacting us. We'll get back to you within 24 hours.
                                        </span>
                                        <button
                                            onClick={() => {
                                                setIsSubmitted(false);
                                                setFormData({
                                                    name: "",
                                                    email: "",
                                                    phone: "",
                                                    subject: "",
                                                    reference_no: "",
                                                    message: ""
                                                });
                                            }}
                                            className="!text-black font-medium hover:underline"
                                        >
                                            Send another message
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                                    Your Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-sm outline-none transition-all resize-none focus:ring-1 focus:ring-[#333] focus:ring-opacity-50"
                                                    placeholder="Your Name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                                    Email Address <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-sm outline-none transition-all resize-none focus:ring-1 focus:ring-[#333] focus:ring-opacity-50"
                                                    placeholder="Email Address"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                                    Contact Number <span className="text-red-500">*</span>
                                                </label>
                                                <PhoneInput
                                                    defaultCountry="us"
                                                    value={formData.phone}
                                                    onChange={(value: any, data: any) => {
                                                        setFormData({ ...formData, phone: value })
                                                        setUserCountry(data?.country?.iso2);
                                                        setCountryProvince('');
                                                        setDisableSubmit(false);
                                                    }}
                                                    placeholder="Enter your phone number"
                                                    className="w-full rounded-sm py-0.5 px-3 text-sm md:text-md text-black font-medium bg-white border border-gray-300"
                                                    inputClassName="w-full !border-0 !border-white"
                                                />
                                            </div>
                                            {userCountry && userCountry == 'ca' && <>
                                                <div>
                                                    <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                                        Choose Province <span className="text-red-500">*</span>
                                                    </label>
                                                    <select
                                                        onChange={(e) => {
                                                            setCountryProvince(e.target.value);
                                                        }}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-sm outline-none transition-all resize-none focus:ring-1 focus:ring-[#333] focus:ring-opacity-50 placeholder:text-gray-400"
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
                                                <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                                    Subject <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    value={formData.subject}
                                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-sm outline-none transition-all resize-none focus:ring-1 focus:ring-[#333] focus:ring-opacity-50 placeholder:text-gray-400"
                                                >
                                                    <option value="">Select a subject</option>
                                                    <option value="Sales">Sales</option>
                                                    <option value="Support">Support</option>
                                                    <option value="Register Complaint">Register Complaint</option>
                                                    <option value="Feedback">Feedback</option>
                                                    <option value="Report a Dispute">Report a Dispute</option>
                                                    <option value="Other Issue">Other Issue</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                                    Booking Reference Number (Optional)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.reference_no}
                                                    onChange={(e) => setFormData({ ...formData, reference_no: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-sm outline-none transition-all resize-none focus:ring-1 focus:ring-[#333] focus:ring-opacity-50"
                                                    placeholder="Booking Reference Number"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                                                Your Message <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                required
                                                rows={5}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-sm outline-none transition-all resize-none focus:ring-1 focus:ring-[#333] focus:ring-opacity-50"
                                                placeholder="Your Message"
                                            />
                                        </div>

                                        {errors && <div className="text-red-500 text-base">{errors}</div>}

                                        {/* Disable submit */}
                                        {disableSubmit && (
                                            <div className="text-red-500 text-sm">
                                                TravelOne Global Travel Services, LLC (USA) does not market to or provide travel services to residents of Ontario, Canada. This platform is strictly for the U.S. and international markets. For technology inquiries, please visit travelone.io.
                                            </div>
                                        )}

                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            disabled={isFormLoading || disableSubmit}
                                            className="w-full md:w-auto px-8 py-2.5 bg-black text-white font-medium rounded-sm hover:bg-black/90 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {isFormLoading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="h-5 w-5" />
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="lg:w-120 space-y-4">
                            <div className="bg-white rounded-xl p-5 border border-gray-200 hover:bg-gray-50">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-[#FFF9EE] rounded-lg">
                                        <MapPin className="h-5 w-5 text-black" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-900 block mb-2">
                                            Location
                                        </span>
                                        <p className="text-sm text-black/90">
                                            TravelOne Global Travel Services LLC (USA)
                                        </p>
                                        <p className="text-sm text-black/90">
                                            30 N Gould St Ste N, Sheridan, WY 82801, USA
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-gray-200 hover:bg-gray-50">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-[#FFF9EE] rounded-lg">
                                        <Phone className="h-5 w-5 text-black" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-900 block mb-2">Phone</span>
                                        <div className="space-y-2">
                                            <p className="text-sm text-black/90">
                                                <Link href="tel:+1 703-200-3901" className="hover:underline">+1 703 200 3901</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-gray-200 hover:bg-gray-50">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-[#FFF9EE] rounded-lg">
                                        <Mail className="h-5 w-5 text-black" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-900 block mb-2">Email</span>
                                        <div className="space-y-2">
                                            <p className="text-sm text-black/90">
                                                <Link href="mailto:connect@traveloneglobal.com" className="hover:underline">connect@traveloneglobal.com</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <EconomicTimesSection />
                <StartWithWho />
                <CommonFooter isStickyShow={true} />
                <StickyHomeHeader />
            </>}
        </>
    );
}
