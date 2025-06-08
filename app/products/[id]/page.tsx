import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts } from "../../services/firebase";
import ProductPageClient from "./ProductPageClient";

export default async function ProductPage({
	params,
}: {
	params: { id: string };
}) {
	try {
		const product = await getProductById(params.id);

		if (!product) {
			notFound();
		}

		const relatedProducts = await getRelatedProducts(
			product.id,
			product.category,
			4
		);

		return (
			<ProductPageClient product={product} relatedProducts={relatedProducts} />
		);
	} catch (error) {
		console.error("Error fetching product:", error);
		notFound();
	}
}

// Note: generateStaticParams is removed since we're using dynamic data from Firebase
// The page will be generated on-demand
