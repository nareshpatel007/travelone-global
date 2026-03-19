"use client";

import { Loader2, Search } from "lucide-react";

interface Post {
    id: number;
    title: string;
    category: string;
}

interface Props {
    isPageLoading: boolean;
    searchKeyword: string;
    setSearchKeyword: (keyword: string) => void;
    searchCategory: string;
    setSearchCategory: (category: string) => void;
}

export default function SearchFilter({ isPageLoading = false, searchKeyword, setSearchKeyword, searchCategory, setSearchCategory }: Props) {
    return (
        <div className="w-full flex flex-row items-center gap-4">
            <div className="flex items-center gap-2 border border-black px-3 py-2 rounded-sm w-full">
                {isPageLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                {!isPageLoading && <Search className="w-5 h-5 text-gray-400" />}
                <input
                    type="text"
                    placeholder="Search by keyword ..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="bg-transparent outline-none w-full"
                />
            </div>
        </div>
    );
}
