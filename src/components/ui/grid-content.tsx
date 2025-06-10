import { cn } from "@/lib/utils";
import React from "react";

interface GridContentProps {
  spacing?: number;
  children: React.ReactNode;
  className?: string;
}

export default function GridContent({
  spacing = 1,
  children,
  className,
}: GridContentProps) {
  return (
    <div className={cn("grid grid-cols-12", `gap-${spacing}`, className)}>
      {children}
    </div>
  );
}
