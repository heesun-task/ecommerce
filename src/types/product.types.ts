import { Category, Product, ProductColor, ProductVariant } from "@prisma/client";

export type ProductWithDetails = Product & {
  categories: { category: Category }[];
  variants: ProductVariant[];
};

export type ProductWithColors = Product & {
  colors: ProductColor[];
};