"use client";

import { BadgeCheck } from "lucide-react";
import Image from "next/image";

// Define Props
interface Props {
    score: any;
    country: any;
    content: any;
}

export default function HeroSection({ score, country, content }: Props) {
    return (
        <div className="relative h-[300px] md:h-[450px] overflow-hidden">
            <Image
                src={country?.featured_image || "/placeholder.svg"}
                alt={country?.name || "Country Image"}
                fill
                draggable={false}
                className="object-cover"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 flex max-w-5xl mx-auto px-10 md:px-0 items-center justify-center">
                <div className="text-center text-white space-y-2">
                    <div className="flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-medium text-black">
                            <BadgeCheck className="h-4 w-4" />
                            {score || 95}% DNA Match
                        </span>
                    </div>

                    <div className="text-center text-white space-y-2">
                        <h1 className="text-3xl md:text-6xl leading-tight font-normal">
                            {content?.itinerary_name}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}