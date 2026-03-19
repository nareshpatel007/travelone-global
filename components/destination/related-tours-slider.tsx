"use client"

import { useRef } from "react";
import { TourCard } from "../tours/tour-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Define props
interface Props {
    title?: string;
    tours?: any[];
}

export default function RelatedTours({ title, tours = [] }: Props) {
    if (tours.length === 0) return null;

    // Define ref
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <div className="bg-white max-w-7xl mx-auto px-5 md:px-0 py-12 space-y-12">
            <div className="text-center space-y-1">
                <h2 className="text-black text-3xl md:text-6xl leading-tight font-normal">
                    {title || "You May Also Like"}
                </h2>
                <span className="text-sm md:text-lg text-black">
                    We are committed to providing you with the best possible experience
                </span>
            </div>
            <div className="relative">
                {/* For Desktop */}
                {tours.length > 3 && (
                    <div className="hidden md:block">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center border border-black hover:bg-black hover:text-white transition-all cursor-pointer duration-300"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>

                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center border border-black hover:bg-black hover:text-white transition-all cursor-pointer duration-300"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}

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
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {tours.map((tour) => (
                        <SwiperSlide key={tour.id}>
                            <TourCard {...tour} needBtn={true} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* For Mobile */}
                {tours.length > 1 && (
                    <div className="md:hidden flex gap-3 justify-center mt-3">
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
                )}
            </div>
        </div>
    )
}
