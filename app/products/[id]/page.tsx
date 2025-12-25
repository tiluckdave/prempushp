import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductById, getRelatedProducts } from "../../services/firebase";
import ProductPageClient from "./ProductPageClient";
import {
	generateProductSchema,
	generateProductKeywords,
	generateBreadcrumbSchema,
	ProductSEOData,
} from "../../lib/seo";

// 5 minutes
export const revalidate = 300;

const baseUrl = "https://prempushp.in";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	try {
		const { id } = await params;
		const product = await getProductById(id);

		if (!product) {
			return {
				title: "Product Not Found - Prempushp",
				description:
					"The requested product was not found. Browse our other premium organic food products.",
			};
		}

		const productSEOData: ProductSEOData = {
			id: product.id,
			name: product.name,
			description:
				product.longDescription ||
				product.shortDescription ||
				product.description ||
				"",
			category: product.category,
			images: [
				...(product.coverImage ? [product.coverImage] : []),
				...(product.images || []),
			],
			price: product.sizes?.[0]?.mrp || 0,
			priceCurrency: "INR",
			availability: "InStock",
			brand: "PREMPUSHP FOODS",
			sku: product.id,
			ingredients: product.ingredients,
			dietaryPreferences: product.dietaryPreferences,
			sizes: product.sizes,
		};

		const keywords = generateProductKeywords(productSEOData);
		const productUrl = `${baseUrl}/products/${product.id}`;
		const mainImage =
			product.coverImage || product.images?.[0] || `${baseUrl}/og-image.jpg`;

		// Create optimized title for SEO
		const seoTitle = `${product.name} - Premium Natural ${product.category} | Buy Online - PREMPUSHP FOODS`;
		const seoDescription = `Buy premium natural ${product.name.toLowerCase()} online. ${
			product.shortDescription ||
			product.description ||
			"Certified natural, sustainably sourced, fresh quality guaranteed."
		}${
			product.sizes
				? ` Available in ${
						product.sizes.length
				  } sizes starting from ₹${Math.min(
						...product.sizes.map((s) => s.mrp)
				  )}`
				: ""
		}. Free shipping available.`;

		// Get all product images (cover + additional images)
		const allProductImages = [
			...(product.coverImage ? [product.coverImage] : []),
			...(product.images || []),
		].filter((img, index, arr) => arr.indexOf(img) === index); // Remove duplicates

		// Create comprehensive Open Graph image tags
		const ogImages = allProductImages.slice(0, 6).map((img, index) => ({
			url: img,
			width: index === 0 ? 1200 : 800,
			height: index === 0 ? 630 : 600,
			alt: `${product.name} - ${index === 0 ? "Main Product Image" : `Image ${index + 1}`}`,
		}));

		return {
			title: seoTitle,
			description: seoDescription,
			keywords: keywords.join(", "),
			authors: [{ name: "PREMPUSHP FOODS" }],
			creator: "PREMPUSHP FOODS",
			publisher: "PREMPUSHP FOODS",
			category: "food",
			openGraph: {
				title: seoTitle,
				description: seoDescription,
				type: "website",
				url: productUrl,
				images: ogImages,
				siteName: "Prempushp - Premium Organic Food Products",
			},
			twitter: {
				card: "summary_large_image",
				title: seoTitle,
				description: seoDescription,
				images: allProductImages.slice(0, 4),
				creator: "@prempushp",
			},
			robots: {
				index: true,
				follow: true,
				googleBot: {
					index: true,
					follow: true,
					"max-video-preview": -1,
					"max-image-preview": "large",
					"max-snippet": -1,
				},
			},
			alternates: {
				canonical: productUrl,
			},
			other: {
				// Product specific meta tags for e-commerce and Google Merchant Center
				"product:price:amount": productSEOData.price.toString(),
				"product:price:currency": productSEOData.priceCurrency,
				"product:availability": productSEOData.availability,
				"product:brand": productSEOData.brand,
				"product:category": productSEOData.category,
				"product:condition": "new",
				"product:retailer_item_id": productSEOData.id,
				// Additional images for Google to discover
				...(allProductImages.length > 1
					? allProductImages.reduce((acc, img, index) => {
							acc[`og:image:${index}`] = img;
							return acc;
					  }, {} as Record<string, string>)
					: {}),
				// Size variants information
				...(product.sizes && product.sizes.length > 0
					? {
							"product:size_variants": product.sizes
								.map((s) => `${s.size} ${s.unit}`)
								.join(", "),
							"product:price_range": `₹${Math.min(
								...product.sizes.map((s) => s.mrp)
							)} - ₹${Math.max(...product.sizes.map((s) => s.mrp))}`,
					  }
					: {}),
				// Ingredients for better categorization
				...(product.ingredients
					? { "product:ingredients": product.ingredients.join(", ") }
					: {}),
				// Dietary preferences
				...(product.dietaryPreferences
					? {
							"product:dietary_preferences":
								product.dietaryPreferences.join(", "),
					  }
					: {}),
			},
		};
	} catch (error) {
		console.error("Error generating metadata:", error);
		return {
			title: "Product - PREMPUSHP FOODS",
			description:
				"Premium organic food products - certified organic, sustainably sourced.",
		};
	}
}

export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	try {
		const { id } = await params;
		const product = await getProductById(id);

		if (!product) {
			notFound();
		}

		const relatedProducts = await getRelatedProducts(
			product.id,
			product.category,
			4
		);

		// Generate structured data for the product
		const productSEOData: ProductSEOData = {
			id: product.id,
			name: product.name,
			description:
				product.longDescription ||
				product.shortDescription ||
				product.description ||
				"",
			category: product.category,
			images: [
				...(product.coverImage ? [product.coverImage] : []),
				...(product.images || []),
			],
			price: product.sizes?.[0]?.mrp || 0,
			priceCurrency: "INR",
			availability: "InStock",
			brand: "PREMPUSHP FOODS",
			sku: product.id,
			ingredients: product.ingredients,
			dietaryPreferences: product.dietaryPreferences,
			sizes: product.sizes,
		};

		const productSchema = generateProductSchema(productSEOData, baseUrl);

		// Generate breadcrumb schema
		const breadcrumbs = [
			{ name: "Home", url: "/" },
			{ name: "Products", url: "/products" },
			{
				name: product.category,
				url: `/products/categories/${product.category}`,
			},
			{ name: product.name, url: `/products/${product.id}` },
		];
		const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs, baseUrl);

		// Generate Organization schema for Google Merchant Center
		const organizationSchema = {
			"@context": "https://schema.org",
			"@type": "Organization",
			name: "PREMPUSHP FOODS",
			url: baseUrl,
			logo: `${baseUrl}/logo.png`,
			description:
				"Premium natural food products - certified natural, sustainably sourced, and delivered fresh.",
			contactPoint: {
				"@type": "ContactPoint",
				telephone: "+91-8275434017",
				contactType: "customer service",
				availableLanguage: ["English", "Hindi"],
				areaServed: "IN",
			},
			address: {
				"@type": "PostalAddress",
				addressCountry: "IN",
			},
			sameAs: [
				// Social media links when available
			],
		};

		return (
			<>
				{/* Structured Data for Google Merchant Center */}
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(productSchema),
					}}
				/>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(breadcrumbSchema),
					}}
				/>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(organizationSchema),
					}}
				/>

				<ProductPageClient
					product={product}
					relatedProducts={relatedProducts}
				/>
			</>
		);
	} catch (error) {
		console.error("Error fetching product:", error);
		notFound();
	}
}

// Generate static params for better SEO (this will be populated by your actual product IDs)
export async function generateStaticParams() {
	// This would typically fetch all product IDs from your database
	// For now, return empty array to use dynamic rendering
	return [];
}

// Note: generateStaticParams is removed since we're using dynamic data from Firebase
// The page will be generated on-demand
