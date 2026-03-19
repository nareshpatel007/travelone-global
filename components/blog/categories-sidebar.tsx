"use client";

import Image from "next/image";

const categories = [
    { name: "Cultures", image: "" },
    { name: "Explore", image: "" },
    { name: "Summer", image: "" },
    { name: "Food", image: "" },
    { name: "Tropical", image: "" },
    { name: "Adventure", image: "" },
];

export default function CategoriesSidebar() {
    return (
        <div className="space-y-5">
            <span className="font-semibold text-xl text-gray-900 block">
                Categories
            </span>
            <div className="flex flex-col space-y-4">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 bg-gray-200/70 hover:bg-gray-300 transition-all duration-300 p-1 rounded-full cursor-pointer"
                    >
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image
                                src={category.image || "/placeholder.svg"}
                                alt={category.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="text-sm md:text-base font-medium text-black">
                            {category.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
