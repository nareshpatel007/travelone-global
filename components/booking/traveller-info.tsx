"use client";

import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation } from "swiper/modules";
import TravellerForm from "./traveller-form";
import "swiper/css";

// Define state
interface Props {
    orderData: any;
    cartData: any;
    travellerData: any;
}

export default function TravellerInfoTab({ orderData, cartData, travellerData }: Props) {
    // Define state
    const [open, setOpen] = useState<number | null>(0);

    return (
        <>
            {/* MOBILE */}
            <div className="md:hidden space-y-5 py-5">
                {travellerData.map((item: any, index: number) => (
                    <div
                        key={index}
                        className="border border-[#d9cec1] rounded-sm overflow-hidden"
                    >
                        <button
                            onClick={() => setOpen(open === index ? null : index)}
                            className="w-full flex justify-between items-center text-black px-4 py-3 bg-white"
                        >
                            <div className="text-left">
                                <p className="font-medium text-sm">
                                    {item.title}&nbsp;
                                    {item?.fullinfo?.traveller_fname && (
                                        <>{`(${item?.fullinfo?.traveller_fname} ${item?.fullinfo?.traveller_lname})`}</>
                                    )}
                                </p>
                                <span className="text-xs text-black">
                                    {item.subtitle}
                                </span>
                            </div>
                            {open === index ? <ChevronUp /> : <ChevronDown />}
                        </button>

                        {open === index && (
                            <div className="p-4">
                                <TravellerForm
                                    headerBox={false}
                                    orderData={orderData}
                                    totalRooms={cartData?.total_rooms || 1}
                                    item={item}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* DESKTOP */}
            <div className="hidden md:block relative py-6">
                {/* Navigation Buttons */}
                {travellerData && travellerData.length > 3 && (
                    <>
                        <button className="prevRef absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white border border-black rounded-full p-2 hover:bg-white hover:text-black transition cursor-pointer"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <button className="nextRef absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white border border-black rounded-full p-2 hover:bg-white hover:text-black transition cursor-pointer"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}

                {/* Swiper */}
                <div className={`${travellerData && travellerData.length > 3 ? "px-14" : ""}`}>
                    <Swiper
                        modules={[Navigation, Mousewheel]}
                        spaceBetween={24}
                        slidesPerView={3}
                        slidesPerGroup={1}
                        grabCursor
                        mousewheel
                        navigation={{
                            prevEl: ".prevRef",
                            nextEl: ".nextRef",
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {travellerData.map((item: any, index: number) => (
                            <SwiperSlide key={index} className="px-1">
                                <div className="bg-white border border-[#d9cec1] rounded-sm p-6 hover:shadow-xl transition-shadow duration-300">
                                    <TravellerForm
                                        orderData={orderData}
                                        totalRooms={cartData?.total_rooms || 1}
                                        item={item}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
}
