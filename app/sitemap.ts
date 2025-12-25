import { MetadataRoute } from "next";
import { getAllProducts, getAllCategories } from "./services/firebase";

const baseUrl = "https://prempushp.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	try {
		// Static pages
		const staticPages = [
			{
				url: baseUrl,
				lastModified: new Date(),
				changeFrequency: "daily" as const,
				priority: 1,
			},
			{
				url: `${baseUrl}/products`,
				lastModified: new Date(),
				changeFrequency: "daily" as const,
				priority: 0.9,
			},
			{
				url: `${baseUrl}/products/categories`,
				lastModified: new Date(),
				changeFrequency: "weekly" as const,
				priority: 0.8,
			},
			{
				url: `${baseUrl}/about`,
				lastModified: new Date(),
				changeFrequency: "monthly" as const,
				priority: 0.7,
			},
			{
				url: `${baseUrl}/contact`,
				lastModified: new Date(),
				changeFrequency: "monthly" as const,
				priority: 0.6,
			},
			{
				url: `${baseUrl}/faq`,
				lastModified: new Date(),
				changeFrequency: "monthly" as const,
				priority: 0.5,
			},
			{
				url: `${baseUrl}/privacy`,
				lastModified: new Date(),
				changeFrequency: "yearly" as const,
				priority: 0.3,
			},
			{
				url: `${baseUrl}/terms`,
				lastModified: new Date(),
				changeFrequency: "yearly" as const,
				priority: 0.3,
			},
			{
				url: `${baseUrl}/shipping`,
				lastModified: new Date(),
				changeFrequency: "monthly" as const,
				priority: 0.4,
			},
			{
				url: `${baseUrl}/returns`,
				lastModified: new Date(),
				changeFrequency: "monthly" as const,
				priority: 0.4,
			},
			{
				url: `${baseUrl}/become-distributor`,
				lastModified: new Date(),
				changeFrequency: "monthly" as const,
				priority: 0.6,
			},
		];

		// Get dynamic content
		const [products, categories] = await Promise.all([
			getAllProducts(),
			getAllCategories(),
		]);

		// Product pages with current timestamp to force Google crawl
		const productPages = products.map((product) => ({
			url: `${baseUrl}/products/${product.id}`,
			lastModified: new Date(), // Current date to force recrawl
			changeFrequency: "daily" as const, // Changed to daily for faster updates
			priority: 0.9, // Increase priority for products
		}));

		// Category pages
		const categoryPages = categories.map((category) => ({
			url: `${baseUrl}/products/categories/${category.id}`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.7,
		}));

		return [...staticPages, ...productPages, ...categoryPages];
	} catch (error) {
		console.error("Error generating sitemap:", error);

		// Return static pages only if dynamic content fails
		return [
			{
				url: baseUrl,
				lastModified: new Date(),
				changeFrequency: "daily" as const,
				priority: 1,
			},
			{
				url: `${baseUrl}/products`,
				lastModified: new Date(),
				changeFrequency: "daily" as const,
				priority: 0.9,
			},
			{
				url: `${baseUrl}/about`,
				lastModified: new Date(),
				changeFrequency: "monthly" as const,
				priority: 0.7,
			},
			{
				url: `${baseUrl}/contact`,
				lastModified: new Date(),
				changeFrequency: "monthly" as const,
				priority: 0.6,
			},
		];
	}
}
