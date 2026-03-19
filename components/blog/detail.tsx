"use client"

import { FacebookIcon, TwitterIcon, InstagramIcon, ArrowRight, Loader2, CheckCircle } from "lucide-react"
import { BlogSidebar } from "./sidebar"
import Image from "next/image"
import { useState } from "react"
import { formatDate } from "@/lib/utils"

// Define interface
interface Props {
    blogPost: any;
    recentPosts: any;
    popularTours: any;
    commentData: any;
}

// Define comment form
const initCommentForm = {
    name: "",
    email: "",
    comment: ""
};

export function BlogDetail({ blogPost, recentPosts, popularTours, commentData }: Props) {
    // Define state
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [carouselRef, setCarouselRef] = useState<HTMLDivElement | null>(null);
    const [isFormLoading, setIsFormLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState(initCommentForm);
    const [errors, setErrors] = useState("");

    // Next slider navigation
    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % blogPost.gallery.length);
    }

    // Previous slider navigation
    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + blogPost.gallery.length) % blogPost.gallery.length);
    }

    // Handle comment submit
    const handleCommentSubmit = async () => {
        // Check validation
        if (!formData.name || !formData.email || !formData.comment) {
            setErrors("All fields are required.");
            return;
        }

        // Update state
        setIsFormLoading(true);
        setErrors("");

        try {
            // Fetch the data
            const response = await fetch("/api/blog/post_comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    post_id: blogPost.id,
                    name: formData.name,
                    email: formData.email,
                    comment: formData.comment
                }),
            });

            // Parse the JSON response
            const data = await response.json();

            // Check response
            if (data.status) {
                // Update state
                setIsSubmitted(true);
                setFormData(initCommentForm);
                setErrors("");
            } else {
                // Update state
                setErrors(data.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            // Set error
            setErrors("Something went wrong. Please try again.");
        } finally {
            // Update state
            setIsFormLoading(false);
        }
    }

    // Scroll carousel
    const scrollCarousel = (direction: "left" | "right") => {
        if (carouselRef) {
            const scrollAmount = 250
            const newScroll = carouselRef.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount)
            carouselRef.scrollTo({ left: newScroll, behavior: "smooth" })
        }
    }

    return (
        <>
            {/* <section className="w-full bg-white mb-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 gap-6 md:gap-8">
                        <Link href="/blog/hidden-beaches" className="group relative h-64 md:h-100 rounded-lg overflow-hidden">
                            <Image
                                src="https://wanderaway.qodeinteractive.com/wp-content/uploads/2023/08/Destination-list-3.jpg"
                                alt="Featured: Hidden Beach Gems"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                                    Jordan's ancient Petra and desert landscapes
                                </h3>
                            </div>
                        </Link>
                        <Link href="/blog/budget-travel-tips" className="group relative h-64 md:h-100 rounded-lg overflow-hidden">
                            <Image
                                src="https://wanderaway.qodeinteractive.com/wp-content/uploads/2023/08/Destination-list-9.jpg"
                                alt="Featured: Budget Travel Tips"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                                    Cappadocia's surreal landscapes and hot air
                                </h3>
                            </div>
                        </Link>
                    </div>
                </div>
            </section> */}

            <div className="flex flex-col lg:flex-row gap-6">
                <article className="flex-1 space-y-6">
                    <div className="relative w-full h-70 md:h-[500px] bg-gray-200 overflow-hidden">
                        <Image
                            src={blogPost.featured_image || "/placeholder.svg"}
                            alt={blogPost?.meta_title || "Blog featured"}
                            fill
                            draggable="false"
                            className="object-cover"
                            priority
                        />

                        <div className="absolute bottom-4 right-4 flex items-center justify-center">
                            <span className="text-xs md:text-sm font-medium text-black bg-white px-4 py-1">
                                Published on {formatDate(blogPost.created_at)}
                            </span>
                        </div>

                        {/* <Image
                            src={blogPost.gallery[currentImageIndex] || "/placeholder.svg"}
                            alt="Blog featured"
                            fill
                            className="object-cover"
                            priority
                        /> */}
                        {/* <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
                        >
                            <ChevronLeft size={24} className="text-gray-900" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
                        >
                            <ChevronRight size={24} className="text-gray-900" />
                        </button> */}

                        {/* Dot Indicators */}
                        {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {blogPost.gallery.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-3 h-1 rounded-full transition-all ${index === currentImageIndex ? "bg-amber-500 w-8" : "bg-white/60 hover:bg-white"
                                        }`}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div> */}
                    </div>

                    <div className="space-y-4">
                        {/* <span className="text-lg md:text-4xl font-semibold text-gray-900 block">{blogPost.post_title}</span> */}

                        <div
                            className="single_blog_content text-sm md:text-lg font-strong text-gray-900 block"
                            dangerouslySetInnerHTML={{ __html: blogPost.post_content.replace("```html", "").replace("```", "") }}
                        />
                    </div>

                    {/* <div className="my-7 text-center">
                        <div className="flex flex-wrap gap-5 justify-center">
                            <FacebookIcon className="h-6 w-6" />
                            <TwitterIcon className="h-6 w-6" />
                            <InstagramIcon className="h-6 w-6" />
                        </div>
                    </div> */}

                    {/* <div className="mt-8 py-4 border-t border-b border-gray-200 text-center">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {["Europe", "Travel Tips", "Hidden Gems", "Adventure", "Budget Travel"].map((tag) => (
                                <span
                                    key={tag}
                                    className="!px-3 !py-1 !bg-gray-100 !text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div> */}

                    <div className="bg-[#edf3ed] p-5 md:p-10 rounded-sm">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 text-center md:text-left">
                            <Image
                                src="/common/bella_pic.png"
                                alt="TravelOne"
                                width={200}
                                height={200}
                                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover"
                            />
                            <div className="space-y-3">
                                <span className="font-semibold text-black block text-base sm:text-lg">
                                    About TravelOne
                                </span>

                                <p className="text-black text-sm md:text-base leading-relaxed">
                                    Louise Berg is a passionate traveler and writer with over 10 years of experience exploring hidden corners
                                    of the world. She specializes in off-the-beaten-path destinations and sustainable travel practices.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* <div className="py-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {tours.map((tour) => (
                                <TourCard key={tour.id} {...tour} />
                            ))}
                        </div>
                    </div> */}

                    {commentData && commentData.length > 0 && <>
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Comments</h2>
                        <div className="space-y-6">
                            {commentData.map((comment: any, index: number) => (
                                <div key={index} className="flex gap-4 pb-6 border-b border-gray-100">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 relative rounded-full overflow-hidden bg-gray-200">
                                            <Image
                                                src={comment.avatar || "https://ik.imagekit.io/288weifiq/nextjs/avatar.png"}
                                                alt={comment.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <h3 className="font-bold text-gray-900">{comment.name}</h3>
                                                <p className="text-sm text-gray-500">{formatDate(comment.created_at)}</p>
                                            </div>
                                            {/* <button className="flex items-center gap-1 text-black hover:text-gray-900 cursor-pointer text-sm font-semibold">
                                                Reply <ArrowRight size={16} />
                                            </button> */}
                                        </div>
                                        <p className="text-gray-700">{comment.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>}

                    <div className="bg-white py-5 sm:py-8 space-y-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                            Leave a Reply
                        </h2>

                        <p className="text-sm md:text-base text-black">
                            Your email address will not be published. Required fields are marked{" "}
                            <span className="text-red-600">*</span>
                        </p>

                        <div className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm md:text-base font-semibold text-gray-900 mb-2"
                                    >
                                        Your Name <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        required
                                        placeholder="Your Name"
                                        className="w-full px-4 py-3 text-sm sm:text-base border border-black rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm md:text-base font-semibold text-gray-900 mb-2"
                                    >
                                        Your Email <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        required
                                        placeholder="Your Email"
                                        className="w-full px-4 py-3 text-sm sm:text-base border border-black rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                                    />
                                </div>
                            </div>

                            {/* COMMENT */}
                            <div>
                                <label
                                    htmlFor="comment"
                                    className="block text-sm md:text-base font-semibold text-gray-900 mb-2"
                                >
                                    Your Comment <span className="text-red-600">*</span>
                                </label>
                                <textarea
                                    id="comment"
                                    value={formData.comment}
                                    onChange={(e) =>
                                        setFormData({ ...formData, comment: e.target.value })
                                    }
                                    required
                                    rows={5}
                                    placeholder="Your Comment"
                                    className="w-full px-4 py-3 text-sm sm:text-base border border-black rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-900 resize-none"
                                />
                            </div>

                            <div>
                                {errors && (
                                    <span className="text-sm md:text-base text-red-600">{errors}</span>
                                )}
                                {isSubmitted && (
                                    <span className="text-sm md:text-base text-green-600">
                                        Comment submitted successfully! Our team will review it.
                                    </span>
                                )}
                            </div>

                            {/* BUTTON */}
                            <div>
                                <button
                                    onClick={handleCommentSubmit}
                                    disabled={
                                        !formData.name ||
                                        !formData.email ||
                                        !formData.comment ||
                                        isFormLoading
                                    }
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black text-white hover:bg-black/90 font-medium py-2 px-8 rounded-sm cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isFormLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <CheckCircle className="h-4 w-4" />
                                    )}
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Blog Sidebar */}
                <BlogSidebar
                    recentPosts={recentPosts || []}
                    popularTours={popularTours || []}
                />
            </div>
        </>
    )
}
