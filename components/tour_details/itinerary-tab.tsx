"use client"

import { ArrowRight, Circle, Loader2 } from "lucide-react";
import Image from "next/image";

// Define props
type Props = {
    isAdsLanding?: boolean;
    itineraryLoading?: boolean;
    itineraryData: any;
}

export function ItineraryTab({ isAdsLanding, itineraryLoading, itineraryData }: Props) {
    // If loading
    if (itineraryLoading) {
        return (
            <div className="py-7 md:py-10">
                <div className="text-center text-black">
                    <Loader2 className="w-6 h-6 mx-auto mb-3 animate-spin" />
                    Loading itinerary...
                </div>
            </div>
        )
    }

    return (
        <div className="py-0 md:py-7">
            <div className="relative">
                {!isAdsLanding && <div className="absolute left-4.5 top-5 bottom-0 w-1 bg-[#d9cec1]"></div>}
                <div className="space-y-6">
                    {itineraryData.map((dayData: any) => (
                        <div className="flex gap-3 md:gap-6">
                            {!isAdsLanding && <div className="flex-shrink-0 relative">
                                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-md">
                                    {dayData.day_no}
                                </div>
                            </div>}

                            <div className="flex-1 bg-white border-1 border-[#d9cec1] rounded-md p-5 md:p-6 space-y-4 hover:shadow-md transition-shadow duration-300">
                                <span className="text-lg md:text-2xl font-medium text-black block">{dayData.title}</span>

                                {dayData.itinerary && dayData.itinerary.map((activity: any, actIdx: number) => (
                                    <div key={actIdx}>
                                        {activity.type === 'attraction' ? (
                                            <div className="space-y-5">
                                                <span className="text-black text-base md:text-xl font-medium block mb-4">
                                                    Activities:
                                                </span>
                                                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch">
                                                    {activity.attractions.map((attraction: any, idx: number) => (
                                                        <div key={idx} className="h-full">
                                                            <div className="flex flex-col h-full border border-[#d9cec1] bg-[#FFF9EE] hover:shadow-md transition-shadow duration-300">
                                                                <div className="relative w-full aspect-square lg:aspect-[16/9] overflow-hidden">
                                                                    <Image
                                                                        src={attraction?.featured_image || "/placeholder.svg"}
                                                                        alt={attraction?.attraction_name || "Attraction"}
                                                                        fill
                                                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 20vw"
                                                                        className="object-cover object-center"
                                                                    />
                                                                </div>
                                                                <div className="flex flex-col flex-1 p-4 space-y-2">
                                                                    <span className="font-semibold text-base text-gray-900">
                                                                        {attraction.attraction_name}
                                                                    </span>

                                                                    <p className="text-black text-base leading-relaxed flex-1">
                                                                        {attraction.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <p className={`flex inline-block text-black text-base whitespace-pre-line`}>
                                                <Circle className="w-4 h-4 mr-2 fill-[#a6c5a9] text-[#a6c5a9] inline-block" />
                                                {activity.title.replace("&amp;", "&")}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
