"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Define props
interface Props {
    blogList: any[];
}

export default function BlogSlider({ blogList }: Props) {
    // Check if list is empty
    if (blogList.length === 0) {
        return null;
    }

    return (
        <section className="px-5 md:px-10 py-12 space-y-12 bg-[#FFF9EE]">
            <div className="space-y-2 text-center">
                <h2 className="text-black text-3xl md:text-6xl leading-tight font-normal">
                    Latest Blogs
                </h2>
                <span className="text-black text-md">
                    Our latest blog posts on TravelOne
                </span>
            </div>
            <div className="relative">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    loop
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false
                    }}
                    navigation={{
                        nextEl: ".tour-next",
                        prevEl: ".tour-prev",
                    }}
                    spaceBetween={24}
                    slidesPerView={1}
                    slidesPerGroup={1}
                    allowTouchMove={true}
                    grabCursor={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 5,
                        },
                    }}
                >
                    {blogList.length > 0 && blogList.map((post: any) => (
                        <SwiperSlide key={post.id}>
                            <Link href={`/blog/${post.post_slug}`}>
                                <div className="flex flex-col h-full">
                                    <div className="relative aspect-square overflow-hidden">
                                        <Image
                                            src={post.featured_image || "/placeholder.svg"}
                                            alt={post.image_title || "Blog Image"}
                                            fill
                                            className="object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    </div>
                                    <div className="py-6 space-y-1 text-center flex-1 flex flex-col justify-between">
                                        <span className="text-xs md:text-sm font-semibold text-gray-900 block">
                                            {formatDate(post.created_at || new Date())}
                                        </span>
                                        <h3 className="text-md md:text-lg font-medium text-gray-900 block line-clamp-2">
                                            {post.post_title}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}