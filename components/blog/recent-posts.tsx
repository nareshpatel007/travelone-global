"use client";

import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const categories = [
    { name: "Cultures", image: "" },
    { name: "Explore", image: "" },
    { name: "Summer", image: "" },
    { name: "Food", image: "" },
    { name: "Tropical", image: "" },
    { name: "Adventure", image: "" },
];

// Define interface
interface Props {
    posts: any;
}

export default function RecentPostsSidebar({ posts }: Props) {
    if (!posts?.length) return null;

    return (
        <div className="space-y-5">
            <span className="font-semibold text-xl text-gray-900 block">
                Recent Posts
            </span>
            <div className="space-y-5">
                {posts.map((post: any, index: number) => (
                    <div key={index} className="group !transition-all !duration-300 !overflow-hidden">
                        <Link href={`/blog/${post.slug}`} className="space-y-5">
                            <div className="relative h-50 overflow-hidden">
                                <Image
                                    src={post.featured_image || "/placeholder.svg"}
                                    alt={post.meta_title || "Image"}
                                    fill
                                    draggable="false"
                                    className="w-full h-full rounded-sm object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="space-y-2 text-center">
                                <span className="text-xs md:text-sm font-semibold text-gray-900 block">
                                    Published on {formatDate(post.created_at)}
                                </span>
                                <span className="text-sm md:text-lg font-strong text-gray-900 block">
                                    {post.post_title}
                                </span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
