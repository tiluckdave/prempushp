import { RefreshCw, ShieldCheck, Truck, Clock } from "lucide-react";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function ReturnsPage() {
	return (
		<div className={`min-h-screen py-12 ${inter.className}`}>
			<div className='container mx-auto px-4 space-y-8'>
				<section className='bg-white rounded-lg shadow-lg p-8'>
					<h1
						className={`${playfair.className} text-4xl font-bold text-[#1B4D2A] mb-6`}
					>
						Returns & Exchanges Policy
					</h1>
					<div className='space-y-8'>
						<div className='flex items-start space-x-4'>
							<ShieldCheck className='w-8 h-8 text-[#FDB913] flex-shrink-0' />
							<div>
								<h2
									className={`${playfair.className} text-2xl font-semibold text-[#1B4D2A] mb-2`}
								>
									Our Guarantee
								</h2>
								<p className='text-gray-700'>
									At Prempushp, we stand behind the quality of our products. If
									you're not completely satisfied with your purchase, we're here
									to help.
								</p>
							</div>
						</div>

						<div className='flex items-start space-x-4'>
							<RefreshCw className='w-8 h-8 text-[#FDB913] flex-shrink-0' />
							<div>
								<h2
									className={`${playfair.className} text-2xl font-semibold text-[#1B4D2A] mb-2`}
								>
									Returns
								</h2>
								<p className='text-gray-700'>
									We offer a 30-day return policy for most items. To be eligible
									for a return, your item must be unused and in the same
									condition that you received it. It must also be in the
									original packaging.
								</p>
							</div>
						</div>

						<div className='flex items-start space-x-4'>
							<Clock className='w-8 h-8 text-[#FDB913] flex-shrink-0' />
							<div>
								<h2
									className={`${playfair.className} text-2xl font-semibold text-[#1B4D2A] mb-2`}
								>
									Exchanges
								</h2>
								<p className='text-gray-700'>
									If you need to exchange an item for the same product, send us
									an email at prempushp.akola@gmail.com and we'll guide you
									through the process.
								</p>
							</div>
						</div>

						<div className='flex items-start space-x-4'>
							<Truck className='w-8 h-8 text-[#FDB913] flex-shrink-0' />
							<div>
								<h2
									className={`${playfair.className} text-2xl font-semibold text-[#1B4D2A] mb-2`}
								>
									Shipping
								</h2>
								<p className='text-gray-700'>
									You will be responsible for paying for your own shipping costs
									for returning your item. Shipping costs are non-refundable.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className='bg-white rounded-lg shadow-lg p-8'>
					<h2
						className={`${playfair.className} text-3xl font-semibold text-[#1B4D2A] mb-4`}
					>
						Refund Process
					</h2>
					<p className='text-gray-700 mb-4'>
						Once we receive your item, we will inspect it and notify you that we
						have received your returned item. We will immediately notify you on
						the status of your refund after inspecting the item.
					</p>
					<p className='text-gray-700'>
						If your return is approved, we will initiate a refund to your
						original method of payment. You will receive the credit within a
						certain amount of days, depending on your card issuer's policies.
					</p>
				</section>

				<section className='bg-white rounded-lg shadow-lg p-8'>
					<h2
						className={`${playfair.className} text-3xl font-semibold text-[#1B4D2A] mb-4`}
					>
						Contact Us
					</h2>
					<p className='text-gray-700'>
						If you have any questions on how to return your item to us, contact
						us at prempushp.akola@gmail.com or call us at +91 8275434017.
					</p>
				</section>
			</div>
		</div>
	);
}
