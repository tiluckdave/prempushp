import { Timestamp } from "firebase/firestore";

export interface FirebaseCategory {
	id?: string;
	name: string;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export interface FirebaseProduct {
	id?: string;
	name: string;
	category: {
		id: string;
		name: string;
	};
	coverImage: {
		id: string;
		name: string;
		url: string;
	};
	shortDescription: string;
	longDescription: string;
	ingredients: string[];
	nutritionInfo: {
		calories: string;
		carbs: string;
		fat: string;
		protein: string;
		servingSize: string;
	};
	sizes: Array<{
		mrp: string;
		size: string;
	}>;
	storageInstructions: string;
	dietaryPreferences: string[];
	featured: boolean;
	images: string[];
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

// Converted types for use in components (matching existing Product interface)
export interface Product {
	id: string;
	name: string;
	category: string;
	shortDescription?: string;
	longDescription?: string;
	description?: string;
	sizes?: { size: string; mrp: number }[];
	ingredients?: string[];
	nutritionalInfo?: {
		servingSize?: string;
		calories?: number;
		protein?: string;
		carbohydrates?: string;
		fat?: string;
	};
	storageInstructions?: string;
	dietaryPreferences?: string[];
	featured?: boolean;
	images?: string[];
	coverImage?: string;
}

export interface Category {
	id: string;
	name: string;
	createdAt?: Date;
	updatedAt?: Date;
}
