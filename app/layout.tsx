import type React from "react";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SearchProvider } from "./contexts/SearchContext";
import { Toaster } from "react-hot-toast";
import {
	generateOrganizationSchema,
	generateWebsiteSchema,
	PAGE_TITLES,
	META_DESCRIPTIONS,
} from "./lib/seo";
import AnalyticsTracker from "./components/AnalyticsTracker";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});
const playfair = Playfair_Display({
	subsets: ["latin"],
	variable: "--font-playfair",
	display: "swap",
});

const baseUrl = "https://prempushp.in";

export const metadata: Metadata = {
	title: PAGE_TITLES.home,
	description: META_DESCRIPTIONS.home,
	keywords:
		"organic food products, premium organic foods, certified organic food, healthy organic products, natural food products, organic ingredients, pure organic foods, fresh organic products, sustainable food products, chemical-free foods, organic spices, organic grains, organic pulses, organic oils",
	authors: [{ name: "Prempushp" }],
	creator: "Prempushp",
	publisher: "Prempushp",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	icons: {
		icon: [
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
		],
		apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
		other: [
			{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#1B4D2A" },
		],
	},
	manifest: "/site.webmanifest",
	openGraph: {
		type: "website",
		locale: "en_IN",
		url: baseUrl,
		title: PAGE_TITLES.home,
		description: META_DESCRIPTIONS.home,
		siteName: "Prempushp - Premium Organic Food Products",
		images: [
			{
				url: `${baseUrl}/og-image.jpg`,
				width: 1200,
				height: 630,
				alt: "Prempushp - Premium Organic Food Products",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: PAGE_TITLES.home,
		description: META_DESCRIPTIONS.home,
		images: [`${baseUrl}/og-image.jpg`],
		creator: "@prempushp",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	category: "food",
	classification: "Business",
	other: {
		"apple-mobile-web-app-capable": "yes",
		"apple-mobile-web-app-status-bar-style": "default",
		"theme-color": "#1B4D2A",
		"msapplication-TileColor": "#1B4D2A",
		"msapplication-config": "/browserconfig.xml",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const organizationSchema = generateOrganizationSchema(baseUrl);
	const websiteSchema = generateWebsiteSchema(baseUrl);

	return (
		<html lang='en' className={`${inter.variable} ${playfair.variable}`}>
			<head>
				{/* Structured Data */}
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(organizationSchema),
					}}
				/>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(websiteSchema),
					}}
				/>

				{/* Preconnect to external domains for performance */}
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='anonymous'
				/>
				<link rel='preconnect' href='https://firebase.googleapis.com' />
				<link rel='preconnect' href='https://firebaseapp.com' />

				{/* DNS Prefetch for external resources */}
				<link rel='dns-prefetch' href='//www.google-analytics.com' />
				<link rel='dns-prefetch' href='//www.googletagmanager.com' />
				<link rel='dns-prefetch' href='//api.whatsapp.com' />

				{/* Canonical URL */}
				<link rel='canonical' href={baseUrl} />

				{/* Alternate languages */}
				<link rel='alternate' hrefLang='en-IN' href={baseUrl} />
				<link rel='alternate' hrefLang='hi-IN' href={`${baseUrl}/hi`} />
				<link rel='alternate' hrefLang='x-default' href={baseUrl} />
			</head>
			<body className='min-h-screen flex flex-col text-gray-900'>
				<SearchProvider>
					<AnalyticsTracker />
					<Header />
					<main className='flex-auto pt-[72px]'>{children}</main>
					<Footer />
				</SearchProvider>
				<Toaster />
			</body>
		</html>
	);
}
