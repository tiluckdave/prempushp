import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
	label: string;
	href: string;
}

interface BreadcrumbProps {
	items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
	return (
		<nav className='flex mb-6 sm:mb-8' aria-label='Breadcrumb'>
			<ol className='inline-flex items-center space-x-1 md:space-x-2 flex-wrap'>
				<li className='inline-flex items-center'>
					<Link
						href='/'
						className='inline-flex items-center text-xs sm:text-sm font-medium text-gray-600 hover:text-[#1B4D2A] transition-colors duration-200'
					>
						<span className='truncate max-w-[60px] sm:max-w-none'>Home</span>
					</Link>
				</li>
				{items.map((item, index) => (
					<li key={index} className='inline-flex items-center'>
						<div className='flex items-center'>
							<ChevronRight className='w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mx-1' />
							<Link
								href={item.href}
								className='text-xs sm:text-sm font-medium text-gray-600 hover:text-[#1B4D2A] transition-colors duration-200'
							>
								<span
									className='truncate max-w-[80px] sm:max-w-[120px] md:max-w-none'
									title={item.label}
								>
									{item.label}
								</span>
							</Link>
						</div>
					</li>
				))}
			</ol>

			{/* Structured Data for Breadcrumbs */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BreadcrumbList",
						itemListElement: [
							{
								"@type": "ListItem",
								position: 1,
								name: "Home",
								item:
									typeof window !== "undefined" ? window.location.origin : "",
							},
							...items.map((item, index) => ({
								"@type": "ListItem",
								position: index + 2,
								name: item.label,
								item: item.href.startsWith("http")
									? item.href
									: `${
											typeof window !== "undefined"
												? window.location.origin
												: ""
									  }${item.href}`,
							})),
						],
					}),
				}}
			/>
		</nav>
	);
}
