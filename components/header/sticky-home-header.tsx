'use client'

import { Dna, Heart, ListCheck, LogOut, ShoppingCartIcon, User, User2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { LoginModal } from '../common/login-modal';
import { getCartData, getLoginCookie, getWishlistCount, isLoggedIn, removeLoginCookie } from '@/lib/auth';
import { useRouter } from "next/navigation";
import { InitializePersonaModal } from '../plan_your_trip/initialize-persona';
import { CustomizeTrip } from '../tour_details/popup/customize-trip';
import { StartJourneyModal } from '../plan_your_trip/journey-popup';

export default function StickyHomeHeader() {
    // Define route
    const router = useRouter();

    // Define state
    const [showStickyFooter, setShowStickyFooter] = useState(false);
    const [openPlanYourTripModel, setOpenPlanYourTripModel] = useState(false);
    const [openInitializePersonaModel, setOpenInitializePersonaModel] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    const [openCustomizeTripPopup, setOpenCustomizeTripPopup] = useState(false);

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

    useEffect(() => {
        const toggleVisibility = () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            setShowStickyFooter(scrollPercentage > 2);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Define ref
    const menuRef = useRef<HTMLDivElement>(null);

    // Get user data
    const loginUserData = isLoggedIn() ? getLoginCookie() : null;

    // Define count
    const wishlistCount = getWishlistCount();
    const cartCount = getCartData() ? 1 : 0;

    // Handle Logout
    const logout = async () => {
        removeLoginCookie();
        setOpenProfileMenu(false);
        router.push("/");
    };

    return (
        <>
            {showStickyFooter && (
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-black z-50">
                    <div className="hidden md:flex max-w-7xl mx-auto py-3 items-center justify-between">
                        <div className="flex items-center gap-8">
                            <span className="text-black text-base font-medium">
                                <Link className="hover:underline" href="mailto:connect@traveloneglobal.com">connect@traveloneglobal.com</Link> | <Link className="hover:underline" href="tel:+17032003901">+1 703 200 3901</Link>
                            </span>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="flex items-center gap-6">
                            <Link href="/wishlist" className="relative">
                                <Heart className="h-6 w-6" />
                                <span className="absolute -top-2 -right-2 h-5 w-5 bg-yellow-400 rounded-full text-xs font-bold flex items-center justify-center">
                                    {wishlistCount || 0}
                                </span>
                            </Link>

                            <Link href="/cart" className="relative">
                                <ShoppingCartIcon className="h-6 w-6" />
                                <span className="absolute -top-2 -right-2 h-5 w-5 bg-yellow-400 rounded-full text-xs font-bold flex items-center justify-center">
                                    {cartCount || 0}
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
                                        <div className="absolute right-0 -mt-53 w-48 bg-white border shadow-lg rounded-sm overflow-hidden z-50">
                                            <div className="px-4 py-3 border-b bg-gray-100">
                                                <p className="text-base font-medium">
                                                    Hi, {`${loginUserData.first_name} ${loginUserData.last_name}`}
                                                </p>
                                            </div>

                                            <Link
                                                href="/account"
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                            >
                                                <User2 size={16} />
                                                Profile
                                            </Link>

                                            <Link
                                                href="/manage-traveller-dna"
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                            >
                                                <Dna size={16} />
                                                My Travel DNA
                                            </Link>

                                            <Link
                                                href="/my_bookings"
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                            >
                                                <ListCheck size={16} />
                                                My Bookings
                                            </Link>

                                            <button
                                                onClick={logout}
                                                className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 cursor-pointer text-left"
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

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setOpenInitializePersonaModel(true)}
                                    className="bg-black text-white px-4 py-2 text-base border border-black tracking-wide font-medium hover:bg-transparent hover:text-black transition cursor-pointer"
                                >
                                    Decode Your DNA
                                </button>

                                <button
                                    onClick={() => setOpenPlanYourTripModel(true)}
                                    className="border border-black text-black px-4 py-2 text-base tracking-wide font-medium hover:bg-black hover:text-white transition cursor-pointer"
                                >
                                    Start a Journey
                                </button>

                                <button
                                    onClick={() => setOpenCustomizeTripPopup(true)}
                                    className="border border-black text-black px-4 py-2 text-base tracking-wide font-medium hover:bg-black hover:text-white transition cursor-pointer"
                                >
                                    Request a Quote
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= MODALS ================= */}
            <LoginModal open={openLogin} onOpenChange={setOpenLogin} />
            <StartJourneyModal open={openPlanYourTripModel} onOpenChange={setOpenPlanYourTripModel} />
            <InitializePersonaModal open={openInitializePersonaModel} onOpenChange={setOpenInitializePersonaModel} />
            <CustomizeTrip
                open={openCustomizeTripPopup}
                onOpenChange={setOpenCustomizeTripPopup}
                mainTitle="Request a Quote"
                subTitle="We can help you find the right trip for your needs."
                pageName="Homepage"
            />
        </>
    );
}