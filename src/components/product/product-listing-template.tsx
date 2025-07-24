"use client";
import { useMemo, useState } from "react";
import { Category } from "@prisma/client";
import ProductPageHeader from "./product-page-header";
import {
  BreadcrumbItemType,
  FilterState,
  Pagination,
  SortOption,
} from "@/types/category.types";
import { ProductWithDetails } from "@/types/product.types";

type ProductListingTemplateProps = {
  title: string;
  description: string;
  image: string;
  breadcrumbs: BreadcrumbItemType[];
  allCategories: Category[];
  products?: ProductWithDetails[];
  categorySlug?: string;
  pagination: Pagination;
};

const ProductListingTemplate = ({
  title,
  description,
  image,
  breadcrumbs,
  products = [],
  allCategories,
  pagination,
  categorySlug,
}: ProductListingTemplateProps) => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    sizes: [],
    categories: [],
  });

  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // filter > price range
  // Memoize the price range to avoid recalculating on every render
  const priceRange = useMemo(() => {
    const prices = products.flatMap((p) => p.variants.map((v) => v.price));
    return {
      min: Math.min(...prices, 0),
      max: Math.max(...prices, 1000),
    };
  }, [products]);

  // filter > sizes
  const allSizes = useMemo(() => {
    const sizes = new Set<string>();
    products.forEach((product) => {
      product.variants.forEach((variant) => {
        if (variant.size) sizes.add(variant.size);
      });
    });
    return Array.from(sizes).sort();
  }, [products]);

  // filter > categories
  const filterCategories = useMemo(() => {
    if (!categorySlug) return allCategories;

    // Find the current category based on the slug
    const currentCategory = allCategories.find(
      (cat) => cat.slug === categorySlug
    );
    if (!currentCategory) return [];

    return allCategories.filter((cat) => cat.parentId === currentCategory.id);
  }, [allCategories, categorySlug]);

  return (
    <div>
      <ProductPageHeader
        title={title}
        description={description}
        image={image}
        breadcrumbs={breadcrumbs}
      />
      {/* <FilterSort/> */}
      {/* <ProductGrid /> */}
    </div>
  );
};

export default ProductListingTemplate;
