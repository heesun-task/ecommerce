import { notFound } from "next/navigation";

import Container from "@/components/layouts/container";
import ProductListingTemplate from "@/components/product/product-listing-template";
import getFilteredProducts from "@/services/product.service";
import { CategoryWithChildren, SearchParams } from "@/types/category.types";
import { CategoryService } from "@/services/category.service";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: SearchParams;
};

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const resolvedParams = await params;
  console.log('params', resolvedParams);
  const categoryData = await CategoryService.getCategoryBySlug(resolvedParams.slug);
  console.log('categoryData', categoryData);

  if (!categoryData) {
    notFound();
  }

  // const { category, breadcrumbs } = categoryData;

  // const [{ products, pagination }, filterOptions] = await Promise.all([
    // getFilteredProducts(params.slug, searchParams),
  //   // getFilterOptions(params.slug),
  // ]);

  return (
    <div>
      test
    </div>
    // <ProductListingTemplate
    //   title={category.name}
    //   description={category.description}
    //   image={category.image || "/default-category-image.jpg"}
    //   breadcrumbs={breadcrumbs}
    //   products={products}
    //   pagination={pagination}
    //   // filterOptions={filterOptions}
    //   // currentFilters={searchParams}
    //   categorySlug={params.slug}
    //   allCategories={[]}
    // />
  );
}
