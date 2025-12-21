"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
	ChevronLeft,
	X,
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
	const router = useRouter();
	const [categoryId, setCategoryId] = useState<string>("");
	const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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
			className={`${inter.className} min-h-screen bg-gradient-to-br from-amber-50 via-cream-50 to-yellow-50`}
		>
			{/* Image Modal */}
			{isImageModalOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center'>
					<div className='relative w-full h-full sm:w-[90%] sm:h-[90%] flex flex-col'>
						{/* Close Button */}
						<button
							onClick={() => setIsImageModalOpen(false)}
							className='absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors'
						>
							<X className='w-6 h-6 text-white' />
						</button>

						{/* Image Container */}
						<div className='flex-1 relative m-4 sm:m-0'>
							<Image
								src={selectedImage}
								alt={product.name}
								fill
								className='object-contain'
								quality={100}
							/>
						</div>
					</div>
				</div>
			)}
			<main className='py-8 sm:py-12 md:py-16'>
				<div className='container mx-auto px-4'>
					{/* Back Button for Mobile */}
					<div className='lg:hidden mb-4'>
						<button
							onClick={() => router.back()}
							className='inline-flex items-center gap-2 text-[#1B4D2A] font-medium hover:text-[#2a6b3f] transition-colors'
						>
							<ChevronLeft className='w-5 h-5' />
							Back
						</button>
					</div>

					{/* Breadcrumb for Desktop */}
					<div className='hidden lg:block'>
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
					</div>
					<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8 overflow-hidden relative z-10'>
						<div className='flex flex-col lg:flex-row gap-6 lg:gap-12'>
							<div className='lg:hidden flex items-center justify-between'>
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

							<div className='lg:w-[50%]'>
								<div className='flex flex-col lg:flex-row gap-4'>
									<div className='order-2 lg:order-1 flex lg:flex-col overflow-x-auto lg:overflow-x-visible space-x-2 lg:space-x-0 lg:space-y-3 pb-1 lg:pb-0'>
										{allImages.map((image, index) => (
											<div
												key={index}
												className={`relative w-12 aspect-[3/4] sm:w-16 lg:w-20 flex-shrink-0 rounded-lg lg:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border-2 ${
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
									<div
										className='order-1 lg:order-2 relative aspect-[3/4] w-full lg:flex-1 rounded-2xl overflow-hidden shadow-lg group cursor-pointer'
										onClick={() => setIsImageModalOpen(true)}
									>
										<Image
											src={selectedImage}
											alt={product.name}
											fill
											className='object-cover'
										/>
									</div>
								</div>
							</div>

							{/* Product Info */}
							<div className='lg:w-[50%] space-y-6'>
								{/* Header */}
								<div className='space-y-4 sm:space-y-6 mb-0 sm:mb-12'>
									{/* Category and Share - Desktop Only */}
									<div className='hidden lg:flex items-center justify-between mb-16'>
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
									className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] flex items-center gap-3`}
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
						<ProductSlider
							title='Related Products'
							products={relatedProducts}
						/>
					)}
				</div>
			</main>
		</div>
	);
}
