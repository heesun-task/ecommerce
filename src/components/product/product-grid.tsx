import Container from "../layout/container";
import ProductCard from "./product-card";
import { ProductWithColors } from "@/types/product.types";

type ProductGridProps = {
  products?: ProductWithColors[];
};

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <Container>
      <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-6 gap-y-20">
        {products?.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </Container>
  );
};

export default ProductGrid;
