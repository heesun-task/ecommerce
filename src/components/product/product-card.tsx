"use client";
import Link from "next/link";
import { HeartIcon } from "lucide-react";

import { ProductWithColors } from "@/types/product.types";
import { PreviewCarousel } from "./preview-carousel";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SaleProduct } from "@/services/product.service";

type ProductCardProps = {
  product: ProductWithColors | SaleProduct;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [current, setCurrent] = useState(0);

  const changeSlideByIndex = (index: number) => {
    setCurrent(index);
  };

  return (
    <Link
      href={`/product/${product.slug}?color=${product.colors[current]?.name}`}
      passHref
    >
      <div className="w-full relative">
        <Button
          variant="ghost"
          className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full hover:bg-gray-100 transition-colors hover:text-red-600"
          aria-label="Add to favorites"
          data-slot="button"
          size="icon"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            console.log("test");
          }}
        >
          <HeartIcon />
        </Button>

        <PreviewCarousel
          productColors={product.colors}
          current={current}
          changeSlideByIndex={changeSlideByIndex}
        />
        <div className="text-sm">
          <strong aria-label="Product name" className="break-all">
            {product.name}
          </strong>
          <p>{product.description}</p>
          <div className="font-medium">
            <span
              className={cn(" text-gray-500", {
                "line-through": product.colors[current]?.price,
              })}
            >
              CAD {product.basePrice}
            </span>
            {product.colors[current]?.price && (
              <span className="ml-2 text-red-600">
                CAD {product.colors[current].price}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
