import { getSaleProducts } from "@/services/product.service";
import ProductPageHeader from "@/components/product/product-page-header";
import ProductGrid from "@/components/product/product-grid";

export const dynamic = "force-dynamic"; // Force dynamic rendering for this page
// This is useful for pages that need to be updated frequently or have dynamic content
// export const revalidate = 60; // Revalidate every 60 seconds

export default async function SalePage({}) {
  const breadcrumbs = [{ label: "Sale" }];

  const products = await getSaleProducts();

  if (!products || products.length === 0) {
    return (
      <div className="pb-30">
        <ProductPageHeader
          title={"Sale"}
          description={"Discover amazing deals on our products."}
          image={"/images/default-category-banner.avif"}
          breadcrumbs={breadcrumbs}
        />
        <div className="flex flex-col gap-y-4">
          <h1 className="text-2xl font-bold">Sale</h1>
          <p>No products on sale at the moment.</p>
        </div>
      </div>
    );
  }

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
