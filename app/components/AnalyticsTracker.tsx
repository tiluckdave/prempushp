"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
	trackSiteView,
	trackPageView,
	updateRealtimeUsers,
	trackTraffic,
} from "../lib/analytics";

// Utility helpers for unique view detection using localStorage
const KEY_ALL_TIME = "prempushp_site_visited";
function hasVisitedSite(): boolean {
	if (typeof window === "undefined") return false;
	return localStorage.getItem(KEY_ALL_TIME) === "1";
}
function markSiteVisited() {
	if (typeof window === "undefined") return;
	localStorage.setItem(KEY_ALL_TIME, "1");
}

export default function AnalyticsTracker() {
	const pathname = usePathname();

	// Increment realtime users (mount / unmount)
	useEffect(() => {
		// +1 when component mounts
		updateRealtimeUsers(1).catch(console.error);

		const handleUnload = () => {
			// Use sendBeacon to ensure the decrement hits before tab closes
			navigator.sendBeacon?.(`${window.location.origin}/api/___noop`, "");
			updateRealtimeUsers(-1).catch(console.error);
		};

		window.addEventListener("beforeunload", handleUnload);
		return () => {
			updateRealtimeUsers(-1).catch(console.error);
			window.removeEventListener("beforeunload", handleUnload);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Track route change (page views)
	useEffect(() => {
		if (!pathname) return;

		const siteUnique = !hasVisitedSite();
		if (siteUnique) markSiteVisited();

		// Skip product specific pages here – handled inside ProductPageClient
		const isProductPage =
			pathname.startsWith("/products/") && pathname.split("/").length === 3;

		// Update counters
		trackSiteView(siteUnique).catch(console.error);

		if (!isProductPage) {
			// Use slug minus leading '/'
			const slug = pathname === "/" ? "home" : pathname.replace(/^\//, "");
			trackPageView(
				slug,
				slug,
				!localStorage.getItem(`prempushp_page_${slug}`)
			).catch(console.error);
			if (!localStorage.getItem(`prempushp_page_${slug}`)) {
				localStorage.setItem(`prempushp_page_${slug}`, "1");
			}

			trackTraffic({ pageView: true }).catch(console.error);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	return null;
}
