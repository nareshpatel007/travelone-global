import Image from "next/image";
import Link from "next/link";

// Define Props
interface Props {
    bgColor?: string;
}

export default function EconomicTimesSection({ bgColor }: Props) {
    return (
        <div className={`relative w-full h-100 md:h-120 ${bgColor || "bg-[#FFF9EE]"} overflow-hidden`}>
            <div className="relative h-full flex items-center justify-center px-5 md:px-0">
                <div className="text-center text-black space-y-9 flex flex-col items-center">
                    <div className="space-y-3">
                        <h2 className="text-3xl md:text-6xl leading-tight font-normal">
                            As Seen In: The Economic Times
                        </h2>

                        <p className="text-base md:text-xl max-w-3xl">
                            "TravelOne is shifting the $1.6B market from mechanical OTAs to AI-driven DNA intuition." — ET TravelWorld
                        </p>
                    </div>

                    <Image
                        src="/common/et-travelworld.svg"
                        alt="ET TravelWorld"
                        width={200}
                        height={100}
                        draggable="false"
                        className="object-contain h-auto w-40 md:w-80 mx-auto"
                    />

                    <div className="space-y-3">
                        <Link
                            href="https://travel.economictimes.indiatimes.com/news/technology/travelone-technologies-launches-ai-driven-global-traveller-dna-platform-in-1659b-market/128960290?utm_source=top_news&utm_medium=tagListing"
                            target="_blank"
                            rel="nofollow"
                        >
                            <button className="px-5 py-2 bg-black text-md text-white cursor-pointer hover:bg-white hover:text-black border border-black transition">
                                Read Full Story
                            </button>
                        </Link>

                        <p className="text-xs mt-5 text-black">
                            Showcasing the global innovation developed at our Toronto-based B2B Research & Development Hub.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
