import VerticalSlider from "@/components/home/vertical-marquee";
import Image from "next/image";

interface Props {
    setInitializePersonaModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define images
const images1 = ["/home/slider-img-4.png", "/home/slider-img-4.png"];
const images2 = ["/home/slider-img-3.png", "/home/slider-img-3.png"];

export default function HeroSection({ setInitializePersonaModalOpen }: Props) {
    return (
        <section
            className="relative overflow-hidden border-b border-[#d37300]/30"
            style={{
                backgroundImage: `linear-gradient(rgba(217, 119, 6, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(217, 119, 6, 0.08) 1px, transparent 1px)`,
                backgroundSize: `46px 46px`
            }}
        >
            <div
                className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-0 grid lg:grid-cols-2 gap-10 items-center"
                style={{
                    background: `radial-gradient(70% 60% at 60% 50%, rgba(255, 199, 101, 0.18) 0%, transparent 70%)`,
                }}
            >
                <div className="space-y-6 md:space-y-8 font-dna-landing text-center lg:text-left py-12">
                    {/* Badge */}
                    <div className="inline-block border border-[#d97706]/40 bg-[#d977061a] text-[10px] md:text-xs tracking-[0.2em] px-4 py-1.5 rounded-full text-[#78350f] font-semibold">
                        INTRODUCING TRAVELONE
                    </div>

                    {/* Heading */}
                    <h1 className="font-semibold leading-[1.05] tracking-[-0.01em] text-[36px] sm:text-[50px] md:text-[60px] lg:text-[84px]">
                        <span className="block text-[#78350f]">STOP</span>
                        <span className="block text-[#78350f]">SEARCHING.</span>
                        <span className="block text-[#d97706] mt-2">START BEING</span>
                        <span className="block text-[#d97706]">FOUND.</span>
                    </h1>

                    {/* Description */}
                    <p className="text-[14px] md:text-lg text-[#78350f] leading-[1.7] max-w-md mx-auto lg:mx-0">
                        The Intelligence Layer the travel industry has been missing. We are moving the world from Reactive Search to Predictive Intelligence.
                    </p>

                    {/* CTA */}
                    <button
                        onClick={() => setInitializePersonaModalOpen(true)}
                        className="w-full sm:w-auto bg-[#78350f] text-white text-sm tracking-[0.08em] px-7 py-3 md:py-4 rounded-md font-semibold hover:opacity-90 transition-all cursor-pointer"
                    >
                        DECODE YOUR TRAVEL DNA
                    </button>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative flex justify-center lg:justify-end mt-10 lg:mt-0" >
                    {/* <div
                        className="w-full max-w-[420px] md:max-w-[600px] md:h-[600px] aspect-[3/4] md:aspect-auto overflow-hidden rounded-t-[180px] md:rounded-t-[300px] rounded-b-[24px]"
                        style={{
                            background: `radial-gradient(70% 60% at 50% 80%, rgba(217, 119, 6, 0.18) 0%, transparent 70%)`,
                            border: `2px solid rgba(217, 119, 6, 0.25)`,
                        }}
                    >
                        <Image
                            src="/traveler-dna/hero_new_ef65def1.jpg"
                            alt="Travel"
                            width={600}
                            height={600}
                            draggable={false}
                            className="w-full h-full object-cover"
                        />
                    </div> */}
                    <div className="flex flex-1 gap-8 lg:gap-10 justify-center">
                        <div className="relative w-full h-screen overflow-hidden">
                            <div className="flex flex-col">
                                {[...images1, ...images1].map((src, i) => (
                                    <Image
                                        key={i}
                                        src={src}
                                        alt="Image"
                                        width={300}
                                        height={350}
                                        className="w-full object-cover"
                                        priority
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="relative w-full h-screen overflow-hidden">
                            <div className="flex flex-col">
                                {[...images2, ...images2].map((src, i) => (
                                    <Image
                                        key={i}
                                        src={src}
                                        alt="Image"
                                        width={300}
                                        height={350}
                                        className="w-full object-cover"
                                        priority
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}