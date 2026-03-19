"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
    posts: any;
}

export default function FeaturedSection({ posts }: Props) {
    // Define state
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto Slide
    useEffect(() => {
        if (!posts?.length) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === posts.length - 1 ? 0 : prev + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [posts]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative h-[300px] md:h-[700px] text-center overflow-hidden">
                <Image
                    src="https://wanderaway.qodeinteractive.com/wp-content/uploads/2023/08/home2-banner-1.jpg"
                    alt="Wanderway"
                    fill
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/30" />

                <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl md:text-8xl font-light">
                    TRAVELONE
                </h1>
            </div>
            <div className="relative h-[300px] md:h-[700px] overflow-hidden">

                <div
                    className="flex h-full transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {posts.map((post: any) => (
                        <div
                            key={post.id}
                            className="relative min-w-full h-full"
                        >
                            <Image
                                src={post.featured_image}
                                alt={post.image_title}
                                fill
                                className="object-cover"
                            />

                            {/* Dark Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            {/* Content */}
                            <div className="absolute bottom-10 left-10 text-white max-w-md space-y-4">
                                <h2 className="text-2xl md:text-3xl font-light leading-snug">
                                    {post.post_title}
                                </h2>

                                <Link href={`/blog/${post.post_slug}`}>
                                    <button className="text-sm tracking-wider border-b border-white pb-1 hover:opacity-90 hover:text-amber-400 transition cursor-pointer">
                                        READ MORE
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 right-6 flex gap-2">
                    {posts.map((_: any, index: number) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full cursor-pointer transition ${currentIndex === index
                                ? "bg-white"
                                : "bg-white/40"
                                }`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
