import {
  Category,
  Product,
  ProductColor,
  ProductVariant,
} from "@prisma/client";

export type ProductWithDetails = Product & {
  categories: { category: Category }[];
  variants: ProductVariant[];
  colors: ProductColor[];
};

export type ProductWithColors = Product & {
  colors: ProductColor[];
};

export type ProductSummary = {
  id: string;
  name: string;
  // createdAt: Date;
  // updatedAt: Date;
  slug: string;
  // description: string | null;
  basePrice: number;
  shortDescription: string | null;
  // material: string | null;
  active: boolean;
  featured: boolean;
  colors: {
    id: string;
    name: string;
    code: string;
    images: string[];
    price: number | null;
  }[];
};
