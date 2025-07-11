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
        "text-xl font-semibold relative leading-8",
        "after:content-[''] after:block after:bg-[var(--highlight)] after:h-1 after:mt-1 after:w-6",
        className
      )}
    >
      {children}
    </h2>
  );
};

export default LinedHeading;
