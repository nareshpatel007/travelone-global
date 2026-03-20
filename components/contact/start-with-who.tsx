"use client";

import Image from "next/image";
import Link from "next/link";

export default function StartWithWho() {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-[#FFF9EE] flex items-center px-6 py-10 md:py-0">
                <div className="text-center space-y-10">
                    <p className="text-black text-base md:text-xl">
                        Global travel fulfilment is managed by ASTA-registered industry professionals from TravelOne Global Travel Services LLC.
                    </p>
                    <div className="flex flex-wrap justify-center items-center text-center gap-10 md:gap-20">
                        <Link href="/partnership/ASTA.pdf" target="_blank">
                            <Image
                                src="/common/ASTA-Logo.png"
                                alt="TICO"
                                width={160}
                                height={80}
                                draggable="false"
                                className="object-contain h-auto w-25 md:w-50"
                            />
                        </Link>

                        {/* <Link href="/partnership/ACTA-License.jpeg" target="_blank">
                            <Image
                                src="/common/acta-logo.webp"
                                alt="ACTA"
                                width={160}
                                height={80}
                                draggable="false"
                                className="object-contain h-auto w-40 md:w-80"
                            />
                        </Link> */}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="relative w-full h-80 md:h-150 overflow-hidden">
                    <Image
                        src="https://ik.imagekit.io/288weifiq/nextjs/front-view-young-man-summer-vacation-taking-photos-with-camera-pink-wall_140725-113208.jpg"
                        alt="Canada USA Flag"
                        fill
                        priority
                        className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                </div>
            </div>
        </section>
    );
}