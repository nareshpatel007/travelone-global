"use client"

import { useState, useRef, useEffect } from "react";
import { SlidersHorizontal, X, ChevronDown, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Define props
interface TourFiltersProps {
    isLoading: boolean;
    showTotalCount?: boolean;
    totalCount: string;
    sortFilter: string;
    setIsSidebarFilterOpen: (value: boolean) => void;
    isSidebarFilterOpen: boolean;
    setAppliedFilter: (value: boolean) => void;
    setResetFilter: (value: boolean) => void;
    setSortFilter: (value: string) => void;
    setCurrentPage: (page: number) => void;
    setSelectedCountry: (value: string) => void;
    selectedCountry: string;
    minPrice: string;
    setMinPrice: (value: string) => void;
    maxPrice: string;
    setMaxPrice: (value: string) => void;
    filterOptions: any;
}

export function TourFilters({
    isLoading,
    showTotalCount = false,
    totalCount,
    sortFilter,
    setIsSidebarFilterOpen,
    isSidebarFilterOpen,
    setAppliedFilter,
    setResetFilter,
    setSortFilter,
    setCurrentPage,
    setSelectedCountry,
    selectedCountry,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    filterOptions
}: TourFiltersProps) {
    // Define state
    const [expandedSections, setExpandedSections] = useState<string[]>(["duration", "ratings", "price"]);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [sortDisplay, setSortDisplay] = useState("Recommended");
    const [showAllcountry, setShowAllcountry] = useState(false);
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const sortDropdownRef = useRef<HTMLDivElement>(null);

    const countryRef = useRef<HTMLDivElement>(null);
    const ratingsRef = useRef<HTMLDivElement>(null);
    const durationRef = useRef<HTMLDivElement>(null);
    const priceRef = useRef<HTMLDivElement>(null);

    // Define sort options
    const sortOptions = [
        { value: "newest_first", label: "Recommended" },
        { value: "price_low_to_high", label: "Price: Low to High" },
        { value: "price_high_to_low", label: "Price: High to Low" },
        { value: "duration_low_to_high", label: "Duration: Short to Long" },
        { value: "duration_high_to_low", label: "Duration: Long to Short" },
    ];

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
    }

    const toggleDuration = (duration: string) => {
        // setSelectedDurations((prev) => (prev.includes(duration) ? prev.filter((d) => d !== duration) : [...prev, duration]))
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
                setSortDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, []);

    return (
        <div className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                {showTotalCount && <span className="text-sm md:text-base text-black">
                    Showing {totalCount} tours
                </span>}
                {!showTotalCount && <span></span>}
                <div className="flex items-center gap-3">
                    {isLoading && <Loader2 className="animate-spin h-5 w-5 text-black" />}
                    <Sheet open={isSidebarFilterOpen} onOpenChange={setIsSidebarFilterOpen}>
                        <SheetTrigger asChild>
                            {/* <button className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 border border-black rounded-sm hover:border-black transition-colors cursor-pointer">
                                <SlidersHorizontal className="h-4 w-4 text-black" />
                                <span className="text-sm text-black">Filter</span>
                            </button> */}
                        </SheetTrigger>
                        <SheetContent side="left" className="!w-full !z-[200] !bg-white sm:w-[320px] md:w-[380px] !p-4 !overflow-y-auto">
                            <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
                                <div className="flex items-center justify-between p-4">
                                    <h2 className="text-xl font-semibold text-black">Filter</h2>
                                    <button onClick={() => setIsSidebarFilterOpen(false)} className="text-gray-500 hover:text-black">
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="flex gap-3 px-4 pb-4">
                                    <button
                                        onClick={() => {
                                            setResetFilter(true);
                                            setCurrentPage(1);
                                        }}
                                        disabled={isLoading}
                                        className="flex-1 py-2 px-4 border border-black rounded-sm text-sm md:text-base font-medium text-black hover:bg-black hover:text-white cursor-pointer transition-colors"
                                    >
                                        Reset
                                    </button>
                                    <button
                                        onClick={() => {
                                            setAppliedFilter(true);
                                            setCurrentPage(1);
                                        }}
                                        disabled={isLoading}
                                        className="flex-1 flex items-center justify-center py-2 px-4 bg-black text-white rounded-sm border border-black text-sm md:text-base font-medium hover:bg-white hover:text-black hover:border-black cursor-pointer transition-colors"
                                    >
                                        {/* {isLoading && <Loader2 className="animate-spin h-5 w-5 mr-2" />} */}
                                        Apply
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 space-y-6">
                                {filterOptions?.countries && filterOptions?.countries.length > 1 && (
                                    <div>
                                        <button
                                            onClick={() => toggleSection("country")}
                                            className="flex items-center justify-between w-full text-left mb-3"
                                        >
                                            <h3 className="text-base font-semibold text-black">Country</h3>
                                            <ChevronDown
                                                className={`h-4 w-4 text-gray-500 transition-transform duration-300 ease-in-out ${expandedSections.includes("country") ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>
                                        <div
                                            ref={countryRef}
                                            className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSections.includes("country") ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                                }`}
                                        >
                                            <div className="space-y-2">
                                                {filterOptions?.countries.map((item: { id: string; name: string }) => (
                                                    <label key={item?.id} className="flex items-center gap-3 cursor-pointer py-1">
                                                        <input
                                                            type="radio"
                                                            name="country"
                                                            checked={selectedCountry === item.id}
                                                            onChange={() => setSelectedCountry(item.id)}
                                                            className="w-4 h-4 text-[#1a9cb0] border-black focus:ring-[#1a9cb0]"
                                                        />
                                                        <span className="text-sm text-black">{item?.name}</span>
                                                    </label>
                                                ))}
                                                {/* {filterOptions?.countries.length > 5 && (
                                                        <button
                                                            onClick={() => setShowAllcountry(!showAllcountry)}
                                                            className="text-sm text-[#f53] cursor-pointer hover:underline mt-2"
                                                        >
                                                            {showAllcountry ? "- Show less" : "+ Show more"}
                                                        </button>
                                                    )} */}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <button
                                        onClick={() => toggleSection("price")}
                                        className="flex items-center justify-between w-full text-left mb-3"
                                    >
                                        <h3 className="text-base font-semibold text-black">Price</h3>
                                        <ChevronDown
                                            className={`h-4 w-4 text-gray-500 transition-transform duration-300 ease-in-out ${expandedSections.includes("price") ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>
                                    <div
                                        ref={priceRef}
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSections.includes("price") ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 w-full">
                                            <div className="flex-1 flex items-center border border-black rounded-sm overflow-hidden">
                                                <input
                                                    type="text"
                                                    placeholder="Min"
                                                    value={minPrice}
                                                    onChange={(e) => setMinPrice(e.target.value)}
                                                    className="flex-1 w-full px-3 py-2 text-sm text-black focus:outline-none"
                                                />
                                                <span className="px-2 py-2 bg-gray-100 text-gray-500 text-sm border-l border-black">
                                                    $
                                                </span>
                                            </div>
                                            <span className="text-gray-500 text-sm">to</span>
                                            <div className="flex-1 flex items-center border border-black rounded-sm overflow-hidden">
                                                <input
                                                    type="text"
                                                    placeholder="Max"
                                                    value={maxPrice}
                                                    onChange={(e) => setMaxPrice(e.target.value)}
                                                    className="flex-1 w-full px-3 py-2 text-sm text-black focus:outline-none"
                                                />
                                                <span className="px-2 py-2 bg-gray-100 text-gray-500 text-sm border-l border-black">
                                                    $
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Sort Dropdown */}
                    <div className="relative" ref={sortDropdownRef}>
                        <button
                            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                            className="flex items-center gap-1 md:gap-2 border border-black rounded-sm px-3 md:px-4 py-2.5 md:py-2.5 hover:border-black text-black transition-colors cursor-pointer"
                        >
                            <span className="hidden sm:inline text-sm text-black">Sort by:</span>
                            <span className="text-xs sm:text-sm font-normal text-black sm:max-w-none truncate">
                                {sortDisplay}
                            </span>
                            <ChevronDown
                                className={`h-4 w-4 transition-transform flex-shrink-0 ${sortDropdownOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {sortDropdownOpen && (
                            <div className="absolute right-0 top-full mt-1 w-full md:w-56 bg-white border border-gray-200 rounded-sm shadow-lg z-50">
                                {sortOptions.map((option) => (
                                    <button
                                        key={option?.value}
                                        onClick={() => {
                                            setSortFilter(option?.value);
                                            setSortDisplay(option?.label);
                                            setSortDropdownOpen(false);
                                            setAppliedFilter(true);
                                            setCurrentPage(1);
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${sortFilter === option?.value
                                            ? "bg-black text-white"
                                            : "bg-white text-black hover:bg-black hover:text-white"
                                            }`}
                                    >
                                        {option?.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}
