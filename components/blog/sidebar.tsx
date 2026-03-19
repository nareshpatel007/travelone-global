"use client"

import AuthorSidebar from "./author-sidebar";
import RecentPostsSidebar from "./recent-posts";
import PopularTours from "./popular-tours";
import CategoriesSidebar from "./categories-sidebar";
import FollowSection from "./social-media";

// Define props
interface Props {
    recentPosts: any;
    popularTours: any;
}

export function BlogSidebar({ recentPosts, popularTours }: Props) {
    return (
        <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
            <AuthorSidebar />
            {/* <CategoriesSidebar /> */}
            <RecentPostsSidebar posts={recentPosts} />
            <PopularTours tours={popularTours} />
            <FollowSection />
        </div>
    )
}
