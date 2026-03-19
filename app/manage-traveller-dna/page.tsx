"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import PageHeading from "@/components/common/page-heading";
import { CheckCircle, CheckCircleIcon, ExternalLink, Heart, Home, Loader2, MousePointerClick, Search, ShieldAlert, Trash2 } from "lucide-react";
import Image from "next/image";
import { getLoginCookie } from "@/lib/auth";
import Link from "next/link";
import { InitializePersonaModal } from "@/components/plan_your_trip/initialize-persona";
import { StartJourneyModal } from "@/components/plan_your_trip/journey-popup";
import { CountryWhyPopup } from "@/components/personas/country-why-popup";
import FeedbackTab from "@/components/personas/manage/feedback-tab";

// Define tabs
const tabList = [
    { id: 1, name: "Your Travel DNA", value: "answers" },
    { id: 2, name: "Countries Matching Your DNA", value: "countries" },
    // { id: 3, name: "Cities", value: "cities" },
    { id: 4, name: "My Wishlist", value: "my_list" },
    { id: 5, name: "Manage Your TravelDNA Data", value: "setting" },
    { id: 6, name: "Feedback", value: "feedback" },
    { id: 7, name: "Blueprint", value: "blueprint" },
];

// Define questions
const questionsList: any = [
    {
        "question": "How do you prefer to begin a day in a new destination?",
        "option_a": "A slow coffee on a private terrace with no set schedule.",
        "option_b": "An early, energized start to beat the crowds and see the sunrise.",
        "option_c": "A structured breakfast meeting or a guided morning briefing."
    },
    {
        "question": 'Which environment makes you feel most "at home" while traveling?',
        "option_a": "A restored 16th-century estate with thick stone walls and history.",
        "option_b": "A glass-walled penthouse with minimalist lines and city views.",
        "option_c": "An organic, open-air villa integrated directly into nature."
    },
    {
        "question": "What is your ideal dinner experience?",
        "option_a": "A formal, 7-course tasting menu at a world-renowned Chef’s Table.",
        "option_b": 'A "hidden gem" local spot where the menu is written on a chalkboard.',
        "option_c": "A private, catered dinner served in the sanctuary of my own suite."
    },
    {
        "question": "How do you prefer to move between locations?",
        "option_a": "A private chauffeured vehicle where I can work or rest in transit.",
        "option_b": 'A high-speed, first-class rail journey to see the landscape change.',
        "option_c": "I prefer to walk or use local transport to truly feel the city’s pulse."
    },
    {
        "question": 'What is your relationship with the "outside world" during a journey?',
        "option_a": "I need high-speed connectivity; I am always managing my enterprise.",
        "option_b": 'I check in occasionally, but I prefer to stay in the moment.',
        "option_c": "Complete digital detox. I want to be unreachable and off the grid."
    },
    {
        "question": "Who makes up your ideal travel environment?",
        "option_a": 'Total privacy—I want to be in a "bubble" with just my inner circle.',
        "option_b": 'I enjoy vibrant, high-end social hubs where I can meet like-minded people.',
        "option_c": "My focus is on multi-generational family comfort and shared spaces."
    },
    {
        "question": "Which sensory detail is most important for your relaxation?",
        "option_a": 'Acoustic perfection—I need absolute silence and sound-masking.',
        "option_b": 'Natural light—I want floor-to-ceiling windows and open skies.',
        "option_c": "Tactile luxury—I care about the quality of the fabrics, stone, and wood."
    },
    {
        "question": 'How do you feel about "unplanned" moments?',
        "option_a": 'I want every detail vetted and confirmed by experts before I arrive.',
        "option_b": 'I like a framework, but I want my guide to suggest "wildcard" detours.',
        "option_c": "I want to go where no one else goes, regardless of the complexity."
    },
    {
        "question": "Which climate profile aligns with your current state of mind?",
        "option_a": 'Crisp, alpine air—snow-capped peaks and cooling temperatures.',
        "option_b": 'Tropical warmth—ocean breezes, high humidity, and lush greens.',
        "option_c": "Temperate and mild—perfect for Mediterranean-style exploration."
    },
    {
        "question": "How do you prefer to interact with your support team?",
        "option_a": 'Invisible and tech-driven—everything managed via an app or AI.',
        "option_b": 'High-touch and human—a dedicated concierge who knows me by name.',
        "option_c": "Only when needed—I value independence unless there is a crisis."
    },
];

export default function Page() {
    // Define state
    const [ready, setReady] = useState(false);
    const [userId, setUserId] = useState(false);
    const [confirmAccountDelete, setConfirmAccountDelete] = useState(false);
    const [isAccountDeleted, setIsAccountDeleted] = useState(false);
    const [isDeleteProcess, setIsDeleteProcess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [personaResult, setPersonaResult] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("answers");
    const [countries, setCountries] = useState<any>([]);
    const [cities, setCities] = useState<any>([]);
    const [openInitializePersonaModel, setOpenInitializePersonaModel] = useState<boolean>(false);
    const [showWhyPopup, setShowWhyPopup] = useState(false);
    const [activeCountry, setActiveCountry] = useState<any>(null);
    const [openStartJourney, setOpenStartJourney] = useState(false);
    const [journeyCountry, setJourneyCountry] = useState<string>("");

    useEffect(() => {
        requestAnimationFrame(() => { setReady(true); });
    }, []);

    useEffect(() => {
        async function fetchInitData() {
            try {
                // Update state
                setIsLoading(true);

                // Get auth data
                const authData = getLoginCookie();

                // Update state
                setUserId(authData?.user_id);

                // API Call
                const response = await fetch(`/api/plan_your_trip/manage`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user_id: authData?.user_id
                    })
                });

                // Convert into JSON
                const data = await response.json();

                // Check response
                if (data?.status) {
                    setPersonaResult(data?.data?.result);
                    setCities(data?.data?.cities_list);

                    // Perfect match countries list
                    const originalCountries = data?.data?.countries_list || [];
                    const perfectMatchObj = data?.data?.result?.data?.match_perfect || {};

                    // Extract country IDs
                    const perfectMatchIds = Object.keys(perfectMatchObj).map(Number);

                    // Change order
                    const sortedCountries = [...originalCountries].sort((a, b) => {
                        const aMatch = perfectMatchIds.includes(a.id) ? 1 : 0;
                        const bMatch = perfectMatchIds.includes(b.id) ? 1 : 0;
                        return bMatch - aMatch;
                    });

                    // Update state
                    setCountries(sortedCountries);
                }
            } finally {
                // Update state
                setIsLoading(false);
            }
        }
        fetchInitData();
    }, []);

    // Toggle wishlist
    const toggleCountryWishlist = async (countryId: any, action: string = "add") => {
        try {
            // Validation
            if (!personaResult || !countryId) return;

            // API Call
            const response = await fetch(`/api/plan_your_trip/manage/wishlist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: personaResult?.id,
                    type: 'country',
                    ref_id: countryId,
                    action
                })
            });

            // Convert into JSON
            const data = await response.json();

            // Check response
            if (data?.status) {
                if (action == 'add') {
                    const updatedCountries = countries?.map((country: any) => country?.id === countryId ? { ...country, is_wishlisted: !country?.is_wishlisted } : country);
                    setCountries(updatedCountries);
                } else {
                    // Remove country
                    const updatedPersonasResult = personaResult?.my_list_countries?.filter((country: any) => country?.id !== countryId);
                    setPersonaResult({ ...personaResult, my_list_countries: updatedPersonasResult });
                }
            }
        } catch (error) {
            console.error("Wishlist error:", error);
        }
    };

    // Toggle wishlist
    const toggleCityWishlist = async (cityId: any, action: string = "add") => {
        try {
            // Validation
            if (!personaResult || !cityId) return;

            // API Call
            const response = await fetch(`/api/plan_your_trip/manage/wishlist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: personaResult?.id,
                    type: 'city',
                    ref_id: cityId,
                    action
                })
            });

            // Convert into JSON
            const data = await response.json();

            // Check response
            if (data?.status) {
                if (action == 'add') {
                    const updatedCities = cities?.map((city: any) => city?.id === cityId ? { ...city, is_wishlisted: !city?.is_wishlisted } : city);
                    setCities(updatedCities);
                } else {
                    // Remove city
                    const updatedPersonasResult = personaResult?.my_list_cities?.filter((city: any) => city?.id !== cityId);
                    setPersonaResult({ ...personaResult, my_list_cities: updatedPersonasResult });
                }
            }
        } catch (error) {
            console.error("Wishlist error:", error);
        }
    };

    // Clear persona data
    const handleDeleteAccount = async () => {
        try {
            // Update state
            setIsDeleteProcess(true);

            // API Call
            const response = await fetch(`/api/plan_your_trip/manage/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: personaResult?.id
                })
            });

            // Convert into JSON
            const data = await response.json();

            // Check response
            if (data?.status) {
                setIsAccountDeleted(true);
            }
        } finally {
            setIsDeleteProcess(false);
        }
    };

    // If account deleted
    if (isAccountDeleted) {
        return (
            <>
                <CommonHeader />
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-30 text-center">
                    <div className="flex justify-center mb-8">
                        <h1 className="text-center text-[#1E1E1E]">
                            <CheckCircleIcon className="w-16 h-16" />
                        </h1>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-semibold text-[#1E1E1E] mb-4">
                        Account Deleted
                    </h2>

                    <p className="text-base md:text-lg text-black mb-10 max-w-2xl mx-auto">
                        Your Traveller DNA account and data has been deleted successfully.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => setOpenInitializePersonaModel(true)}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-black text-white rounded font-semibold text-base hover:bg-[#1E1E1E] transition-colors cursor-pointer shadow-lg"
                        >
                            <MousePointerClick className="h-5 w-5" /> Decode Your DNA
                        </button>
                    </div>
                </div>

                <InitializePersonaModal open={openInitializePersonaModel} onOpenChange={setOpenInitializePersonaModel} />

                <CommonFooter />
            </>
        );
    }

    return (
        <>
            {ready && (
                <>
                    <CommonHeader />

                    {/* Loading */}
                    {isLoading && <div className="max-w-7xl mx-auto px-5 md:px-0 py-6">
                        <div className="grid grid-cols-1 space-y-4">
                            <div className="animate-pulse bg-gray-200 rounded h-20 md:h-30"></div>
                            <div className="animate-pulse bg-gray-200 rounded h-40 md:h-50"></div>
                            <div className="animate-pulse bg-gray-200 rounded h-40 md:h-50"></div>
                        </div>
                    </div>}

                    {/* Result */}
                    {!isLoading && personaResult && (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-6 md:py-8">
                        <PageHeading
                            main="Manage My Traveller DNA"
                            sub="Control your travel DNA, saved destinations, and account lifecycle in one place."
                        />
                        <div className="space-y-4">
                            <div className="border-b">
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                    {tabList.map((tab: any) => (
                                        <button
                                            key={tab?.id}
                                            onClick={() => setActiveTab(tab?.value)}
                                            className={`flex items-center whitespace-nowrap px-4 py-2 rounded-t text-base font-medium transition cursor-pointer ${activeTab === tab?.value
                                                ? "bg-black text-white"
                                                : "text-black hover:bg-black hover:text-white"
                                                }`}
                                        >
                                            {tab?.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="">
                                {/* answers */}
                                {activeTab === "answers" && (
                                    <div className="space-y-4">
                                        <h3 className="text-xl md:text-2xl font-semibold text-black">Your Preferences</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                            {personaResult?.answers && questionsList.map((question: any, index: number) => {
                                                const answerKey = `question_${index + 1}`;
                                                const selectedOption = personaResult.answers[answerKey];

                                                let answerText = "";

                                                if (selectedOption === "Option A") {
                                                    answerText = question.option_a;
                                                } else if (selectedOption === "Option B") {
                                                    answerText = question.option_b;
                                                } else if (selectedOption === "Option C") {
                                                    answerText = question.option_c;
                                                }

                                                return (
                                                    <div key={index} className="border rounded-xl p-4 bg-slate-50 space-y-1">
                                                        <p className="font-medium">
                                                            Q{index + 1}: {question.question}
                                                        </p>

                                                        <p className="text-base text-black">
                                                            {selectedOption} — {answerText}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <Link target="_blank" href={`/persona-result/?token=${personaResult?.token}`}>
                                            <button className="mt-6 gap-2 w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-black text-white rounded font-medium text-base hover:bg-[#1E1E1E] transition-colors shadow-lg cursor-pointer">
                                                View Your Travel DNA <ExternalLink className="w-5 h-5" />
                                            </button>
                                        </Link>
                                    </div>
                                )}

                                {/* COUNTRIES */}
                                {activeTab === "countries" && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {countries.length > 0 && countries.map((item: any, index: number) => (
                                            <div key={index} className="relative w-full">
                                                <div className="relative w-full pb-[65%] md:pb-[60%] overflow-hidden group cursor-pointer rounded-xl">
                                                    <Image
                                                        src={item?.featured_image || "/placeholder.svg"}
                                                        alt={item?.name || "placeholder"}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                                                    />

                                                    {personaResult?.data?.match_perfect && personaResult?.data?.match_perfect?.[item?.id] && (
                                                        <div className="absolute top-3 left-3">
                                                            <span className="inline-flex items-center px-4 py-1 text-sm md:text-base font-medium bg-yellow-400 text-black rounded-full">
                                                                ★ {personaResult?.data?.match_perfect?.[item?.id]} Match
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Wishlist Button */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleCountryWishlist(item?.id);
                                                        }}
                                                        className="absolute top-4 right-4 z-20 rounded-full bg-white/90 p-2 sm:p-2.5 shadow-lg transition hover:bg-white cursor-pointer"
                                                    >
                                                        <Heart
                                                            size={18}
                                                            className={
                                                                (personaResult?.wishlist_countries?.includes(item?.id) ||
                                                                    item?.is_wishlisted)
                                                                    ? "fill-[#ef2853] text-[#ef2853]"
                                                                    : "text-gray-600 hover:fill-[#ef2853] hover:text-[#ef2853]"
                                                            }
                                                        />
                                                    </button>

                                                    <div className="absolute bottom-4 left-4 right-4 space-y-2">
                                                        <div className="w-fit bg-black/50 rounded px-3 py-1">
                                                            <h3 className="text-white text-sm sm:text-lg md:text-xl font-medium leading-snug">
                                                                {item.name}
                                                            </h3>
                                                        </div>

                                                        <div className="flex flex-col sm:flex-row gap-2">
                                                            <button
                                                                onClick={() => {
                                                                    setOpenStartJourney(true);
                                                                    setJourneyCountry(item?.name);
                                                                }}
                                                                className="flex items-center justify-center text-xs sm:text-sm gap-2 px-3 sm:px-6 py-2 bg-black text-white rounded hover:bg-yellow-400 hover:text-black cursor-pointer w-full sm:w-auto"
                                                            >
                                                                Plan Your {item?.name} DNA Itinerary
                                                            </button>

                                                            <button
                                                                onClick={() => {
                                                                    setActiveCountry(item);
                                                                    setShowWhyPopup(true);
                                                                }}
                                                                className="flex items-center justify-center text-xs sm:text-sm gap-2 px-3 sm:px-6 py-2 bg-black text-white rounded hover:bg-yellow-400 hover:text-black cursor-pointer w-full sm:w-auto"
                                                            >
                                                                Why {item.name} for your Profile?
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* CITIES */}
                                {activeTab === "cities" && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {cities && cities.map((city: any, index: number) => (
                                            <div
                                                key={index}
                                                className="relative h-36 md:h-50 rounded-md overflow-hidden group"
                                            >
                                                <Image
                                                    src={city?.featured_image || "/placeholder.svg"}
                                                    alt={city?.name || "Destination"}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />

                                                {/* Wishlist Button */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleCityWishlist(city?.id);
                                                    }}
                                                    className="absolute top-4 right-4 z-20 rounded-full bg-white/90 p-2 shadow-lg transition hover:bg-white cursor-pointer"
                                                >
                                                    <Heart
                                                        size={18}
                                                        className={
                                                            (personaResult?.wishlist_cities?.includes(city?.id) ||
                                                                city?.is_wishlisted)
                                                                ? "fill-[#ef2853] text-[#ef2853]"
                                                                : "text-gray-600 hover:fill-[#ef2853] hover:text-[#ef2853]"
                                                        }
                                                    />
                                                </button>

                                                {/* overlay */}
                                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/15 via-black/30 to-transparent" />

                                                {/* title */}
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                    <h2 className="text-lg md:text-xl font-medium text-white">
                                                        {city?.name}
                                                    </h2>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* MY LIST */}
                                {activeTab === "my_list" && (
                                    <>
                                        {personaResult?.my_list_countries?.length == 0 && personaResult?.my_list_cities?.length == 0 && (
                                            <div className="flex items-center justify-center h-36 md:h-50 rounded-md overflow-hidden">
                                                <h2 className="text-lg md:text-xl font-medium">
                                                    You have no items in your list
                                                </h2>
                                            </div>
                                        )}

                                        {/* COUNTRIES */}
                                        {personaResult?.my_list_countries?.length > 0 && (
                                            <div className="space-y-4">
                                                <h3 className="text-lg md:text-lg font-medium">Countries</h3>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {personaResult?.my_list_countries.map((country: any, index: number) => (
                                                        <div
                                                            key={index}
                                                            className="relative h-36 md:h-50 rounded-md overflow-hidden group"
                                                        >
                                                            <Image
                                                                src={country?.featured_image || "/placeholder.svg"}
                                                                alt={country?.name || "Destination"}
                                                                fill
                                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                            />

                                                            {/* Wishlist Button */}
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleCountryWishlist(country?.id, 'remove');
                                                                }}
                                                                className="absolute top-4 right-4 z-20 rounded-full bg-white/90 p-2 shadow-lg transition hover:bg-white cursor-pointer"
                                                            >
                                                                <Heart
                                                                    size={18}
                                                                    className={
                                                                        (personaResult?.wishlist_countries?.includes(country?.id) ||
                                                                            country?.is_wishlisted)
                                                                            ? "fill-[#ef2853] text-[#ef2853]"
                                                                            : "text-gray-600 hover:fill-[#ef2853] hover:text-[#ef2853]"
                                                                    }
                                                                />
                                                            </button>

                                                            {/* overlay */}
                                                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/15 via-black/30 to-transparent" />

                                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                                <h2 className="text-lg md:text-xl font-medium text-white">
                                                                    {country?.name}
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* CITIES */}
                                        {personaResult?.my_list_cities?.length > 0 && (
                                            <div className="space-y-4 mt-5">
                                                <h3 className="text-lg md:text-lg font-medium">Cities</h3>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {personaResult?.my_list_cities.map((city: any, index: number) => (
                                                        <div
                                                            key={index}
                                                            className="relative h-36 md:h-50 rounded-md overflow-hidden group"
                                                        >
                                                            <Image
                                                                src={city?.featured_image || "/placeholder.svg"}
                                                                alt={city?.name || "Destination"}
                                                                fill
                                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                            />

                                                            {/* Wishlist Button */}
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleCityWishlist(city?.id, 'remove');
                                                                }}
                                                                className="absolute top-4 right-4 z-20 rounded-full bg-white/90 p-2 shadow-lg transition hover:bg-white cursor-pointer"
                                                            >
                                                                <Heart
                                                                    size={18}
                                                                    className={
                                                                        (personaResult?.wishlist_cities?.includes(city?.id) ||
                                                                            city?.is_wishlisted)
                                                                            ? "fill-[#ef2853] text-[#ef2853]"
                                                                            : "text-gray-600 hover:fill-[#ef2853] hover:text-[#ef2853]"
                                                                    }
                                                                />
                                                            </button>

                                                            {/* overlay */}
                                                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/15 via-black/30 to-transparent" />

                                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                                <h2 className="text-lg md:text-xl font-medium text-white">
                                                                    {city?.name}
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* SETTINGS */}
                                {activeTab === "setting" && (
                                    <div className="border border-rose-200 bg-rose-50 rounded p-6 space-y-3">
                                        <div className="flex items-center gap-2">
                                            <ShieldAlert className="h-5 w-5 text-rose-600" />
                                            <h2 className="font-semibold text-lg">Danger Zone</h2>
                                        </div>

                                        <p className="text-base text-black">
                                            Click below to delete your TravelOne traveler DNA account and persona data.
                                        </p>

                                        <button
                                            onClick={() => setConfirmAccountDelete(true)}
                                            className="flex items-center gap-2 bg-rose-600 text-white text-base px-4 py-1.5 rounded hover:bg-rose-700 cursor-pointer"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Delete Your Traveller DNA Account & Data
                                        </button>
                                    </div>
                                )}

                                {/* FEEDBACK */}
                                {activeTab === "feedback" && (
                                    <FeedbackTab personaResult={personaResult} />
                                )}

                                {/* BLUEPRINT */}
                                {activeTab === "blueprint" && (
                                    <div className="border rounded p-4 bg-slate-50 space-y-6">
                                        <p className="text-base sm:text-lg text-black leading-relaxed">
                                            To derive your Signature Results, our engine moves beyond traditional destination filtering and enters the realm of Agentic Reasoning. We cross-referenced your 30 Marker Points—a high-fidelity diagnostic of your Cognitive Travel Architecture. This includes an algorithmic analysis of your Environmental Resonance (climate-resilience and sensory-density scores) and your Service-Friction Index (the precise balance between 'Invisible Tech' and 'Curated Human Intervention').
                                        </p>

                                        <p className="text-base sm:text-lg text-black leading-relaxed">
                                            Our proprietary engine then performed a Multi-Layered Asset Match, scanning global infrastructure data to identify the exact coordinates where the local landscape, hotel architecture, and transit velocity align with your psychological needs. These are not merely vacations; they are Adaptive Ecosystems built to respond to the unique frequency of your Travel DNA.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>)}

                    {/* Not found */}
                    {!isLoading && !personaResult && (
                        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-30 text-center">
                            <div className="flex justify-center mb-8">
                                <h1 className="text-center text-[#1E1E1E]">
                                    <Search className="h-18 w-18" />
                                </h1>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-semibold text-[#1E1E1E] mb-4">
                                Account not found!
                            </h2>

                            <p className="text-base md:text-lg text-black mb-10 max-w-2xl mx-auto">
                                We couldn't find the account you were looking for. Please try again.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <button
                                    onClick={() => setOpenInitializePersonaModel(true)}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-black text-white rounded font-semibold text-base hover:bg-[#1E1E1E] transition-colors cursor-pointer shadow-lg"
                                >
                                    <MousePointerClick className="h-5 w-5" /> Decode Your DNA
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Confirm Delete */}
                    {confirmAccountDelete && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-100">
                            <div className="bg-white p-6 rounded-md shadow-md space-y-4 w-[90%] max-w-md">
                                <h2 className="text-lg font-semibold">
                                    Are you sure you want to delete your Traveller DNA account and data?
                                </h2>
                                <p className="text-base text-gray-600">
                                    This action cannot be undone.
                                </p>
                                <div className="flex justify-end gap-2">
                                    <button
                                        disabled={isDeleteProcess}
                                        onClick={() => setConfirmAccountDelete(false)}
                                        className="px-4 py-1.5 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={isDeleteProcess}
                                        onClick={handleDeleteAccount}
                                        className="flex items-center gap-2 px-4 py-1.5 bg-rose-600 text-white rounded hover:bg-rose-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isDeleteProcess && <Loader2 className="h-4 w-4 animate-spin" />}
                                        {!isDeleteProcess && <CheckCircle className="h-4 w-4" />}
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modals */}
                    <StartJourneyModal
                        selectedCountry={journeyCountry}
                        open={openStartJourney}
                        onOpenChange={setOpenStartJourney}
                        isPersonaResult={personaResult?.token}
                    />
 
                    <CountryWhyPopup
                        open={showWhyPopup}
                        onOpenChange={setShowWhyPopup}
                        item={activeCountry}
                    />
 
                    <InitializePersonaModal
                        open={openInitializePersonaModel}
                        onOpenChange={setOpenInitializePersonaModel}
                    />

                    <CommonFooter />
                </>
            )
            }
        </>
    );
}