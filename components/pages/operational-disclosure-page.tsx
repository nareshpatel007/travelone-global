"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import PageHeading from "../common/page-heading";
import Link from "next/link";

export default function OperationalDisclosurePage() {
    // Define state
    const [ready, setReady] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => { setReady(true); });
    }, []);

    // If not ready
    if (!ready) return null;

    return (
        <>
            <CommonHeader />

            <div className="max-w-7xl mx-auto px-5 md:px-0 pt-6">
                <PageHeading
                    main="Operational Disclosure"
                    sub="Statement of Operational Independence & Non-Involvement"
                />

                <div className="max-w-4xl mx-auto space-y-10">
                    {/* Section 1 */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-black">
                            Statement of Operational Independence & Non-Involvement
                        </h2>

                        <p className="text-base text-gray-700 leading-relaxed">
                            TravelOne Global Travel Services LLC (USA) is a United States-incorporated
                            entity headquartered in Sheridan, Wyoming. As a dedicated Merchant of Record
                            (MoR), the company assumes full financial and operational responsibility for
                            all travel services, transactions, and customer fulfillments managed through
                            this platform.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div className="border-l-2 border-[#d9cec1] pl-6 space-y-4">
                        <h2 className="text-xl font-semibold text-black">
                            Founder & Technology Stewardship
                        </h2>

                        <p className="text-base text-gray-700 leading-relaxed">
                            The TravelOne ecosystem was conceptualized and developed by Bhavin Vora,
                            who serves as the Founder and Chief Technology Architect. Mr. Vora’s role
                            is strictly limited to the research, development, and maintenance of the
                            proprietary "Traveler DNA" orchestration technology.
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-black">
                            Compliance & Fulfillment Disclosure
                        </h2>
                        <div className="space-y-6">
                            {/* Item 1 */}
                            <div className="p-6 bg-[#FFF9EE] border border-[#d9cec1] rounded-xl">
                                <h3 className="font-semibold text-black mb-2">
                                    Technology-Only Role (Canada)
                                </h3>
                                <p className="text-base text-black leading-relaxed">
                                    TravelOne Technologies Inc. (Ontario, Canada) is an independent
                                    technology provider. It does not sell or negotiate travel services,
                                    provide travel counseling, or process financial transactions for
                                    travel bookings from within the province of Ontario.
                                </p>
                            </div>

                            {/* Item 2 */}
                            <div className="p-6 bg-[#FFF9EE] border border-[#d9cec1] rounded-xl">
                                <h3 className="font-semibold text-black mb-2">
                                    Fulfillment of Services
                                </h3>
                                <p className="text-base text-black leading-relaxed">
                                    All travel consulting, sales, and negotiations are managed exclusively
                                    by authorized TravelOne Global Travel Services LLC personnel and
                                    infrastructure located outside of Ontario, Canada.
                                </p>
                            </div>

                            {/* Item 3 */}
                            <div className="p-6 bg-[#FFF9EE] border border-[#d9cec1] rounded-xl">
                                <h3 className="font-semibold text-black mb-2">
                                    Jurisdiction & Protection
                                </h3>
                                <p className="text-base text-black leading-relaxed">
                                    All travel contracts and transactions are governed by the laws of the
                                    United States. Residents of Ontario acknowledge that by utilizing
                                    these services, they are engaging with a foreign entity not registered
                                    with the Travel Industry Council of Ontario (TICO) and are not covered
                                    by the Ontario Travel Industry Compensation Fund.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Note */}
                    <div className="pt-4 border-t border-[#d9cec1] text-sm text-black">
                        For compliance inquiries, contact:{" "}
                        <Link href="mailto:connect@traveloneglobal.com" className="hover:underline">
                            <span className="text-black font-medium">
                                connect@traveloneglobal.com
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            <CommonFooter />
        </>
    );
}
