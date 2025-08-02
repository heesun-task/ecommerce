import { Prisma } from "@prisma/client";

export interface BreadcrumbItemType {
  label: string;
  href?: string;
}

export type CategoryWithChildren = Prisma.CategoryGetPayload<{
  include: {
    parent: true,
    children: true;
    _count: {
      select: { products: true };
    };
  };
}>;

export type SearchParams = {
  sizes?: string; // "S,M,L"
  minPrice?: string; // "50000"
  maxPrice?: string; // "200000"
  sortBy?: string; // "newest"
  page?: string; // "1"
};

export type CategoryData = {
  category: {
    name: string;
    description: string;
    image?: string;
  };
  breadcrumbs: BreadcrumbItemType[];
};

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type FilterState = {
  priceRange: [number, number];
  sizes: string[];
  categories: string[];
};

export type FilterOption = {
  label: string;
  value: string;
};

export type SortOption =
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "newest";
