// Define Props
interface Props {
    data: any;
}

export default function HeroContent({ data }: Props) {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-0 py-10 sm:py-14 md:py-16">
            <div className="text-center space-y-5 sm:space-y-6 md:space-y-8">
                <p className="text-base md:text-lg text-gray-800 leading-relaxed max-w-5xl mx-auto">
                    {data?.paragraph1}
                </p>
                
                <p className="text-base md:text-lg text-gray-800 leading-relaxed max-w-5xl mx-auto">
                    {data?.paragraph2}
                </p>
            </div>
        </section>
    );
}