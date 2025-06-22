"use client";

import { useState, useEffect } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import { Button } from "@/components/ui/button";
import ProductGrid from "../components/ProductGrid";
import { Filter } from "lucide-react";
import { getAllProducts, getAllCategories } from "../services/firebase";
import { Product, Category } from "../types/firebase";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

export default function ProductsPage() {
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	const filteredProducts = selectedCategory
		? products.filter((product) => product.category === selectedCategory)
		: products;

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				const [allProducts, allCategories] = await Promise.all([
					getAllProducts(),
					getAllCategories(),
				]);

				setProducts(allProducts);
				setCategories(allCategories);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-[#1B4D2A] mx-auto mb-4'></div>
					<p className='text-[#1B4D2A] text-lg'>Loading...</p>
				</div>
			</div>
		);
	}

	const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

	// Generate structured data for the products page
	const productListSchema = {
		"@context": "https://schema.org/",
		"@type": "ItemList",
		name: "Premium Organic Food Products",
		description:
			"Complete range of certified organic food products including spices, grains, pulses, oils, and more.",
		url: `${baseUrl}/products`,
		numberOfItems: filteredProducts.length,
		itemListElement: filteredProducts.slice(0, 20).map((product, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: {
				"@type": "Product",
				name: product.name,
				description: product.shortDescription || product.description,
				image: product.coverImage || product.images?.[0],
				brand: {
					"@type": "Brand",
					name: "Prem Pushp",
				},
				category: product.category,
				url: `${baseUrl}/products/${product.id}`,
				offers: product.sizes?.[0]
					? {
							"@type": "Offer",
							price: product.sizes[0].mrp,
							priceCurrency: "INR",
							availability: "https://schema.org/InStock",
					  }
					: undefined,
			},
		})),
	};

	// Category collection schema
	const categorySchema = {
		"@context": "https://schema.org/",
		"@type": "CollectionPage",
		name: selectedCategory
			? `${selectedCategory} Products`
			: "All Organic Food Products",
		description: selectedCategory
			? `Browse our premium organic ${selectedCategory.toLowerCase()} products. Certified organic, sustainably sourced.`
			: "Complete collection of premium organic food products. Certified organic, sustainably sourced, delivered fresh.",
		url: `${baseUrl}/products${
			selectedCategory
				? `?category=${encodeURIComponent(selectedCategory)}`
				: ""
		}`,
		mainEntity: productListSchema,
	};

	return (
		<>
			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(categorySchema),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BreadcrumbList",
						itemListElement: [
							{
								"@type": "ListItem",
								position: 1,
								name: "Home",
								item: baseUrl,
							},
							{
								"@type": "ListItem",
								position: 2,
								name: "Products",
								item: `${baseUrl}/products`,
							},
						],
					}),
				}}
			/>

			<div className={`${inter.className} min-h-screen`}>
				{/* Beautiful Hero Header */}
				<section className='relative py-12 sm:py-16 md:py-20 overflow-hidden'>
					<div className='absolute inset-0 bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200'></div>
					<div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FDB913\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>

					<div className='relative container mx-auto px-4 text-center'>
						<div className='max-w-4xl mx-auto'>
							{/* Subtle Badge */}
							<div className='mb-6 sm:mb-8'>
								<span className='text-[#1B4D2A]/70 text-sm sm:text-base font-medium tracking-wide uppercase'>
									Our Product Range
								</span>
							</div>

							{/* Main Title */}
							<h1
								className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl font-bold text-[#1B4D2A] mb-6 leading-tight`}
							>
								Explore Our Premium Products
							</h1>

							{/* Subtitle */}
							<p className='text-lg sm:text-xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto'>
								Hand-picked, certified organic foods crafted to nourish your
								body and delight your senses.
							</p>

							{/* No button needed on products hero */}
						</div>
					</div>
				</section>

				{/* Filter Section */}
				<section className='py-6 sm:py-8 md:py-12 shadow-sm'>
					<div className='container mx-auto px-4'>
						<div className='max-w-6xl mx-auto'>
							{/* Filter Header */}
							<div className='flex items-center justify-center mb-6 sm:mb-8'>
								<div className='flex items-center gap-3'>
									<Filter className='w-5 h-5 text-[#1B4D2A]' />
									<h2
										className={`${playfair.className} text-xl sm:text-2xl font-semibold text-[#1B4D2A]`}
									>
										Filter by Category
									</h2>
								</div>
							</div>

							{/* Filter Buttons */}
							<div className='flex flex-wrap justify-center gap-3 sm:gap-4'>
								<Button
									variant={selectedCategory === null ? "default" : "outline"}
									onClick={() => setSelectedCategory(null)}
									size='lg'
									className={`rounded-full px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium transition-all duration-300 ${
										selectedCategory === null
											? "bg-[#1B4D2A] text-white hover:bg-[#1B4D2A]/90 shadow-lg"
											: "border-[#1B4D2A] text-[#1B4D2A] hover:bg-[#1B4D2A] hover:text-white"
									}`}
								>
									All Products ({products.length})
								</Button>
								{categories.map((category) => {
									const categoryCount = products.filter(
										(p) => p.category === category.name
									).length;
									return (
										<Button
											key={category.id}
											variant={
												selectedCategory === category.name
													? "default"
													: "outline"
											}
											onClick={() => setSelectedCategory(category.name)}
											size='lg'
											className={`rounded-full px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium transition-all duration-300 ${
												selectedCategory === category.name
													? "bg-[#1B4D2A] text-white hover:bg-[#1B4D2A]/90 shadow-lg"
													: "border-[#1B4D2A] text-[#1B4D2A] hover:bg-[#1B4D2A] hover:text-white"
											}`}
										>
											{category.name} ({categoryCount})
										</Button>
									);
								})}
							</div>
						</div>
					</div>
				</section>

				{/* Products Grid Section */}
				<section id='products-grid' className='py-8 sm:py-12 md:py-16'>
					<div className='container mx-auto px-4'>
						<div className='max-w-7xl mx-auto'>
							{/* Results Header */}
							<div className='mb-6 sm:mb-8 text-center'>
								<h3
									className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-4`}
								>
									{selectedCategory
										? `${selectedCategory} Products`
										: "All Products"}
								</h3>
								<p className='text-gray-600 text-base sm:text-lg'>
									Showing {filteredProducts.length}{" "}
									{filteredProducts.length === 1 ? "product" : "products"}
									{selectedCategory && ` in ${selectedCategory}`}
								</p>
							</div>

							{/* Products Grid */}
							<ProductGrid products={filteredProducts} />
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
