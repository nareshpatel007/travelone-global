"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LoginModal } from "../common/login-modal";
import { Dna, Facebook, Heart, Instagram, Linkedin, ListCheck, LogOut, Menu, Search, ShoppingCartIcon, User, User2, X, Youtube } from "lucide-react";
import { getCartData, getLoginCookie, getWishlistCount, isLoggedIn, removeLoginCookie } from "@/lib/auth";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { StartJourneyModal } from "../plan_your_trip/journey-popup";

// Define mega menu destinations list
const DESTINATIONS = [
    {
        title: "Japan",
        image: "https://ik.imagekit.io/288weifiq/countries/countries-1772036962434_9ui5yU3nI.jpg",
        link: "/country/japan",
    },
    {
        title: "South Korea",
        image: "https://ik.imagekit.io/288weifiq/nextjs/south-korea/gyeongbokgung-palace-night-seoul-korea_335224-351.jpg",
        link: "/country/south-korea",
    },
];

// Define props
interface Props {
    landingPytrip?: boolean;
}

export default function CommonHeader({ landingPytrip = false }: Props) {
    // Define route
    const router = useRouter();

    // Get query params
    const keyword = getQuery("keyword", "");

    // Define state
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [openStartJourney, setOpenStartJourney] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openProfileMenu, setOpenProfileMenu] = useState(false);

    // Get user data
    const loginUserData = isLoggedIn() ? getLoginCookie() : null;

    // Define ref
    const menuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // Define count
    const wishlistCount = getWishlistCount();
    const cartCount = getCartData() ? 1 : 0;

    useEffect(() => {
        document.body.style.overflow = openMobileMenu ? "hidden" : "auto";
    }, [openMobileMenu]);

    useEffect(() => {
        setOpenProfileMenu(false);
    }, [pathname]);

    // Mega Menu Hide on scroll
    useEffect(() => {
        if (!showMegaMenu) return;

        const handleScroll = () => {
            setShowMegaMenu(false);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [showMegaMenu]);

    // Click outside handler
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenProfileMenu(false);
            }
        }

        if (openProfileMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openProfileMenu]);

    // Handle Logout
    const logout = async () => {
        removeLoginCookie();
        setOpenProfileMenu(false);
        router.push("/");
    };

    // Mega Menu Show and Hide
    const openMegaMenu = () => setShowMegaMenu(true);
    const closeMegaMenu = () => setShowMegaMenu(false);

    return (
        <>
            {/* ================= TOP BAR ================= */}
            <div className="hidden md:block bg-[#FBF2E3] text-sm">
                <div className="px-4 h-10 flex items-center justify-between">
                    <span className="font-medium text-gray-800">
                        TravelOne — A Global Platform Synchronizing Your Journey to Your Persona.
                    </span>

                    <div className="flex items-center">
                        <div className="flex items-center gap-5 text-xs font-semibold tracking-wide uppercase text-black">
                            <Link
                                href="https://www.youtube.com/@traveloneio"
                                target="_blank"
                                rel="nofollow"
                                className="flex items-center gap-1.5 hover:underline underline-offset-4"
                            >
                                <Youtube className="w-4 h-4 text-red-600" />
                                Youtube
                            </Link>

                            <Link
                                href="https://www.facebook.com/travelone.global.travel.services/"
                                target="_blank"
                                rel="nofollow"
                                className="flex items-center gap-1.5 hover:underline underline-offset-4"
                            >
                                <Facebook className="w-3.5 h-3.5 text-blue-600" />
                                Facebook
                            </Link>

                            <Link
                                href="https://www.instagram.com/travelone.global/"
                                target="_blank"
                                rel="nofollow"
                                className="flex items-center gap-1.5 hover:underline underline-offset-4"
                            >
                                <Instagram className="w-3.5 h-3.5 text-pink-500" />
                                Instagram
                            </Link>

                            {/* <Link
                                href="https://www.linkedin.com/company/traveloneio/"
                                target="_blank"
                                rel="nofollow"
                                className="flex items-center gap-1.5 hover:underline underline-offset-4"
                            >
                                <Linkedin className="w-3.5 h-3.5 text-blue-500" />
                                LinkedIn
                            </Link> */}
                        </div>

                        {/* Search form */}
                        {/* <form action="/search" method="get">
                            <div className="ml-4 flex items-center gap-2 border-l pl-4">
                                <input
                                    name="keyword"
                                    defaultValue={keyword || ""}
                                    placeholder="Search tour here..."
                                    className="bg-transparent outline-none text-sm"
                                    autoComplete="off"
                                />
                                <Search className="h-4 w-4" />
                            </div>
                        </form> */}
                    </div>
                </div>
            </div>

            {/* ================= HEADER (UNCHANGED) ================= */}
            <header className="top-0 z-50 bg-white border-b border-[#d9cec1]">
                <div className="px-4 md:px-8 h-20 md:h-24 flex items-center justify-between">
                    {/* LOGO */}
                    <Link href="/">
                        <Image
                            src="/common/logo.webp"
                            alt="Logo"
                            width={160}
                            height={100}
                            className="cursor-pointer w-32 md:w-40"
                            draggable="false"
                        />
                    </Link>

                    {/* DESKTOP NAV (UNCHANGED) */}
                    <nav className="hidden lg:flex items-center gap-8 font-medium text-gray-900">
                        <Link className="hover:underline underline-offset-5 cursor-pointer" onMouseEnter={closeMegaMenu} href="/">Home</Link>
                        <Link href="/country">
                            <button
                                className="hover:underline underline-offset-5 cursor-pointer"
                                onMouseEnter={openMegaMenu}
                            >
                                Collections
                            </button>
                        </Link>
                        <Link className="hover:underline underline-offset-5 cursor-pointer" onMouseEnter={closeMegaMenu} href="/tour">Experiences</Link>
                        <Link className="hover:underline underline-offset-5 cursor-pointer" onMouseEnter={closeMegaMenu} href="/press">Press</Link>
                        <Link className="hover:underline underline-offset-5 cursor-pointer" onMouseEnter={closeMegaMenu} href="/about">About</Link>
                        <Link className="hover:underline underline-offset-5 cursor-pointer" onMouseEnter={closeMegaMenu} href="/contact">Contact</Link>
                    </nav>

                    {/* RIGHT ACTIONS */}
                    <div className="flex items-center gap-5 md:gap-6">
                        <Link href="/wishlist" className="relative">
                            <Heart className="h-6 w-6" />
                            <span id="wishlist_count" className="absolute -top-2 -right-2 h-5 w-5 bg-yellow-400 rounded-full text-xs font-bold flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        </Link>

                        <Link href="/cart" className="relative">
                            <ShoppingCartIcon className="h-6 w-6" />
                            <span id="cart_count" className="absolute -top-2 -right-2 h-5 w-5 bg-yellow-400 rounded-full text-xs font-bold flex items-center justify-center">
                                {cartCount}
                            </span>
                        </Link>

                        {isLoggedIn() ? (
                            <div className="relative" ref={menuRef}>
                                <Image
                                    src="/common/user-profile.webp"
                                    alt="User"
                                    width={26}
                                    height={26}
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => setOpenProfileMenu(true)}
                                />

                                {openProfileMenu && loginUserData && (
                                    <div className="absolute right-0 mt-3 w-48 bg-white border shadow-lg rounded-sm overflow-hidden z-50">
                                        <div className="px-4 py-3 border-b bg-gray-100">
                                            <p className="text-base font-medium">
                                                Hi, {`${loginUserData?.first_name} ${loginUserData?.last_name}`}
                                            </p>
                                        </div>

                                        <Link
                                            href="/account"
                                            className="text-base flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                        >
                                            <User2 size={16} />
                                            Profile
                                        </Link>
                                        
                                        <Link
                                            href="/manage-traveller-dna"
                                            className="text-base flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                        >
                                            <Dna size={16} />
                                            My Travel DNA
                                        </Link>

                                        <Link
                                            href="/my_bookings"
                                            className="text-base flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                        >
                                            <ListCheck size={16} />
                                            My Bookings
                                        </Link>

                                        <button
                                            onClick={logout}
                                            className="text-base flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 cursor-pointer text-left"
                                        >
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <User
                                className="h-6 w-6 cursor-pointer"
                                onClick={() => setOpenLogin(true)}
                            />
                        )}

                        <button
                            className="hidden lg:block border border-black px-4 py-2 rounded font-medium hover:bg-black hover:text-white cursor-pointer"
                            onClick={() => setOpenStartJourney(true)}
                        >
                            Start a Journey
                        </button>

                        <button className="lg:hidden" onClick={() => setOpenMobileMenu(true)}>
                            <Menu />
                        </button>
                    </div>
                </div>
            </header>

            {/* ================= MEGA MENU (ONLY PART THAT IS FIXED & CENTERED) ================= */}
            {showMegaMenu && (
                <div
                    className="fixed left-1/2 top-[80px] md:top-[136px] z-[100] w-full max-w-7xl -translate-x-1/2 bg-white border border-gray-200 shadow-xl"
                    onMouseEnter={() => setShowMegaMenu(true)}
                    onMouseLeave={() => setShowMegaMenu(false)}
                >
                    <div className="grid grid-cols-12 gap-8 px-10 py-10">

                        {/* LEFT LINKS */}
                        <div className="col-span-3 space-y-4">
                            <h4 className="text-sm uppercase font-semibold text-black">
                                Trending Destinations
                            </h4>
                            <ul className="space-y-3 font-normal text-black">
                                <li>
                                    <Link href="/country/japan" className="hover:underline">
                                        Japan
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/country/south-korea" className="hover:underline">
                                        South Korea
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link href="/country/indonesia" className="hover:underline">
                                        Indonesia
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/country/vietnam" className="hover:underline">
                                        Vietnam
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/country/thailand" className="hover:underline">
                                        Thailand
                                    </Link>
                                </li> */}
                            </ul>
                            <Link href="/country" className="hover:underline">
                                <button className="bg-black text-white rounded-sm uppercase font-medium border border-black tracking-wide hover:bg-transparent hover:text-black transition cursor-pointer px-4 py-2.5 text-xs">
                                    All Destinations
                                </button>
                            </Link>
                        </div>
                        <div className="col-span-9 grid grid-cols-2 gap-6">
                            {DESTINATIONS.map((place) => (
                                <Link
                                    key={place.title}
                                    href={place.link}
                                    className="relative group overflow-hidden rounded-lg"
                                >
                                    <Image
                                        src={place.image || "/placeholder.svg"}
                                        alt={place.title}
                                        fill
                                        className="h-100 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/10 flex flex-col justify-end p-4">
                                        <span className="text-white font-semibold">
                                            {place.title}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    </div>
                </div>
            )}

            {/* ================= MOBILE MENU ================= */}
            {openMobileMenu && (
                <div className="fixed inset-0 z-[999] bg-white">
                    <div className="h-16 flex justify-between items-center px-4 border-b">
                        <span className="text-xl font-bold">Menu</span>
                        <button onClick={() => setOpenMobileMenu(false)}>
                            <X />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-6 p-6 text-lg font-medium">
                        <Link href="/">Home</Link>
                        <Link href="/country">Collections</Link>
                        <Link href="/tour">Experiences</Link>
                        <Link href="/press">Press</Link>
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>
                    </nav>

                    {isLoggedIn() && <hr className="border border-gray-200" />}

                    {isLoggedIn() && <nav className="flex flex-col gap-6 p-6 text-lg font-medium">
                        <Link className="hover:underline underline-offset-5 cursor-pointer" href="/account">Profile</Link>
                        <Link className="hover:underline underline-offset-5 cursor-pointer" href="/manage-traveller-dna">My Travel DNA</Link>
                        <Link className="hover:underline underline-offset-5 cursor-pointer" href="/my_bookings">My Bookings</Link>
                        <Link
                            onClick={logout}
                            className="hover:underline underline-offset-5 cursor-pointer"
                            href="#"
                        >
                            Logout
                        </Link>
                    </nav>}
                </div>
            )}

            {/* Modal Popup */}
            <LoginModal open={openLogin} onOpenChange={setOpenLogin} />
            <StartJourneyModal open={openStartJourney} onOpenChange={setOpenStartJourney} />
        </>
    );
}

// Get query data
export const getQuery = (key: string, fallback = "") =>
    typeof window === "undefined"
        ? fallback
        : new URLSearchParams(window.location.search).get(key) ?? fallback;