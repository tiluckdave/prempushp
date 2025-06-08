import type React from "react";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SearchProvider } from "./contexts/SearchContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
	subsets: ["latin"],
	variable: "--font-playfair",
});

export const metadata: Metadata = {
	title: "Prem Pushp - Premium Organic Food Products",
	description:
		"Discover our range of premium organic food products made with fresh ingredients",
	generator: "v0.dev",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className={`${inter.variable} ${playfair.variable}`}>
			<body className='min-h-screen flex flex-col text-gray-900'>
				<SearchProvider>
					<Header />
					<main className='flex-auto pt-[72px]'>{children}</main>
					<Footer />
				</SearchProvider>
				<Toaster />
			</body>
		</html>
	);
}
