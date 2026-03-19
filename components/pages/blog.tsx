"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import FeaturedSection from "../blog/featured-section";
import RightStoriesSection from "../blog/right-stories-section";
import LeftStoriesSection from "../blog/left-stories-section";
import { Pagination } from "../tours/pagination";
import SearchFilter from "../blog/search-filter";
import { Search } from "lucide-react";

export default function BlogPage() {
    // Define state
    const [ready, setReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [blogSliderList, setBlogSliderList] = useState<any[]>([]);
    const [blogList, setBlogList] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<any>(1);
    const [totalPages, setTotalPages] = useState<any>(0);
    const [isPaginationApply, setIsPaginationApply] = useState<boolean>(false);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [searchCategory, setSearchCategory] = useState<string>("");
    const [debouncedKeyword, setDebouncedKeyword] = useState(searchKeyword);

    useEffect(() => {
        requestAnimationFrame(() => {
            setReady(true);
        });
    }, []);
    
    useEffect(() => {
        setIsPaginationApply(true);
    }, [setCurrentPage]);

    // Init data
    useEffect(() => {
        const controller = new AbortController();
        const fetchInitData = async () => {
            try {
                // Set loading
                setIsLoading(true);

                // Fetch the data
                const response = await fetch("/api/blog/list", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the JSON response
                const data = await response.json();

                // Update the state
                setBlogList(data?.data?.result ?? []);
                setBlogSliderList(data?.data?.result ?? []);
                setTotalPages(data?.data?.last_page ?? 0);
                setCurrentPage(data?.data?.current_page ?? 1);
            } catch (error: any) {
                if (error.name == "AbortError") {
                    console.error("Failed to fetch tours:", error);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchInitData();
        return () => controller.abort();
    }, []);

    // Debounce keyword
    useEffect(() => {
        const handler = setTimeout(() => {
            setIsSearchLoading(true);
            setDebouncedKeyword(searchKeyword);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchKeyword]);

    // Filter posts
    useEffect(() => {
        const controller = new AbortController();
        const fetchFilterData = async () => {
            try {
                // Set loading
                setIsPageLoading(true);

                // Define current page
                let currentPageNo = 1;

                // If pagination apply
                if (isPaginationApply) {
                    currentPageNo = currentPage;
                } else if (searchCategory || debouncedKeyword) {
                    currentPageNo = 1;
                }

                // Fetch the data
                const response = await fetch("/api/blog/list", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    signal: controller.signal,
                    body: JSON.stringify({
                        page: currentPageNo,
                        search: debouncedKeyword,
                        category: searchCategory
                    })
                });

                // Parse the JSON response
                const data = await response.json();

                // Update the state
                if (data.status) {
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: "smooth" });

                    // Update state
                    setBlogList(data?.data?.result ?? []);
                    setTotalPages(data?.data?.last_page ?? 0);
                    setCurrentPage(data?.data?.current_page ?? 1);
                }
            } catch (error: any) {
                if (error.name !== "AbortError") {
                    console.error("Failed to fetch blogs:", error);
                }
            } finally {
                setIsPageLoading(false);
            }
        };
        fetchFilterData();
        return () => controller.abort();
    }, [currentPage, debouncedKeyword, searchCategory]);

    return (
        <>
            {ready && <>
                <CommonHeader />

                <div className="p-3 md:p-8 space-y-8">
                    {isLoading ? (
                        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Array.from({ length: 2 }).map((_, index) => (
                                <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-48 md:h-100"></div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <SearchFilter
                                isPageLoading={isSearchLoading}
                                searchKeyword={searchKeyword}
                                setSearchKeyword={setSearchKeyword}
                                searchCategory={searchCategory}
                                setSearchCategory={setSearchCategory}
                            />
                            {!searchKeyword && <FeaturedSection posts={blogSliderList} />}
                            <RightStoriesSection posts={blogList.slice(0, 3)} />
                            <LeftStoriesSection posts={blogList.slice(3, 6)} />
                            <RightStoriesSection posts={blogList.slice(6, 9)} />

                            <Pagination
                                isLoading={isPageLoading}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                            />

                            {/* If search result not found */}
                            {!isLoading && !isPageLoading && searchKeyword && blogList.length === 0 && (
                                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 text-center space-y-5">
                                    <div className="flex items-center justify-center">
                                        <Search className="text-[#ef2853] opacity-15" size={120} />
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-medium text-black">
                                        Blog result not found
                                    </h2>

                                    <p className="text-base md:text-lg text-black max-w-2xl mx-auto">
                                        The blog you are looking for does not exist. Please modify your search criteria and try again.
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <CommonFooter />
            </>}
        </>
    );
}
