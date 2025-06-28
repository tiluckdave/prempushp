"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "../types/firebase";
import { Button } from "@/components/ui/button";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

interface ProductCardProps {
	product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
	const startingPrice =
		product.sizes && product.sizes.length > 0
			? Math.min(...product.sizes.map((s) => s.mrp))
			: null;

	// Get the size for the starting price
	const startingPriceSize =
		product.sizes && product.sizes.length > 0
			? product.sizes.find((s) => s.mrp === startingPrice)?.size
			: null;

	const handleEnquire = () => {
		if (typeof window === "undefined") return;
		const productUrl = `${window.location.origin}/products/${product.id}`;
		const message = encodeURIComponent(
			`Hi, I'm interested in ${product.name}. Here is the product link: ${productUrl}`
		);
		window.open(`https://wa.me/+918275434017?text=${message}`, "_blank");
	};

	// SEO optimized alt text for product images
	const getImageAlt = (product: Product, isMain: boolean = true) => {
		const baseAlt = `${product.name} - Premium Organic ${product.category}`;
		const details = [];

		if (product.dietaryPreferences && product.dietaryPreferences.length > 0) {
			details.push(product.dietaryPreferences.join(", "));
		}

		if (startingPrice) {
			details.push(`Starting ₹${startingPrice}`);
		}

		details.push("Buy Online", "Prempushp");

		return isMain ? `${baseAlt} | ${details.join(" | ")}` : baseAlt;
	};

	const productImageUrl =
		product.coverImage || product.images?.[0] || "/placeholder.svg";
	const optimizedAlt = getImageAlt(product);

	return (
		<div className='group bg-white rounded-2xl overflow-hidden transition-all duration-500 flex flex-col h-full border border-gray-200 hover:outline hover:outline-2 hover:outline-[#FDB913] relative z-10'>
			<Link
				href={`/products/${product.id}`}
				className='block relative aspect-[4/3] overflow-hidden'
			>
				<Image
					src={productImageUrl}
					alt={optimizedAlt}
					fill
					className='object-cover transition-transform duration-300'
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
					priority={false}
					loading='lazy'
					quality={85}
				/>

				{/* Category Badge - Made smaller */}
				<div className='absolute top-3 left-3 bg-gradient-to-r from-[#FDB913] to-[#ffdf8d] text-[#1B4D2A] px-3 py-1 rounded-full text-xs font-bold border border-white/50 backdrop-blur-sm'>
					{product.category}
				</div>
			</Link>

			<div className='p-5 sm:p-6 flex-grow flex flex-col justify-between'>
				<div className='space-y-3'>
					<Link href={`/products/${product.id}`}>
						<h3
							className={`${playfair.className} text-lg sm:text-xl font-bold text-[#1B4D2A] mb-2 hover:text-[#1B4D2A] transition-colors`}
						>
							{product.name.length > 21
								? `${product.name.substring(0, 21)}...`
								: product.name}
						</h3>
					</Link>

					{/* Description with exactly 2 lines and consistent height */}
					<div className='h-[3rem]'>
						{" "}
						{/* Fixed height for 2 lines */}
						<p className='text-sm text-gray-600 line-clamp-2 leading-relaxed'>
							{product.shortDescription && product.shortDescription.length > 68
								? `${product.shortDescription.substring(0, 68)}...`
								: product.shortDescription}
						</p>
					</div>
				</div>

				<div className='mt-4 pt-4 border-t border-gray-100'>
					{startingPrice !== null && (
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-xl font-bold text-[#1B4D2A]'>
									₹{startingPrice.toFixed(2)}
								</p>
								{startingPriceSize && (
									<p className='text-xs text-gray-500'>
										for {startingPriceSize}
									</p>
								)}
							</div>
							<Button
								size='sm'
								className='bg-gradient-to-r from-[#1B4D2A] to-[#2a6b3f] hover:from-[#1B4D2A]/90 hover:to-[#2a6b3f]/90 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300'
								onClick={handleEnquire}
							>
								Enquire
							</Button>
						</div>
					)}
				</div>
			</div>

			{/* Structured Data for Product */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org/",
						"@type": "Product",
						name: product.name,
						image: productImageUrl,
						description: product.shortDescription || product.description,
						brand: {
							"@type": "Brand",
							name: "Prempushp",
						},
						category: product.category,
						offers: startingPrice
							? {
									"@type": "Offer",
									price: startingPrice,
									priceCurrency: "INR",
									availability: "https://schema.org/InStock",
									url: `${
										typeof window !== "undefined" ? window.location.origin : ""
									}/products/${product.id}`,
							  }
							: undefined,
						additionalProperty: [
							{
								"@type": "PropertyValue",
								name: "Organic Certified",
								value: "Yes",
							},
							...(product.dietaryPreferences?.map((diet) => ({
								"@type": "PropertyValue",
								name: "Dietary Preference",
								value: diet,
							})) || []),
						],
					}),
				}}
			/>
		</div>
	);
}
