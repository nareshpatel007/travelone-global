import { MetadataRoute } from "next";

// Ensure environment variables exist
const SITE_URL = process.env.SITE_URL || "https://travelone.io";
const API_URL = process.env.API_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // If API URL missing in production, prevent silent failure
    if (!API_URL) {
        console.error("❌ API_URL is not defined in environment variables");
        return [
            {
                url: SITE_URL,
                lastModified: new Date(),
            },
        ];
    }

    try {
        // Fetch independently (so one failure doesn’t break everything)
        const countryRes = await fetch(`${API_URL}sitemap/destination`, {
            method: "GET",
            next: { revalidate: 3600 },
        }).catch(() => null);

        const tourRes = await fetch(`${API_URL}sitemap/tour`, {
            method: "GET",
            next: { revalidate: 3600 },
        }).catch(() => null);

        const blogRes = await fetch(`${API_URL}sitemap/blog`, {
            method: "GET",
            next: { revalidate: 3600 },
        }).catch(() => null);

        // Parse responses
        const countries = countryRes && countryRes.ok ? await countryRes.json() : { data: [] };
        const tours = tourRes && tourRes.ok ? await tourRes.json() : { data: [] };
        const blogs = blogRes && blogRes.ok ? await blogRes.json() : { data: [] };

        // Static Pages
        const staticRoutes = [
            "",
            "/country",
            "/tour",
            "/about",
            "/contact",
            "/blog",
            "/faqs",
            "/careers",
            "/legal/terms-service",
            "/legal/privacy-policy",
            "/legal/refund-policy",
            "/legal/ai-transparency-disclosure",
            "/legal/impact-statement",
            "/legal/manage-my-persona",
            "/legal/accessibility-statement",
            "/legal/mors-security",
            "/legal/travel-advisory",
            "/partnership/TICO-Bhavin-Vora.pdf",
        ].map((route) => ({
            url: `${SITE_URL}${route}`,
            lastModified: new Date(),
            priority: route === "" ? 1.0 : 0.8,
        }));

        // Country Routes
        const countryRoutes =
            countries?.data?.map((country: any) => ({
                url: `${SITE_URL}/country/${country.slug}`,
                lastModified: new Date(Date.now()),
                priority: 0.8,
            })) || [];

        // Tour Routes
        const tourRoutes =
            tours?.data?.map((tour: any) => ({
                url: `${SITE_URL}/tour/${tour.slug}`,
                lastModified: new Date(Date.now()),
                priority: 0.7,
            })) || [];

        // Blog Routes (re-enabled safely)
        // const blogRoutes =
        //     blogs?.data?.map((blog: any) => ({
        //         url: `${SITE_URL}/blog/${blog.slug}`,
        //         lastModified: new Date(Date.now()),
        //         priority: 0.7,
        //     })) || [];

        // Return sitemap
        return [
            ...staticRoutes,
            ...countryRoutes,
            ...tourRoutes,
            // ...blogRoutes,
        ];
    } catch (error) {
        console.error("❌ Sitemap generation failed:", error);

        return [
            {
                url: SITE_URL,
                lastModified: new Date(),
            },
        ];
    }
}