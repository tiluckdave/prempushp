"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import ProductGrid from "../../../components/ProductGrid";
import Breadcrumb from "../../../components/Breadcrumb";
import { getProductsByCategoryId } from "../../../services/firebase";
import { Product } from "../../../types/firebase";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function CategoryPage({
	params,
}: {
	params: { category: string };
}) {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [categoryName, setCategoryName] = useState("");

	const categoryId = decodeURIComponent(params.category);

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				console.log(
					"Category page: Starting fetch for category ID:",
					categoryId
				);
				console.log("Category page: Raw params.category:", params.category);

				// Get products and category name by category ID
				const result = await getProductsByCategoryId(categoryId);

				console.log("Category page: getProductsByCategoryId result:", result);

				if (!result) {
					console.error("Category page: No category found for ID:", categoryId);
					notFound();
					return;
				}

				console.log("Category page: Found category:", result.categoryName);
				console.log("Category page: Found products:", result.products.length);
				console.log(
					"Category page: Products:",
					result.products.map((p) => ({
						id: p.id,
						name: p.name,
						category: p.category,
					}))
				);

				setCategoryName(result.categoryName);
				setProducts(result.products);
			} catch (error) {
				console.error("Category page: Error fetching category data:", error);
				notFound();
			} finally {
				setLoading(false);
			}
		}

		if (categoryId) {
			fetchData();
		}
	}, [categoryId, params.category]);

	if (loading) {
		return (
			<div
				className={`${inter.className} min-h-screen bg-gradient-to-br from-amber-50 via-cream-50 to-yellow-50 py-4 sm:py-8`}
			>
				<div className='container mx-auto px-4'>
					<div className='flex items-center justify-center py-20'>
						<div className='text-center'>
							<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-[#1B4D2A] mx-auto mb-4'></div>
							<p className='text-[#1B4D2A] text-lg'>
								Loading category products...
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (products.length === 0) {
		return (
			<div
				className={`${inter.className} min-h-screen bg-gradient-to-br from-amber-50 via-cream-50 to-yellow-50 py-4 sm:py-8`}
			>
				<div className='container mx-auto px-4'>
					<Breadcrumb
						items={[
							{ label: "Products", href: "/products" },
							{ label: "Categories", href: "/products/categories" },
							{
								label: categoryName || "Category",
								href: `/products/categories/${params.category}`,
							},
						]}
					/>
					<div className='text-center py-12'>
						<h1
							className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4D2A] mb-8`}
						>
							{categoryName || "Category"}
						</h1>
						<div className='bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-md mx-auto'>
							<p className='text-gray-700 text-lg'>
								No products found in this category.
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`${inter.className} min-h-screen bg-gradient-to-br from-amber-50 via-cream-50 to-yellow-50`}
		>
			{/* Hero Section */}
			<section className='py-8 sm:py-12 md:py-16'>
				<div className='container mx-auto px-4'>
					<Breadcrumb
						items={[
							{ label: "Products", href: "/products" },
							{ label: "Categories", href: "/products/categories" },
							{
								label: categoryName,
								href: `/products/categories/${params.category}`,
							},
						]}
					/>

					<div className='text-center mb-8 sm:mb-12'>
						<h1
							className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4D2A] mb-6`}
						>
							{categoryName}
						</h1>
						<p className='text-gray-700 text-lg sm:text-xl max-w-3xl mx-auto'>
							Discover our premium organic {categoryName.toLowerCase()}{" "}
							products, carefully selected for their exceptional quality and
							taste.
						</p>
						<div className='mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-[#FDB913]/20 to-[#FDB913]/10 text-[#1B4D2A] px-6 py-3 rounded-full text-sm font-semibold border border-[#FDB913]/30'>
							<span className='w-2 h-2 bg-[#FDB913] rounded-full'></span>
							{products.length} Product{products.length !== 1 ? "s" : ""}{" "}
							Available
						</div>
					</div>
				</div>
			</section>

			{/* Products Grid Section */}
			<section className='pb-8 sm:pb-12 md:pb-16'>
				<div className='container mx-auto px-4'>
					<ProductGrid products={products} />
				</div>
			</section>
		</div>
	);
}
