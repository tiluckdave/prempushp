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

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "https://prempushp.in";

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
				title: "Product Not Found - Prem Pushp",
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
			brand: "Prem Pushp",
			sku: product.id,
			ingredients: product.ingredients,
			nutritionInfo: product.nutritionalInfo,
			dietaryPreferences: product.dietaryPreferences,
			sizes: product.sizes,
		};

		const keywords = generateProductKeywords(productSEOData);
		const productUrl = `${baseUrl}/products/${product.id}`;
		const mainImage =
			product.coverImage || product.images?.[0] || `${baseUrl}/og-image.jpg`;

		// Create optimized title for SEO
		const seoTitle = `${product.name} - Premium Organic ${product.category} | Buy Online - Prem Pushp`;
		const seoDescription = `Buy premium organic ${product.name.toLowerCase()} online. ${
			product.shortDescription ||
			product.description ||
			"Certified organic, sustainably sourced, fresh quality guaranteed."
		}${
			product.sizes
				? ` Available in ${
						product.sizes.length
				  } sizes starting from ₹${Math.min(
						...product.sizes.map((s) => s.mrp)
				  )}`
				: ""
		}. Free shipping available.`;

		return {
			title: seoTitle,
			description: seoDescription,
			keywords: keywords.join(", "),
			authors: [{ name: "Prem Pushp" }],
			creator: "Prem Pushp",
			publisher: "Prem Pushp",
			category: "food",
			openGraph: {
				title: seoTitle,
				description: seoDescription,
				type: "website",
				url: productUrl,
				images: [
					{
						url: mainImage,
						width: 1200,
						height: 630,
						alt: `${product.name} - Premium Organic ${product.category}`,
					},
					...(product.images?.slice(0, 3).map((img, index) => ({
						url: img,
						width: 800,
						height: 600,
						alt: `${product.name} - Image ${index + 2}`,
					})) || []),
				],
				siteName: "Prem Pushp - Premium Organic Food Products",
			},
			twitter: {
				card: "summary_large_image",
				title: seoTitle,
				description: seoDescription,
				images: [mainImage],
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
				"product:price:amount": productSEOData.price.toString(),
				"product:price:currency": productSEOData.priceCurrency,
				"product:availability": productSEOData.availability,
				"product:brand": productSEOData.brand,
				"product:category": productSEOData.category,
				"product:condition": "new",
				"product:retailer_item_id": productSEOData.id,
			},
		};
	} catch (error) {
		console.error("Error generating metadata:", error);
		return {
			title: "Product - Prem Pushp",
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
			brand: "Prem Pushp",
			sku: product.id,
			ingredients: product.ingredients,
			nutritionInfo: product.nutritionalInfo,
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

		return (
			<>
				{/* Structured Data */}
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
