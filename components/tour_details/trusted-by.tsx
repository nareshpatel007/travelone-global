"use client"

import Image from "next/image";
import Link from "next/link";

// Define Props
interface Props {
    isAdsLanding?: boolean;
}

export default function TrustedBy({ isAdsLanding }: Props) {
    return (
        <div className="w-full py-12 px-5 md:px-0 space-y-8 md:space-y-12">
            <div className="text-center max-w-4xl mx-auto space-y-1">
                <h2 className="text-black text-3xl md:text-6xl leading-tight font-normal">
                    Trusted By
                </h2>
                <span className="text-base md:text-lg text-black">
                    We are trusted by leading organizations. Global operations managed by ASTA and ACTA-registered industry professionals.
                </span>
            </div>

            {/* Non Ads Landing */}
            {!isAdsLanding && <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
                <Link href="/partnership/ASTA.pdf" target="_blank">
                    <Image
                        src="/common/ASTA-Logo.png"
                        alt="TICO"
                        width={160}
                        height={80}
                        draggable="false"
                        className="object-contain h-auto w-20 md:w-26"
                    />
                </Link>

                <Image
                    src="https://ik.imagekit.io/288weifiq/logo/viator.png"
                    alt="TICO"
                    width={160}
                    height={80}
                    draggable="false"
                    className="object-contain h-auto w-20 md:w-36"
                />

                {/* <Link href="/partnership/ACTA-License.jpeg" target="_blank">
                    <Image
                        src="/common/acta-logo.webp"
                        alt="ACTA"
                        width={160}
                        height={80}
                        draggable="false"
                        className="object-contain h-auto w-20 md:w-36"
                    />
                </Link> */}
            </div>}

            {/* Ads Landing */}
            {isAdsLanding && <>
                <div className="md:hidden grid grid-cols-1 gap-10 items-center justify-center place-items-center">
                    <Image
                        src="/common/ASTA-Logo.png"
                        alt="TICO"
                        width={160}
                        height={80}
                        draggable="false"
                        className="object-contain h-auto w-30"
                    />

                    {/* <Image
                        src="/common/acta-logo.webp"
                        alt="ACTA"
                        width={160}
                        height={80}
                        draggable="false"
                        className="object-contain h-auto w-36"
                    /> */}
                </div>
                <div className="hidden md:flex justify-center items-center gap-12">
                    <Image
                        src="/common/ASTA-Logo.png"
                        alt="TICO"
                        width={160}
                        height={80}
                        draggable="false"
                        className="object-contain h-auto w-30"
                    />

                    <Image
                        src="https://ik.imagekit.io/288weifiq/logo/viator.png"
                        alt="TICO"
                        width={160}
                        height={80}
                        draggable="false"
                        className="object-contain h-auto w-36"
                    />

                    {/* <Image
                        src="/common/acta-logo.webp"
                        alt="ACTA"
                        width={160}
                        height={80}
                        draggable="false"
                        className="object-contain h-auto w-36"
                    /> */}
                </div>
            </>}
        </div>
    )
}
