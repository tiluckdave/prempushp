import { NextResponse } from "next/server";
import { getAllProducts } from "../../services/firebase";

const baseUrl = "https://prempushp.in";

// Store code from Google Business Profile
const STORE_CODE = "PPAKOLA01";

export async function GET() {
	try {
		const products = await getAllProducts();

		// Generate RSS feed for Google Merchant Center
		const rssItems = products
			.filter((product) => {
				// Only include products with required data
				return (
					product.name &&
					(product.description ||
						product.shortDescription ||
						product.longDescription) &&
					product.sizes &&
					product.sizes.length > 0 &&
					product.sizes[0].mrp > 0
				);
			})
			.map((product) => {
				const allImages = [
					...(product.coverImage ? [product.coverImage] : []),
					...(product.images || []),
				].filter((img) => img && img.trim() !== "");

				const description =
					product.longDescription ||
					product.shortDescription ||
					product.description ||
					"";

				const lowestPrice = Math.min(...(product.sizes || []).map((s) => s.mrp));
				const productUrl = `${baseUrl}/products/${product.id}`;

				// Get main image
				const mainImage =
					allImages.length > 0 ? allImages[0] : `${baseUrl}/og-image.jpg`;

				// Additional images
				const additionalImages = allImages
					.slice(1, 11)
					.map(
						(img, idx) =>
							`    <g:additional_image_link>${img}</g:additional_image_link>`
					)
					.join("\n");

				return `  <item>
    <g:id>${product.id}</g:id>
    <g:store_code>${STORE_CODE}</g:store_code>
    <g:title><![CDATA[${product.name}]]></g:title>
    <g:description><![CDATA[${description}]]></g:description>
    <g:link>${productUrl}</g:link>
    <g:image_link>${mainImage}</g:image_link>
${additionalImages}
    <g:availability>in_stock</g:availability>
    <g:price>${lowestPrice.toFixed(2)} INR</g:price>
    <g:quantity>100</g:quantity>
    <g:brand><![CDATA[PREMPUSHP FOODS]]></g:brand>
    <g:condition>new</g:condition>
    <g:product_type><![CDATA[${product.category}]]></g:product_type>
    <g:google_product_category>Food, Beverages &amp; Tobacco &gt; Food Items</g:google_product_category>
    <g:identifier_exists>no</g:identifier_exists>
    <g:shipping>
      <g:country>IN</g:country>
      <g:service>Standard</g:service>
      <g:price>80.00 INR</g:price>
    </g:shipping>
    <g:shipping_weight>1 kg</g:shipping_weight>
  </item>`;
			})
			.join("\n");

		const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>PREMPUSHP FOODS - Product Feed</title>
    <link>${baseUrl}</link>
    <description>Premium Natural Food Products</description>
${rssItems}
  </channel>
</rss>`;

		return new NextResponse(rssFeed, {
			headers: {
				"Content-Type": "application/xml",
				"Cache-Control": "public, max-age=3600, s-maxage=3600",
			},
		});
	} catch (error) {
		console.error("Error generating product feed:", error);
		return new NextResponse(
			'<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Error</title></channel></rss>',
			{
				status: 500,
				headers: { "Content-Type": "application/xml" },
			}
		);
	}
}

