"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumb";
import ProductSlider from "../../components/ProductSlider";
import { Button } from "@/components/ui/button";
import type { Product } from "../../types/firebase";
import { getCategoryIdByName } from "../../services/firebase";
import { Playfair_Display, Inter } from "next/font/google";
import {
	Leaf,
	Award,
	Shield,
	Share2,
	MessageCircle,
	FileText,
	UtensilsCrossed,
	BarChart,
	Box,
} from "lucide-react";
import {
	trackProductView,
	trackProductEnquiry,
	trackTraffic,
} from "../../lib/analytics";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

interface ProductPageClientProps {
	product: Product;
	relatedProducts: Product[];
}

export default function ProductPageClient({
	product,
	relatedProducts,
}: ProductPageClientProps) {
	const [categoryId, setCategoryId] = useState<string>("");

	// Combine coverImage and additional images for the gallery, ensuring no duplicates
	const allImages = Array.from(
		new Set([
			...(product.coverImage ? [product.coverImage] : []),
			...(product.images || []),
		])
	);

	const [selectedImage, setSelectedImage] = useState<string>(
		allImages[0] || "/placeholder.svg"
	);

	useEffect(() => {
		async function fetchCategoryId() {
			const id = await getCategoryIdByName(product.category);
			if (id) {
				setCategoryId(id);
			}
		}
		fetchCategoryId();
	}, [product.category]);

	useEffect(() => {
		// Track product view and traffic
		const key = `prempushp_product_${product.id}`;
		const isUnique =
			typeof window !== "undefined" && !localStorage.getItem(key);
		if (isUnique && typeof window !== "undefined") {
			localStorage.setItem(key, "1");
		}
		trackProductView(
			product.id,
			product.name,
			product.category,
			isUnique
		).catch(console.error);
		trackTraffic({ productView: true }).catch(console.error);
	}, [product]);

	const productUrl = typeof window !== "undefined" ? window.location.href : "";
	const whatsappMessage = encodeURIComponent(
		`Hi, I'm interested in ${product.name}. Here is the product link: ${productUrl}`
	);
	const whatsappLink = `https://wa.me/+918275434017?text=${whatsappMessage}`;

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: product.name,
					text: `Check out this organic product: ${product.name} - ${product.shortDescription}`,
					url: window.location.href,
				});
			} catch (error) {
				console.log("Error sharing:", error);
			}
		} else {
			// Fallback for browsers that don't support Web Share API
			try {
				await navigator.clipboard.writeText(window.location.href);
				alert("Product link copied to clipboard!");
			} catch (error) {
				console.log("Error copying to clipboard:", error);
			}
		}
	};

	const handleEnquireClick = () => {
		trackProductEnquiry(product.id).catch(console.error);
		window.open(whatsappLink, "_blank");
	};

	return (
		<div
			className={`${inter.className} min-h-screen bg-gradient-to-br from-amber-50 via-cream-50 to-yellow-50 py-4 sm:py-8`}
		>
			<div className='container mx-auto px-4'>
				<Breadcrumb
					items={[
						{ label: "Products", href: "/products" },
						{
							label: product.category,
							href: categoryId ? `/products/categories/${categoryId}` : "#",
						},
						{ label: product.name, href: `/products/${product.id}` },
					]}
				/>

				{/* Main Product Section */}
				<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8 overflow-hidden relative z-10'>
					<div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>
						{/* Image Gallery */}
						<div className='lg:w-[60%]'>
							<div className='flex flex-col gap-4'>
								{/* Main Image */}
								<div className='relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg group'>
									{/* Overlay Badges */}
									<div className='absolute bottom-4 left-4 flex flex-row items-center gap-3 z-10'>
										<span className='inline-flex items-center gap-2 bg-[#1B4D2A]/90 text-white text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full shadow'>
											<Shield className='w-3 h-3' /> Certified Organic
										</span>
										<span className='inline-flex items-center gap-2 bg-[#FDB913]/90 text-[#1B4D2A] text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full shadow'>
											<Award className='w-3 h-3' /> Premium Quality
										</span>
									</div>
									<Image
										src={selectedImage}
										alt={product.name}
										fill
										className='object-cover group-hover:scale-105 transition-transform duration-300'
									/>
								</div>

								{/* Thumbnails */}
								{allImages.length > 1 && (
									<div className='flex space-x-3 overflow-auto pb-1'>
										{allImages.map((image, index) => (
											<div
												key={index}
												className={`relative w-20 aspect-[4/3] sm:w-24 rounded-xl overflow-hidden flex-shrink-0 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border-2 ${
													selectedImage === image
														? "border-[#FDB913]"
														: "border-transparent hover:border-[#FDB913]"
												}`}
												onClick={() => setSelectedImage(image)}
											>
												<Image
													src={image || "/placeholder.svg"}
													alt={`${product.name} - Image ${index + 1}`}
													fill
													className='object-cover'
												/>
											</div>
										))}
									</div>
								)}
							</div>
						</div>

						{/* Product Info */}
						<div className='lg:w-[40%] space-y-6'>
							{/* Header */}
							<div className='space-y-4'>
								<div className='flex items-center justify-between'>
									<span className='inline-flex items-center gap-2 bg-gradient-to-r from-[#FDB913]/20 to-[#FDB913]/10 text-[#1B4D2A] px-4 py-2 rounded-full text-sm font-semibold border border-[#FDB913]/30'>
										<Leaf className='w-4 h-4' />
										{product.category}
									</span>
									<div className='flex items-center gap-2'>
										<button
											onClick={handleShare}
											className='p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
										>
											<Share2 className='w-5 h-5 text-gray-600' />
										</button>
									</div>
								</div>

								<h1
									className={`${playfair.className} text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B4D2A] leading-tight`}
								>
									{product.name}
								</h1>

								<p className='text-gray-700 text-lg leading-relaxed'>
									{product.shortDescription}
								</p>

								{/* Dietary Preferences */}
								{product.dietaryPreferences &&
									product.dietaryPreferences.length > 0 && (
										<div className='flex flex-wrap gap-2 pt-2'>
											{product.dietaryPreferences.map((pref, idx) => (
												<span
													key={idx}
													className='inline-block bg-[#1B4D2A]/10 text-[#1B4D2A] text-xs font-semibold px-3 py-1 rounded-full border border-[#1B4D2A]/20'
												>
													{pref}
												</span>
											))}
										</div>
									)}
							</div>

							{/* Trust Badges */}
							{/* Trust Badges Grid removed */}

							{/* Pricing Table */}
							{product.sizes && product.sizes.length > 0 && (
								<div className='bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 overflow-hidden shadow-inner'>
									<div className='p-0'>
										<table className='w-full'>
											<tbody>
												{product.sizes.map((size, index) => (
													<tr
														key={size.size}
														className={`${
															index % 2 === 0 ? "bg-white" : "bg-gray-50"
														} hover:bg-[#FDB913]/10 transition-colors`}
													>
														<td className='px-6 py-4 text-gray-800 font-medium'>
															{size.size}
														</td>
														<td className='px-6 py-4 text-right'>
															<span className='text-xl font-bold text-[#1B4D2A]'>
																₹{size.mrp.toFixed(2)}
															</span>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							)}

							{/* Action Button */}
							<div className='flex'>
								<Button
									size='lg'
									className='bg-gradient-to-r from-[#1B4D2A] to-[#2a6b3f] hover:from-[#1B4D2A]/90 hover:to-[#2a6b3f]/90 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 w-full justify-center text-lg'
									onClick={handleEnquireClick}
								>
									<MessageCircle className='w-6 h-6' />
									Enquire on WhatsApp
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Product Details - single card */}
				<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 space-y-8 mb-12'>
					{/* Description */}
					{(product.longDescription || product.description) && (
						<section className='space-y-4'>
							<h2
								className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-6 flex items-center gap-3`}
							>
								<div className='w-8 h-8 bg-gradient-to-br from-[#FDB913] to-[#ffdf8d] rounded-full flex items-center justify-center'>
									<FileText className='w-4 h-4 text-[#1B4D2A]' />
								</div>
								Product Description
							</h2>
							<p className='text-gray-700 leading-relaxed text-base sm:text-lg'>
								{product.longDescription || product.description}
							</p>
						</section>
					)}

					{/* Ingredients */}
					{product.ingredients && product.ingredients.length > 0 && (
						<section className='space-y-4'>
							<h2
								className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-6 flex items-center gap-3`}
							>
								<div className='w-8 h-8 bg-gradient-to-br from-[#FDB913] to-[#ffdf8d] rounded-full flex items-center justify-center'>
									<UtensilsCrossed className='w-4 h-4 text-[#1B4D2A]' />
								</div>
								Ingredients
							</h2>
							<ul className='space-y-3'>
								{product.ingredients.map((ingredient, idx) => (
									<li
										key={idx}
										className='flex items-center gap-3 text-gray-700 text-base sm:text-lg'
									>
										<div className='w-2 h-2 bg-[#FDB913] rounded-full flex-shrink-0' />
										{ingredient}
									</li>
								))}
							</ul>
						</section>
					)}

					{/* Nutritional Information */}
					{product.nutritionalInfo &&
						(product.nutritionalInfo.servingSize ||
							product.nutritionalInfo.calories ||
							product.nutritionalInfo.protein ||
							product.nutritionalInfo.carbohydrates ||
							product.nutritionalInfo.fat) && (
							<section className='space-y-4'>
								<h2
									className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-6 flex items-center gap-3`}
								>
									<div className='w-8 h-8 bg-gradient-to-br from-[#FDB913] to-[#ffdf8d] rounded-full flex items-center justify-center'>
										<BarChart className='w-4 h-4 text-[#1B4D2A]' />
									</div>
									Nutritional Information
								</h2>
								<div className='w-full sm:w-[35%]'>
									<table className='w-full text-left border border-gray-100'>
										<tbody>
											{product.nutritionalInfo.servingSize && (
												<tr className='border-b'>
													<td className='px-4 py-2 font-medium text-gray-700'>
														Serving Size
													</td>
													<td className='px-4 py-2 text-[#1B4D2A] font-semibold'>
														{product.nutritionalInfo.servingSize}
													</td>
												</tr>
											)}
											{product.nutritionalInfo.calories && (
												<tr className='border-b'>
													<td className='px-4 py-2 font-medium text-gray-700'>
														Calories
													</td>
													<td className='px-4 py-2 text-[#1B4D2A] font-semibold'>
														{product.nutritionalInfo.calories}
													</td>
												</tr>
											)}
											{product.nutritionalInfo.protein && (
												<tr className='border-b'>
													<td className='px-4 py-2 font-medium text-gray-700'>
														Protein
													</td>
													<td className='px-4 py-2 text-[#1B4D2A] font-semibold'>
														{product.nutritionalInfo.protein}
													</td>
												</tr>
											)}
											{product.nutritionalInfo.carbohydrates && (
												<tr className='border-b'>
													<td className='px-4 py-2 font-medium text-gray-700'>
														Carbohydrates
													</td>
													<td className='px-4 py-2 text-[#1B4D2A] font-semibold'>
														{product.nutritionalInfo.carbohydrates}
													</td>
												</tr>
											)}
											{product.nutritionalInfo.fat && (
												<tr>
													<td className='px-4 py-2 font-medium text-gray-700'>
														Fat
													</td>
													<td className='px-4 py-2 text-[#1B4D2A] font-semibold'>
														{product.nutritionalInfo.fat}
													</td>
												</tr>
											)}
										</tbody>
									</table>
								</div>
							</section>
						)}

					{/* Storage Instructions */}
					{product.storageInstructions &&
						product.storageInstructions.trim() && (
							<section className='space-y-4'>
								<h2
									className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-6 flex items-center gap-3`}
								>
									<div className='w-8 h-8 bg-gradient-to-br from-[#FDB913] to-[#ffdf8d] rounded-full flex items-center justify-center'>
										<Box className='w-4 h-4 text-[#1B4D2A]' />
									</div>
									Storage Instructions
								</h2>
								<p className='text-gray-700 leading-relaxed text-base sm:text-lg'>
									{product.storageInstructions}
								</p>
							</section>
						)}
				</div>

				{/* Related Products */}
				{relatedProducts.length > 0 && (
					<ProductSlider title='Related Products' products={relatedProducts} />
				)}
			</div>
		</div>
	);
}
