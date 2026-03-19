"use client";

import Image from "next/image";
import Link from "next/link";

// Define props
interface Props {
    destinationList: any[];
}

export default function ThreeImageSplitSection({ destinationList }: Props) {
    return (
        <section className="py-6 px-5 md:px-10 py-12 space-y-12 bg-[#FFF9EE]">
            <div className="space-y-2 text-center">
                <h2 className="text-black text-3xl md:text-6xl leading-tight font-normal">
                    The Signature Collection
                </h2>
                <span className="text-black text-md">
                    Hand-vetted master destinations curated for the ultra-luxury explorer.
                </span>
            </div>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 h-[300px] sm:h-[340px] lg:h-[380px]">
                    {destinationList.map((item, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden group cursor-pointer"
                        >
                            <Link target="_blank" href={`/country/${item.slug}`}>
                                <Image
                                    src={item.featured_image || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute bottom-5 left-5 right-5">
                                    <h3 className="text-white text-md sm:text-2xl font-medium leading-snug">
                                        {item.name}
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[420px] sm:h-[480px] lg:h-[520px]">
                    {destinationList?.[0] && (
                        <div className="relative md:col-span-2 overflow-hidden group cursor-pointer">
                            <Link target="_blank" href={`/country/${destinationList[0].slug}`}>
                                <Image
                                    src={destinationList[0].featured_image || "/placeholder.svg"}
                                    alt={destinationList[0].name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute bottom-5 left-5 right-5">
                                    <h3 className="text-white text-md sm:text-2xl font-medium leading-snug">
                                        {destinationList[0].name}
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    )}

                    {destinationList?.[1] && (
                        <div className="relative overflow-hidden group cursor-pointer">
                            <Link target="_blank" href={`/country/${destinationList[1].slug}`}>
                                <Image
                                    src={destinationList[1].featured_image || "/placeholder.svg"}
                                    alt={destinationList[1].name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute bottom-5 left-5 right-5">
                                    <h3 className="text-white text-md sm:text-2xl font-medium leading-snug">
                                        {destinationList[1].name}
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    )}

                    {destinationList?.[2] && (
                        <div className="relative overflow-hidden group cursor-pointer">
                            <Link target="_blank" href={`/country/${destinationList[2].slug}`}>
                                <Image
                                    src={destinationList[2].featured_image || "/placeholder.svg"}
                                    alt={destinationList[2].name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute bottom-5 left-5 right-5">
                                    <h3 className="text-white text-md sm:text-2xl font-medium leading-snug">
                                        {destinationList[2].name}
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[300px] sm:h-[340px] lg:h-[380px]">
                    {destinationList.slice(3, 7).map((item, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden group cursor-pointer"
                        >
                            <Link target="_blank" href={`/country/${item.slug}`}>
                                <Image
                                    src={item.featured_image || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute bottom-5 left-5 right-5">
                                    <h3 className="text-white text-md sm:text-2xl font-medium leading-snug">
                                        {item.name}
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div> */}
            </div>
        </section>
    );
}
