// Define props
interface Props {
    main: string;
    sub?: string;
    marginBottom?: string;
    align?: string;
}

export default function Heading({ main, sub, align = 'text-center' }: Props) {
    return (
        <div className={`${align} space-y-2 mb-3 md:mb-5 px-4`}>
            <h1 className="text-black text-5xl md:text-6xl leading-tight font-normal">
                {main}
            </h1>
            <p className="text-gray-600 text-sm text-base max-w-2xl mx-auto mt-3 sm:mt-4">
                {sub}
            </p>
        </div>
    );
}
