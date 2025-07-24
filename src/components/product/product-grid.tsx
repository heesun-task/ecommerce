import { Product } from "@prisma/client";

type ProductGridProps = {
  products?: Product[];
  onProductClick?: (product: Product) => void;
}

const ProductGrid = ({
  products,
  onProductClick,
}: ProductGridProps) => {
  return (
    <div>
      {products?.map((product) => (
        <div key={product.id} onClick={() => onProductClick?.(product)}>
          <h2>{product.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;