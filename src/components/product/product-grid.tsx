import { ShoppingBag } from "lucide-react";
import Container from "../layout/container";
import ProductCard from "./product-card";
import { ProductSummary } from "@/types/product.types";

type ProductGridProps = {
  products: ProductSummary[];
  topLevelCategory?: string;
};

const ProductGrid = ({ products, topLevelCategory }: ProductGridProps) => {
  if (!products || products.length === 0) {
    return (
      <Container className="flex flex-col items-center justify-center text-center text-muted-foreground">
        <div className="flex flex-col items-center bg-[#FAFAFA] w-full py-24">
          <ShoppingBag className="w-12 h-12 mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold">Products coming soon!</h2>
          <p className="mt-2 text-sm">
            We&apos;re working hard to add more items. In the meantime, feel free to
            explore our other collections
          </p>

          {topLevelCategory && (
            <a
              href={topLevelCategory}
              className="mt-6 inline-block rounded-xl bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition"
            >
              Browse all products
            </a>
          )}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-x-6 gap-y-20">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </Container>
  );
};

export default ProductGrid;
