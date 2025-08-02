import { useMemo } from "react";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type PreviewCarouselProps = {
  current: number;
  changeSlideByIndex: (index: number) => void;
  productColors: {
    id: string;
    name: string;
    code: string;
    images: string[];
    price: number | null;
  }[];
};

export function PreviewCarousel({
  current,
  changeSlideByIndex,
  productColors = [],
}: PreviewCarouselProps) {

  const handleSlide = (index: number) => {
    changeSlideByIndex(index);
  };
  
  const thumbnailColors = useMemo(
    () =>
      productColors.map(({ code, name }, index) => (
        <Tooltip key={name}>
          <TooltipContent>{name}</TooltipContent>
          <TooltipTrigger asChild>
            <Button
              key={code}
              aria-pressed={current === index}
              className={cn(
                "w-5 h-5 p-0 rounded-full border ring-0 ring-offset-3 ring-offset-background cursor-pointer ml-2 mr-2",
                "hover:ring-1 hover:ring-gray-500",
                current === index && "ring-1 ring-black"
              )}
              style={{ backgroundColor: code }}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                handleSlide(index);
              }}
            />
          </TooltipTrigger>
        </Tooltip>
      )),
    [productColors, current, handleSlide]
  );

  return (
    <div className="space-y-4 mb-5">
      <AspectRatio ratio={9 / 12} className="w-full">
        <Image
          src={productColors[current].images?.[0] || "/product-placeholder.png"}
          alt={`Product color ${current + 1}`}
          className="object-cover w-full h-full"
          width={800}
          height={400}
        />
      </AspectRatio>
      <div className="flex cursor-auto" onClick={(e) => e.preventDefault()}>
        {thumbnailColors}
      </div>
    </div>
  );
}
