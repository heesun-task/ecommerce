'use client';
import { Product } from "@prisma/client";
import { HeartIcon} from "lucide-react";

import Container from "../layouts/container";
import Link from "next/link";
import { Button } from "../ui/button";

type ProductGridProps = {
  products?: Product[];
};

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <Container>
      {products?.map((product) => {
        return (
          <div key={product.id}>
            <Button onClick={() =>{console.log('test')}}>
              <HeartIcon/>
            </Button>
            <Link href={`/product/${product.slug}`}>
              <h2>{product.name}</h2>
            </Link>
          </div>
        );
      })}
    </Container>
  );
};

export default ProductGrid;
