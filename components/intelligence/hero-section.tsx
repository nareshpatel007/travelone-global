import Image from "next/image";

export default function HeroSection() {
    return (
        <div className="relative h-[300px] md:h-[450px] overflow-hidden">
            <Image
                src="https://ik.imagekit.io/288weifiq/nextjs/25099.jpg"
                alt="Travel Experience"
                fill
                className="object-cover"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 flex max-w-5xl mx-auto px-10 md:px-0 items-center justify-center">
                <div className="text-center text-white space-y-2">
                    <h1 className="text-3xl md:text-6xl leading-tight font-normal">
                        Beyond Search. Into Sync.
                    </h1>
                    <span className="text-md flex max-w-2xl mx-auto">
                        The industry is built on "search results." TravelOne is built on Synchronization. We don't ask you where you want to go; we understand who you are, and the world aligns to meet you.
                    </span>
                </div>
            </div>
        </div>
    );
}
