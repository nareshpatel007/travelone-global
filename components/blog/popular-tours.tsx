"use client";

import { useRef } from "react";
import { TourCard } from "../tours/tour-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Define interface
interface Props {
    tours: any;
}

export default function PopularTours({ tours }: Props) {
    if (!tours.length) return null;

    // Define ref
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <div className="space-y-5">
            <span className="font-semibold text-xl text-gray-900 block">
                Popular Tours
            </span>
            <div className="relative">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 1 },
                        1024: { slidesPerView: 1 },
                    }}
                >
                    {tours.map((tour: any) => (
                        <SwiperSlide key={tour.id}>
                            <TourCard {...tour} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="flex gap-3 justify-center mt-3">
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="bg-white w-8 h-8 rounded-full shadow-lg flex items-center justify-center border border-black hover:bg-black hover:text-white transition-all cursor-pointer duration-300"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="bg-white w-8 h-8 rounded-full shadow-lg flex items-center justify-center border border-black hover:bg-black hover:text-white transition-all cursor-pointer duration-300"
                    >
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
