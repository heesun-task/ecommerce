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
        "text-xl font-bold relative leading-8 mb-3",
        className
      )}
    >
      {children}
    </h2>
  );
};

export default LinedHeading;
