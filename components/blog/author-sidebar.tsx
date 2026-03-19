"use client";

import Image from "next/image";

export default function AuthorSidebar() {
    return (
        <div className="relative w-full bg-[#dfe5df] p-8 max-w-sm mx-auto text-center rounded-sm overflow-visible space-y-4">
            <div className="relative text-center mx-auto w-30 md:w-45 aspect-square">
                <Image
                    src="/common/bella_pic.png"
                    alt="Bella"
                    fill
                    className="object-cover rounded-full"
                />
            </div>
            <div className="space-y-1">
                <h3 className="text-xl font-semibold text-gray-900">
                    Louise Berg
                </h3>
                <p className="text-black leading-relaxed text-sm">
                    Social Media & Destination Expert
                </p>
            </div>
        </div>
    );
}
