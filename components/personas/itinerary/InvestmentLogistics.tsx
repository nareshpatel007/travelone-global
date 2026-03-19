"use client"

import { ArrowRight, Building, Gem, MessageCircleMore, TrainFront } from "lucide-react"
import Image from "next/image"

// Define interface
interface Props {
    data: any;
}

export default function InvestmentLogistics({ data }: Props) {
    return (
        <div className="bg-[#FFF9EE] py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-0">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-8 md:gap-10 lg:gap-16 items-center">
                    {/* Image */}
                    <div className="flex justify-center md:justify-end">
                        <div className="relative w-28 sm:w-36 md:w-48 lg:w-64 aspect-square">
                            <Image
                                src="/common/bella_pic.png"
                                alt="Louise Berg"
                                fill
                                draggable={false}
                                className="object-cover rounded-full"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 sm:space-y-5 text-center md:text-left">

                        {/* Points */}
                        <div className="space-y-3">
                            {[
                                { icon: Gem, text: data?.line1 },
                                { icon: TrainFront, text: data?.line2 },
                                { icon: Building, text: data?.line3 },
                                { icon: MessageCircleMore, text: data?.line4 },
                            ].map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <p
                                        key={index}
                                        className="flex items-start md:items-center justify-center md:justify-start gap-2 text-xs sm:text-sm md:text-base font-medium"
                                    >
                                        <Icon className="h-4 w-4 mt-0.5 md:mt-0 shrink-0" />
                                        <span>{item.text}</span>
                                    </p>
                                );
                            })}
                        </div>

                        {/* Price */}
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium">
                            Curation Fee: USD $50
                        </h3>

                        <p className="text-sm sm:text-base md:text-lg text-black/80">
                            Per person. Fully credited toward final trip cost.
                        </p>

                        {/* CTA */}
                        <div>
                            <button className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-black text-white text-sm sm:text-base font-medium hover:bg-black/90 transition cursor-pointer rounded-md">
                                Schedule Your Design Consultation
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}