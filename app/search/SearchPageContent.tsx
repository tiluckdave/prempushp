"use client";

import type React from "react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Sparkles } from "lucide-react";
import ProductGrid from "../components/ProductGrid";
import { getAllProducts } from "../services/firebase";
import { Product } from "../types/firebase";

interface SearchPageContentProps {
	playfair: any;
	inter: any;
}

export default function SearchPageContent({
	playfair,
	inter,
}: SearchPageContentProps) {
	const searchParams = useSearchParams();
	const query = searchParams.get("q");
	const [searchQuery, setSearchQuery] = useState(query || "");
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchProducts() {
			try {
				setLoading(true);
				const allProducts = await getAllProducts();
				setProducts(allProducts);
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchProducts();
	}, []);

	const searchResults = query
		? products.filter(
				(product) =>
					product.name.toLowerCase().includes(query.toLowerCase()) ||
					(product.description &&
						product.description.toLowerCase().includes(query.toLowerCase())) ||
					(product.shortDescription &&
						product.shortDescription
							.toLowerCase()
							.includes(query.toLowerCase())) ||
					(product.longDescription &&
						product.longDescription
							.toLowerCase()
							.includes(query.toLowerCase())) ||
					product.category.toLowerCase().includes(query.toLowerCase()) ||
					(product.ingredients &&
						product.ingredients.some((ingredient) =>
							ingredient.toLowerCase().includes(query.toLowerCase())
						))
		  )
		: [];

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
		}
	};

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-[#1B4D2A] mx-auto mb-4'></div>
					<p className='text-[#1B4D2A] text-lg'>Loading products...</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<section className='relative py-12 sm:py-16 md:py-20 overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200'></div>
				<div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FDB913\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>

				<div className='relative container mx-auto px-4 text-center'>
					<div className='max-w-4xl mx-auto'>
						<h1
							className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B4D2A] mb-6 sm:mb-8 leading-tight`}
						>
							{query ? `Search Results` : "Search Products"}
						</h1>

						<p className='text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto'>
							{query
								? `Showing results for "${query}" - Discover our premium organic products`
								: "Find the perfect organic products for your healthy lifestyle"}
						</p>

						<div className='max-w-2xl mx-auto'>
							<form onSubmit={handleSearch} className='relative'>
								<div className='relative group'>
									<Search className='absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400' />
									<Input
										type='text'
										placeholder='Search for organic products, categories, ingredients...'
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className='w-full h-16 pl-16 pr-32 text-lg bg-white/95 backdrop-blur-sm border-2 border-white/20 focus:border-[#FDB913] focus:ring-2 focus:ring-[#FDB913]/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300'
									/>
									<Button
										type='submit'
										size='lg'
										className='absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#1B4D2A] to-[#2a6b3f] hover:from-[#1B4D2A]/90 hover:to-[#2a6b3f]/90 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2'
									>
										<Sparkles className='w-5 h-5' />
										Search
									</Button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>

			<section className='py-8 sm:py-12 md:py-16'>
				<div className='container mx-auto px-4'>
					{query ? (
						<>
							<div className='mb-8 sm:mb-12'>
								<div className='flex items-center justify-between flex-wrap gap-4'>
									<div>
										<h2
											className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-2`}
										>
											Search Results
										</h2>
										<p className='text-gray-600'>
											{searchResults.length > 0
												? `Found ${searchResults.length} product${
														searchResults.length !== 1 ? "s" : ""
												  } matching "${query}"`
												: `No products found for "${query}"`}
										</p>
									</div>
									{searchResults.length > 0 && (
										<div className='flex items-center gap-2 text-sm text-gray-500'>
											<Filter className='w-4 h-4' />
											<span>Showing all results</span>
										</div>
									)}
								</div>
							</div>

							{searchResults.length > 0 ? (
								<ProductGrid products={searchResults} />
							) : (
								<div className='text-center py-16'>
									<div className='w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center'>
										<Search className='w-12 h-12 text-gray-400' />
									</div>
									<h3 className='text-xl sm:text-2xl font-semibold text-gray-900 mb-4'>
										No products found
									</h3>
									<p className='text-gray-600 mb-8 max-w-md mx-auto'>
										We couldn't find any products matching "{query}". Try
										different keywords or browse our categories.
									</p>
									<div className='flex flex-col sm:flex-row gap-4 justify-center'>
										<Button
											onClick={() => {
												setSearchQuery("");
												window.location.href = "/search";
											}}
											variant='outline'
											className='border-[#1B4D2A] text-[#1B4D2A] hover:bg-[#1B4D2A] hover:text-white'
										>
											Clear Search
										</Button>
										<Button
											onClick={() => (window.location.href = "/products")}
											className='bg-[#1B4D2A] hover:bg-[#1B4D2A]/90 text-white'
										>
											Browse All Products
										</Button>
									</div>
								</div>
							)}
						</>
					) : (
						<div className='text-center py-16'>
							<div className='w-24 h-24 mx-auto mb-6 bg-[#FDB913]/10 rounded-full flex items-center justify-center'>
								<Search className='w-12 h-12 text-[#FDB913]' />
							</div>
							<h3 className='text-xl sm:text-2xl font-semibold text-gray-900 mb-4'>
								Start Your Search
							</h3>
							<p className='text-gray-600 mb-8 max-w-md mx-auto'>
								Enter a search term above to find organic products, browse by
								category, or search for specific ingredients.
							</p>
							<Button
								onClick={() => (window.location.href = "/products")}
								className='bg-[#1B4D2A] hover:bg-[#1B4D2A]/90 text-white'
							>
								Browse All Products
							</Button>
						</div>
					)}
				</div>
			</section>
		</>
	);
}
