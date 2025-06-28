"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { Playfair_Display, Inter } from "next/font/google";
import { TrendingUp, Users, Award, Target, CheckCircle } from "lucide-react";
import { submitDistributorApplication } from "../services/firebase";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function BecomeDistributorPage() {
	const [formData, setFormData] = useState({
		name: "",
		firmName: "",
		email: "",
		phone: "",
		city: "",
		state: "",
		address: "",
		investmentCapital: "",
		reason: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const success = await submitDistributorApplication(formData);
			if (success) {
				setFormData({
					name: "",
					firmName: "",
					email: "",
					phone: "",
					city: "",
					state: "",
					address: "",
					investmentCapital: "",
					reason: "",
				});
				toast.success(
					"Application submitted successfully! We'll be in touch soon."
				);
			} else {
				toast.error("An error occurred. Please try again.");
			}
		} catch (error) {
			console.error("Error submitting application:", error);
			toast.error("An error occurred. Please try again.");
		}
	};

	const benefits = [
		{
			icon: TrendingUp,
			title: "High Profit Margins",
			description:
				"Enjoy attractive profit margins on our premium organic products with growing market demand.",
		},
		{
			icon: Users,
			title: "Minimal Investment",
			description:
				"Start with a minimal investment and grow your business with Prempushp Foods.",
		},
		{
			icon: Award,
			title: "Exclusive Territory",
			description:
				"Secure exclusive distribution rights in your area with protected territory boundaries.",
		},
		{
			icon: Target,
			title: "Advertisement Material",
			description:
				"We provide all the necessary marketing materials to help promote our products.",
		},
	];

	const requirements = [
		"Minimum investment capital of ₹15-20 thousand",
		"Dedicated storage space for inventory",
		"Local market knowledge and connections",
		"Commitment to brand values and quality",
		"Basic business registration and licenses",
	];

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
								Partner With Us
							</span>
						</div>

						<h1
							className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl font-bold text-[#1B4D2A] mb-6 leading-tight`}
						>
							Become a Distributor
						</h1>

						<p className='text-lg sm:text-xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto'>
							Join our growing network of successful distributors and be part of
							India's organic food revolution. Build a profitable business while
							promoting healthy living.
						</p>
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className='py-12 sm:py-16 md:py-20'>
				<div className='container mx-auto px-4'>
					<div className='max-w-6xl mx-auto'>
						<div className='text-center mb-12 sm:mb-16'>
							<h2
								className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4D2A] mb-6`}
							>
								Why Partner With Us?
							</h2>
							<p className='text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto'>
								Discover the advantages of becoming a Prempushp distributor and
								how we support your business growth.
							</p>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
							{benefits.map((benefit, index) => (
								<div
									key={index}
									className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 sm:p-8 text-center border border-gray-100 hover:border-[#FDB913]/30 hover:-translate-y-2'
								>
									<div className='w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
										<benefit.icon className='w-8 h-8 sm:w-10 sm:h-10 text-[#1B4D2A]' />
									</div>
									<h3
										className={`${playfair.className} text-xl sm:text-2xl font-bold mb-4 text-[#1B4D2A]`}
									>
										{benefit.title}
									</h3>
									<p className='text-gray-600 leading-relaxed'>
										{benefit.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Requirements Section */}
			<section className='py-12 sm:py-16 md:py-20'>
				<div className='container mx-auto px-4'>
					<div className='max-w-4xl mx-auto'>
						<div className='text-center mb-12'>
							<h2
								className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4D2A] mb-6`}
							>
								Requirements
							</h2>
							<p className='text-gray-600 text-lg sm:text-xl'>
								Here's what we look for in our distribution partners:
							</p>
						</div>

						<div className='bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-gray-100'>
							<div className='space-y-4'>
								{requirements.map((requirement, index) => (
									<div key={index} className='flex items-start gap-4'>
										<div className='flex-shrink-0 w-6 h-6 bg-[#FDB913] rounded-full flex items-center justify-center mt-1'>
											<CheckCircle className='w-4 h-4 text-[#1B4D2A]' />
										</div>
										<p className='text-gray-700 text-base sm:text-lg leading-relaxed'>
											{requirement}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Application Form Section */}
			<section className='py-12 sm:py-16 md:py-20'>
				<div className='container mx-auto px-4'>
					<div className='max-w-4xl mx-auto'>
						<div className='text-center mb-12'>
							<h2
								className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4D2A] mb-6`}
							>
								Apply Now
							</h2>
							<p className='text-gray-600 text-lg sm:text-xl'>
								Ready to start your journey with us? Fill out the application
								form below and we'll get in touch with you soon.
							</p>
						</div>

						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<form onSubmit={handleSubmit} className='space-y-6'>
								{/* Personal Information */}
								<div>
									<h3
										className={`${playfair.className} text-xl sm:text-2xl font-bold text-[#1B4D2A] mb-6`}
									>
										Personal Information
									</h3>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
										<div>
											<label className='block text-sm font-semibold text-gray-700 mb-2'>
												Full Name *
											</label>
											<Input
												type='text'
												name='name'
												placeholder='Enter your full name'
												value={formData.name}
												onChange={handleChange}
												required
												className='h-12 border-2 border-gray-200 focus:ring-2 focus:ring-[#FDB913] focus:border-[#FDB913] rounded-xl text-base transition-all duration-300'
											/>
										</div>
										<div>
											<label className='block text-sm font-semibold text-gray-700 mb-2'>
												Firm Name *
											</label>
											<Input
												type='text'
												name='firmName'
												placeholder='Enter your firm/company name'
												value={formData.firmName}
												onChange={handleChange}
												required
												className='h-12 border-2 border-gray-200 focus:ring-2 focus:ring-[#FDB913] focus:border-[#FDB913] rounded-xl text-base transition-all duration-300'
											/>
										</div>
										<div>
											<label className='block text-sm font-semibold text-gray-700 mb-2'>
												Email Address *
											</label>
											<Input
												type='email'
												name='email'
												placeholder='Enter your email address'
												value={formData.email}
												onChange={handleChange}
												required
												className='h-12 border-2 border-gray-200 focus:ring-2 focus:ring-[#FDB913] focus:border-[#FDB913] rounded-xl text-base transition-all duration-300'
											/>
										</div>
										<div>
											<label className='block text-sm font-semibold text-gray-700 mb-2'>
												Phone Number *
											</label>
											<Input
												type='tel'
												name='phone'
												placeholder='Enter your phone number'
												value={formData.phone}
												onChange={handleChange}
												required
												className='h-12 border-2 border-gray-200 focus:ring-2 focus:ring-[#FDB913] focus:border-[#FDB913] rounded-xl text-base transition-all duration-300'
											/>
										</div>
										<div>
											<label className='block text-sm font-semibold text-gray-700 mb-2'>
												Investment Capital *
											</label>
											<Input
												type='text'
												name='investmentCapital'
												placeholder='e.g., ₹5 lakhs'
												value={formData.investmentCapital}
												onChange={handleChange}
												required
												className='h-12 border-2 border-gray-200 focus:ring-2 focus:ring-[#FDB913] focus:border-[#FDB913] rounded-xl text-base transition-all duration-300'
											/>
										</div>
									</div>
								</div>

								{/* Location Information */}
								<div>
									<h3
										className={`${playfair.className} text-xl sm:text-2xl font-bold text-[#1B4D2A] mb-6`}
									>
										Location Information
									</h3>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
										<div>
											<label className='block text-sm font-semibold text-gray-700 mb-2'>
												City *
											</label>
											<Input
												type='text'
												name='city'
												placeholder='Enter your city'
												value={formData.city}
												onChange={handleChange}
												required
												className='h-12 border-2 border-gray-200 focus:ring-2 focus:ring-[#FDB913] focus:border-[#FDB913] rounded-xl text-base transition-all duration-300'
											/>
										</div>
										<div>
											<label className='block text-sm font-semibold text-gray-700 mb-2'>
												State *
											</label>
											<Input
												type='text'
												name='state'
												placeholder='Enter your state'
												value={formData.state}
												onChange={handleChange}
												required
												className='h-12 border-2 border-gray-200 focus:ring-2 focus:ring-[#FDB913] focus:border-[#FDB913] rounded-xl text-base transition-all duration-300'
											/>
										</div>
									</div>
									<div>
										<label className='block text-sm font-semibold text-gray-700 mb-2'>
											Complete Address *
										</label>
										<Textarea
											name='address'
											placeholder='Enter your complete address including pincode'
											value={formData.address}
											onChange={handleChange}
											required
											rows={3}
											className='border-2 border-gray-200 focus:ring-2 focus:ring-[#FDB913] focus:border-[#FDB913] rounded-xl text-base transition-all duration-300 resize-none'
										/>
									</div>
								</div>

								{/* Additional Information */}
								<div>
									<h3
										className={`${playfair.className} text-xl sm:text-2xl font-bold text-[#1B4D2A] mb-6`}
									>
										Tell Us About Yourself
									</h3>
									<div>
										<label className='block text-sm font-semibold text-gray-700 mb-2'>
											Why do you want to become a distributor? *
										</label>
										<Textarea
											name='reason'
											placeholder='Tell us about your motivation, experience, and how you plan to grow the business in your area...'
											value={formData.reason}
											onChange={handleChange}
											required
											rows={5}
											className='border-2 border-gray-200 focus:ring-2 focus:ring-[#FDB913] focus:border-[#FDB913] rounded-xl text-base transition-all duration-300 resize-none'
										/>
									</div>
								</div>

								<Button
									type='submit'
									size='lg'
									className='w-full bg-[#1B4D2A] text-white hover:bg-[#1B4D2A]/90 h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'
								>
									Submit Application
								</Button>
							</form>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section className='py-12 sm:py-16 md:py-20'>
				<div className='container mx-auto px-4'>
					<div className='max-w-4xl mx-auto text-center'>
						<div className='bg-gradient-to-br from-[#FDB913] to-[#ffdf8d] rounded-2xl shadow-xl p-8 sm:p-12'>
							<h2
								className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B4D2A] mb-6`}
							>
								Have Questions?
							</h2>
							<p className='text-gray-800 mb-6 text-base sm:text-lg max-w-2xl mx-auto'>
								We're here to help you understand the opportunity.
							</p>
							<a
								href='/contact'
								className='inline-flex items-center justify-center px-8 py-4 bg-[#1B4D2A] text-white font-semibold rounded-full hover:bg-[#1B4D2A]/90 transition-all duration-300 shadow-lg hover:shadow-xl'
							>
								Contact Us
							</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
