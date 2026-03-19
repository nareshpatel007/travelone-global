"use client";

import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

// Define props
interface Props {
    toursList: any[];
}

export default function TourBannerSection({ toursList }: Props) {
    return (
        <section className="w-full py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2.8fr] gap-10">
                <div className="flex flex-col gap-6">
                    {toursList.length > 0 && toursList.slice(0, 4).map((tour: any) => (
                        <Link
                            key={tour.id}
                            href={`/tour/${tour.slug}`}
                            className="flex items-center gap-4"
                        >
                            <div className="relative aspect-[4/3] w-24 sm:w-28 md:w-32 flex-shrink-0 overflow-hidden rounded-sm">
                                <Image
                                    src={tour.featured_image || "/placeholder.svg"}
                                    alt={tour.name}
                                    fill
                                    className="object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col justify-center space-y-1">
                                <h4 className="text-sm sm:text-base font-medium text-gray-900 leading-snug">
                                    {tour.name}
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    Start from
                                    <span className="underline">USD ${formatPrice(tour.starting_price, 0)}</span>
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {toursList.length > 0 && toursList.slice(0, 3).map((tour: any) => (
                        <div
                            key={tour.id}
                            className="relative overflow-hidden h-full"
                        >
                            <Link href={`/tour/${tour.slug}`}>
                                <Image
                                    src={tour.featured_image || "/placeholder.svg"}
                                    alt={tour.name}
                                    fill
                                    className="object-cover transition-transform duration-300 hover:scale-105"
                                />

                                <div className="absolute bottom-5 left-5 right-5">
                                    <h3 className="text-white text-sm sm:text-base md:text-lg font-medium leading-snug">
                                        {tour.name}
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}