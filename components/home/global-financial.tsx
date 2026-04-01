"use client";

import Image from "next/image";
import Link from "next/link";

export default function GlobalFinancialSection() {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-5 md:px-10 py-12">
            <div className="flex items-center p-12 bg-[#FFF9EE]">
                <div className="max-w-2xl space-y-6 text-center lg:text-left">
                    <h2 className="text-black text-3xl sm:text-4xl lg:text-6xl leading-tight font-normal">
                        Your Global Financial Safeguard
                    </h2>

                    <p className="text-black text-base sm:text-lg">
                        Travel with the confidence of North American financial protection and Merchant of Record safety.
                    </p>

                    <p className="text-black text-base sm:text-lg">
                        TravelOne Services Global Travel Services (USA) acts as your official Merchant of Record (MoR). We assume all transaction liability, manage global taxes, and guarantee your refunds—leaving you free to simply explore.
                    </p>

                    <div className="space-y-2">
                        <p className="text-black text-base sm:text-lg">
                            Regulated Excellence
                        </p>

                        <p className="text-black text-base sm:text-lg">
                            Our operations are led by ASTA Registered industry professionals. We maintain the highest standards of consumer protection and financial integrity.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-10 pt-4">
                        <Link href="/partnership/ASTA.pdf" target="_blank">
                            <Image
                                src="/common/ASTA-Logo.png"
                                alt="TICO"
                                width={160}
                                height={80}
                                draggable="false"
                                className="object-contain h-auto w-20 md:w-26"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex items-center justify-center">
                <div className="relative w-full h-full aspect-square overflow-hidden">
                    <Image
                        src="/common/2151306044.jpg"
                        alt="TravelOne"
                        fill
                        priority
                        className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                </div>
            </div>
        </section>
    );
}