"use client";

import { Suspense } from "react";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

import SearchPageContent from "./SearchPageContent";

function SearchFallback() {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-cream-50 to-yellow-50'>
			<div className='text-center'>
				<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-[#1B4D2A] mx-auto mb-4'></div>
				<p className='text-[#1B4D2A] text-lg'>Loading...</p>
			</div>
		</div>
	);
}

export default function SearchPage() {
	return (
		<div
			className={`${inter.className} min-h-screen bg-gradient-to-br from-amber-50 via-cream-50 to-yellow-50`}
		>
			<Suspense fallback={<SearchFallback />}>
				<SearchPageContent playfair={playfair} inter={inter} />
			</Suspense>
		</div>
	);
}
