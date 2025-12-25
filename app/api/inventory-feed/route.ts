import { NextResponse } from "next/server";
import { getAllProducts } from "../../services/firebase";

const baseUrl = "https://prempushp.in";

// TODO: Update this with your actual Google Business Profile store code
// Find it at: https://business.google.com/ → Select location → Info → Store code
// Examples: "MAIN-STORE", "WAREHOUSE-01", "DELHI-01"
const STORE_CODE = "AKOLA"; // ⚠️ Use text code from Business Profile, NOT the location ID number!

export async function GET() {
	try {
		const products = await getAllProducts();

		// Generate local inventory feed for Google Merchant Center
		const inventoryItems = products
			.filter((product) => {
				// Only include products with required data
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

				return `  <entry>
    <g:id>${product.id}</g:id>
    <g:store_code>${STORE_CODE}</g:store_code>
    <g:quantity>100</g:quantity>
    <g:price>${lowestPrice.toFixed(2)} INR</g:price>
    <g:availability>in_stock</g:availability>
    <g:sale_price_effective_date>${new Date().toISOString().split("T")[0]}/${
					new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
						.toISOString()
						.split("T")[0]
				}</g:sale_price_effective_date>
  </entry>`;
			})
			.join("\n");

		const inventoryFeed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:g="http://base.google.com/ns/1.0">
  <title>PREMPUSHP FOODS - Local Inventory Feed</title>
  <link rel="self" href="${baseUrl}/api/inventory-feed"/>
  <updated>${new Date().toISOString()}</updated>
${inventoryItems}
</feed>`;

		return new NextResponse(inventoryFeed, {
			headers: {
				"Content-Type": "application/xml",
				"Cache-Control": "public, max-age=3600, s-maxage=3600",
			},
		});
	} catch (error) {
		console.error("Error generating inventory feed:", error);
		return new NextResponse(
			'<?xml version="1.0" encoding="UTF-8"?><feed xmlns="http://www.w3.org/2005/Atom"><title>Error</title></feed>',
			{
				status: 500,
				headers: { "Content-Type": "application/xml" },
			}
		);
	}
}
