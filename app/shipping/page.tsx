import {
	Truck,
	Package,
	Clock,
	Globe,
	AlertCircle,
	MapPin,
	Shield,
	Phone,
} from "lucide-react";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function ShippingPage() {
	return (
		<div className={`${inter.className} min-h-screen`}>
			{/* Premium Hero Section */}
			<section className='relative py-12 sm:py-16 md:py-20 overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-br from-amber-100 via-amber-50 to-yellow-50'></div>
				<div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23FDB913" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>

				<div className='relative container mx-auto px-4 text-center'>
					<div className='max-w-4xl mx-auto'>
						{/* Icon */}
						<div className='inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#FDB913] to-[#ffdf8d] rounded-full mb-6 sm:mb-8 shadow-xl'>
							<Truck className='w-8 h-8 sm:w-10 sm:h-10 text-[#1B4D2A]' />
						</div>

						{/* Main Title */}
						<h1
							className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B4D2A] mb-6 sm:mb-8 leading-tight`}
						>
							Shipping Policy
						</h1>

						{/* Subtitle */}
						<p className='text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto'>
							Fast, secure, and reliable delivery of your organic products
							across India. Learn about our shipping process and policies.
						</p>

						{/* Shipping Stats */}
						<div className='grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto'>
							<div className='text-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg'>
								<div className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B4D2A] mb-2'>
									Free
								</div>
								<div className='text-gray-600 text-sm sm:text-base'>
									Shipping ₹1000+
								</div>
							</div>
							<div className='text-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg'>
								<div className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B4D2A] mb-2'>
									2-7
								</div>
								<div className='text-gray-600 text-sm sm:text-base'>
									Business Days
								</div>
							</div>
							<div className='text-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg'>
								<div className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B4D2A] mb-2'>
									100%
								</div>
								<div className='text-gray-600 text-sm sm:text-base'>
									Secure Packaging
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<section className='py-12 sm:py-16 md:py-20'>
				<div className='container mx-auto px-4'>
					<div className='max-w-4xl mx-auto space-y-8 sm:space-y-12'>
						{/* Introduction */}
						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<p className='text-gray-700 text-base sm:text-lg leading-relaxed'>
								At Prem Pushp, we strive to deliver your organic products as
								quickly and efficiently as possible. We understand the
								importance of fresh, quality products reaching you in perfect
								condition, which is why we've partnered with trusted logistics
								providers across India.
							</p>
						</div>

						{/* Shipping Policy */}
						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<div className='flex items-start gap-6'>
								<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0'>
									<Shield className='w-6 h-6 sm:w-8 sm:h-8 text-[#1B4D2A]' />
								</div>
								<div className='flex-1'>
									<h2
										className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-4 sm:mb-6`}
									>
										Our Shipping Promise
									</h2>
									<div className='space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed'>
										<p>
											We are committed to delivering your organic products with
											the utmost care:
										</p>
										<ul className='list-disc pl-6 space-y-2'>
											<li>
												All products are carefully packaged to maintain
												freshness
											</li>
											<li>
												Temperature-controlled shipping for perishable items
											</li>
											<li>
												Eco-friendly packaging materials wherever possible
											</li>
											<li>Real-time tracking for all shipments</li>
											<li>Insurance coverage for all orders</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						{/* Shipping Costs */}
						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<div className='flex items-start gap-6'>
								<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0'>
									<Package className='w-6 h-6 sm:w-8 sm:h-8 text-[#1B4D2A]' />
								</div>
								<div className='flex-1'>
									<h2
										className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-4 sm:mb-6`}
									>
										Shipping Costs
									</h2>
									<div className='space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed'>
										<p>
											We offer competitive shipping rates with free shipping on
											larger orders:
										</p>
										<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
											<div className='bg-gradient-to-br from-[#FDB913]/10 to-[#FDB913]/5 rounded-xl p-6 border border-[#FDB913]/20'>
												<div className='text-xl font-bold text-[#1B4D2A] mb-2'>
													Free Shipping
												</div>
												<div className='text-gray-700'>
													Orders ₹1000 and above
												</div>
												<div className='text-sm text-gray-600 mt-2'>
													Available across India
												</div>
											</div>
											<div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
												<div className='text-xl font-bold text-[#1B4D2A] mb-2'>
													Standard Shipping
												</div>
												<div className='text-gray-700'>₹50 minimum rate</div>
												<div className='text-sm text-gray-600 mt-2'>
													Vary as per location and quantity
												</div>
											</div>
										</div>
										<div className='mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200'>
											<p className='text-blue-800 text-sm'>
												<strong>Note:</strong> Express shipping and same-day
												delivery options are available in select metro cities.
												Additional charges may apply.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Processing and Delivery Time */}
						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<div className='flex items-start gap-6'>
								<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0'>
									<Clock className='w-6 h-6 sm:w-8 sm:h-8 text-[#1B4D2A]' />
								</div>
								<div className='flex-1'>
									<h2
										className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-4 sm:mb-6`}
									>
										Processing & Delivery Time
									</h2>
									<div className='space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed'>
										<p>
											We process and ship orders quickly to ensure freshness:
										</p>

										<div className='bg-[#FDB913]/10 rounded-xl p-6 border border-[#FDB913]/20 mb-6'>
											<h3 className='font-bold text-[#1B4D2A] mb-3'>
												Order Processing
											</h3>
											<ul className='list-disc pl-6 space-y-1'>
												<li>Standard orders: 1-2 business days</li>
												<li>Custom/bulk orders: 2-3 business days</li>
												<li>Peak season: 2-4 business days</li>
											</ul>
										</div>

										<h3 className='font-bold text-[#1B4D2A] mb-3'>
											Delivery Timeline by Location
										</h3>
										<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
											<div className='bg-green-50 rounded-lg p-4 border border-green-200'>
												<div className='font-semibold text-green-800 mb-2'>
													Metro Cities
												</div>
												<div className='text-green-700'>2-3 business days</div>
												<div className='text-xs text-green-600 mt-1'>
													Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad
												</div>
											</div>
											<div className='bg-blue-50 rounded-lg p-4 border border-blue-200'>
												<div className='font-semibold text-blue-800 mb-2'>
													Urban Areas
												</div>
												<div className='text-blue-700'>3-5 business days</div>
												<div className='text-xs text-blue-600 mt-1'>
													Tier 2 & 3 cities
												</div>
											</div>
											<div className='bg-orange-50 rounded-lg p-4 border border-orange-200'>
												<div className='font-semibold text-orange-800 mb-2'>
													Rural Areas
												</div>
												<div className='text-orange-700'>5-7 business days</div>
												<div className='text-xs text-orange-600 mt-1'>
													Remote locations
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Coverage Areas */}
						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<div className='flex items-start gap-6'>
								<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0'>
									<MapPin className='w-6 h-6 sm:w-8 sm:h-8 text-[#1B4D2A]' />
								</div>
								<div className='flex-1'>
									<h2
										className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-4 sm:mb-6`}
									>
										Delivery Coverage
									</h2>
									<div className='space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed'>
										<p>
											We currently deliver to all major locations across India:
										</p>
										<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
											<div>
												<h3 className='font-semibold text-[#1B4D2A] mb-3'>
													✅ We Deliver To:
												</h3>
												<ul className='list-disc pl-6 space-y-1'>
													<li>All major cities and towns</li>
													<li>
														Pin codes serviceable by our logistics partners
													</li>
													<li>
														Most rural areas (with extended delivery time)
													</li>
													<li>PO Box addresses in select locations</li>
												</ul>
											</div>
											<div>
												<h3 className='font-semibold text-[#1B4D2A] mb-3'>
													❌ Current Limitations:
												</h3>
												<ul className='list-disc pl-6 space-y-1'>
													<li>International shipping (coming soon)</li>
													<li>Some remote hill stations</li>
													<li>Military/restricted areas</li>
													<li>Islands (except major ones)</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* International Shipping */}
						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<div className='flex items-start gap-6'>
								<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0'>
									<Globe className='w-6 h-6 sm:w-8 sm:h-8 text-[#1B4D2A]' />
								</div>
								<div className='flex-1'>
									<h2
										className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-4 sm:mb-6`}
									>
										International Shipping
									</h2>
									<div className='space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed'>
										<div className='bg-gradient-to-r from-[#FDB913]/10 to-[#FDB913]/5 rounded-xl p-6 border border-[#FDB913]/20'>
											<p className='text-[#1B4D2A] font-semibold mb-2'>
												🚀 Coming Soon!
											</p>
											<p>
												We are working on expanding our shipping capabilities to
												serve customers worldwide. International shipping will
												be available soon for select countries.
											</p>
											<p className='mt-3 text-sm'>
												<strong>Interested in international delivery?</strong>{" "}
												Contact us at
												<a
													href='mailto:international@prempushp.com'
													className='text-[#1B4D2A] hover:underline ml-1'
												>
													international@prempushp.com
												</a>{" "}
												to be notified when this service becomes available.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Order Tracking */}
						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<h2
								className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-4 sm:mb-6`}
							>
								Track Your Order
							</h2>
							<div className='space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed'>
								<p>
									Stay updated on your order's journey from our warehouse to
									your doorstep:
								</p>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<div className='space-y-3'>
										<h3 className='font-semibold text-[#1B4D2A]'>
											📧 Email Updates
										</h3>
										<ul className='list-disc pl-6 space-y-1 text-sm'>
											<li>Order confirmation</li>
											<li>Processing notification</li>
											<li>Shipping confirmation with tracking number</li>
											<li>Delivery confirmation</li>
										</ul>
									</div>
									<div className='space-y-3'>
										<h3 className='font-semibold text-[#1B4D2A]'>
											📱 SMS Alerts
										</h3>
										<ul className='list-disc pl-6 space-y-1 text-sm'>
											<li>Order dispatch notification</li>
											<li>Out for delivery alert</li>
											<li>Delivery attempt notifications</li>
											<li>Successful delivery confirmation</li>
										</ul>
									</div>
								</div>
								<div className='mt-6 p-4 bg-[#FDB913]/10 rounded-lg border border-[#FDB913]/20'>
									<p className='text-[#1B4D2A] font-medium'>
										💡 Pro Tip: Save our tracking page to your bookmarks for
										quick access to your order status anytime!
									</p>
								</div>
							</div>
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
								Need Help with Shipping?
							</h2>
							<p className='text-gray-800 mb-8 text-base sm:text-lg max-w-2xl mx-auto'>
								Our customer support team is here to help with any shipping
								questions or concerns you may have.
							</p>
							<div className='flex justify-center'>
								<a
									href='/contact'
									className='inline-flex items-center justify-center px-8 py-4 bg-[#1B4D2A] text-white font-semibold rounded-full hover:bg-[#1B4D2A]/90 transition-all duration-300 shadow-lg hover:shadow-xl'
								>
									<Phone className='w-5 h-5 mr-2' />
									Contact Support
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
