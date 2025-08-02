import { notFound } from "next/navigation";

import { getFilteredProducts } from "@/services/product.service";
import { SearchParams } from "@/types/category.types";
import { CategoryService } from "@/services/category.service";
import ProductPageHeader from "@/components/product/product-page-header";
import ProductGrid from "@/components/product/product-grid";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  if (!resolvedParams.slug) {
    notFound();
  }

  const slug = resolvedParams.slug;

  const categoryData = await CategoryService.getCategoryBySlug(slug);

  if (!categoryData) {
    notFound();
  }

  console.log("categoryData", categoryData);

  const breadcrumbs = CategoryService.getCategoryBreadcrumbs(categoryData);

  const genderFilter = extractGenderFromSlug(slug);

  const enhancedSearchParams = {
    ...resolvedSearchParams,
    ...(genderFilter && { gender: genderFilter }),
  } as SearchParams;

  const { products } = await getFilteredProducts(slug, enhancedSearchParams);

  return (
    <div className="pb-30">
      <ProductPageHeader
        title={categoryData.name}
        description={categoryData.description}
        image={categoryData.image || "/images/default-category-banner.avif"}
        breadcrumbs={breadcrumbs}
        showBanner={!!categoryData.image && categoryData.parentId === null}
      />
      <ProductGrid
        products={products}
        topLevelCategory={"/categories" + breadcrumbs[0].href}
      />
    </div>
  );
}

function extractGenderFromSlug(slug: string): "MENS" | "WOMENS" | null {
  if (slug.startsWith("womens") || slug.includes("-womens-")) return "WOMENS";
  if (slug.startsWith("mens") || slug.includes("-mens-")) return "MENS";
  return null;
}
