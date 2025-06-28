"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProductSlider from "./components/ProductSlider";
import {
	Leaf,
	Shield,
	Award,
	TrendingUp,
	Star,
	Users,
	Heart,
} from "lucide-react";
import { Playfair_Display, Inter } from "next/font/google";
import {
	getAllProducts,
	getFeaturedProducts,
	getAllCategories,
} from "./services/firebase";
import { Product, Category } from "./types/firebase";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const [products, setProducts] = useState<Product[]>([]);
	const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				const [allProducts, featured, allCategories] = await Promise.all([
					getAllProducts(),
					getFeaturedProducts(),
					getAllCategories(),
				]);

				setProducts(allProducts);
				setFeaturedProducts(featured);
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

	// Generate structured data for homepage
	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Prempushp - Premium Organic Food Products",
		alternateName: "Prempushp Food Products",
		url: baseUrl,
		description:
			"Discover premium organic food products - certified organic, sustainably sourced, delivered fresh from our farms to your family.",
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

	const organizationSchema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Prempushp",
		alternateName: "Prempushp Food Products",
		url: baseUrl,
		logo: `${baseUrl}/logo.png`,
		description:
			"Premium organic food products - certified organic, sustainably sourced, and delivered fresh from farms to your family.",
		contactPoint: {
			"@type": "ContactPoint",
			telephone: "+91-8275434017",
			contactType: "customer service",
			availableLanguage: ["English", "Hindi"],
		},
		address: {
			"@type": "PostalAddress",
			addressCountry: "IN",
		},
		areaServed: "IN",
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Organic Food Products",
			itemListElement: categories.map((category) => ({
				"@type": "OfferCatalog",
				name: `Organic ${category.name}`,
				itemListElement: products
					.filter((p) => p.category === category.name)
					.slice(0, 5)
					.map((product) => ({
						"@type": "Offer",
						itemOffered: {
							"@type": "Product",
							name: product.name,
							description: product.shortDescription || product.description,
							image: product.coverImage || product.images?.[0],
							brand: {
								"@type": "Brand",
								name: "Prempushp",
							},
						},
					})),
			})),
		},
	};

	// FAQ Schema for common questions
	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: [
			{
				"@type": "Question",
				name: "Are Prempushp products certified organic?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Yes, all our products are certified organic, sustainably sourced, and free from chemicals, preservatives, and artificial additives.",
				},
			},
			{
				"@type": "Question",
				name: "What types of organic food products does Prempushp offer?",
				acceptedAnswer: {
					"@type": "Answer",
					text: `We offer a wide range of premium organic food products including ${categories
						.map((c) => c.name.toLowerCase())
						.join(", ")}. All products are handpicked and quality assured.`,
				},
			},
			{
				"@type": "Question",
				name: "How can I become a distributor for Prempushp products?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "You can join our distributor network by visiting our become-distributor page or contacting us directly. We offer attractive margins and support for our distribution partners.",
				},
			},
		],
	};

	return (
		<>
			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(websiteSchema),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(organizationSchema),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(faqSchema),
				}}
			/>

			<div className={`${inter.className} min-h-screen`}>
				<section className='relative py-12 sm:py-16 md:py-20 overflow-hidden'>
					<div className='absolute inset-0 bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200'></div>
					<div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23FDB913" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>

					<div className='relative container mx-auto px-4 text-center'>
						<div className='max-w-4xl mx-auto'>
							<div className='mb-6 sm:mb-8'>
								<span className='text-[#1B4D2A]/70 text-sm sm:text-base font-medium tracking-wide uppercase'>
									Organic Premium Products
								</span>
							</div>

							<h1
								className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl font-bold text-[#1B4D2A] mb-6 leading-tight`}
							>
								Prempushp&nbsp;Food Products
							</h1>

							<p className='text-lg sm:text-xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto'>
								Experience nature's purest flavours with our handcrafted range
								of certified organic foods – sustainably grown, ethically
								sourced, and delivered fresh from our farms to your family.
							</p>

							<Button
								asChild
								size='lg'
								className='group relative bg-gradient-to-r from-[#1B4D2A] via-[#2A5A3A] to-[#1B4D2A] hover:from-[#FDB913] hover:via-[#ffdf8d] hover:to-[#FDB913] text-white hover:text-[#1B4D2A] text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-[#FDB913]/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border-2 border-transparent hover:border-[#1B4D2A]/20'
							>
								<Link href='/products' className='flex items-center gap-3'>
									<span className='relative z-10'>Explore Our Products</span>
									<div className='w-2 h-2 bg-current rounded-full group-hover:animate-bounce relative z-10'></div>
								</Link>
							</Button>
						</div>
					</div>
				</section>

				<section className='py-8 sm:py-12 md:py-16'>
					<div className='container mx-auto px-4'>
						<div className='text-center mb-8'>
							<h2
								className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4D2A] mb-6`}
							>
								Featured Products
							</h2>
							<p className='text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto'>
								Discover our customers' favorite organic products, carefully
								selected for their exceptional quality and taste.
							</p>
						</div>
						<ProductSlider products={featuredProducts} />
					</div>
				</section>

				<section className='py-6 sm:py-8 md:py-10 bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200'>
					<div className='container mx-auto px-4'>
						<div className='text-center mb-6 sm:mb-8'>
							<h2
								className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B4D2A] mb-3`}
							>
								Why Choose Our Products
							</h2>
							<p className='text-gray-600 text-base sm:text-lg max-w-2xl mx-auto'>
								Quality, sustainability, and your family's health.
							</p>
						</div>
						<div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'>
							<div className='group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-5 text-center border border-gray-100'>
								<div className='w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-xl flex items-center justify-center'>
									<Leaf className='w-6 h-6 sm:w-7 sm:h-7 text-[#1B4D2A]' />
								</div>
								<h3
									className={`${playfair.className} text-sm sm:text-base md:text-lg font-bold mb-2 text-[#1B4D2A]`}
								>
									100% Organic
								</h3>
								<p className='text-gray-600 text-xs sm:text-sm leading-relaxed'>
									Certified organic products for your family's health.
								</p>
							</div>

							<div className='group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-5 text-center border border-gray-100'>
								<div className='w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-xl flex items-center justify-center'>
									<Shield className='w-6 h-6 sm:w-7 sm:h-7 text-[#1B4D2A]' />
								</div>
								<h3
									className={`${playfair.className} text-sm sm:text-base md:text-lg font-bold mb-2 text-[#1B4D2A]`}
								>
									No Preservatives
								</h3>
								<p className='text-gray-600 text-xs sm:text-sm leading-relaxed'>
									Natural taste without artificial additives.
								</p>
							</div>

							<div className='group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-5 text-center border border-gray-100'>
								<div className='w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-xl flex items-center justify-center'>
									<Award className='w-6 h-6 sm:w-7 sm:h-7 text-[#1B4D2A]' />
								</div>
								<h3
									className={`${playfair.className} text-sm sm:text-base md:text-lg font-bold mb-2 text-[#1B4D2A]`}
								>
									Premium Quality
								</h3>
								<p className='text-gray-600 text-xs sm:text-sm leading-relaxed'>
									Rigorous quality checks for excellence.
								</p>
							</div>

							<div className='group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-5 text-center border border-gray-100'>
								<div className='w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-xl flex items-center justify-center'>
									<TrendingUp className='w-6 h-6 sm:w-7 sm:h-7 text-[#1B4D2A]' />
								</div>
								<h3
									className={`${playfair.className} text-sm sm:text-base md:text-lg font-bold mb-2 text-[#1B4D2A]`}
								>
									Sustainably Sourced
								</h3>
								<p className='text-gray-600 text-xs sm:text-sm leading-relaxed'>
									Ethical sourcing that benefits communities.
								</p>
							</div>
						</div>
					</div>
				</section>

				{categories.map((category, index) => {
					const categoryProducts = products.filter(
						(p) => p.category === category.name
					);

					if (categoryProducts.length === 0) return null;

					return (
						<section key={category.id} className='py-8 sm:py-12 md:py-16'>
							<div className='container mx-auto px-4'>
								<div className='flex flex-row justify-between items-center mb-6 sm:mb-8 gap-4'>
									<h2
										className={`${playfair.className} text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1B4D2A] flex-1`}
									>
										{category.name}
									</h2>
									<Button
										asChild
										variant='outline'
										size='sm'
										className='text-[#1B4D2A] border-[#1B4D2A] hover:bg-[#1B4D2A] hover:text-white rounded-full font-semibold transition-all duration-300 text-xs sm:text-sm px-4 py-2 sm:px-6 sm:py-3 whitespace-nowrap'
									>
										<Link href={`/products/categories/${category.id}`}>
											View All
										</Link>
									</Button>
								</div>
								<ProductSlider products={categoryProducts} />
							</div>
						</section>
					);
				})}

				<section className='py-8 sm:py-12 md:py-16'>
					<div className='container mx-auto px-4'>
						<div className='max-w-4xl mx-auto'>
							<div className='bg-gradient-to-br from-[#FDB913] to-[#ffdf8d] rounded-2xl shadow-xl p-8 sm:p-12 md:p-16 text-center'>
								<h2
									className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4D2A] mb-6 sm:mb-8`}
								>
									Become a Distributor
								</h2>
								<p className='text-gray-800 mb-8 sm:mb-12 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed'>
									Join our network of distributors and bring premium organic
									products to your local community. Build a profitable business
									while promoting healthy living.
								</p>
								<div className='flex justify-center'>
									<Button
										asChild
										size='lg'
										className='bg-[#1B4D2A] text-white hover:bg-[#1B4D2A]/90 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300'
									>
										<Link href='/become-distributor'>Learn More</Link>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
