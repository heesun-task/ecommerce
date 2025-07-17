import React from "react";
import { cn } from "@/lib/utils";

const LinedHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "text-xl font-bold relative leading-8",
        "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-1/2",
        "after:bg-gradient-to-r after:from-[var(--highlight)] after:to-transparent",
        "pb-1",
        className
      )}
    >
      {children}
    </h2>
  );
};

export default LinedHeading;
