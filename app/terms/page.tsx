import {
	FileText,
	ShieldCheck,
	Scale,
	Globe,
	AlertCircle,
	Gavel,
	UserCheck,
	CreditCard,
} from "lucide-react";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function TermsAndConditionsPage() {
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
							<FileText className='w-8 h-8 sm:w-10 sm:h-10 text-[#1B4D2A]' />
						</div>

						{/* Main Title */}
						<h1
							className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B4D2A] mb-6 sm:mb-8 leading-tight`}
						>
							Terms & Conditions
						</h1>

						{/* Subtitle */}
						<p className='text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto'>
							Please read these terms carefully before using our services. By
							using our website, you agree to these terms and conditions.
						</p>

						{/* Last Updated */}
						<div className='inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 text-gray-600 shadow-lg'>
							<AlertCircle className='w-4 h-4' />
							<span className='text-sm font-medium'>
								Last updated: January 2024
							</span>
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
								Welcome to Prem Pushp. These terms and conditions outline the
								rules and regulations for the use of our website and services.
								By accessing this website, we assume you accept these terms and
								conditions. Do not continue to use Prem Pushp if you do not
								agree to take all of the terms and conditions stated on this
								page.
							</p>
						</div>

						{/* Acceptance of Terms */}
						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<div className='flex items-start gap-6'>
								<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0'>
									<UserCheck className='w-6 h-6 sm:w-8 sm:h-8 text-[#1B4D2A]' />
								</div>
								<div className='flex-1'>
									<h2
										className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-4 sm:mb-6`}
									>
										Acceptance of Terms
									</h2>
									<div className='space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed'>
										<p>
											By accessing and using our website, you accept and agree
											to be bound by the terms and provision of this agreement.
										</p>
										<ul className='list-disc pl-6 space-y-2'>
											<li>
												You must be at least 18 years old to use our services
											</li>
											<li>
												You agree to provide accurate and complete information
											</li>
											<li>
												You are responsible for maintaining the confidentiality
												of your account
											</li>
											<li>
												You agree to notify us immediately of any unauthorized
												use of your account
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						{/* Use License */}
						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<div className='flex items-start gap-6'>
								<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0'>
									<ShieldCheck className='w-6 h-6 sm:w-8 sm:h-8 text-[#1B4D2A]' />
								</div>
								<div className='flex-1'>
									<h2
										className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-4 sm:mb-6`}
									>
										Use License
									</h2>
									<div className='space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed'>
										<p>
											Permission is granted to temporarily download one copy of
											the materials on Prem Pushp's website for personal,
											non-commercial transitory viewing only. This is the grant
											of a license, not a transfer of title, and under this
											license you may not:
										</p>
										<ul className='list-disc pl-6 space-y-2'>
											<li>Modify or copy the materials</li>
											<li>
												Use the materials for any commercial purpose or for any
												public display
											</li>
											<li>
												Attempt to reverse engineer any software contained on
												the website
											</li>
											<li>
												Remove any copyright or other proprietary notations from
												the materials
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						{/* Orders and Payments */}
						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<div className='flex items-start gap-6'>
								<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0'>
									<CreditCard className='w-6 h-6 sm:w-8 sm:h-8 text-[#1B4D2A]' />
								</div>
								<div className='flex-1'>
									<h2
										className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-4 sm:mb-6`}
									>
										Orders and Payments
									</h2>
									<div className='space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed'>
										<p>
											When you place an order with us, you agree to the
											following terms:
										</p>
										<ul className='list-disc pl-6 space-y-2'>
											<li>
												All orders are subject to availability and confirmation
											</li>
											<li>Prices are subject to change without notice</li>
											<li>Payment must be received before order processing</li>
											<li>
												We reserve the right to refuse or cancel any order
											</li>
											<li>
												All sales are final unless otherwise specified in our
												return policy
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						{/* Product Information */}
						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<div className='flex items-start gap-6'>
								<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0'>
									<Globe className='w-6 h-6 sm:w-8 sm:h-8 text-[#1B4D2A]' />
								</div>
								<div className='flex-1'>
									<h2
										className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-4 sm:mb-6`}
									>
										Product Information
									</h2>
									<div className='space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed'>
										<p>
											We strive to provide accurate product information, but we
											cannot guarantee that all information is error-free:
										</p>
										<ul className='list-disc pl-6 space-y-2'>
											<li>
												Product descriptions, images, and specifications are for
												informational purposes
											</li>
											<li>
												Colors may vary due to monitor settings and photography
											</li>
											<li>
												We reserve the right to correct any errors in product
												information
											</li>
											<li>
												Nutritional information is approximate and may vary
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						{/* Disclaimer */}
						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<div className='flex items-start gap-6'>
								<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0'>
									<Scale className='w-6 h-6 sm:w-8 sm:h-8 text-[#1B4D2A]' />
								</div>
								<div className='flex-1'>
									<h2
										className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-4 sm:mb-6`}
									>
										Disclaimer
									</h2>
									<div className='space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed'>
										<p>
											The materials on Prem Pushp's website are provided on an
											'as is' basis. Prem Pushp makes no warranties, expressed
											or implied, and hereby disclaims and negates all other
											warranties including:
										</p>
										<ul className='list-disc pl-6 space-y-2'>
											<li>
												Implied warranties or conditions of merchantability
											</li>
											<li>Fitness for a particular purpose</li>
											<li>Non-infringement of intellectual property</li>
											<li>Other violation of rights</li>
										</ul>
										<p>
											Further, Prem Pushp does not warrant or make any
											representations concerning the accuracy, likely results,
											or reliability of the use of the materials on its website.
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Limitations */}
						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<div className='flex items-start gap-6'>
								<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0'>
									<Gavel className='w-6 h-6 sm:w-8 sm:h-8 text-[#1B4D2A]' />
								</div>
								<div className='flex-1'>
									<h2
										className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-4 sm:mb-6`}
									>
										Limitations
									</h2>
									<div className='space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed'>
										<p>
											In no event shall Prem Pushp or its suppliers be liable
											for any damages including:
										</p>
										<ul className='list-disc pl-6 space-y-2'>
											<li>Loss of data or profit</li>
											<li>Business interruption</li>
											<li>Personal injury or property damage</li>
											<li>Any other commercial damages or losses</li>
										</ul>
										<p>
											This limitation applies even if Prem Pushp or an
											authorized representative has been notified orally or in
											writing of the possibility of such damage.
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Governing Law */}
						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<h2
								className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-4 sm:mb-6`}
							>
								Governing Law
							</h2>
							<div className='space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed'>
								<p>
									These terms and conditions are governed by and construed in
									accordance with the laws of India. You irrevocably submit to
									the exclusive jurisdiction of the courts in that State or
									location.
								</p>
								<p>
									Any disputes arising from these terms will be resolved through
									binding arbitration in accordance with Indian law.
								</p>
							</div>
						</div>

						{/* Modifications */}
						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<h2
								className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-4 sm:mb-6`}
							>
								Revisions and Errata
							</h2>
							<div className='space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed'>
								<p>
									The materials appearing on Prem Pushp's website could include
									technical, typographical, or photographic errors. Prem Pushp
									does not warrant that any of the materials on its website are
									accurate, complete, or current.
								</p>
								<p>
									Prem Pushp may make changes to the materials contained on its
									website at any time without notice. However, Prem Pushp does
									not make any commitment to update the materials.
								</p>
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
								Questions About Our Terms?
							</h2>
							<p className='text-gray-800 mb-8 text-base sm:text-lg max-w-2xl mx-auto'>
								If you have any questions about these Terms and Conditions,
								please don't hesitate to contact us.
							</p>
							<div className='flex justify-center'>
								<a
									href='/contact'
									className='inline-flex items-center justify-center px-8 py-4 bg-[#1B4D2A] text-white font-semibold rounded-full hover:bg-[#1B4D2A]/90 transition-all duration-300 shadow-lg hover:shadow-xl'
								>
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
