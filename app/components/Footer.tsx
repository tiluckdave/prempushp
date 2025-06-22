import Link from "next/link";
import {
	Instagram,
	Mail,
	Phone,
	MapPin,
	Heart,
	MessageCircle,
} from "lucide-react";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function Footer() {
	return (
		<footer
			className={`relative bg-gradient-to-br from-[#1B4D2A] via-[#2a6b3f] to-[#1B4D2A] text-white ${inter.className} overflow-hidden`}
		>
			<div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>

			<div className='relative container mx-auto px-4 py-12 md:py-20'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
					{/* About Section */}
					<div className='lg:col-span-2'>
						<div className='flex items-center mb-6'>
							<div className='w-12 h-12 bg-gradient-to-br from-[#FDB913] to-[#ffdf8d] rounded-full flex items-center justify-center shadow-lg mr-4'>
								<Heart className='w-6 h-6 text-[#1B4D2A]' />
							</div>
							<h3
								className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#FDB913]`}
							>
								Prem Pushp
							</h3>
						</div>
						<p className='text-white/90 mb-8 leading-relaxed text-base md:text-lg max-w-md'>
							Dedicated to bringing you the finest organic food products,
							sourced directly from our network of certified organic farms
							across India. Pure, natural, and delivered fresh to your doorstep.
						</p>
						<div className='flex space-x-4'>
							<a
								href='https://wa.me/918275434017?text=Hello,%20I%20saw%20your%20website'
								target='_blank'
								rel='noopener noreferrer'
								className='group w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#FDB913] transition-all duration-300 shadow-lg hover:shadow-xl'
							>
								<MessageCircle className='w-5 h-5 text-white group-hover:text-[#1B4D2A] transition-colors duration-300' />
							</a>
							<a
								href='https://instagram.com/prempushpakola'
								target='_blank'
								rel='noopener noreferrer'
								className='group w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#FDB913] transition-all duration-300 shadow-lg hover:shadow-xl'
							>
								<Instagram className='w-5 h-5 text-white group-hover:text-[#1B4D2A] transition-colors duration-300' />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3
							className={`${playfair.className} text-xl md:text-2xl font-bold mb-6 text-[#FDB913]`}
						>
							Quick Links
						</h3>
						<ul className='space-y-4'>
							{[
								{ name: "Home", href: "/" },
								{ name: "Products", href: "/products" },
								{ name: "About Us", href: "/about" },
								{ name: "Contact", href: "/contact" },
								{ name: "FAQ", href: "/faq" },
								{ name: "Become Distributor", href: "/become-distributor" },
							].map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className='text-white/80 hover:text-[#FDB913] transition-all duration-300 text-base font-medium hover:translate-x-1 inline-block'
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h3
							className={`${playfair.className} text-xl md:text-2xl font-bold mb-6 text-[#FDB913]`}
						>
							Contact Info
						</h3>
						<div className='space-y-4'>
							<div className='flex items-start space-x-3'>
								<div className='w-8 h-8 bg-[#FDB913]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1'>
									<Mail className='w-4 h-4 text-[#FDB913]' />
								</div>
								<div>
									<p className='text-white/60 text-sm mb-1'>Email</p>
									<a
										href='mailto:prempushp.akola@gmail.com'
										className='text-white hover:text-[#FDB913] transition-colors duration-300 font-medium'
									>
										prempushp.akola@gmail.com
									</a>
								</div>
							</div>

							<div className='flex items-start space-x-3'>
								<div className='w-8 h-8 bg-[#FDB913]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1'>
									<Phone className='w-4 h-4 text-[#FDB913]' />
								</div>
								<div>
									<p className='text-white/60 text-sm mb-1'>Phone</p>
									<a
										href='tel:+918275434017'
										className='text-white hover:text-[#FDB913] transition-colors duration-300 font-medium'
									>
										+91 8275434017
									</a>
								</div>
							</div>

							<div className='flex items-start space-x-3'>
								<div className='w-8 h-8 bg-[#FDB913]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1'>
									<MapPin className='w-4 h-4 text-[#FDB913]' />
								</div>
								<div>
									<p className='text-white/60 text-sm mb-1'>Address</p>
									<p className='text-white font-medium'>
										PremPushp, M16, VHB Colony
										<br />
										Gaurakshan Road, Near Gaurakshan Sansthan
										<br />
										Akola, 444004, MH, IN
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Section */}
				<div className='mt-12 pt-8 border-t border-white/20'>
					<div className='flex flex-col md:flex-row justify-between items-center gap-4'>
						<div className='text-center md:text-left'>
							<p className='text-white/80 text-sm'>
								&copy; {new Date().getFullYear()} Prem Pushp. All rights
								reserved.
							</p>
							<p className='text-white/60 text-xs mt-1'>
								Made with ❤️ by Tilak
							</p>
						</div>
						<div className='flex flex-wrap justify-center md:justify-end gap-6 text-sm'>
							<Link
								href='/privacy'
								className='text-white/60 hover:text-[#FDB913] transition-colors duration-300'
							>
								Privacy Policy
							</Link>
							<Link
								href='/terms'
								className='text-white/60 hover:text-[#FDB913] transition-colors duration-300'
							>
								Terms of Service
							</Link>
							<Link
								href='/shipping'
								className='text-white/60 hover:text-[#FDB913] transition-colors duration-300'
							>
								Shipping Info
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
