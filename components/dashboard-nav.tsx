"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { Links } from "@/constants/links";

interface DashboardNavProps {
  items: Links[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];
        return (
          item.slug && (
            <Link
              key={index}
              href={item.disabled ? "/" : item.slug}
              onClick={() => {
                if (setOpen) setOpen(false);
              }}
            >
              <span
                className={cn(
                  "group flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.slug ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[15px]">{item.name}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
