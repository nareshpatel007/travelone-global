import { getLoginCookie, isLoggedIn, removeLoginCookie } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { LoginModal } from "../common/login-modal";
import { useEffect, useRef, useState } from "react";
import { Dna, ListCheck, LogOut, User, User2, UserCircle, UserCircle2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

// components/Header.tsx
export default function HomeHeader() {
    // Define route
    const router = useRouter();

    // Define state
    const [openLogin, setOpenLogin] = useState(false);
    const [openProfileMenu, setOpenProfileMenu] = useState(false);

    // Define ref
    const menuRef = useRef<HTMLDivElement>(null);

    // Get login data
    const is_login_user = isLoggedIn();
    const loginUserData = is_login_user ? getLoginCookie() : null;

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

    return (
        <>
            <div className="hidden md:flex lg:flex px-4 md:px-8 h-20 md:h-24 items-center space-x-7">
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
                <nav className="hidden lg:flex items-center gap-5 font-medium text-gray-900">
                    <Link className="hover:underline underline-offset-5 cursor-pointer" href="/country">Collections</Link>
                    <Link className="hover:underline underline-offset-5 cursor-pointer" href="/tour">Experiences</Link>
                    {/* <Link className="hover:underline underline-offset-5 cursor-pointer" href="/intelligence">
                        Persona-Led Travel
                    </Link> */}
                    <Link className="hover:underline underline-offset-5 cursor-pointer" href="/press">
                        Press
                    </Link>
                    <Link className="hover:underline underline-offset-5 cursor-pointer" href="/about">
                        About
                    </Link>
                    <Link className="hover:underline underline-offset-5 cursor-pointer" href="/contact">
                        Contact
                    </Link>

                    {!is_login_user && <Link onClick={() => setOpenLogin(true)} className="hover:underline underline-offset-5 cursor-pointer" href="#">Login</Link>}

                    {is_login_user && <div className="relative" ref={menuRef}>
                        <Link
                            className="hover:underline underline-offset-5 cursor-pointer"
                            href="#"
                            onClick={() => setOpenProfileMenu(true)}
                        >
                            <UserCircle2Icon className="w-6 h-6" />
                        </Link>

                        {openProfileMenu && loginUserData && (
                            <div className="absolute right-0 mt-3 w-48 bg-white border shadow-lg rounded-sm overflow-hidden z-50">
                                <div className="px-4 py-3 border-b bg-gray-100">
                                    <p className="text-base font-medium">
                                        Hi, {`${loginUserData.first_name} ${loginUserData.last_name}`}
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
                    </div>}
                </nav>
            </div>

            <LoginModal open={openLogin} onOpenChange={setOpenLogin} />
        </>
    );
}
