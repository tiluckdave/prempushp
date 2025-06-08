"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "../types/firebase";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

interface ProductSliderProps {
	products: Product[];
	title?: string;
}

export default function ProductSlider({ products, title }: ProductSliderProps) {
	const sliderRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerView, setItemsPerView] = useState(4);
	const [isAnimating, setIsAnimating] = useState(false);
	const [cardWidth, setCardWidth] = useState(0);
	const [touchStart, setTouchStart] = useState<number | null>(null);
	const [touchEnd, setTouchEnd] = useState<number | null>(null);

	// Limit products to top 8 for better UX
	const displayProducts = products.slice(0, 8);

	// Debug: Log products to console
	useEffect(() => {
		console.log("ProductSlider received products:", products.length);
		console.log("ProductSlider displaying products:", displayProducts.length);
	}, [products, displayProducts]);

	// Calculate items per view and card width based on screen size
	useEffect(() => {
		const updateLayout = () => {
			if (!containerRef.current) return;

			const containerWidth = containerRef.current.offsetWidth;
			let items = 4;
			let horizontalPadding = 24; // Default padding for desktop

			// 4 products on large screens (1024px and up)
			if (window.innerWidth >= 1024) {
				items = 4;
				horizontalPadding = 24; // 8px left + 16px right
			}
			// 2 products on medium screens (640px to 1023px)
			else if (window.innerWidth >= 640) {
				items = 2;
				horizontalPadding = 16; // 4px left + 12px right
			}
			// 1 product on mobile screens (below 640px)
			else {
				items = 1;
				horizontalPadding = 8; // 4px left + 4px right
			}

			setItemsPerView(items);
			// Calculate card width to fit exactly the specified number of items
			// Account for gaps between cards and responsive padding
			const gaps = (items - 1) * 16; // 16px gap between cards
			const availableWidth = containerWidth - gaps - horizontalPadding;
			const calculatedCardWidth = Math.floor(availableWidth / items);
			setCardWidth(calculatedCardWidth);
		};

		// Use setTimeout to ensure DOM is ready
		setTimeout(updateLayout, 0);
		window.addEventListener("resize", updateLayout);
		return () => window.removeEventListener("resize", updateLayout);
	}, []);

	// Calculate max index to prevent showing partial cards
	const maxIndex = Math.max(0, displayProducts.length - itemsPerView);

	// Get slide step based on screen size
	const getSlideStep = () => {
		if (window.innerWidth >= 1024) {
			return 2; // Move 2 products at once on desktop
		} else {
			return 1; // Move 1 product at a time on mobile/tablet
		}
	};

	const scroll = (direction: "left" | "right") => {
		if (isAnimating) return;

		setIsAnimating(true);
		const step = getSlideStep();

		if (direction === "left" && currentIndex > 0) {
			setCurrentIndex(Math.max(0, currentIndex - step));
		} else if (direction === "right" && currentIndex < maxIndex) {
			setCurrentIndex(Math.min(maxIndex, currentIndex + step));
		}

		setTimeout(() => setIsAnimating(false), 500);
	};

	const goToSlide = (index: number) => {
		if (isAnimating || index === currentIndex || index > maxIndex) return;

		setIsAnimating(true);
		setCurrentIndex(index);
		setTimeout(() => setIsAnimating(false), 500);
	};

	// Touch handlers for mobile swipe
	const handleTouchStart = (e: React.TouchEvent) => {
		setTouchEnd(null);
		setTouchStart(e.targetTouches[0].clientX);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		setTouchEnd(e.targetTouches[0].clientX);
	};

	const handleTouchEnd = () => {
		if (!touchStart || !touchEnd) return;

		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > 50;
		const isRightSwipe = distance < -50;

		if (isLeftSwipe) {
			scroll("right");
		} else if (isRightSwipe) {
			scroll("left");
		}
	};

	// Calculate dots based on slide steps
	const calculateTotalSlides = () => {
		if (displayProducts.length <= itemsPerView) return 1;

		const step = getSlideStep();
		// Calculate how many slide positions we have
		const maxPossibleIndex = displayProducts.length - itemsPerView;
		return Math.ceil(maxPossibleIndex / step) + 1;
	};

	const totalSlides = calculateTotalSlides();

	// Show a message if no products are available
	if (displayProducts.length === 0) {
		return (
			<div className='text-center py-12'>
				<p className='text-gray-600 text-lg'>
					No featured products available at the moment.
				</p>
			</div>
		);
	}

	return (
		<div className='space-y-4 py-4'>
			{/* Optional Section Title */}
			{title && (
				<h2
					className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#1B4D2A] px-2 sm:px-4`}
				>
					{title}
				</h2>
			)}

			{/* Container with overflow hidden for smooth sliding - full width */}
			<div ref={containerRef} className='w-full max-w-full'>
				<div
					className='relative overflow-x-hidden pl-1 pr-3 py-2 sm:pl-2 sm:pr-4'
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
				>
					{/* Sliding container */}
					<div
						ref={sliderRef}
						className='flex transition-transform duration-500 ease-in-out'
						style={{
							transform: `translateX(-${currentIndex * (cardWidth + 16)}px)`,
							gap: "16px",
						}}
					>
						{displayProducts.map((product, index) => (
							<div
								key={product.id}
								className='flex-shrink-0'
								style={{
									width: `${cardWidth}px`,
									minWidth: `${cardWidth}px`,
									maxWidth: `${cardWidth}px`,
								}}
							>
								<ProductCard product={product} />
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Navigation - only show if there are more products than can be displayed */}
			{displayProducts.length > itemsPerView && (
				<div className='flex items-center justify-center space-x-4'>
					<Button
						onClick={() => scroll("left")}
						variant='outline'
						size='icon'
						className='bg-white shadow-md hover:bg-[#1B4D2A] hover:text-white border-[#1B4D2A] h-10 w-10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
						disabled={currentIndex === 0 || isAnimating}
					>
						<ChevronLeft className='w-5 h-5' />
					</Button>

					{/* Dot indicators - show dots for each possible starting position */}
					<div className='flex space-x-2'>
						{Array.from({ length: totalSlides }, (_, index) => {
							const step = getSlideStep();
							const dotIndex = index * step;
							const isActive = currentIndex === dotIndex;

							return (
								<button
									key={index}
									onClick={() => goToSlide(Math.min(dotIndex, maxIndex))}
									className={`h-2 rounded-full transition-all duration-300 ${
										isActive
											? "bg-[#1B4D2A] w-8"
											: "bg-gray-300 hover:bg-gray-400 w-2"
									}`}
									disabled={isAnimating}
								/>
							);
						})}
					</div>

					<Button
						onClick={() => scroll("right")}
						variant='outline'
						size='icon'
						className='bg-white shadow-md hover:bg-[#1B4D2A] hover:text-white border-[#1B4D2A] h-10 w-10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
						disabled={currentIndex === maxIndex || isAnimating}
					>
						<ChevronRight className='w-5 h-5' />
					</Button>
				</div>
			)}
		</div>
	);
}
