/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";

interface TableSkeletonProps {
  columns: any[];
  rows: number;
  size?: "sm" | "md" | "lg";
}

export const TableSkeleton = ({
  columns,
  rows,
  size = "md",
}: TableSkeletonProps) => {
  return (
    <div className="w-full h-full ">
      <div className="grid grid-cols-12 w-full px-2 mb-4 gap-3">
        <Skeleton className="col-span-2 h-8" />
        {/* <Skeleton className="col-span-8 h-8" /> */}
        <div className="col-span-8 h-8"></div>
        <Skeleton className="col-span-2 h-8" />
      </div>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted top-0 z-10">
            <TableRow>
              {columns.map(() => (
                <TableHead key={Math.random()}>
                  <Skeleton className="w-full h-4" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, index) => (
              <TableRow key={index} className="hover:bg-transparent">
                {columns.map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton
                      className={cn(
                        "h-4 w-full",
                        size === "md" && "h-7",
                        size === "lg" && "h-9"
                      )}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="grid grid-cols-12 w-full px-2 mt-4 gap-3">
        <Skeleton className="col-span-8 h-8" />
        <Skeleton className="col-span-4 h-8" />
      </div>
    </div>
  );
};
