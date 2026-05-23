import productsData from "./products.json";

export type Category = "backpack" | "sleeping_bag" | "sleeping_pad" | "tent" | "apparel";

export interface Product {
  id: string;
  name_hebrew: string;
  name_english: string;
  brand: string;
  category: Category;
  price_usd: number;
  weight_grams: number;
  waterproof_mm: number | null;
  temperature_rating: number | null;
  volume_liters: number | null;
  r_value: number | null;
  description_hebrew: string;
  description_english: string;
  image_url: string;
  buy_url: string;
  tags: string[];
  rating: number;
}

export const products: Product[] = productsData as Product[];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export const ILS_PER_USD = 3.7;
export const usdToIls = (usd: number) => Math.round(usd * ILS_PER_USD);
