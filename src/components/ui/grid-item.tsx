import { cn } from "@/lib/utils";
import React from "react";

interface GridItemProps {
  size?:
    | {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
      }
    | number;
  container?: boolean;
  spacing?: number;
  children: React.ReactNode;
}

export default function GridItem({
  size,
  children,
  container,
  spacing = 6,
}: GridItemProps) {
  const getColumnSize = () => {
    if (typeof size === "number") {
      return `col-span-${size}`;
    }

    if (typeof size === "object") {
      return cn(
        size.xs && `col-span-${size.xs}`,
        size.sm && `sm:col-span-${size.sm}`,
        size.md && `md:col-span-${size.md}`,
        size.lg && `lg:col-span-${size.lg}`
      );
    }

    return "col-span-12";
  };

  return (
    <div className={getColumnSize()}>
      {container ? (
        <div className={cn("grid grid-cols-12", `gap-${spacing}`)}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
