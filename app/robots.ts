import { MetadataRoute } from "next";

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "https://prempushp.in";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: [
					"/private/",
					"/admin/",
					"/api/",
					"/_next/",
					"/node_modules/",
					"/.next/",
					"/public/",
					"/static/",
					"*.json",
					"*.xml",
					"/search?*",
					"/404",
					"/500",
				],
			},
			{
				userAgent: "Googlebot",
				allow: "/",
				disallow: [
					"/private/",
					"/admin/",
					"/api/",
					"/_next/",
					"/node_modules/",
					"/.next/",
					"/public/",
					"/static/",
				],
			},
			{
				userAgent: "Bingbot",
				allow: "/",
				disallow: [
					"/private/",
					"/admin/",
					"/api/",
					"/_next/",
					"/node_modules/",
					"/.next/",
					"/public/",
					"/static/",
				],
			},
			{
				userAgent: "facebookexternalhit",
				allow: "/",
			},
			{
				userAgent: "Twitterbot",
				allow: "/",
			},
			{
				userAgent: "WhatsApp",
				allow: "/",
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
		host: baseUrl,
	};
}
