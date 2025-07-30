import { getFilteredProducts, getSaleProducts } from "@/services/product.service";
import { SearchParams } from "@/types/category.types";
import ProductPageHeader from "@/components/product/product-page-header";
import ProductGrid from "@/components/product/product-grid";

type SalePageProps = {
};

export default async function SalePage({
}: SalePageProps) {
  const breadcrumbs = [{label: 'Sale' }];

  const products = await getSaleProducts();

  return (
    <div className="pb-30">
      <ProductPageHeader
        title={"Sale"}
        description={"Discover amazing deals on our products."}
        image={"/images/default-category-banner.avif"}
        breadcrumbs={breadcrumbs}
      />
      <ProductGrid products={products} />
    </div>
  );
}
