"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
    countries: any;
}

export default function SliderSection({ countries }: Props) {
    // Define state
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto Slide
    useEffect(() => {
        if (!countries?.length) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === countries.length - 1 ? 0 : prev + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [countries]);

    return (
        <div className="relative h-[300px] md:h-[660px] overflow-hidden">
            {countries.map((item: any, index: number) => (
                <div
                    key={item.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                >
                    <Image
                        src={item?.featured_image || "/placeholder.svg"}
                        alt={item?.name || "placeholder"}
                        fill
                        priority={index === 0}
                        loading="eager"
                        sizes="50vw"
                        className="object-cover rounded"
                    />

                    {/* Dark Gradient */}
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" /> */}

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">
                        <div className="space-y-2 max-w-2xl">
                            <h2 className="text-3xl md:text-5xl font-light capitalize leading-snug">
                                {item?.name}
                            </h2>

                            <p className="text-lg md:text-2xl text-white/90">
                                {item?.archetype_heading}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            {/* Dots Indicator */}
            <div className="absolute bottom-6 right-6 flex gap-2 z-20">
                {countries.map((_: any, index: number) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full cursor-pointer transition ${currentIndex === index ? "bg-white" : "bg-white/40"}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}
