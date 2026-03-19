"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
    data: any;
    index: number;
};

export default function PressSingleCard({ data, index }: Props) {
    // Check if index is even
    const isEven = index % 2 === 0;

    return (
        <section className="w-full bg-white border border-[#d9cec1] mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                <div className={`bg-[#FFF9EE] relative h-[520px] w-full ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative shadow-md rounded overflow-hidden bg-white">
                            <Image
                                src={data?.mainImage || "/placeholder.svg"}
                                alt="Media Banner"
                                width={700}
                                height={350}
                                draggable="false"
                                className="object-cover"
                            />

                            <div className="absolute bottom-5 right-5">
                                <Image
                                    src={data?.logoImage || "/placeholder.svg"}
                                    alt="Tenerife"
                                    width={data?.mainImageWidth || 200}
                                    height={100}
                                    draggable="false"
                                    className="object-cover rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`max-w-3xl space-y-6 p-8 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <p className="text-4xl text-black">
                        {data?.cardTitle}
                    </p>

                    <h2 className="text-3xl font-normal leading-tight">
                        {data?.headline}
                    </h2>

                    <p className="text-black text-base">
                        "{data?.snippet}"
                    </p>

                    <Link href={data?.link || "#"} target="_blank">
                        <button className="flex items-center gap-2 bg-black border border-black text-base text-white px-6 py-2 rounded font-medium hover:bg-white hover:text-black transition cursor-pointer">
                            Read Full Article <ExternalLink className="w-5 h-5" />
                        </button>
                    </Link>

                    <p className="text-base max-w-3xl">
                        Showcasing the global innovation developed at our Toronto-based B2B Research & Development Hub.
                    </p>
                </div>
            </div>
        </section>
    );
}