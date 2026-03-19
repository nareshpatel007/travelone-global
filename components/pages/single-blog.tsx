"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import { BlogDetail } from "@/components/blog/detail";
import { X } from "lucide-react";

// Define Props
interface Props {
    slug: string;
}

export default function SingleBlogPage({ slug }: Props) {
    // Define state
    const [ready, setReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [blogData, setBlogData] = useState<any | null>(null);
    const [recentPosts, setRecentPosts] = useState<any[]>([]);
    const [popularTours, setPopularTours] = useState<any[]>([]);
    const [commentData, setCommentData] = useState<any[]>([]);

    useEffect(() => {
        requestAnimationFrame(() => { setReady(true); });
    }, []);

    useEffect(() => {
        if (!slug) return;
        const controller = new AbortController();
        const fetchInitData = async () => {
            setIsLoading(true);

            try {
                const response = await fetch("/api/blog/single", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ slug }),
                    signal: controller.signal,
                });

                const data = await response.json();

                if (data?.status && data?.data?.post) {
                    setBlogData(data.data.post);
                    setRecentPosts(data.data.recent_posts ?? []);
                    setPopularTours(data.data.popular_tours ?? []);
                    setCommentData(data.data.comments ?? []);
                } else {
                    setBlogData(null); // ❌ Not found
                }
            } catch (error: any) {
                if (error.name !== "AbortError") {
                    console.error("Failed to fetch blog:", error);
                    setBlogData(null);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitData();
        return () => controller.abort();
    }, [slug]);

    return (
        <>
            {ready && <>
                <CommonHeader />

                {/* LOADING STATE */}
                {isLoading && (
                    <div className="max-w-7xl mx-auto px-5 py-10 grid gap-4 grid-cols-1 md:grid-cols-2">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <div
                                key={index}
                                className="animate-pulse bg-gray-200 rounded-lg h-48 md:h-64"
                            />
                        ))}
                    </div>
                )}

                {/* SUCCESS STATE */}
                {!isLoading && blogData && (
                    <div className="max-w-7xl mx-auto px-5 md:px-0 py-6">
                        <BlogDetail
                            blogPost={blogData}
                            recentPosts={recentPosts}
                            popularTours={popularTours}
                            commentData={commentData}
                        />
                    </div>
                )}

                {/* ERROR / NOT FOUND STATE */}
                {!isLoading && !blogData && (
                    <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 text-center space-y-5">
                        <div className="flex items-center justify-center">
                            <X className="text-[#ef2853] opacity-15" size={120} />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-medium text-black">
                            Blog not found
                        </h2>

                        <p className="text-base md:text-lg text-black max-w-2xl mx-auto">
                            The blog you are looking for does not exist or was removed.
                        </p>
                    </div>
                )}

                <CommonFooter />
            </>}
        </>
    );
}