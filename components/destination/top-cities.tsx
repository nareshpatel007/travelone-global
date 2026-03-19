"use client";

import Image from "next/image";

// Define interface
interface Props {
    cities: any;
    country: string;
}

export default function TopCities({ country, cities }: Props) {
    // If no cities, return null
    if (!cities || cities.length === 0 || !country) return null;

    return (
        <div className="max-w-7xl mx-auto px-5 md:px-0 py-12 space-y-12">
            <div className="text-center space-y-1">
                <h2 className="text-black text-3xl md:text-6xl leading-tight font-normal">
                    Top Cities in {country || "Unknown"}
                </h2>
                <span className="text-sm md:text-lg text-black">
                    Find the best cities to visit in {country || "Unknown"}
                </span>
            </div>
            <div className="flex md:grid md:grid-cols-5 gap-6 overflow-x-auto md:overflow-visible">
                {cities.map((city: any) => (
                    <div
                        key={city.id}
                        className="group relative min-w-[220px] md:min-w-0 h-[130px] rounded-xl overflow-hidden"
                    >
                        <Image
                            src={city.featured_image || "/placeholder.svg"}
                            alt={city.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/10" />

                        {/* Text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-white text-lg font-semibold drop-shadow-md">
                                {city.name}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
