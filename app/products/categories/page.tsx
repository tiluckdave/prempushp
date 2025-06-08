"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts, getAllCategories } from "../../services/firebase";
import { Product, Category } from "../../types/firebase";
import Breadcrumb from "../../components/Breadcrumb";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function CategoriesPage() {
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);

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
					<p className='text-[#1B4D2A] text-lg'>Loading categories...</p>
				</div>
			</div>
		);
	}

	return (
		<div className={`min-h-screen py-12 ${inter.className}`}>
			<div className='container mx-auto px-4'>
				<Breadcrumb
					items={[
						{ label: "Products", href: "/products" },
						{ label: "Categories", href: "/products/categories" },
					]}
				/>
				<h1
					className={`${playfair.className} text-4xl font-bold text-[#1B4D2A] mb-8`}
				>
					Product Categories
				</h1>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{categories.map((category) => {
						const categoryProducts = products.filter(
							(product) => product.category === category.name
						);
						const firstProduct = categoryProducts[0];
						return (
							<Link
								key={category.id}
								href={`/products/categories/${category.id}`}
								className='block group'
							>
								<div className='bg-white rounded-lg overflow-hidden shadow-md transition-shadow group-hover:shadow-lg'>
									<div className='relative h-48'>
										<Image
											src={
												firstProduct?.coverImage ||
												firstProduct?.images?.[0] ||
												"/placeholder.svg"
											}
											alt={category.name}
											fill
											className='object-cover'
										/>
										<div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
											<h2
												className={`${playfair.className} text-2xl font-semibold text-white`}
											>
												{category.name}
											</h2>
										</div>
									</div>
									<div className='p-4'>
										<p className='text-gray-600'>
											{categoryProducts.length} product
											{categoryProducts.length !== 1 ? "s" : ""}
										</p>
										<p className='text-[#1B4D2A] font-semibold mt-2 group-hover:text-[#FDB913] transition-colors'>
											View Products
										</p>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}
