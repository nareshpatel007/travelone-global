"use client";

import Image from "next/image";

interface Props {
    country: any;
    cities: any;
}

export default function CityPortfolios({ country, cities }: Props) {
    // Validation
    if (!cities?.stay_places || cities?.stay_places.length === 0) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-0 pb-10 sm:pb-12 space-y-10">
            {/* Heading */}
            <div className="text-center space-y-4">
                <h2 className="text-black text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-normal leading-tight">
                    Curated City Portfolios
                </h2>

                <p className="text-gray-700 text-base md:max-w-3xl mx-auto">
                    Each travel priority is mapped to a concrete delivery protocol in {country?.name}.
                </p>
            </div>

            {/* City Icons */}
            <div className="flex flex-wrap justify-center gap-5 sm:gap-6 md:gap-8">
                {cities?.stay_places.map((city: any, index: number) => (
                    <a
                        key={index}
                        href={`#${city?.name.toLowerCase()}`}
                        className="flex flex-col items-center group"
                    >
                        <div className="h-20 w-20 md:h-26 md:w-26 rounded-full overflow-hidden border-2 border-transparent group-hover:border-yellow-400 transition">
                            <Image
                                src={city?.featured_image || "/placeholder.svg"}
                                alt={city?.name}
                                width={200}
                                height={200}
                                draggable={false}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <p className="mt-2 text-base font-medium text-center">
                            {city?.name}
                        </p>
                    </a>
                ))}
            </div>

            {/* City Sections */}
            <div className="space-y-8">
                {cities?.stay_places.map((hub: any) => (
                    <section
                        id={hub?.name.toLowerCase()}
                        key={hub?.name}
                        className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[40%_60%] gap-6"
                    >
                        <div className="relative">
                            <div className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-full lg:min-h-[420px] rounded-xl overflow-hidden">
                                <Image
                                    src={hub?.featured_image || "/placeholder.svg"}
                                    alt={hub?.name}
                                    fill
                                    draggable={false}
                                    className="object-cover"
                                />

                                <div className="absolute inset-0 bg-black/10" />

                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6 space-y-2 sm:space-y-3">
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium">
                                        {hub?.name}
                                    </h3>
                                    <p className="text-sm md:text-base text-white/90">
                                        {hub?.vibe_logic}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/80 backdrop-blur rounded-xl border border-black/10 overflow-hidden">
                            {/* Stay */}
                            {hub?.stays && hub?.stays.length > 0 && (
                                <div className="flex flex-col md:flex-row gap-3 md:gap-4 px-4 sm:px-6 py-5 border-b border-black/10">
                                    <div className="md:w-1/4">
                                        <p className="text-sm tracking-[0.15em] uppercase font-medium text-black">
                                            Where to Stay
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 md:w-3/4">
                                        {hub?.stays?.map((stay: any, index: number) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-black"
                                            >
                                                {stay}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Places */}
                            {hub?.place_to_visit && hub?.place_to_visit.length > 0 && (
                                <div className="flex flex-col md:flex-row gap-3 md:gap-4 px-4 sm:px-6 py-5 border-b border-black/10">
                                    <div className="md:w-1/4">
                                        <p className="text-sm tracking-[0.15em] uppercase font-medium text-black">
                                            Places to Visit
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 md:w-3/4">
                                        {hub?.place_to_visit?.map((place: any, index: number) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium"
                                            >
                                                {place}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Things */}
                            {hub?.thing_to_do && hub?.thing_to_do.length > 0 && (
                                <div className="flex flex-col md:flex-row gap-3 md:gap-4 px-4 sm:px-6 py-5">
                                    <div className="md:w-1/4">
                                        <p className="text-sm tracking-[0.15em] uppercase font-medium text-black">
                                            Things to Do
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 md:w-3/4">
                                        {hub?.thing_to_do?.map((thing: any, index: number) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium"
                                            >
                                                {thing}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}