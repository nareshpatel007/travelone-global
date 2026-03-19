"use client";

import Image from "next/image";
import Link from "next/link";

// Define props
interface Props {
    posts: any;
}

export default function RightStoriesSection({ posts }: Props) {
    if (!posts?.length) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[600px] lg:h-[520px]">
            {/* 50% IMAGE */}
            {posts?.[0] && (
                <div className="relative md:col-span-2 overflow-hidden group cursor-pointer">
                    <Link href={`/blog/${posts[0].post_slug}`}>
                        <Image
                            src={posts[0].featured_image || "/placeholder.svg"}
                            alt={posts[0].image_title || "Image"}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                        <div className="absolute bottom-5 left-5 right-5">
                            <h3 className="text-white text-md sm:text-2xl font-normal leading-snug">
                                {posts[0].post_title}
                            </h3>
                        </div>
                    </Link>
                </div>
            )}

            {/* 25% IMAGE */}
            {posts?.[1] && (
                <div className="relative overflow-hidden group cursor-pointer">
                    <Link href={`/blog/${posts[1].post_slug}`}>
                        <Image
                            src={posts[1].featured_image || "/placeholder.svg"}
                            alt={posts[1].image_title || "Image"}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-5 left-5 right-5">
                            <h3 className="text-white text-md sm:text-2xl font-normal leading-snug">
                                {posts[1].post_title}
                            </h3>
                        </div>
                    </Link>
                </div>
            )}

            {/* 25% IMAGE */}
            {posts?.[2] && (
                <div className="relative overflow-hidden group cursor-pointer">
                    <Link href={`/blog/${posts[2].post_slug}`}>
                        <Image
                            src={posts[2].featured_image || "/placeholder.svg"}
                            alt={posts[2].image_title || "Image"}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-5 left-5 right-5">
                            <h3 className="text-white text-md sm:text-2xl font-normal leading-snug">
                                {posts[2].post_title}
                            </h3>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
}
