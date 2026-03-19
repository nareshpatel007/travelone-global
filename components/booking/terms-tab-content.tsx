"use client"

import { ArrowRight, X } from "lucide-react";

// Define props
type Props = {
    activeTab: string;
    termsData: any;
    paymentSchedule: any;
    cancellationPolicy: any;
}

export function TermsTabContent({
    activeTab,
    termsData,
    paymentSchedule,
    cancellationPolicy
}: Props) {
    return (
        <>
            {/* Inclusions & Exclusions */}
            {activeTab === "inclusions-exclusions" && (
                <div className="space-y-6">
                    <div className="space-y-5">
                        <span className="text-base md:text-2xl block font-semibold md:font-medium text-black">Inclusions</span>
                        <ul className="space-y-1">
                            {termsData?.what_is_included && termsData?.what_is_included.map((item: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                                    <span className="text-green-700 font-bold">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-5">
                        <span className="text-base md:text-2xl block font-semibold md:font-medium text-black">Exclusions</span>
                        <ul className="space-y-1">
                            {termsData?.what_is_not_included && termsData?.what_is_not_included.map((item: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                                    <span className="text-red-700">
                                        <X className="w-4 h-4 inline-block" />
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Terms Conditions */}
            {activeTab === "terms-conditions" && (
                <div className="space-y-6">
                    <div className="space-y-5">
                        <span className="text-base md:text-2xl block font-semibold md:font-medium text-black">Terms & Conditions</span>
                        <ul className="space-y-1">
                            {termsData?.terms_conditions && termsData?.terms_conditions.map((item: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                                    <span className="text-green-700 font-bold">
                                        <ArrowRight className="w-4 h-4 text-black inline-block" />
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Payment Schedule */}
            {activeTab === "payment-schedule" && (
                <div className="space-y-6">
                    <div className="space-y-5">
                        <span className="text-base md:text-2xl block font-semibold md:font-medium text-black">Payment Schedule</span>
                        <span className="text-md block text-gray-700 text-sm md:text-base">The payment schedule below outlines the required installments to confirm and maintain your reservation. Each payment ensures hotel, guide, and transport allocations are secured as per your confirmed itinerary. All payments are non-transferable and must be made in U.S. Dollars (USD) via bank transfer or approved payment link.</span>
                        <ul className="space-y-1">
                            {paymentSchedule && paymentSchedule.map((item: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                                    <span className="text-red-700">
                                        <ArrowRight className="w-4 h-4 text-black inline-block" />
                                    </span>
                                    <span>
                                        {idx === 0 ? (
                                            <>Deposit - {item.percentage}% at booking</>
                                        ) : (
                                            <>
                                                {item.percentage}% payment - {item.days} days before departure
                                            </>
                                        )}
                                    </span>
                                </li>
                            ))}
                            <li className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                                <span className="text-red-700">
                                    <ArrowRight className="w-4 h-4 text-black inline-block" />
                                </span>
                                <span>
                                    Late Payments: May result in cancellation & loss of deposit
                                </span>
                            </li>
                        </ul>

                        <span className="text-md block text-gray-700 text-sm md:text-base">“Non-transferable” = payment can’t be reused, reassigned, or moved to another booking or person.</span>
                    </div>
                </div>
            )}

            {/* Payment Cancellation */}
            {activeTab === "cancellation-policy" && (
                <div className="space-y-6">
                    <div className="space-y-5">
                        <span className="text-base md:text-2xl block font-semibold md:font-medium text-black">Cancellation Policy</span>

                        <span className="text-md block text-gray-700 text-sm md:text-base">The following cancellation fees apply per person in the event of trip cancellation after booking confirmation. These charges are designed to cover non-refundable costs incurred with hotels, transportation, and local partners:</span>

                        <ul className="space-y-1">
                            {cancellationPolicy && cancellationPolicy.map((item: any, index: number) => (
                                <li key={index} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                                    <span className="text-red-700">
                                        <ArrowRight className="w-4 h-4 text-black inline-block" />
                                    </span>
                                    <span>
                                        {item.before_days} days{" "}
                                        {item.before_days.includes("+") ? "prior to departure" : "before departure"}
                                        :{" "}
                                        {index === 0 ? "USD 500 per person." : `${item?.percentage === 0 ? 100 : item?.percentage}% of the total price.`}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Important Notes */}
            {activeTab === "important-notes" && (
                <div className="space-y-6">
                    <div className="space-y-5">
                        <span className="text-base md:text-2xl block font-semibold md:font-medium text-black">Important Notes</span>
                        <ul className="space-y-1">
                            {termsData?.important_notes && termsData?.important_notes.map((item: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                                    <span className="text-red-700">
                                        <ArrowRight className="w-4 h-4 text-black inline-block" />
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}
