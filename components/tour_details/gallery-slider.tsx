"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useRef } from "react";

// Define Props
interface Props {
    galleryImages: string[];
    isAdsLanding?: boolean;
    isWishlisted?: boolean;
    handleWishlist?: () => void;
}

export default function GallerySlider({ galleryImages, isAdsLanding, isWishlisted, handleWishlist }: Props) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className="relative w-full h-[320px] md:h-full lg:h-full">
            <Swiper
                modules={[Navigation, Autoplay]}
                slidesPerView={1}
                spaceBetween={0}
                loop={galleryImages.length > 1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                onSwiper={(swiper: any) => {
                    setTimeout(() => {
                        if (!swiper.destroyed) {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }
                    });
                }}
                onBeforeInit={(swiper) => {
                    if (typeof swiper.params.navigation !== "boolean") {
                        swiper.params.navigation!.prevEl = prevRef.current;
                        swiper.params.navigation!.nextEl = nextRef.current;
                    }
                }}
                className="h-full"
            >
                {galleryImages.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <Image
                                src={img || "/placeholder.svg"}
                                alt={`Tour Image ${index + 1}`}
                                fill
                                priority={index === 0}
                                draggable={false}
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                className="object-cover object-center"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Wishlist Button */}
            {!isAdsLanding && (
                <button
                    onClick={handleWishlist}
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg z-10"
                >
                    <Heart
                        size={24}
                        className={isWishlisted ? "fill-[#ef2853] text-[#ef2853]" : "text-gray-600 hover:fill-[#ef2853] hover:text-[#ef2853]"}
                    />
                </button>
            )}

            {/* Custom Navigation Buttons */}
            {galleryImages.length > 1 && (
                <>
                    <button
                        ref={prevRef}
                        className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10 cursor-pointer"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        ref={nextRef}
                        className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10 cursor-pointer"
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}
        </div>
    );
}