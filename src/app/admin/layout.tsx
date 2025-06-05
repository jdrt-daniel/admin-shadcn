"use client";

import { TanStackProvider } from "@/context/TanStackProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TanStackProvider>{children}</TanStackProvider>;
}
