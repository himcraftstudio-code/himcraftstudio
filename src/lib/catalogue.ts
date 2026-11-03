import products from "@/data/products.json";
import categories from "@/data/categories.json";
export type Product = typeof products[number];
export type Category = typeof categories[number];
export const getProducts = () => products;
export const getFeaturedProducts = () => products.filter((p) => p.featured);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategories = () => categories;
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
