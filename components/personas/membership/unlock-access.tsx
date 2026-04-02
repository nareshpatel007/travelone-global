"use client";

type Props = {
    setChoosePlan: any;
    setPlanAmount: any;
    setOpenMakePayment: any;
};

export default function UnlockPremiumAccess({ setChoosePlan, setPlanAmount, setOpenMakePayment }: Props) {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center mb-12 space-y-5">
                <div className="inline-block px-4 py-1 text-sm font-semibold bg-yellow-400 text-black rounded-full">
                    Premium Access
                </div>
                <h2 className="text-black text-3xl md:text-6xl leading-tight font-normal md:max-w-4xl md:mx-auto">
                    Unlock Your Full Travel DNA Intelligence
                </h2>
                <p className="text-gray-700 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
                    To unlock your <span className="font-semibold text-black">Top 5 Global Hub Matches</span>, your <span className="font-semibold text-black">12-Page Travel DNA</span>, and your <span className="font-semibold text-black">$95 Redeemable Travel Credit</span>, click below.
                </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
                {/* Solo Plan */}
                <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-yellow-400 to-orange-400">
                    <div className="bg-white rounded-3xl p-6 h-full flex flex-col space-y-4 shadow-lg hover:shadow-2xl transition">
                        <div className="text-center">
                            <span className="text-xs font-semibold bg-black text-white px-3 py-1 rounded-full">MOST POPULAR</span>
                            <h3 className="text-2xl font-semibold mt-3">Solo</h3>
                            <p className="text-3xl font-bold mt-1">$95</p>
                        </div>
                        <ul className="text-sm space-y-2 text-gray-700 flex-1">
                            {[
                                "1 Comprehensive Profile",
                                "Persona Validation Briefing",
                                "30-Marker Mirror-Logic",
                                "Acoustic & Aesthetic Match",
                                "Scientific Match Evidence",
                                "Top 5 Resonant Global Hubs",
                                "DNA-Mapped Daily Flow",
                                "White-Glove Architecture",
                                "100% Redeemable Credit",
                                "Lifetime DNA Vault"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-green-500">✔</span> {item}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => {
                                setChoosePlan("solo");
                                setPlanAmount("95");
                                setOpenMakePayment(true);
                            }}
                            className="px-8 py-2 text-base font-medium rounded-full bg-black text-white hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                        >
                            Unlock Premium Access
                        </button>
                    </div>
                </div>

                {/* Family Plan */}
                <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-yellow-400 to-pink-500">
                    <div className="bg-white rounded-3xl p-6 h-full flex flex-col space-y-4 shadow-lg hover:shadow-2xl transition">
                        <div className="text-center">
                            <span className="text-xs font-semibold bg-yellow-400 text-black px-3 py-1 rounded-full">BEST VALUE</span>
                            <h3 className="text-2xl font-semibold mt-3">
                                Family
                            </h3>
                            <p className="text-3xl font-bold mt-1">$195</p>
                        </div>
                        <ul className="text-sm space-y-2 text-gray-700 flex-1">
                            {[
                                "Up to 4 Family Members Profile",
                                "2 Harmony Sessions",
                                "Collective DNA Aggregation",
                                "Multi-Persona Sweet Spot",
                                "Conflict-Resolution Logic",
                                "Group-Optimized Hubs",
                                "Cross-Generational Flow",
                                "White-Glove Architecture",
                                "100% Redeemable Credit",
                                "Lifetime Family DNA Vault"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-green-500">✔</span> {item}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => {
                                setChoosePlan("family");
                                setPlanAmount("195");
                                setOpenMakePayment(true);
                            }}
                            className="px-8 py-2 text-base font-medium rounded-full bg-black text-white hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                        >
                            Unlock Premium Access
                        </button>
                    </div>
                </div>

                {/* Expedia */}
                <div className="rounded-3xl border bg-gray-50 p-6 h-full flex flex-col space-y-4 hover:shadow-lg transition">
                    <div className="text-center mb-17">
                        <h3 className="text-xl font-semibold text-gray-700">
                            Expedia / Booking / Agoda Model
                        </h3>
                    </div>
                    <ul className="text-sm space-y-2 text-gray-500 flex-1">
                        {[
                            "Paid Ads & Popularity",
                            "Star Ratings Only",
                            "No Explanation",
                            "Random Results",
                            "Static Templates",
                            "DIY Risk",
                            "No Strategy",
                            "1 Traveler",
                            "$4K Gamble",
                            "Temporary Data"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="text-red-400">✕</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ChatGPT */}
                <div className="rounded-3xl border bg-gray-50 p-6 h-full flex flex-col space-y-4 hover:shadow-lg transition">
                    <div className="text-center mb-17">
                        <h3 className="text-xl font-semibold text-gray-700">
                            Chat GPT / Gemini / Any AI Model
                        </h3>
                    </div>
                    <ul className="text-sm space-y-2 text-gray-500 flex-1">
                        {[
                            "Text Prediction",
                            "General Knowledge",
                            "Generic Logic",
                            "Best-of Lists",
                            "Random Output",
                            "No Support",
                            "No Strategy",
                            "1 User",
                            "Hit or Miss",
                            "No Memory"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="text-red-400">✕</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="max-w-4xl mx-auto text-center mb-12 space-y-5">
                <p className="text-base text-gray-700 leading-relaxed">
                    Your credits are redeemable for any travel experience booked through our platform within 12 months of unlocking. No blackout dates, no restrictions—just pure travel freedom.
                </p>
            </div>
        </div>
    );
}