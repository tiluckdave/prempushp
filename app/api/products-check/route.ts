import { NextResponse } from "next/server";
import { getAllProducts } from "../../services/firebase";

export async function GET() {
	try {
		const products = await getAllProducts();

		const productCheck = products.map((product) => {
			const issues: string[] = [];

			// Check for required fields
			if (!product.name || product.name.trim() === "") {
				issues.push("Missing name");
			}

			if (
				!product.description &&
				!product.shortDescription &&
				!product.longDescription
			) {
				issues.push("Missing description");
			}

			if (!product.category) {
				issues.push("Missing category");
			}

			// Check images
			const allImages = [
				...(product.coverImage ? [product.coverImage] : []),
				...(product.images || []),
			];

			if (allImages.length === 0) {
				issues.push("No images");
			} else {
				allImages.forEach((img, idx) => {
					if (!img || img.trim() === "") {
						issues.push(`Empty image at index ${idx}`);
					} else if (!img.startsWith("http")) {
						issues.push(`Image ${idx} is not absolute URL: ${img}`);
					}
				});
			}

			// Check prices
			if (!product.sizes || product.sizes.length === 0) {
				issues.push("No sizes/prices defined");
			} else {
				product.sizes.forEach((size, idx) => {
					if (!size.mrp || size.mrp <= 0) {
						issues.push(`Invalid price at size ${idx}`);
					}
					if (!size.size) {
						issues.push(`Missing size value at index ${idx}`);
					}
				});
			}

			return {
				id: product.id,
				name: product.name,
				hasIssues: issues.length > 0,
				issues,
				imageCount: allImages.length,
				sizeCount: product.sizes?.length || 0,
			};
		});

		const summary = {
			totalProducts: products.length,
			productsWithIssues: productCheck.filter((p) => p.hasIssues).length,
			productsWithoutIssues: productCheck.filter((p) => !p.hasIssues).length,
		};

		return NextResponse.json({
			summary,
			products: productCheck,
		});
	} catch (error) {
		console.error("Error checking products:", error);
		return NextResponse.json(
			{ error: "Failed to check products" },
			{ status: 500 }
		);
	}
}
