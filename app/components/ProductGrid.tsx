import ProductCard from "./ProductCard";
import type { Product } from "../types/firebase";

interface ProductGridProps {
	products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
	if (products.length === 0) {
		return (
			<div className='text-center py-12 sm:py-16'>
				<div className='max-w-md mx-auto'>
					<div className='w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center'>
						<svg
							className='w-12 h-12 text-gray-400'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={1.5}
								d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
							/>
						</svg>
					</div>
					<h3 className='text-xl sm:text-2xl font-semibold text-gray-900 mb-2'>
						No products found
					</h3>
					<p className='text-gray-600'>
						Try adjusting your filters or browse all products
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='p-2'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5'>
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}
