'use client'

import Image from "next/image";
import Link from "next/link";

export default function DnaFooter() {
    return (
        <footer className="bg-[#451a03] text-white py-12 font-dna-landing">
            <div className="max-w-[1200px] mx-auto px-5 lg:px-0">
                {/* TOP ROW */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                    {/* Logo */}
                    <Image
                        src="/common/logo_white.png"
                        alt="Logo"
                        width={160}
                        height={100}
                        className="w-40 md:w-36"
                        draggable="false"
                    />

                    {/* Links */}
                    <div className="flex gap-12 text-right">
                        <div className="text-left">
                            <Link href="https://traveloneglobal.com/" target="_blank">
                                <p className="text-[#FCD34D] text-sm font-semibold">
                                    traveloneglobal.com
                                </p>
                                <p className="text-[#D6C3B1] text-sm">
                                    Decode Your Travel DNA
                                </p>
                            </Link>
                        </div>
                        <div className="text-left">
                            <Link href="https://travelone.io/" target="_blank">
                                <p className="text-[#FCD34D] text-sm font-semibold">
                                    travelone.io
                                </p>
                                <p className="text-[#D6C3B1] text-sm">
                                    B2B Technology Hub
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#7A3A12] mb-8"></div>

                {/* CENTER CONTENT */}
                <div className="text-center space-y-4">
                    <p className="text-[#FCD34D] text-[12px] tracking-[0.2em]">
                        REGULATORY & CORPORATE STRUCTURE
                    </p>

                    <div className="space-y-3">
                        <p className="text-[#E7DED2] text-[13px] leading-[1.8]">
                            © {new Date().getFullYear()} TravelOne Global Travel Services, LLC (USA) | All Rights Reserved.
                        </p>

                        <p className="text-[#CBB9A6] text-[13px] leading-[1.8]">
                            Hosted by Amazon Web Services, Inc. — Data Centre — USA (Northern Virginia).
                        </p>

                        <p className="text-[#CBB9A6] text-[13px] leading-[1.8]">
                            Technology Powered By TravelOne Technologies, Inc. (Canada)
                        </p>

                        <p className="text-[#9C8B7A] text-[12px] leading-[1.8]">
                            All travel consultations, services, products, and financial transactions are executed exclusively by TravelOne Global Travel Services, LLC (USA)
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}