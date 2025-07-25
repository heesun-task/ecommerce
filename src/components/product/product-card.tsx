import { Product } from "@prisma/client";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { HeartIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  console.log("product", product);
  return (
    <Link href={`/product/${product.slug}`} passHref>
      <div>
        <Button
          onClick={() => {
            console.log("test");
          }}
        >
          <HeartIcon />
        </Button>
        <AspectRatio ratio={16 / 9} className="w-full">
          <img
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.name}
            className="object-cover"
          />
        </AspectRatio>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
