"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoginModal } from "../common/login-modal";
import { Menu, ShoppingCartIcon, User, X } from "lucide-react";
import { isLoggedIn, removeLoginCookie } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function HomeMobileHeader() {
    // Define route
    const router = useRouter();

    // Define state
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

    // Define cart count
    const cartCount = 0;

    // Get login data
    const is_login_user = isLoggedIn();

    useEffect(() => {
        document.body.style.overflow = openMobileMenu ? "hidden" : "auto";
    }, [openMobileMenu]);

    // Handle Logout
    const logout = async () => {
        removeLoginCookie();
        router.push("/");
    };

    return (
        <>
            <header className="sticky block md:hidden lg:hidden top-0 z-50 bg-[#fff9ee]">
                <div className="px-4 md:px-8 h-20 md:h-24 flex items-center justify-between">
                    <Link href="/">
                        <Image
                            src="https://ik.imagekit.io/288weifiq/nextjs/logo.webp"
                            alt="Logo"
                            width={160}
                            height={100}
                            draggable="false"
                        />
                    </Link>
                    <div className="flex items-center gap-5">
                        {/* <Link href="/cart" className="relative">
                            <ShoppingCartIcon className="h-6 w-6" />
                            <span className="absolute -top-2 -right-2 h-5 w-5 bg-yellow-400 rounded-full text-xs font-bold flex items-center justify-center">
                                {cartCount}
                            </span>
                        </Link> */}

                        {!is_login_user && <User className="h-6 w-6 cursor-pointer" onClick={() => setOpenLogin(true)} />}

                        <button onClick={() => setOpenMobileMenu(true)}>
                            <Menu />
                        </button>
                    </div>
                </div>
            </header>

            {openMobileMenu && (
                <div className="fixed inset-0 z-[999] bg-white">
                    <div className="h-16 flex justify-between items-center px-4 border-b">
                        <span className="text-xl font-bold">
                            Menu
                        </span>
                        <button onClick={() => setOpenMobileMenu(false)}>
                            <X />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-6 p-6 text-lg font-medium">
                        <Link href="/">Home</Link>
                        {/* <Link href="/country">Collections</Link> */}
                        {/* <Link href="/tour">Experiences</Link> */}
                        <Link href="/intelligence">Science of Persona-Led Travel</Link>
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>
                        {!is_login_user && <Link onClick={() => setOpenLogin(true)} className="hover:underline underline-offset-5 cursor-pointer" href="#">Login</Link>}
                    </nav>

                    {is_login_user && <hr className="border border-gray-200" />}

                    {is_login_user && <nav className="flex flex-col gap-6 p-6 text-lg font-medium">
                        <Link className="hover:underline underline-offset-5 cursor-pointer" href="/account">Profile</Link>
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

            <LoginModal open={openLogin} onOpenChange={setOpenLogin} />
        </>
    );
}
