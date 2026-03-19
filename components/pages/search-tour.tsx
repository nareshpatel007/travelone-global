"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import { TourListingGrid } from "@/components/tours/tour-listing-grid";
import PageHeading from "@/components/common/page-heading";
import { TourFilters } from "../tours/tour-filters";
import { Pagination } from "../tours/pagination";
import { Search } from "lucide-react";

export default function SearchPage() {
    // Get query params
    const keyword = getQuery("keyword", "");

    // Define state
    const [ready, setReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tourList, setTourList] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<any>(1);
    const [totalPages, setTotalPages] = useState<any>(0);
    const [totalCount, setTotalCount] = useState<any>(0);

    // Filter state
    const [isSidebarFilterOpen, setIsSidebarFilterOpen] = useState(false);
    const [sortFilter, setSortFilter] = useState<string>('newest_first');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [filterOptions, setFilterOptions] = useState<string[]>([]);
    const [selectedDurations, setSelectedDurations] = useState<string>('');
    const [selectedRating, setSelectedRating] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [appliedFilter, setAppliedFilter] = useState(false);
    const [resetFilter, setResetFilter] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => {
            setReady(true);
        });
    }, []);

    // Init data
    useEffect(() => {
        if (!ready) return;
        const controller = new AbortController();
        const fetchTours = async () => {
            try {
                // Set loading
                setIsLoading(true);

                // Define url
                const url = appliedFilter ? "/api/tours/filter" : "/api/tours/list";

                // Define body
                const body = appliedFilter
                    ? {
                        page: currentPage,
                        sort: sortFilter,
                        min_price: minPrice,
                        max_price: maxPrice,
                        country: selectedCountry,
                        search: keyword
                    }
                    : {
                        page: currentPage,
                        search: keyword
                    };

                // Fetch the data
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body),
                    signal: controller.signal,
                });

                // Check response
                if (!response.ok) return;

                // Parse the JSON response
                const data = await response.json();

                // Update the state
                setTourList(data?.data?.result ?? []);
                setTotalPages(data?.data?.last_page ?? 0);
                setCurrentPage(data?.data?.current_page ?? 1);
                setTotalCount(data?.data?.total ?? 0);

                // Scroll to top
                window.scrollTo({ top: 0, behavior: "smooth" });
            } catch (error: any) {
                if (error.name !== "AbortError") {
                    console.error("Failed to fetch tours:", error);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchTours();
        return () => controller.abort();
    }, [
        ready,
        keyword,
        currentPage,
        appliedFilter,
        sortFilter,
        minPrice,
        maxPrice,
        selectedCountry,
    ]);

    return (
        <>
            {ready && <>
                <CommonHeader />
                <div className="max-w-7xl mx-auto px-5 md:px-0 py-6">
                    {/* Keyword is valid */}
                    {!isLoading && keyword && tourList.length > 0 && <>
                        <PageHeading
                            main={`Search for: "${keyword}"`}
                            sub="Find the perfect tour for your next adventure."
                        />
                        <TourFilters
                            isLoading={isLoading}
                            showTotalCount={true}
                            setAppliedFilter={setAppliedFilter}
                            setResetFilter={setResetFilter}
                            setIsSidebarFilterOpen={setIsSidebarFilterOpen}
                            isSidebarFilterOpen={isSidebarFilterOpen}
                            totalCount={totalCount}
                            sortFilter={sortFilter}
                            setSortFilter={setSortFilter}
                            setCurrentPage={setCurrentPage}
                            minPrice={minPrice}
                            setMinPrice={setMinPrice}
                            maxPrice={maxPrice}
                            setMaxPrice={setMaxPrice}
                            setSelectedCountry={setSelectedCountry}
                            selectedCountry={selectedCountry}
                            filterOptions={filterOptions}
                        />
                        <TourListingGrid
                            tourList={tourList}
                        />
                        <Pagination
                            isLoading={isLoading}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                        />
                    </>}

                    {/* Show loading */}
                    {isLoading && <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-48 md:h-100"></div>
                        ))}
                    </div>}

                    {/* Keyword is not valid */}
                    {!isLoading && keyword && tourList.length === 0 && <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 text-center space-y-5">
                        <div className="flex items-center justify-center">
                            <Search
                                className="text-[#ef2853] opacity-15"
                                size={120}
                            />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-medium text-black">
                            Search result "{keyword}" not found
                        </h2>

                        <p className="text-base md:text-lg text-black max-w-2xl mx-auto">
                            Your search did not match any tours. Please try again with a different keyword.
                        </p>
                    </div>}
                </div>
                <CommonFooter />
            </>}
        </>
    );
}

export const getQuery = (key: string, fallback = "") =>
    typeof window === "undefined"
        ? fallback
        : new URLSearchParams(window.location.search).get(key) ?? fallback;