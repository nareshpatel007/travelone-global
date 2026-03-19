"use client";

// Define inferface
interface Props {
    pageData: any;
}

export default function IntroSection({ pageData }: Props) {
    // Validation
    if (!pageData?.single?.extra_data?.first_desc_title && !pageData?.single?.extra_data?.first_desc) return null;

    return (
        <section className="max-w-7xl md:max-w-5xl mx-auto px-5 md:px-0 py-12">
            <div className="text-center space-y-8">
                {/* Heading */}
                <h2 className="text-black text-3xl md:text-6xl leading-tight font-normal">
                    {pageData?.single?.extra_data?.first_desc_title}
                </h2>

                {/* Underline */}
                {pageData?.single?.extra_data?.first_desc && <div className="flex justify-center">
                    <span className="w-20 h-1 bg-black" />
                </div>}

                {/* Description */}
                <p className="text-base sm:text-lg text-black leading-relaxed">
                    {pageData?.single?.extra_data?.first_desc}
                </p>
            </div>
        </section>
    );
}