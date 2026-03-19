"use client";

import { CheckCircle2 } from "lucide-react";

const membershipTiers = [
    {
        tier: "Explorer",
        price: "$1,500/yr",
        features: [
            "2 design consultations / year",
            "Annual DNA updates",
            "9-5 liaison support",
            "Upgrades: Based on availability",
            "Private Access: Standard VIP"
        ],
    },
    {
        tier: "Signature",
        price: "$5,000/yr",
        features: [
            "Unlimited design consultations",
            "Quarterly DNA updates",
            "24/7 dedicated liaison",
            "Upgrades: Guaranteed (1 Tier)",
            "Private Access: Priority Specialist"
        ],
    },
    {
        tier: "Icon",
        price: "$12,000/yr",
        features: [
            "Unlimited consultations",
            "Real-time DNA updates",
            '24/7 global "Guardian" support',
            "Upgrades: Guaranteed (2 Tiers)",
            'Private Access: Exclusive "Invitation-Only"'
        ],
    },
];

export default function MembershipTiers() {
    return (
        <div className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-0">

            <div className="max-w-7xl mx-auto space-y-10 text-center">

                {/* Heading */}
                <div className="space-y-3 sm:space-y-4">
                    <h2 className="text-black text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight font-normal md:max-w-4xl md:mx-auto">
                        TravelOne Membership Tiers
                    </h2>

                    <p className="max-w-3xl mx-auto text-xs sm:text-sm md:text-base text-gray-700">
                        Upgrade your journey with exclusive annual memberships offering priority access, concierge planning, and elite travel privileges.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {membershipTiers.map((tier) => {
                        const isPopular = tier.tier === "Signature";

                        return (
                            <div
                                key={tier.tier}
                                className={`relative rounded-xl sm:rounded-2xl border p-5 sm:p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-5 sm:space-y-6 ${isPopular
                                        ? "border-black bg-white shadow-lg"
                                        : "border-black bg-[#faf9f5]"
                                    }`}
                            >

                                {/* Badge */}
                                {isPopular && (
                                    <span className="absolute -top-3 right-4 sm:right-6 rounded-full bg-black px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold text-white border border-black shadow">
                                        Most Popular
                                    </span>
                                )}

                                {/* Title */}
                                <div className="text-center">
                                    <h4 className="text-lg sm:text-xl font-semibold">
                                        {tier.tier}
                                    </h4>

                                    <p className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold text-black">
                                        {tier.price}
                                    </p>
                                </div>

                                {/* Features */}
                                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-black/75">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-2">
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#0b6f53] shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Button */}
                                <button
                                    className={`w-full rounded-md py-2.5 sm:py-3 text-sm sm:text-base border border-black font-medium cursor-pointer transition ${isPopular
                                            ? "bg-yellow-400 text-black hover:bg-black hover:text-white"
                                            : "bg-black text-white hover:bg-black/80"
                                        }`}
                                >
                                    Select Plan
                                </button>
                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    );
}