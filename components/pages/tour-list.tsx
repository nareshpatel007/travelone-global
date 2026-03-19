"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import { TourFilters } from "@/components/tours/tour-filters";
import { TourListingGrid } from "@/components/tours/tour-listing-grid";
import { Pagination } from "@/components/tours/pagination";
import PageHeading from "@/components/common/page-heading";

export default function ToursPage() {
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
                    }
                    : {
                        page: currentPage,
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
                    <PageHeading
                        main={totalCount ? `All Tours Listing (Showing ${totalCount} tours)` : "All Tours Listing"}
                    />
                    <TourFilters
                        isLoading={isLoading}
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
                </div>
                <CommonFooter />
            </>}
        </>
    );
}