"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

// Define Props
interface Props {
    tour: any;
    videos: any;
}

export default function VideoHeroSection({ tour, videos }: Props) {
    // Validation
    if (!tour?.featured_image || !videos || !Array.isArray(videos) || videos.length === 0) return null;

    // Define state
    const [open, setOpen] = useState(false);

    // Filter valid YouTube video IDs
    const fetchVideoId = (url: string) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    return (
        <>
            <section id="Video" className="relative w-full h-[30vh] md:h-[60vh] overflow-hidden">
                <Image
                    src={tour?.featured_image}
                    alt="Travel experience"
                    fill
                    priority
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/40" />

                <button
                    onClick={() => setOpen(true)}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    aria-label="Play Video"
                >
                    <span className="relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#d9eed8] hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 md:w-10 md:h-10 text-black ml-1" />
                    </span>
                </button>
            </section>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
                    <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 z-10 bg-red-500 text-white rounded-full p-2 hover:scale-110 transition cursor-pointer"
                        >
                            <X size={18} />
                        </button>

                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${fetchVideoId(videos[0])}?autoplay=1`}
                            title="Travel Video"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </>
    );
}
