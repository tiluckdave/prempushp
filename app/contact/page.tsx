"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Playfair_Display, Inter } from "next/font/google";
import { toast } from "react-hot-toast";
import { submitContactResponse } from "../services/firebase";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const success = await submitContactResponse({
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				message: formData.message,
			});
			if (success) {
				setFormData({ name: "", email: "", phone: "", message: "" });
				toast.success(
					"Thank you for your message. We will get back to you soon!"
				);
			} else {
				toast.error("An error occurred. Please try again.");
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			toast.error("An error occurred. Please try again.");
		}
	};

	return (
		<div className={`${inter.className} min-h-screen`}>
			<section className='relative py-12 sm:py-16 md:py-20 overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200'></div>
				<div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FDB913\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>

				<div className='relative container mx-auto px-4 text-center'>
					<div className='max-w-4xl mx-auto'>
						<div className='mb-6 sm:mb-8'>
							<span className='text-[#1B4D2A]/70 text-sm sm:text-base font-medium tracking-wide uppercase'>
								Contact Us
							</span>
						</div>

						<h1
							className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl font-bold text-[#1B4D2A] mb-6 leading-tight`}
						>
							Get in Touch
						</h1>
						<p className='text-lg sm:text-xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto'>
							We'd love to hear from you! Whether you have questions about our
							products, need support, or want to partner with us, we're here to
							help.
						</p>
					</div>
				</div>
			</section>

			<section className='py-12 sm:py-16 md:py-20'>
				<div className='container mx-auto px-4'>
					<div className='max-w-6xl mx-auto'>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
							<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
								<div className='mb-8'>
									<h2
										className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B4D2A] mb-4`}
									>
										Send us a Message
									</h2>
									<p className='text-gray-600 text-base sm:text-lg'>
										Fill out the form below and we'll get back to you as soon as
										possible.
									</p>
								</div>

								<form onSubmit={handleSubmit} className='space-y-6'>
									<div>
										<label
											htmlFor='name'
											className='block text-sm font-semibold text-gray-700 mb-2'
										>
											Full Name
										</label>
										<Input
											type='text'
											id='name'
											name='name'
											value={formData.name}
											onChange={handleChange}
											required
											className='w-full h-12 border-2 border-gray-200 focus:ring-2 focus:ring-[#FDB913] focus:border-[#FDB913] rounded-xl text-base transition-all duration-300'
											placeholder='Enter your full name'
										/>
									</div>
									<div>
										<label
											htmlFor='email'
											className='block text-sm font-semibold text-gray-700 mb-2'
										>
											Email Address
										</label>
										<Input
											type='email'
											id='email'
											name='email'
											value={formData.email}
											onChange={handleChange}
											required
											className='w-full h-12 border-2 border-gray-200 focus:ring-2 focus:ring-[#FDB913] focus:border-[#FDB913] rounded-xl text-base transition-all duration-300'
											placeholder='Enter your email address'
										/>
									</div>
									<div>
										<label
											htmlFor='phone'
											className='block text-sm font-semibold text-gray-700 mb-2'
										>
											Phone Number
										</label>
										<Input
											type='tel'
											id='phone'
											name='phone'
											value={formData.phone}
											onChange={handleChange}
											required
											className='w-full h-12 border-2 border-gray-200 focus:ring-2 focus:ring-[#FDB913] focus:border-[#FDB913] rounded-xl text-base transition-all duration-300'
											placeholder='Enter your phone number'
										/>
									</div>
									<div>
										<label
											htmlFor='message'
											className='block text-sm font-semibold text-gray-700 mb-2'
										>
											Message
										</label>
										<Textarea
											id='message'
											name='message'
											value={formData.message}
											onChange={handleChange}
											required
											className='w-full border-2 border-gray-200 focus:ring-2 focus:ring-[#FDB913] focus:border-[#FDB913] rounded-xl text-base transition-all duration-300 resize-none'
											rows={6}
											placeholder='Tell us how we can help you...'
										/>
									</div>
									<Button
										type='submit'
										size='lg'
										className='w-full bg-[#1B4D2A] text-white hover:bg-[#1B4D2A]/90 h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2'
									>
										<Send className='w-5 h-5' />
										Send Message
									</Button>
								</form>
							</div>

							<div className='space-y-8'>
								<div>
									<h2
										className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B4D2A] mb-6`}
									>
										Contact Information
									</h2>
									<p className='text-gray-600 text-base sm:text-lg mb-8'>
										Reach out to us through any of these channels. We're always
										happy to help!
									</p>
								</div>

								<div className='space-y-6'>
									<div className='group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-[#FDB913]/30'>
										<div className='flex items-start space-x-4'>
											<div className='w-12 h-12 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
												<Mail className='w-6 h-6 text-[#1B4D2A]' />
											</div>
											<div>
												<h3
													className={`${playfair.className} text-xl font-bold text-[#1B4D2A] mb-2`}
												>
													Email Us
												</h3>
												<p className='text-gray-600 mb-1'>
													Send us an email anytime
												</p>
												<a
													href='mailto:prempushp.akola@gmail.com'
													className='text-[#1B4D2A] font-semibold hover:text-[#FDB913] transition-colors duration-300'
												>
													prempushp.akola@gmail.com
												</a>
											</div>
										</div>
									</div>

									<div className='group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-[#FDB913]/30'>
										<div className='flex items-start space-x-4'>
											<div className='w-12 h-12 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
												<Phone className='w-6 h-6 text-[#1B4D2A]' />
											</div>
											<div>
												<h3
													className={`${playfair.className} text-xl font-bold text-[#1B4D2A] mb-2`}
												>
													Call Us
												</h3>
												<p className='text-gray-600 mb-1'>
													Speak with our team directly
												</p>
												<a
													href='tel:+918275434017'
													className='text-[#1B4D2A] font-semibold hover:text-[#FDB913] transition-colors duration-300'
												>
													+91 8275434017
												</a>
											</div>
										</div>
									</div>

									<div className='group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-[#FDB913]/30'>
										<div className='flex items-start space-x-4'>
											<div className='w-12 h-12 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
												<MapPin className='w-6 h-6 text-[#1B4D2A]' />
											</div>
											<div>
												<h3
													className={`${playfair.className} text-xl font-bold text-[#1B4D2A] mb-2`}
												>
													Visit Us
												</h3>
												<p className='text-gray-600 mb-1'>
													Come see us in person
												</p>
												<p className='text-[#1B4D2A] font-semibold'>
													PremPushp, M16, VHB Colony
													<br />
													Gaurakshan Road, near Gaurakshan Sansthan
													<br />
													Akola, 444004, MH, IN
												</p>
											</div>
										</div>
									</div>

									<div className='group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-[#FDB913]/30'>
										<div className='flex items-start space-x-4'>
											<div className='w-12 h-12 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
												<Clock className='w-6 h-6 text-[#1B4D2A]' />
											</div>
											<div>
												<h3
													className={`${playfair.className} text-xl font-bold text-[#1B4D2A] mb-2`}
												>
													Business Hours
												</h3>
												<p className='text-gray-600 mb-1'>We're available</p>
												<div className='text-[#1B4D2A] font-semibold'>
													<p>Monday - Friday: 9:00 AM - 6:00 PM</p>
													<p>Saturday: 10:00 AM - 4:00 PM</p>
													<p>Sunday: Closed</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='py-12 sm:py-16 md:py-20'>
				<div className='container mx-auto px-4'>
					<div className='max-w-4xl mx-auto text-center'>
						<h2
							className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4D2A] mb-6`}
						>
							Frequently Asked Questions
						</h2>
						<p className='text-gray-600 text-lg sm:text-xl mb-12'>
							Can't find what you're looking for? Check out our comprehensive
							FAQ section.
						</p>
						<Button
							asChild
							size='lg'
							className='bg-[#1B4D2A] text-white hover:bg-[#1B4D2A]/90 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300'
						>
							<a href='/faq'>View All FAQs</a>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
