import {
	collection,
	getDocs,
	doc,
	getDoc,
	query,
	where,
	orderBy,
	limit,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import {
	FirebaseProduct,
	FirebaseCategory,
	Product,
	Category,
} from "../types/firebase";

// Helper function to convert Firebase product to our Product interface
function convertFirebaseProduct(firebaseProduct: FirebaseProduct): Product {
	return {
		id: firebaseProduct.id || "",
		name: firebaseProduct.name,
		category: firebaseProduct.category.name,
		shortDescription: firebaseProduct.shortDescription,
		longDescription: firebaseProduct.longDescription,
		description: firebaseProduct.shortDescription, // fallback
		sizes: firebaseProduct.sizes?.map((size) => ({
			size: size.size,
			mrp: parseFloat(size.mrp.replace(/[^\d.]/g, "")) || 0, // Remove "Rs." and convert to number
		})),
		ingredients: firebaseProduct.ingredients,
		nutritionalInfo: {
			servingSize: firebaseProduct.nutritionInfo?.servingSize || "",
			calories: firebaseProduct.nutritionInfo?.calories
				? parseInt(firebaseProduct.nutritionInfo.calories)
				: undefined,
			protein: firebaseProduct.nutritionInfo?.protein || "",
			carbohydrates: firebaseProduct.nutritionInfo?.carbs || "",
			fat: firebaseProduct.nutritionInfo?.fat || "",
		},
		storageInstructions: firebaseProduct.storageInstructions,
		dietaryPreferences: firebaseProduct.dietaryPreferences,
		featured: firebaseProduct.featured,
		images: firebaseProduct.images?.map((img) =>
			typeof img === "string" ? img : (img as any)?.url || ""
		),
		coverImage: firebaseProduct.coverImage?.url,
		published: firebaseProduct.published,
		isNew: firebaseProduct.isNew,
	};
}

// Helper function to convert Firebase category to our Category interface
function convertFirebaseCategory(firebaseCategory: FirebaseCategory): Category {
	return {
		id: firebaseCategory.id || "",
		name: firebaseCategory.name,
		createdAt: firebaseCategory.createdAt?.toDate(),
		updatedAt: firebaseCategory.updatedAt?.toDate(),
	};
}

// Fetch all products
export async function getAllProducts(): Promise<Product[]> {
	try {
		const productsCollection = collection(db, "products");
		const productsQuery = query(
			productsCollection,
			where("published", "==", true)
		);
		const productsSnapshot = await getDocs(productsQuery);

		const products: Product[] = [];
		productsSnapshot.forEach((doc) => {
			const data = { id: doc.id, ...doc.data() } as FirebaseProduct;
			products.push(convertFirebaseProduct(data));
		});

		return products;
	} catch (error) {
		console.error("Error fetching products:", error);
		return [];
	}
}

// Fetch featured products
export async function getFeaturedProducts(): Promise<Product[]> {
	try {
		const productsCollection = collection(db, "products");
		const featuredQuery = query(
			productsCollection,
			where("featured", "==", true),
			where("published", "==", true)
		);
		const productsSnapshot = await getDocs(featuredQuery);

		const products: Product[] = [];
		productsSnapshot.forEach((doc) => {
			const data = { id: doc.id, ...doc.data() } as FirebaseProduct;
			products.push(convertFirebaseProduct(data));
		});

		return products;
	} catch (error) {
		console.error("Error fetching featured products:", error);
		return [];
	}
}

// Fetch product by ID
export async function getProductById(id: string): Promise<Product | null> {
	try {
		const productRef = doc(db, "products", id);
		const productDoc = await getDoc(productRef);

		if (!productDoc.exists()) {
			return null;
		}

		const data = { id: productDoc.id, ...productDoc.data() } as FirebaseProduct;

		// Only return if the product is published
		if (!data.published) {
			return null;
		}

		return convertFirebaseProduct(data);
	} catch (error) {
		console.error("Error fetching product by ID:", error);
		return null;
	}
}

// Fetch products by category
export async function getProductsByCategory(
	categoryName: string
): Promise<Product[]> {
	try {
		const productsCollection = collection(db, "products");
		const categoryQuery = query(
			productsCollection,
			where("category.name", "==", categoryName),
			where("published", "==", true)
		);
		const productsSnapshot = await getDocs(categoryQuery);

		const products: Product[] = [];
		productsSnapshot.forEach((doc) => {
			const data = { id: doc.id, ...doc.data() } as FirebaseProduct;
			products.push(convertFirebaseProduct(data));
		});

		return products;
	} catch (error) {
		console.error("Error fetching products by category:", error);
		return [];
	}
}

// Fetch all categories
export async function getAllCategories(): Promise<Category[]> {
	try {
		const categoriesCollection = collection(db, "categories");
		const categoriesSnapshot = await getDocs(categoriesCollection);

		const categories: Category[] = [];
		categoriesSnapshot.forEach((doc) => {
			const data = { id: doc.id, ...doc.data() } as FirebaseCategory;
			categories.push(convertFirebaseCategory(data));
		});

		return categories;
	} catch (error) {
		console.error("Error fetching categories:", error);
		return [];
	}
}

// Get related products (same category, excluding current product)
export async function getRelatedProducts(
	productId: string,
	categoryName: string,
	limitCount: number = 4
): Promise<Product[]> {
	try {
		const productsCollection = collection(db, "products");

		// First try without orderBy to avoid index issues
		const relatedQuery = query(
			productsCollection,
			where("category.name", "==", categoryName),
			where("published", "==", true),
			limit(limitCount + 5) // Get more to ensure we have enough after filtering
		);

		const productsSnapshot = await getDocs(relatedQuery);

		const products: Product[] = [];
		productsSnapshot.forEach((doc) => {
			if (doc.id !== productId) {
				// Exclude current product
				const data = { id: doc.id, ...doc.data() } as FirebaseProduct;
				products.push(convertFirebaseProduct(data));
			}
		});

		const finalProducts = products.slice(0, limitCount);
		return finalProducts;
	} catch (error) {
		console.error("Error fetching related products:", error);
		return [];
	}
}

// Get category ID by category name
export async function getCategoryIdByName(
	categoryName: string
): Promise<string | null> {
	try {
		const categories = await getAllCategories();
		const category = categories.find((cat) => cat.name === categoryName);
		return category ? category.id : null;
	} catch (error) {
		console.error("Error fetching category ID:", error);
		return null;
	}
}

// Get products by category ID
export async function getProductsByCategoryId(
	categoryId: string
): Promise<{ products: Product[]; categoryName: string } | null> {
	try {
		// First get the category to find its name
		const categories = await getAllCategories();
		const category = categories.find((cat) => cat.id === categoryId);

		if (!category) {
			console.error("Category not found for ID:", categoryId);
			return null;
		}

		// Get products for this category using the category name
		const products = await getProductsByCategory(category.name);

		return {
			products,
			categoryName: category.name,
		};
	} catch (error) {
		console.error("Error fetching products by category ID:", error);
		return null;
	}
}

// Submit distributor application form
export async function submitDistributorApplication(
	application: Record<string, any>
): Promise<boolean> {
	try {
		const applicationsCollection = collection(db, "DistributorResponse");
		await addDoc(applicationsCollection, {
			name: application.name,
			firmName: application.firmName,
			email: application.email,
			phone: application.phone,
			capital: application.investmentCapital || application.capital || "",
			city: application.city,
			state: application.state,
			address: application.address,
			message: application.reason || application.message || "",
			createdAt: serverTimestamp(),
		});
		return true;
	} catch (error) {
		console.error("Error submitting distributor application:", error);
		return false;
	}
}

// Submit contact response
export async function submitContactResponse(response: {
	name: string;
	email: string;
	phone: string;
	message: string;
}): Promise<boolean> {
	try {
		const coll = collection(db, "contactResponses");
		await addDoc(coll, {
			name: response.name,
			email: response.email,
			phone: response.phone,
			message: response.message,
			createdAt: serverTimestamp(),
		});
		return true;
	} catch (error) {
		console.error("Error submitting contact response:", error);
		return false;
	}
}
