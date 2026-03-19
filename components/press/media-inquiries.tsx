import { MailCheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MediaInquiries() {
    return (
        <div className="relative w-full h-100 md:h-110 bg-[#FFF9EE] overflow-hidden">
            <div className="relative h-full flex items-center justify-center px-5 md:px-0">
                <div className="text-center text-black space-y-9 flex flex-col items-center">
                    <div className="space-y-4">
                        <h3 className="text-2xl md:text-3xl">Press Contact</h3>

                        <h2 className="text-3xl md:text-6xl leading-tight font-normal">
                            Media Inquiries
                        </h2>

                        <p className="text-base md:text-xl max-w-3xl">
                            "For interview requests, speaking engagements, or deeper insights into the Traveller DNA framework, please reach out to our communications team."
                        </p>
                    </div>

                    <Link href="mailto:connect@traveloneglobal.com">
                        <button className="flex items-center gap-2 px-5 py-2 bg-black rounded text-md text-white cursor-pointer hover:bg-white hover:text-black border border-black transition">
                            <MailCheckIcon size={20} /> Send Inquiry
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
