import Image from "next/image";

export default function HeroSection() {
    return (
        <div className="relative h-[350px] md:h-[350px] overflow-hidden bg-[#FFF9EE]">
            <div className="absolute inset-0 flex max-w-5xl mx-auto px-10 md:px-0 items-center justify-center">
                <div className="text-center text-black space-y-2">
                    <h1 className="text-3xl md:text-6xl leading-tight font-normal">
                        The Global Standard for Persona-Led Intelligence.
                    </h1>
                    <span className="text-md flex max-w-2xl mx-auto">
                        We are a technology-driven ecosystem that architects Traveler DNA to power synchronized global journeys for the U.S. and international markets.
                    </span>
                </div>
            </div>
        </div>
    );
}
