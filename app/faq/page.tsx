"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const faqs = [
	{
		question: "What makes Prem Pushp products organic?",
		answer:
			"All Prem Pushp products are certified organic, meaning they are grown without the use of synthetic pesticides, herbicides, or fertilizers. Our farmers follow strict organic farming practices, and our products are regularly tested to ensure they meet organic standards.",
		category: "Quality",
	},
	{
		question: "How do you ensure the quality of your products?",
		answer:
			"We maintain strict quality control measures throughout our supply chain. This includes regular inspections of our partner farms, careful selection of ingredients, and rigorous testing of our final products. We also work closely with certified laboratories to verify the nutritional content and purity of our products.",
		category: "Quality",
	},
	{
		question: "Are your products suitable for vegans?",
		answer:
			"Yes, all of our products are 100% plant-based and suitable for vegans. We do not use any animal-derived ingredients in our products.",
		category: "Products",
	},
	{
		question:
			"How do you keep your prices affordable while maintaining organic quality?",
		answer:
			"We work directly with farmers, cutting out middlemen to keep costs down. We also invest in efficient processing and packaging methods. By focusing on seasonal, locally-sourced ingredients, we're able to offer high-quality organic products at competitive prices.",
		category: "Pricing",
	},
	{
		question: "What is your shipping policy?",
		answer:
			"We offer free shipping on orders over ₹1000. For orders below this amount, a flat shipping fee of ₹50 is applied. We typically process and ship orders within 1-2 business days, and delivery times vary depending on your location.",
		category: "Shipping",
	},
	{
		question: "Do you offer international shipping?",
		answer:
			"Currently, we only ship within India. We're working on expanding our shipping capabilities and hope to offer international shipping in the future.",
		category: "Shipping",
	},
	{
		question: "What is your return policy?",
		answer:
			"We have a 30-day return policy. If you're not satisfied with your purchase, you can return it within 30 days for a full refund. Please note that the product must be unused and in its original packaging.",
		category: "Returns",
	},
	{
		question: "How should I store your products?",
		answer:
			"Most of our products should be stored in a cool, dry place away from direct sunlight. Specific storage instructions are provided on each product's packaging and detail page on our website.",
		category: "Products",
	},
	{
		question: "Do you offer bulk discounts?",
		answer:
			"Yes, we offer attractive bulk discounts for orders above certain quantities. Please contact our sales team for custom pricing on bulk orders. We also have special rates for distributors and retailers.",
		category: "Pricing",
	},
	{
		question: "How can I become a distributor?",
		answer:
			"We're always looking for passionate partners to help us spread organic goodness. Visit our 'Become a Distributor' page to learn about our partnership opportunities and application process.",
		category: "Partnership",
	},
];

export default function FAQPage() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<div className={`${inter.className} min-h-screen`}>
			{/* Premium Hero Section */}
			<section className='relative py-12 sm:py-16 md:py-20 overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200'></div>
				<div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FDB913\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>

				<div className='relative container mx-auto px-4 text-center'>
					<div className='max-w-4xl mx-auto'>
						{/* Subtle Badge */}
						<div className='mb-6 sm:mb-8'>
							<span className='text-[#1B4D2A]/70 text-sm sm:text-base font-medium tracking-wide uppercase'>
								FAQs
							</span>
						</div>

						{/* Main Title */}
						<h1
							className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl font-bold text-[#1B4D2A] mb-6 leading-tight`}
						>
							Frequently Asked Questions
						</h1>

						{/* Subtitle */}
						<p className='text-lg sm:text-xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto'>
							Find answers to common questions about our organic products,
							shipping, returns, and more. Can't find what you're looking for?
							Contact us!
						</p>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className='py-12 sm:py-16 md:py-20'>
				<div className='container mx-auto px-4'>
					<div className='max-w-4xl mx-auto'>
						<div className='space-y-4 sm:space-y-6'>
							{faqs.map((faq, index) => (
								<div
									key={index}
									className='group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden'
								>
									<button
										className='flex justify-between items-center w-full p-6 sm:p-8 text-left hover:bg-gray-50/50 focus:outline-none transition-colors duration-300'
										onClick={() =>
											setOpenIndex(openIndex === index ? null : index)
										}
									>
										<div className='flex-1 pr-4'>
											<div className='flex items-center gap-3 mb-2'>
												<span className='px-3 py-1 bg-[#FDB913]/10 text-[#1B4D2A] text-xs font-semibold rounded-full'>
													{faq.category}
												</span>
											</div>
											<span
												className={`${playfair.className} text-lg sm:text-xl font-semibold text-[#1B4D2A] leading-relaxed`}
											>
												{faq.question}
											</span>
										</div>
										<div className='flex-shrink-0'>
											{openIndex === index ? (
												<ChevronUp className='h-6 w-6 text-[#FDB913] transition-transform duration-300' />
											) : (
												<ChevronDown className='h-6 w-6 text-[#FDB913] transition-transform duration-300' />
											)}
										</div>
									</button>
									{openIndex === index && (
										<div className='px-6 sm:px-8 pb-6 sm:pb-8'>
											<div className='pt-4 border-t border-gray-100'>
												<p className='text-gray-700 text-base sm:text-lg leading-relaxed'>
													{faq.answer}
												</p>
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Contact CTA Section */}
			<section className='py-12 sm:py-16 md:py-20'>
				<div className='container mx-auto px-4'>
					<div className='max-w-4xl mx-auto text-center'>
						<div className='bg-gradient-to-br from-[#FDB913] to-[#ffdf8d] rounded-2xl shadow-xl p-8 sm:p-12'>
							<h2
								className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B4D2A] mb-4 sm:mb-6`}
							>
								Still Have Questions?
							</h2>
							<p className='text-gray-800 mb-6 sm:mb-8 text-base sm:text-lg max-w-2xl mx-auto'>
								Can't find the answer you're looking for? Our friendly customer
								support team is here to help you with any questions or concerns.
							</p>
							<div className='flex flex-col sm:flex-row gap-4 justify-center'>
								<a
									href='/contact'
									className='inline-flex items-center justify-center px-8 py-4 bg-[#1B4D2A] text-white font-semibold rounded-full hover:bg-[#1B4D2A]/90 transition-all duration-300 shadow-lg hover:shadow-xl'
								>
									Contact Support
								</a>
								<a
									href='mailto:prempushp.akola@gmail.com'
									className='inline-flex items-center justify-center px-8 py-4 border-2 border-[#1B4D2A] text-[#1B4D2A] font-semibold rounded-full hover:bg-[#1B4D2A] hover:text-white transition-all duration-300'
								>
									Email Us
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
