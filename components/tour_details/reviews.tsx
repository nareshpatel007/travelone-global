"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type Props = {
    reviews: any[];
};

export default function Reviews({ reviews }: Props) {
    // Define state
    const [selectedReview, setSelectedReview] = useState<any | null>(null);

    // Check if reviews exist
    if (reviews.length === 0) return null;

    return (
        <div id="RecentReviews" className="bg-white py-12 px-5 md:px-0 max-w-7xl mx-auto">

            {/* HEADING */}
            <div className="text-center space-y-1 mb-12">
                <h2 className="text-black text-3xl md:text-6xl leading-tight font-normal">
                    What Our Travelers Say
                </h2>
                <span className="flex max-w-3xl mx-auto text-sm md:text-lg text-black">
                    Join the 100+ Gujarati families from North America who have explored the world with TravelOne’s expert care.
                </span>
            </div>

            {/* MOBILE SLIDER */}
            <div className="relative block md:hidden">
                <Swiper
                    modules={[Pagination, Navigation]}
                    pagination={{ clickable: true }}
                    navigation={{
                        prevEl: ".review-prev",
                        nextEl: ".review-next",
                    }}
                    spaceBetween={16}
                    slidesPerView={1}
                >
                    {reviews.map((review, idx) => (
                        <SwiperSlide key={idx}>
                            <ReviewCard review={review} onReadMore={() => setSelectedReview(review)} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="absolute inset-x-0 bottom-30 flex justify-between px-2 z-10">
                    <button className="review-prev bg-black text-white rounded-full w-10 h-10 flex items-center justify-center">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="review-next bg-black text-white rounded-full w-10 h-10 flex items-center justify-center">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* DESKTOP GRID */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.slice(0, 6).map((review, idx) => (
                    <ReviewCard
                        key={idx}
                        review={review}
                        onReadMore={() => setSelectedReview(review)}
                    />
                ))}
            </div>

            {/* REVIEW MODAL */}
            {selectedReview && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-500 p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative animate-in fade-in zoom-in duration-200 space-y-4">
                        <button
                            onClick={() => setSelectedReview(null)}
                            className="absolute top-4 right-4 text-black hover:text-red-500 cursor-pointer"
                        >
                            <X size={24} />
                        </button>

                        {/* Name */}
                        <h3 className="text-md md:text-xl font-semibold">
                            {selectedReview.full_name}
                        </h3>

                        {/* Overall Rating */}
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={i < selectedReview.rating ? "w-4 h-4 fill-amber-400 text-amber-400" : "w-4 h-4 text-gray-300"}
                                />
                            ))}
                        </div>

                        {/* Full Review */}
                        <p className="text-gray-700 text-base leading-relaxed">
                            {selectedReview.review}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ---------------------------------- */
/* REUSABLE REVIEW CARD */
/* ---------------------------------- */

function ReviewCard({ review, onReadMore }: any) {
    const ratingItems = [
        { label: "Overall Experience", value: review.rating },
        { label: "Trip Planning", value: review.trip_planning || 5 },
        { label: "Accommodations", value: review.accommodations || 5 },
        { label: "Ground Support", value: review.ground_support || 5 },
    ];

    return (
        <div className="bg-white rounded-2xl p-8 border-2 border-dashed border-black hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center h-full">

            {/* Avatar */}
            <div className="mb-6">
                <div className="w-24 h-24 rounded-full border border-black overflow-hidden shadow-md mx-auto">
                    <Image
                        src={
                            typeof review.images === "string"
                                ? JSON.parse(review.images)[0]
                                : review.images?.[0]
                        }
                        alt={review.full_name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-md md:text-lg font-medium text-black">
                    {review.full_name}
                </h3>

                <div className="space-y-2 w-full text-left">
                    {ratingItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center gap-5 text-sm">
                            <span>{item.label}</span>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className={i < item.value ? "fill-amber-500 text-amber-500" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {review.review && (
                    <button
                        onClick={onReadMore}
                        className="mt-auto bg-black text-white px-6 py-2 rounded text-sm hover:bg-black/90 cursor-pointer transition"
                    >
                        Read Review
                    </button>
                )}
            </div>
        </div>
    );
}