"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function Header() {
	const [searchQuery, setSearchQuery] = useState("");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const router = useRouter();

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
		}
	};

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1B4D2A] via-[#2a6b3f] to-[#1B4D2A] shadow-xl backdrop-blur-sm py-3 sm:py-3 overflow-visible ${inter.className}`}
		>
			<div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>

			<div className='relative container mx-auto px-4'>
				<div className='flex items-center justify-between'>
					<Link href='/' className='flex items-center group relative z-50'>
						<div className='relative flex h-10 md:h-12'>
							<Image
								src='/logo.png'
								alt='Prempushp Logo'
								width={125}
								height={101.75}
								className='h-20 md:h-24 w-auto transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 drop-shadow-lg'
								priority
							/>
						</div>
					</Link>

					<nav className='hidden md:flex items-center space-x-8 lg:space-x-12'>
						{[
							{ name: "Home", href: "/" },
							{ name: "Products", href: "/products" },
							{ name: "About", href: "/about" },
							{ name: "Contact", href: "/contact" },
						].map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className='text-base lg:text-lg font-semibold transition-colors duration-200 text-white hover:text-amber-300 py-2'
							>
								{item.name}
							</Link>
						))}
					</nav>

					<div className='flex items-center space-x-4'>
						<form onSubmit={handleSearch} className='relative hidden md:block'>
							<Input
								type='text'
								placeholder='Search products...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className='w-64 lg:w-72 pl-10 pr-12 py-2 bg-amber-50 border border-amber-200 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FDB913] focus:border-transparent transition-all duration-200'
							/>
							<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500' />
							<Button
								type='submit'
								size='sm'
								className='absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#FDB913] hover:bg-[#FDB913]/90 text-[#1B4D2A] rounded-full px-3 py-1 transition-colors duration-200'
							>
								<Search className='h-4 w-4' />
							</Button>
						</form>

						<Button
							className='md:hidden relative bg-white/10 backdrop-blur-sm border border-white/20 w-12 h-12 rounded-xl text-white hover:bg-white/20 hover:border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden'
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<div className='absolute inset-0 bg-gradient-to-br from-[#FDB913]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
							<div className='relative z-10'>
								{isMenuOpen ? (
									<X className='h-5 w-5 transition-transform duration-300 rotate-0 group-hover:rotate-90' />
								) : (
									<Menu className='h-5 w-5 transition-transform duration-300 group-hover:scale-110' />
								)}
							</div>
						</Button>
					</div>
				</div>

				{isMenuOpen && (
					<div className='mt-6 md:hidden bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl mb-6'>
						<nav className='flex flex-col space-y-4'>
							{[
								{ name: "Home", href: "/" },
								{ name: "Products", href: "/products" },
								{ name: "About", href: "/about" },
								{ name: "Contact", href: "/contact" },
							].map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className='text-lg font-semibold transition-colors duration-200 text-white hover:text-amber-300 py-2 px-4 rounded-lg hover:bg-white/10'
									onClick={() => setIsMenuOpen(false)}
								>
									{item.name}
								</Link>
							))}
						</nav>

						<form onSubmit={handleSearch} className='mt-6 relative'>
							<Input
								type='text'
								placeholder='Search products...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className='w-full pl-10 pr-12 py-2 bg-amber-50 border border-amber-200 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FDB913] focus:border-transparent transition-all duration-200'
							/>
							<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500' />
							<Button
								type='submit'
								size='sm'
								className='absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#FDB913] hover:bg-[#FDB913]/90 text-[#1B4D2A] rounded-full px-3 py-1 transition-colors duration-200'
							>
								<Search className='h-4 w-4' />
							</Button>
						</form>
					</div>
				)}
			</div>
		</header>
	);
}
