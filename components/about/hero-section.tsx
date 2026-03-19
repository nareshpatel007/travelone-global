import Image from "next/image";

export default function HeroSection() {
    return (
        <div className="relative h-[300px] md:h-[450px] overflow-hidden">
            <Image
                src="/about/USA-Banner.jpg"
                alt="TravelOne USA"
                fill
                className="object-cover"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 flex max-w-5xl mx-auto px-10 md:px-0 items-center justify-center">
                <div className="text-center text-white space-y-2">
                    <h1 className="text-3xl md:text-6xl leading-tight font-normal">
                        The Global Standard for Persona-Led Travel Orchestration.
                    </h1>
                    <span className="text-md flex max-w-2xl mx-auto">
                        We are a technology-driven travel ecosystem that records Traveler DNA to deliver 100% synchronized global journeys.
                    </span>
                </div>
            </div>
        </div>
    );
}
