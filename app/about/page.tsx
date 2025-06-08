import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Playfair_Display, Inter } from "next/font/google";
import { Leaf, Users, Award, Truck, Shield } from "lucide-react";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function AboutPage() {
	return (
		<div className={`${inter.className} min-h-screen`}>
			{/* Premium Hero Section */}
			<section className='relative py-12 sm:py-16 md:py-20 overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200'></div>
				<div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23FDB913" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>

				<div className='relative container mx-auto px-4 text-center'>
					<div className='max-w-4xl mx-auto'>
						{/* Subtle Badge */}
						<div className='mb-6 sm:mb-8'>
							<span className='text-[#1B4D2A]/70 text-sm sm:text-base font-medium tracking-wide uppercase'>
								Who We Are
							</span>
						</div>

						{/* Main Title */}
						<h1
							className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl font-bold text-[#1B4D2A] mb-6 leading-tight`}
						>
							About Prem Pushp
						</h1>

						{/* Subtitle */}
						<p className='text-lg sm:text-xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto'>
							Bringing you the finest organic food products with a commitment to
							quality, sustainability, and your family's health since 2010.
						</p>
					</div>
				</div>
			</section>

			{/* Our Story Section */}
			<section className='py-12 sm:py-16 md:py-20'>
				<div className='container mx-auto px-4'>
					<div className='max-w-6xl mx-auto'>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
							<div className='order-2 lg:order-1'>
								<h2
									className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4D2A] mb-6 sm:mb-8`}
								>
									Our Story
								</h2>
								<div className='space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed'>
									<p>
										Prem Pushp began as a small family-owned business in 2010
										with a simple yet powerful vision: to make premium organic
										food accessible to every family in India. What started in a
										small village has grown into a trusted name across the
										country.
									</p>
									<p>
										We work directly with certified organic farms, ensuring that
										every product meets our strict quality standards. Our
										commitment goes beyond just selling products – we're
										building a community of health-conscious families who
										believe in the power of pure, organic nutrition.
									</p>
									<p>
										Today, we're proud to serve thousands of families while
										maintaining our core values of quality, sustainability, and
										affordability. Every product tells a story of dedication,
										from our farmers to your table.
									</p>
								</div>
							</div>
							<div className='order-1 lg:order-2'>
								<div className='relative rounded-2xl overflow-hidden shadow-2xl'>
									<Image
										src='/banner.png'
										alt='Prem Pushp Organic Farm'
										width={600}
										height={400}
										className='object-cover w-full h-[300px] sm:h-[400px]'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className='py-12 sm:py-16 md:py-20'>
				<div className='container mx-auto px-4'>
					<div className='max-w-6xl mx-auto'>
						<div className='text-center mb-12 sm:mb-16'>
							<h2
								className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4D2A] mb-6`}
							>
								Our Team
							</h2>
							<p className='text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto'>
								A father-son duo leading the charge toward a healthier,
								sustainable future.
							</p>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12'>
							{/* Atharva Dave */}
							<div className='flex flex-col items-center text-center bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100'>
								<Image
									src='/team/atharva.jpg'
									alt='Atharva Dave'
									width={240}
									height={240}
									className='rounded-full object-cover mb-6 w-40 h-40'
								/>
								<h3
									className={`${playfair.className} text-xl sm:text-2xl font-bold text-[#1B4D2A] mb-2`}
								>
									Atharva Dave
								</h3>
								<p className='text-gray-600 mb-4'>Co-Founder & CEO</p>
								<p className='text-gray-600 text-sm leading-relaxed'>
									Passionate about organic agriculture and innovative product
									development, Atharva drives our vision of making healthy
									living accessible.
								</p>
							</div>

							{/* Rajendra Dave */}
							<div className='flex flex-col items-center text-center bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100'>
								<Image
									src='/team/rajendra.jpg'
									alt='Rajendra Dave'
									width={240}
									height={240}
									className='rounded-full object-cover mb-6 w-40 h-40'
								/>
								<h3
									className={`${playfair.className} text-xl sm:text-2xl font-bold text-[#1B4D2A] mb-2`}
								>
									Rajendra Dave
								</h3>
								<p className='text-gray-600 mb-4'>Co-Founder & Mentor</p>
								<p className='text-gray-600 text-sm leading-relaxed'>
									With decades of farming expertise, Rajendra ensures that our
									products stay true to nature and tradition.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Our Commitments Section */}
			<section className='py-12 sm:py-16 md:py-20'>
				<div className='container mx-auto px-4'>
					<div className='max-w-6xl mx-auto'>
						<div className='text-center mb-12 sm:mb-16'>
							<h2
								className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4D2A] mb-6`}
							>
								Our Commitments
							</h2>
							<p className='text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto'>
								Every decision we make is guided by our unwavering commitment to
								quality, sustainability, and your family's well-being.
							</p>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
							<div className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 sm:p-8 text-center border border-gray-100 hover:border-[#FDB913]/30 hover:-translate-y-2'>
								<div className='w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
									<Leaf className='w-8 h-8 sm:w-10 sm:h-10 text-[#1B4D2A]' />
								</div>
								<h3
									className={`${playfair.className} text-xl sm:text-2xl font-bold mb-4 text-[#1B4D2A]`}
								>
									100% Certified Organic
								</h3>
								<p className='text-gray-600 leading-relaxed'>
									All our products are certified organic, ensuring you get the
									purest, chemical-free food for your family.
								</p>
							</div>

							<div className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 sm:p-8 text-center border border-gray-100 hover:border-[#FDB913]/30 hover:-translate-y-2'>
								<div className='w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
									<Truck className='w-8 h-8 sm:w-10 sm:h-10 text-[#1B4D2A]' />
								</div>
								<h3
									className={`${playfair.className} text-xl sm:text-2xl font-bold mb-4 text-[#1B4D2A]`}
								>
									Fresh from Farm
								</h3>
								<p className='text-gray-600 leading-relaxed'>
									We work directly with farmers to bring you the freshest
									ingredients, maintaining the farm-to-table promise.
								</p>
							</div>

							<div className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 sm:p-8 text-center border border-gray-100 hover:border-[#FDB913]/30 hover:-translate-y-2'>
								<div className='w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
									<Shield className='w-8 h-8 sm:w-10 sm:h-10 text-[#1B4D2A]' />
								</div>
								<h3
									className={`${playfair.className} text-xl sm:text-2xl font-bold mb-4 text-[#1B4D2A]`}
								>
									No Preservatives
								</h3>
								<p className='text-gray-600 leading-relaxed'>
									Our products are free from artificial preservatives, colors,
									and flavors - just pure, natural goodness.
								</p>
							</div>

							<div className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 sm:p-8 text-center border border-gray-100 hover:border-[#FDB913]/30 hover:-translate-y-2'>
								<div className='w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
									<Users className='w-8 h-8 sm:w-10 sm:h-10 text-[#1B4D2A]' />
								</div>
								<h3
									className={`${playfair.className} text-xl sm:text-2xl font-bold mb-4 text-[#1B4D2A]`}
								>
									Fair Trade
								</h3>
								<p className='text-gray-600 leading-relaxed'>
									We ensure fair compensation for all farmers and workers in our
									supply chain, supporting rural communities.
								</p>
							</div>

							<div className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 sm:p-8 text-center border border-gray-100 hover:border-[#FDB913]/30 hover:-translate-y-2'>
								<div className='w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
									<Leaf className='w-8 h-8 sm:w-10 sm:h-10 text-[#1B4D2A]' />
								</div>
								<h3
									className={`${playfair.className} text-xl sm:text-2xl font-bold mb-4 text-[#1B4D2A]`}
								>
									Sustainable Practices
								</h3>
								<p className='text-gray-600 leading-relaxed'>
									Our farming and production processes are designed to minimize
									environmental impact and protect our planet.
								</p>
							</div>

							<div className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 sm:p-8 text-center border border-gray-100 hover:border-[#FDB913]/30 hover:-translate-y-2'>
								<div className='w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
									<Award className='w-8 h-8 sm:w-10 sm:h-10 text-[#1B4D2A]' />
								</div>
								<h3
									className={`${playfair.className} text-xl sm:text-2xl font-bold mb-4 text-[#1B4D2A]`}
								>
									Quality Assurance
								</h3>
								<p className='text-gray-600 leading-relaxed'>
									Every product undergoes rigorous quality checks to ensure
									excellence in every package that reaches you.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-12 sm:py-16 md:py-20'>
				<div className='container mx-auto px-4'>
					<div className='max-w-4xl mx-auto'>
						<div className='bg-gradient-to-br from-[#FDB913] to-[#ffdf8d] rounded-2xl shadow-xl p-8 sm:p-12 md:p-16 text-center'>
							<h2
								className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4D2A] mb-6 sm:mb-8`}
							>
								Join the Prem Pushp Family
							</h2>
							<p className='text-gray-800 mb-8 sm:mb-12 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed'>
								Experience the difference of truly organic, sustainably sourced
								products. Your journey to a healthier lifestyle starts here with
								our premium organic collection.
							</p>
							<div className='flex flex-col sm:flex-row gap-4 justify-center'>
								<Button
									asChild
									size='lg'
									className='bg-[#1B4D2A] text-white hover:bg-[#1B4D2A]/90 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300'
								>
									<Link href='/products'>Shop Our Products</Link>
								</Button>
								<Button
									asChild
									variant='outline'
									size='lg'
									className='border-[#1B4D2A] text-[#1B4D2A] hover:bg-[#1B4D2A] hover:text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300'
								>
									<Link href='/contact'>Get in Touch</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
