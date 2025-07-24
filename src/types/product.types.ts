import { Category, Product, ProductVariant } from "@prisma/client";

export type ProductWithDetails = Product & {
  categories: { category: Category }[];
  variants: ProductVariant[];
};