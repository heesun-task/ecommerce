'use client';
import Link from "next/link";
import { HeartIcon} from "lucide-react";

import Container from "../layouts/container";
import { Product } from "@prisma/client";
import { Button } from "../ui/button";
import ProductCard from "./product-card";

type ProductGridProps = {
  products?: Product[];
};

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <Container>
      {products?.map((product) => {
        return (
          <ProductCard key={product.id} product={product} />
        );
      })}
    </Container>
  );
};

export default ProductGrid;
