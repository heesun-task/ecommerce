import { notFound } from "next/navigation";

import { getFilteredProducts } from "@/services/product.service";
import { SearchParams } from "@/types/category.types";
import { CategoryService } from "@/services/category.service";
import ProductPageHeader from "@/components/product/product-page-header";
import ProductGrid from "@/components/product/product-grid";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
};

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  // Extract the category slug from route params
  const resolvedParams = await params;

  // Fetch category data by slug including its children and parent categories
  const categoryData = await CategoryService.getCategoryBySlug(
    resolvedParams.slug
  );

  if (!categoryData) {
    notFound();
  }

  // Generate breadcrumb navigation for the current categoty
  const breadcrumbs = CategoryService.getCategoryBreadcrumbs(categoryData);

  // Extract filtering and sorting options from the search parameters
  const resolvedSearchParams = await searchParams;

  // Fetch products matching the current category and filters, with pagination
  const { products, pagination } = await getFilteredProducts(
    resolvedParams.slug,
    resolvedSearchParams
  );

  // TODO: remove console logs for test purpose
  console.log("breadcrumbs", breadcrumbs);
  console.log("searchParams", resolvedSearchParams);
  console.log("categoryData", categoryData);
  console.log(products, pagination);

  return (
    <div>
      <ProductPageHeader
        title={categoryData.name}
        description={categoryData.description}
        image={categoryData.image || "/images/default-category-banner.avif"}
        breadcrumbs={breadcrumbs}
      />
      <ProductGrid products={products} />
    </div>
  );
}
