import { NextResponse } from "next/server";
import { getAllProducts } from "../../services/firebase";

// Store code from Google Business Profile
const STORE_CODE = "AKOLA01";

export async function GET() {
	try {
		const products = await getAllProducts();

		// Generate CSV header with store_code (tab-delimited)
		const csvHeader = "store_code\tid\tquantity\tprice\tavailability\n";

		// Generate CSV rows (tab-delimited for Google Merchant Center)
		const csvRows = products
			.filter((product) => {
				return (
					product.id &&
					product.name &&
					product.sizes &&
					product.sizes.length > 0
				);
			})
			.map((product) => {
				const lowestPrice = Math.min(
					...(product.sizes || []).map((s) => s.mrp)
				);

				return `${STORE_CODE}\t${product.id}\t100\t${lowestPrice.toFixed(
					2
				)} INR\tin_stock`;
			})
			.join("\n");

		const csvContent = csvHeader + csvRows;

		return new NextResponse(csvContent, {
			headers: {
				"Content-Type": "text/tab-separated-values",
				"Content-Disposition": "attachment; filename=inventory-feed.txt",
				"Cache-Control": "public, max-age=3600, s-maxage=3600",
			},
		});
	} catch (error) {
		console.error("Error generating CSV inventory feed:", error);
		return new NextResponse("store_code\tid\tquantity\tprice\tavailability\n", {
			status: 500,
			headers: { "Content-Type": "text/tab-separated-values" },
		});
	}
}
