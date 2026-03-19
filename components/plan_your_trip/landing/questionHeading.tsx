"use client";

interface Props {
    title: string;
    subtitle?: string;
}

export default function QuestionHeading({ title, subtitle }: Props) {
    return (
        <div className="text-center py-5">
            <h2 className="text-[30px] px-2 pt-15 font-[500] block mb-3">{title}</h2>
            {subtitle && <span className="text-md md:text-md mt-2">{subtitle}</span>}
        </div>
    );
}