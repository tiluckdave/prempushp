import {
	Shield,
	Eye,
	Lock,
	Trash2,
	Users,
	FileText,
	AlertCircle,
} from "lucide-react";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function PrivacyPolicyPage() {
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
							<Shield className='w-8 h-8 sm:w-10 sm:h-10 text-[#1B4D2A]' />
						</div>

						{/* Main Title */}
						<h1
							className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B4D2A] mb-6 sm:mb-8 leading-tight`}
						>
							Privacy Policy
						</h1>

						{/* Subtitle */}
						<p className='text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto'>
							Your privacy is important to us. Learn how we collect, use, and
							protect your personal information.
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
								At Prem Pushp, we are committed to protecting your privacy and
								ensuring the security of your personal information. This Privacy
								Policy outlines how we collect, use, and safeguard your data
								when you use our website or services. By using our services, you
								agree to the collection and use of information in accordance
								with this policy.
							</p>
						</div>

						{/* Information Collection */}
						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<div className='flex items-start gap-6'>
								<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0'>
									<Eye className='w-6 h-6 sm:w-8 sm:h-8 text-[#1B4D2A]' />
								</div>
								<div className='flex-1'>
									<h2
										className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-4 sm:mb-6`}
									>
										Information We Collect
									</h2>
									<div className='space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed'>
										<p>
											We collect several types of information to provide and
											improve our services:
										</p>
										<ul className='list-disc pl-6 space-y-2'>
											<li>
												<strong>Personal Information:</strong> Name, email
												address, phone number, shipping and billing addresses
											</li>
											<li>
												<strong>Payment Information:</strong> Credit card
												details, payment preferences (processed securely through
												our payment partners)
											</li>
											<li>
												<strong>Account Information:</strong> Username,
												password, order history, preferences
											</li>
											<li>
												<strong>Usage Data:</strong> How you interact with our
												website, pages visited, time spent
											</li>
											<li>
												<strong>Device Information:</strong> IP address, browser
												type, operating system, device identifiers
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						{/* How We Use Information */}
						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<div className='flex items-start gap-6'>
								<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0'>
									<Users className='w-6 h-6 sm:w-8 sm:h-8 text-[#1B4D2A]' />
								</div>
								<div className='flex-1'>
									<h2
										className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-4 sm:mb-6`}
									>
										How We Use Your Information
									</h2>
									<div className='space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed'>
										<p>
											We use your personal information for the following
											purposes:
										</p>
										<ul className='list-disc pl-6 space-y-2'>
											<li>Process and fulfill your orders</li>
											<li>Provide customer support and respond to inquiries</li>
											<li>
												Send order confirmations, shipping updates, and
												important notices
											</li>
											<li>Improve our products and services</li>
											<li>Send marketing communications (with your consent)</li>
											<li>Prevent fraud and ensure security</li>
											<li>Comply with legal obligations</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						{/* Data Security */}
						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<div className='flex items-start gap-6'>
								<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0'>
									<Lock className='w-6 h-6 sm:w-8 sm:h-8 text-[#1B4D2A]' />
								</div>
								<div className='flex-1'>
									<h2
										className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-4 sm:mb-6`}
									>
										Data Security
									</h2>
									<div className='space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed'>
										<p>
											We implement comprehensive security measures to protect
											your personal information:
										</p>
										<ul className='list-disc pl-6 space-y-2'>
											<li>SSL encryption for all data transmission</li>
											<li>Secure servers with restricted access</li>
											<li>Regular security audits and updates</li>
											<li>Employee training on data protection</li>
											<li>Compliance with industry security standards</li>
										</ul>
										<p>
											While we strive to protect your personal information, no
											method of transmission over the internet is 100% secure.
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Data Retention */}
						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<div className='flex items-start gap-6'>
								<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0'>
									<Trash2 className='w-6 h-6 sm:w-8 sm:h-8 text-[#1B4D2A]' />
								</div>
								<div className='flex-1'>
									<h2
										className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-4 sm:mb-6`}
									>
										Data Retention and Deletion
									</h2>
									<div className='space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed'>
										<p>
											We retain your personal information only as long as
											necessary:
										</p>
										<ul className='list-disc pl-6 space-y-2'>
											<li>
												Account information: Until you request deletion or close
												your account
											</li>
											<li>
												Order history: 7 years for tax and legal compliance
											</li>
											<li>
												Marketing data: Until you unsubscribe or request removal
											</li>
											<li>
												Usage data: 2 years for analytics and improvement
												purposes
											</li>
										</ul>
										<p>
											You can request deletion of your personal information by
											contacting us at prempushp.akola@gmail.com.
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Your Rights */}
						<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10'>
							<div className='flex items-start gap-6'>
								<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FDB913] to-[#FDB913]/80 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0'>
									<FileText className='w-6 h-6 sm:w-8 sm:h-8 text-[#1B4D2A]' />
								</div>
								<div className='flex-1'>
									<h2
										className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] mb-4 sm:mb-6`}
									>
										Your Rights
									</h2>
									<div className='space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed'>
										<p>
											You have the following rights regarding your personal
											information:
										</p>
										<ul className='list-disc pl-6 space-y-2'>
											<li>
												<strong>Access:</strong> Request a copy of your personal
												information
											</li>
											<li>
												<strong>Correction:</strong> Update or correct
												inaccurate information
											</li>
											<li>
												<strong>Deletion:</strong> Request deletion of your
												personal information
											</li>
											<li>
												<strong>Portability:</strong> Request transfer of your
												data to another service
											</li>
											<li>
												<strong>Objection:</strong> Object to processing of your
												personal information
											</li>
											<li>
												<strong>Restriction:</strong> Request limitation of
												processing
											</li>
										</ul>
									</div>
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
								Questions About Privacy?
							</h2>
							<p className='text-gray-800 mb-8 text-base sm:text-lg max-w-2xl mx-auto'>
								If you have any questions about our Privacy Policy or how we
								handle your personal information, we're here to help.
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
