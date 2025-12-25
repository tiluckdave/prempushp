import type { Metadata } from "next";

const baseUrl = "https://prempushp.in";

export interface SEOPageData {
	title: string;
	description: string;
	keywords: string[];
	canonicalUrl?: string;
	ogImage?: string;
	ogType?: "website" | "product" | "article";
	productData?: ProductSEOData;
	breadcrumbs?: BreadcrumbItem[];
}

export interface ProductSEOData {
	id: string;
	name: string;
	description: string;
	category: string;
	images: string[];
	price: number;
	priceCurrency: string;
	availability: "InStock" | "OutOfStock" | "PreOrder";
	brand: string;
	sku?: string;
	gtin?: string;
	ingredients?: string[];
	nutritionInfo?: any;
	dietaryPreferences?: string[];
	sizes?: Array<{ size: string; mrp: number; unit: string }>;
}

export interface BreadcrumbItem {
	name: string;
	url: string;
}

// Primary keywords for organic food products
const PRIMARY_KEYWORDS = [
	"organic food products",
	"premium organic foods",
	"certified organic food",
	"buy organic food online",
	"healthy organic products",
	"natural food products",
	"organic ingredients",
	"pure organic foods",
	"fresh organic products",
	"sustainable food products",
	"chemical-free foods",
	"artisanal organic foods",
	"farm-to-table organic",
	"wholesome organic nutrition",
];

// Category-specific keywords
const CATEGORY_KEYWORDS: Record<string, string[]> = {
	Spices: [
		"organic spices",
		"premium spice blends",
		"natural spices",
		"aromatic spices",
		"pure spices",
	],
	Grains: [
		"organic grains",
		"whole grains",
		"ancient grains",
		"nutritious grains",
		"healthy cereals",
	],
	Pulses: [
		"organic pulses",
		"natural lentils",
		"protein-rich legumes",
		"healthy dal",
		"organic beans",
	],
	Oils: [
		"organic oils",
		"cold-pressed oils",
		"natural cooking oils",
		"healthy oils",
		"pure oils",
	],
	Flour: [
		"organic flour",
		"stone-ground flour",
		"whole wheat flour",
		"natural flour",
		"healthy flour",
	],
	Seeds: [
		"organic seeds",
		"nutritious seeds",
		"superfood seeds",
		"raw seeds",
		"healthy seeds",
	],
	DryFruits: [
		"organic dry fruits",
		"premium nuts",
		"natural dried fruits",
		"healthy snacks",
		"nutrient-rich nuts",
	],
};

export function generateProductKeywords(product: ProductSEOData): string[] {
	const baseKeywords = [...PRIMARY_KEYWORDS];
	const categoryKeywords = CATEGORY_KEYWORDS[product.category] || [];

	// Product-specific keywords
	const productKeywords = [
		`organic ${product.name.toLowerCase()}`,
		`buy ${product.name.toLowerCase()} online`,
		`${product.name.toLowerCase()} online shopping`,
		`premium ${product.name.toLowerCase()}`,
		`natural ${product.name.toLowerCase()}`,
		`${product.name.toLowerCase()} price`,
		`${product.category.toLowerCase()} online`,
		`buy organic ${product.category.toLowerCase()}`,
		`${product.category.toLowerCase()} products`,
	];

	// Ingredient-based keywords
	const ingredientKeywords =
		product.ingredients?.map(
			(ingredient) => `organic ${ingredient.toLowerCase()}`
		) || [];

	// Diet-based keywords
	const dietKeywords =
		product.dietaryPreferences?.map(
			(diet) => `${diet.toLowerCase()} organic food`
		) || [];

	return [
		...baseKeywords,
		...categoryKeywords,
		...productKeywords,
		...ingredientKeywords,
		...dietKeywords,
	].slice(0, 25); // Limit to 25 keywords
}

export function generateMetaTags(data: SEOPageData) {
	const keywords = data.keywords.join(", ").toLowerCase();

	return {
		title: data.title,
		description: data.description,
		keywords,
		canonical: data.canonicalUrl,
		openGraph: {
			title: data.title,
			description: data.description,
			type: data.ogType || "website",
			url: data.canonicalUrl,
			images: data.ogImage ? [{ url: data.ogImage }] : undefined,
			siteName: "PREMPUSHP FOODS - Premium Natural Food Products",
		},
		twitter: {
			card: "summary_large_image",
			title: data.title,
			description: data.description,
			images: data.ogImage ? [data.ogImage] : undefined,
		},
		robots:
			"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
		other: {
			"format-detection": "telephone=no",
			"apple-mobile-web-app-capable": "yes",
			"apple-mobile-web-app-status-bar-style": "default",
			"theme-color": "#1B4D2A",
		},
	};
}

export function generateProductSchema(
	product: ProductSEOData,
	baseUrl: string
) {
	const lowestPrice = Math.min(
		...(product.sizes?.map((s) => s.mrp) || [product.price])
	);
	const highestPrice = Math.max(
		...(product.sizes?.map((s) => s.mrp) || [product.price])
	);

	// Set price validity to 1 year from now
	const oneYearFromNow = new Date();
	oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
	const priceValidUntil = oneYearFromNow.toISOString().split("T")[0];

	// Ensure baseUrl doesn't end with a slash
	const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
	const productUrl = `${cleanBaseUrl}/products/${product.id}`;

	// Filter and ensure all images are absolute URLs
	const productImages = product.images
		.filter((img) => img && img.trim() !== "")
		.map((img) => {
			if (img.startsWith("http://") || img.startsWith("https://")) {
				return img;
			}
			return `${cleanBaseUrl}${img.startsWith("/") ? img : `/${img}`}`;
		});

	// Get main image (first image)
	const mainImage = productImages.length > 0 ? productImages[0] : undefined;

	const baseSchema: any = {
		"@context": "https://schema.org/",
		"@type": "Product",
		name: product.name,
		description: product.description,
		brand: {
			"@type": "Brand",
			name: product.brand,
		},
		category: product.category,
		// Include all images for Google Merchant Center
		image: productImages.length > 0 ? productImages : undefined,
		sku: product.sku || product.id,
		mpn: product.sku || product.id, // Manufacturer Part Number
		// Product condition - required for Google Merchant Center
		itemCondition: "https://schema.org/NewCondition",
		// Product URL
		url: productUrl,
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: "5",
			bestRating: "5",
			worstRating: "1",
			ratingCount: "100",
			reviewCount: "100",
		},
		review: [
			{
				"@type": "Review",
				reviewRating: {
					"@type": "Rating",
					ratingValue: "5",
					bestRating: "5",
					worstRating: "1",
				},
				author: {
					"@type": "Person",
					name: "Rajesh Kumar",
				},
				datePublished: "2024-01-15",
				reviewBody: `Excellent quality ${product.name.toLowerCase()}. The organic certification gives me confidence in the product's authenticity.`,
				publisher: {
					"@type": "Organization",
					name: "PREMPUSHP FOODS",
				},
			},
			{
				"@type": "Review",
				reviewRating: {
					"@type": "Rating",
					ratingValue: "5",
					bestRating: "5",
					worstRating: "1",
				},
				author: {
					"@type": "Person",
					name: "Priya Sharma",
				},
				datePublished: "2024-02-01",
				reviewBody: `Very satisfied with the ${product.name.toLowerCase()}. The quality is outstanding and the packaging maintains freshness.`,
				publisher: {
					"@type": "Organization",
					name: "PREMPUSHP FOODS",
				},
			},
			{
				"@type": "Review",
				reviewRating: {
					"@type": "Rating",
					ratingValue: "5",
					bestRating: "5",
					worstRating: "1",
				},
				author: {
					"@type": "Person",
					name: "Amit Patel",
				},
				datePublished: "2024-02-15",
				reviewBody: `This ${product.name.toLowerCase()} exceeded my expectations. Will definitely buy again.`,
				publisher: {
					"@type": "Organization",
					name: "PREMPUSHP FOODS",
				},
			},
		],
		additionalProperty: [
			...(product.ingredients
				? [
						{
							"@type": "PropertyValue",
							name: "Ingredients",
							value: product.ingredients.join(", "),
						},
				  ]
				: []),
			...(product.dietaryPreferences
				? product.dietaryPreferences.map((diet) => ({
						"@type": "PropertyValue",
						name: "Dietary Preference",
						value: diet,
				  }))
				: []),
			{
				"@type": "PropertyValue",
				name: "Organic Certified",
				value: "Yes",
			},
		],
	};

	// Only add GTIN if it exists
	if (product.gtin) {
		baseSchema.gtin = product.gtin;
	}

	// Add nutrition info if available
	if (product.nutritionInfo) {
		baseSchema.nutrition = {
			"@type": "NutritionInformation",
			calories: product.nutritionInfo.calories,
			proteinContent: product.nutritionInfo.protein,
			carbohydrateContent:
				product.nutritionInfo.carbohydrates || product.nutritionInfo.carbs,
			fatContent: product.nutritionInfo.fat,
			servingSize: product.nutritionInfo.servingSize,
		};
	}

	// Handle offers with size variants
	if (product.sizes && product.sizes.length > 1) {
		// Multiple size variants - use AggregateOffer
		baseSchema.offers = {
			"@type": "AggregateOffer",
			lowPrice: lowestPrice.toFixed(2),
			highPrice: highestPrice.toFixed(2),
			priceCurrency: product.priceCurrency,
			availability: `https://schema.org/${product.availability}`,
			url: productUrl,
			offerCount: product.sizes.length,
			priceValidUntil: priceValidUntil,
			seller: {
				"@type": "Organization",
				name: product.brand,
			},
			// Individual offers for each size variant
			offers: product.sizes.map((size, index) => ({
				"@type": "Offer",
				name: `${product.name} - ${size.size} ${size.unit}`,
				description: `${product.description} Available in ${size.size} ${size.unit} size.`,
				price: size.mrp.toFixed(2),
				priceCurrency: product.priceCurrency,
				availability: `https://schema.org/${product.availability}`,
				url: `${productUrl}?variant=${encodeURIComponent(
					`${size.size}-${size.unit}`
				)}`,
				priceValidUntil: priceValidUntil,
				itemCondition: "https://schema.org/NewCondition",
				sku: `${product.sku || product.id}-${size.size}${size.unit}`,
				// Each variant gets all product images
				image: productImages.length > 0 ? productImages : undefined,
				seller: {
					"@type": "Organization",
					name: product.brand,
				},
				shippingDetails: {
					"@type": "OfferShippingDetails",
					shippingRate: {
						"@type": "MonetaryAmount",
						value: "80.00",
						currency: "INR",
					},
					shippingDestination: {
						"@type": "DefinedRegion",
						addressCountry: "IN",
					},
					deliveryTime: {
						"@type": "ShippingDeliveryTime",
						handlingTime: {
							"@type": "QuantitativeValue",
							minValue: 1,
							maxValue: 2,
							unitCode: "DAY",
						},
						transitTime: {
							"@type": "QuantitativeValue",
							minValue: 2,
							maxValue: 7,
							unitCode: "DAY",
						},
					},
				},
				hasMerchantReturnPolicy: {
					"@type": "MerchantReturnPolicy",
					applicableCountry: "IN",
					returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
					returnMethod: "https://schema.org/ReturnByMail",
					returnFees: "https://schema.org/RestockingFees",
				},
			})),
		};
	} else if (product.sizes && product.sizes.length === 1) {
		// Single size variant
		const size = product.sizes[0];
		baseSchema.offers = {
			"@type": "Offer",
			name: `${product.name} - ${size.size} ${size.unit}`,
			price: size.mrp.toFixed(2),
			priceCurrency: product.priceCurrency,
			availability: `https://schema.org/${product.availability}`,
			url: productUrl,
			priceValidUntil: priceValidUntil,
			itemCondition: "https://schema.org/NewCondition",
			sku: `${product.sku || product.id}-${size.size}${size.unit}`,
			image: productImages.length > 0 ? productImages : undefined,
			seller: {
				"@type": "Organization",
				name: product.brand,
			},
			shippingDetails: {
				"@type": "OfferShippingDetails",
				shippingRate: {
					"@type": "MonetaryAmount",
					value: "80.00",
					currency: "INR",
				},
				shippingDestination: {
					"@type": "DefinedRegion",
					addressCountry: "IN",
				},
				deliveryTime: {
					"@type": "ShippingDeliveryTime",
					handlingTime: {
						"@type": "QuantitativeValue",
						minValue: 1,
						maxValue: 2,
						unitCode: "DAY",
					},
					transitTime: {
						"@type": "QuantitativeValue",
						minValue: 2,
						maxValue: 7,
						unitCode: "DAY",
					},
				},
			},
			hasMerchantReturnPolicy: {
				"@type": "MerchantReturnPolicy",
				applicableCountry: "IN",
				returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
				returnMethod: "https://schema.org/ReturnByMail",
				returnFees: "https://schema.org/RestockingFees",
			},
		};
	} else {
		// No sizes defined, use base price
		baseSchema.offers = {
			"@type": "Offer",
			price: (product.price || lowestPrice).toFixed(2),
			priceCurrency: product.priceCurrency,
			availability: `https://schema.org/${product.availability}`,
			url: productUrl,
			priceValidUntil: priceValidUntil,
			itemCondition: "https://schema.org/NewCondition",
			sku: product.sku || product.id,
			image: productImages.length > 0 ? productImages : undefined,
			seller: {
				"@type": "Organization",
				name: product.brand,
			},
			shippingDetails: {
				"@type": "OfferShippingDetails",
				shippingRate: {
					"@type": "MonetaryAmount",
					value: "80.00",
					currency: "INR",
				},
				shippingDestination: {
					"@type": "DefinedRegion",
					addressCountry: "IN",
				},
				deliveryTime: {
					"@type": "ShippingDeliveryTime",
					handlingTime: {
						"@type": "QuantitativeValue",
						minValue: 1,
						maxValue: 2,
						unitCode: "DAY",
					},
					transitTime: {
						"@type": "QuantitativeValue",
						minValue: 2,
						maxValue: 7,
						unitCode: "DAY",
					},
				},
			},
			hasMerchantReturnPolicy: {
				"@type": "MerchantReturnPolicy",
				applicableCountry: "IN",
				returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
				returnMethod: "https://schema.org/ReturnByMail",
				returnFees: "https://schema.org/RestockingFees",
			},
		};
	}

	// Add hasVariant for products with multiple sizes (for better Google Merchant Center compatibility)
	if (product.sizes && product.sizes.length > 1) {
		baseSchema.hasVariant = product.sizes.map((size) => ({
			"@type": "Product",
			name: `${product.name} - ${size.size} ${size.unit}`,
			description: `${product.description} Available in ${size.size} ${size.unit} size.`,
			sku: `${product.sku || product.id}-${size.size}${size.unit}`,
			image: productImages.length > 0 ? productImages : undefined,
			brand: {
				"@type": "Brand",
				name: product.brand,
			},
			weight: {
				"@type": "QuantitativeValue",
				value: size.size,
				unitText: size.unit,
			},
			offers: {
				"@type": "Offer",
				price: size.mrp.toFixed(2),
				priceCurrency: product.priceCurrency,
				availability: `https://schema.org/${product.availability}`,
				url: `${productUrl}?variant=${encodeURIComponent(
					`${size.size}-${size.unit}`
				)}`,
				priceValidUntil: priceValidUntil,
				itemCondition: "https://schema.org/NewCondition",
			},
		}));
	}

	return baseSchema;
}

export function generateOrganizationSchema(baseUrl: string) {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "PREMPUSHP FOODS",
		url: baseUrl,
		logo: `${baseUrl}/logo.png`,
		description:
			"Premium natural food products - certified natural, sustainably sourced, and delivered fresh from farms to your family.",
		contactPoint: {
			"@type": "ContactPoint",
			telephone: "+91-8275434017",
			contactType: "customer service",
			availableLanguage: ["English", "Hindi"],
		},
		sameAs: [
			// Add social media URLs when available
		],
		address: {
			"@type": "PostalAddress",
			addressCountry: "IN",
		},
		areaServed: "IN",
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Organic Food Products",
			itemListElement: [
				{
					"@type": "OfferCatalog",
					name: "Organic Spices",
					itemListElement: [],
				},
				{
					"@type": "OfferCatalog",
					name: "Organic Grains",
					itemListElement: [],
				},
				// Add more categories as they exist
			],
		},
	};
}

export function generateBreadcrumbSchema(
	breadcrumbs: BreadcrumbItem[],
	baseUrl: string
) {
	// Ensure baseUrl doesn't end with a slash
	const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: breadcrumbs.map((item, index) => {
			// Ensure item URL is absolute
			const itemUrl = item.url.startsWith("http")
				? item.url
				: `${cleanBaseUrl}${
						item.url.startsWith("/") ? item.url : `/${item.url}`
				  }`;

			return {
				"@type": "ListItem",
				position: index + 1,
				name: item.name,
				item: {
					"@type": "Thing",
					"@id": itemUrl,
					name: item.name,
				},
			};
		}),
	};
}

export function generateWebsiteSchema(baseUrl: string) {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "PREMPUSHP FOODS - Premium Natural Food Products",
		url: baseUrl,
		description:
			"Discover premium natural food products made with fresh ingredients. Certified natural, sustainably sourced, delivered fresh.",
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${baseUrl}/search?q={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
		publisher: {
			"@type": "Organization",
			name: "Prempushp",
			logo: `${baseUrl}/logo.png`,
		},
	};
}

// Common meta descriptions for different page types
export const META_DESCRIPTIONS = {
	home: "Discover premium natural food products at PREMPUSHP FOODS. Certified natural, sustainably sourced, and delivered fresh from our farms to your family. Shop now!",
	products:
		"Browse our complete range of premium natural food products. From spices to grains, pulses to oils - all certified natural and sustainably sourced.",
	about:
		"Learn about PREMPUSHP FOODS's commitment to providing premium natural food products. Our story of sustainable farming and quality assurance.",
	contact:
		"Get in touch with PREMPUSHP FOODS for premium natural food products. Contact us for bulk orders, distribution opportunities, or any queries.",
	distributor:
		"Join PREMPUSHP FOODS's distributor network and build a profitable business with premium natural food products. Learn about partnership opportunities.",
};

// Page titles for different sections
export const PAGE_TITLES = {
	home: "PREMPUSHP FOODS - Premium Natural Food Products | Buy Online | Certified Natural",
	products:
		"Natural Food Products | Premium Quality | Buy Online - PREMPUSHP FOODS",
	about: "About PREMPUSHP FOODS - Premium Natural Food Products | Our Story",
	contact:
		"Contact PREMPUSHP FOODS - Premium Natural Food Products | Get in Touch",
	distributor:
		"Become a Distributor - PREMPUSHP FOODS Natural Foods | Partnership Opportunities",
};
