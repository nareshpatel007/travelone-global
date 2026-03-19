"use client";

import Image from "next/image";

// Define Props
interface Props {
    country: any;
}

export default function PrivateDesign({ country }: Props) {
    return (
        <div className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-0">

            <div className="max-w-7xl mx-auto space-y-10 text-center">

                {/* Heading */}
                <div className="space-y-3 sm:space-y-4">
                    <h2 className="text-black text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight font-normal md:max-w-4xl md:mx-auto">
                        Secure Your Private Design
                    </h2>

                    <p className="text-xs sm:text-sm md:text-base text-gray-700">
                        100% Credited toward your final trip cost.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">

                    {/* Image */}
                    <div className="relative mx-auto w-full max-w-md md:max-w-full">
                        <div className="rounded-2xl overflow-hidden shadow-xl md:shadow-2xl">
                            <Image
                                src={country?.featured_image || "/placeholder.svg"}
                                alt={country?.name || "Country Image"}
                                width={600}
                                height={600}
                                draggable={false}
                                className="object-cover w-full h-[260px] sm:h-[320px] md:h-[420px]"
                            />
                        </div>
                    </div>

                    {/* Steps */}
                    <div className="flex flex-col gap-5 sm:gap-6">

                        {[
                            {
                                id: "01",
                                title: "Pay & Schedule",
                                desc: "Your payment unlocks an instant booking link for your private design consultation.",
                            },
                            {
                                id: "02",
                                title: "Human Verification",
                                desc: `Meet your ${country?.name} Guardian to fine-tune your highest-value DNA moments.`,
                            },
                            {
                                id: "03",
                                title: "48-Hour Reveal",
                                desc: "Receive your master plan with pricing, access routes, and private booking codes.",
                            },
                        ].map((step, index) => (
                            <div
                                key={index}
                                className="relative rounded-xl sm:rounded-2xl border border-black/10 bg-[#fbfbf8] p-4 sm:p-5 pt-7 sm:pt-8 text-center shadow-sm hover:shadow-md transition"
                            >
                                {/* Number Badge */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#101323] text-white text-xs sm:text-sm font-semibold shadow">
                                    {step.id}
                                </div>

                                <h4 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                                    {step.title}
                                </h4>

                                <p className="text-sm sm:text-base text-black/70 leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}