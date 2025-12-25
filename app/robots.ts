import { MetadataRoute } from "next";

const baseUrl = "https://prempushp.in";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/", "/admin/", "/_next/"],
			},
			{
				// Google Shopping Bot
				userAgent: "Googlebot",
				allow: "/",
			},
			{
				// Google Image Bot
				userAgent: "Googlebot-Image",
				allow: "/",
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
		host: baseUrl,
	};
}
