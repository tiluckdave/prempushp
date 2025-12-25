import { NextResponse } from "next/server";
import { getAllProducts } from "../../services/firebase";

export async function GET() {
	try {
		const products = await getAllProducts();

		// Generate CSV header
		const csvHeader = "id,quantity,price,availability\n";

		// Generate CSV rows
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

				return `${product.id},100,${lowestPrice.toFixed(2)} INR,in_stock`;
			})
			.join("\n");

		const csvContent = csvHeader + csvRows;

		return new NextResponse(csvContent, {
			headers: {
				"Content-Type": "text/csv",
				"Content-Disposition": "attachment; filename=inventory-feed.csv",
				"Cache-Control": "public, max-age=3600, s-maxage=3600",
			},
		});
	} catch (error) {
		console.error("Error generating CSV inventory feed:", error);
		return new NextResponse("id,quantity,price,availability\n", {
			status: 500,
			headers: { "Content-Type": "text/csv" },
		});
	}
}

