"use client";

import { type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

interface item {
  title: string;
  url: string;
  icon?: Icon;
}

interface section {
  title: string;
  icon?: Icon;
  items: item[];
}

export function NavMain({ sections }: { sections: section[] }) {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {sections.map((section) => (
          <Fragment key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarMenu>
              {section.items.map((item) => (
                <Link href={item.url} key={item.title}>
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={cn(
                        "hover:bg-primary/10 hover:text-primary min-w-8 duration-200 ease-linear h-8",
                        item.url === pathname
                          ? "bg-primary text-primary-foreground"
                          : ""
                      )}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              ))}
            </SidebarMenu>
          </Fragment>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
