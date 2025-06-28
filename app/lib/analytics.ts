/*
 * Analytics helper functions – updates Firestore `analytics` collection
 * according to the structure defined in the requirements.
 */

"use client";

import {
	doc,
	getDoc,
	runTransaction,
	setDoc,
	updateDoc,
	increment,
	Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// ---- references -----------------------------------------------------------
const COLLECTION = "analytics";

const viewsRef = doc(db, COLLECTION, "views");
const pagesRef = doc(db, COLLECTION, "pages");
const productsRef = doc(db, COLLECTION, "products");
const trafficRef = doc(db, COLLECTION, "traffic");

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

// Ensure that a document exists – created lazily at first write.
async function ensureDoc(ref: any, defaultData: Record<string, any>) {
	const snap = await getDoc(ref);
	if (!snap.exists()) {
		await setDoc(ref, defaultData, { merge: true });
	}
}

function todayISODate(): string {
	// Get current date in IST (UTC+5:30)
	const now = new Date();
	const utc = now.getTime() + now.getTimezoneOffset() * 60000;
	const istOffset = 5.5 * 60 * 60000; // 5.5 hours in milliseconds
	const istDate = new Date(utc + istOffset);
	return istDate.toISOString().split("T")[0]; // YYYY-MM-DD
}

// ---------------------------------------------------------------------------
// Public API – used by UI components / hooks
// ---------------------------------------------------------------------------

/**
 * Increment site-level view counters (total / unique / realtime).
 */
export async function trackSiteView(isUnique: boolean) {
	// Make sure doc exists
	await ensureDoc(viewsRef, {
		views: 0,
		unique_views: 0,
		realtime_views: 0,
	});

	const updates: Record<string, any> = {
		views: increment(1),
	};
	if (isUnique) updates["unique_views"] = increment(1);

	await updateDoc(viewsRef, updates);
}

/**
 * Call this with +1 on mount, and −1 on unmount to keep realtime counter.
 */
export async function updateRealtimeUsers(delta: number) {
	await ensureDoc(viewsRef, {
		views: 0,
		unique_views: 0,
		realtime_views: 0,
	});
	await updateDoc(viewsRef, { realtime_views: increment(delta) });
}

/**
 * Track a page (non-product) view.
 */
export async function trackPageView(
	slug: string,
	title: string,
	isUnique: boolean
) {
	await ensureDoc(pagesRef, { pages: [] });

	await runTransaction(db, async (tx) => {
		const snap = await tx.get(pagesRef);
		let data = snap.data() as { pages: any[] } | undefined;
		if (!data) data = { pages: [] };

		const pages = data.pages || [];
		const idx = pages.findIndex((p: any) => p.slug === slug);
		const now = Timestamp.now();

		if (idx >= 0) {
			pages[idx].views = (pages[idx].views || 0) + 1;
			if (isUnique)
				pages[idx].unique_views = (pages[idx].unique_views || 0) + 1;
			pages[idx].last_viewed = now;
		} else {
			pages.push({
				slug,
				title,
				views: 1,
				unique_views: isUnique ? 1 : 0,
				last_viewed: now,
			});
		}

		tx.set(pagesRef, { pages }, { merge: true });
	});
}

/**
 * Track a product page view.
 */
export async function trackProductView(
	slug: string,
	name: string,
	category: string,
	isUnique: boolean
) {
	await ensureDoc(productsRef, { products: [] });

	await runTransaction(db, async (tx) => {
		const snap = await tx.get(productsRef);
		let data = snap.data() as { products: any[] } | undefined;
		if (!data) data = { products: [] };

		const products = data.products || [];
		const idx = products.findIndex((p: any) => p.slug === slug);
		const now = Timestamp.now();

		if (idx >= 0) {
			products[idx].views = (products[idx].views || 0) + 1;
			if (isUnique)
				products[idx].unique_views = (products[idx].unique_views || 0) + 1;
			products[idx].last_viewed = now;
		} else {
			products.push({
				slug,
				name,
				category,
				views: 1,
				unique_views: isUnique ? 1 : 0,
				enqueries: 0,
				last_viewed: now,
			});
		}

		tx.set(productsRef, { products }, { merge: true });
	});
}

/**
 * Track a product enquiry click.
 */
export async function trackProductEnquiry(slug: string) {
	await ensureDoc(productsRef, { products: [] });

	await runTransaction(db, async (tx) => {
		const snap = await tx.get(productsRef);
		let data = snap.data() as { products: any[] } | undefined;
		if (!data) data = { products: [] };

		const products = data.products || [];
		const idx = products.findIndex((p: any) => p.slug === slug);

		if (idx >= 0) {
			products[idx].enqueries = (products[idx].enqueries || 0) + 1;
		}

		tx.set(productsRef, { products }, { merge: true });
	});

	// Also update traffic for enquiries
	await trackTraffic({ enq: 1 });
}

interface TrafficUpdateOptions {
	pageView?: boolean; // true if page (non-product) viewed
	productView?: boolean; // true if product viewed
	enq?: number; // number of enqueries
}

/**
 * Update date-wise traffic counters.
 */
export async function trackTraffic(opts: TrafficUpdateOptions) {
	await ensureDoc(trafficRef, { traffic: [] });

	await runTransaction(db, async (tx) => {
		const snap = await tx.get(trafficRef);
		let data = snap.data() as { traffic: any[] } | undefined;
		if (!data) data = { traffic: [] };

		const trafficArr = data.traffic || [];
		const today = todayISODate();
		const idx = trafficArr.findIndex((t: any) => t.date === today);

		if (idx >= 0) {
			if (opts.pageView) {
				trafficArr[idx].views = (trafficArr[idx].views || 0) + 1;
			}
			if (opts.productView) {
				trafficArr[idx].product_views =
					(trafficArr[idx].product_views || 0) + 1;
			}
			if (opts.enq) {
				trafficArr[idx].enqueries = (trafficArr[idx].enqueries || 0) + opts.enq;
			}
		} else {
			trafficArr.push({
				date: today,
				views: opts.pageView ? 1 : 0,
				product_views: opts.productView ? 1 : 0,
				enqueries: opts.enq || 0,
			});
		}

		tx.set(trafficRef, { traffic: trafficArr }, { merge: true });
	});
}
