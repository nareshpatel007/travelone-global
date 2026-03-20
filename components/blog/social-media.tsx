"use client";

import { Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";

// Define social media
const socials = [
    { name: "Youtube", link: "https://www.youtube.com/@traveloneio", icon: Youtube },
    { name: "Instagram", link: "https://www.instagram.com/travelone.global", icon: Instagram },
    // { name: "Linkedin", link: "https://www.linkedin.com/company/traveloneio/", icon: Linkedin },
];

export default function FollowSection() {
    return (
        <div className="space-y-5">
            <span className="font-semibold text-xl text-gray-900 block">
                Follow Us
            </span>
            <div className="grid grid-cols-3 gap-4">
                {socials.map((social, index) => {
                    const Icon = social.icon;
                    return (
                        <div
                            key={index}
                            className="bg-[#dfe5df] hover:bg-[#cfd8cf] transition-all duration-300 p-5 cursor-pointer"
                        >
                            <Link target="_blank" className="flex flex-col items-center justify-center" rel="nofollow" href={social.link}>
                                <Icon className="text-[#3d5a2b] text-xl mb-3" />
                                <span className="text-[11px] tracking-widest uppercase text-[#3d5a2b] font-medium">
                                    {social.name}
                                </span>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
