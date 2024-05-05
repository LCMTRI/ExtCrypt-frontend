"use client";

// import { LucideIcon } from "lucide-react";
import React, { ReactElement } from "react";
import { Icons } from "../icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type Links = {
  name: string;
  slug: string;
  icon: ReactElement;
  disabled?: boolean;
};

const links: Links[] = [
  {
    name: "Home",
    slug: "/",
    icon: <Icons.home className="mr-2 h-4 w-4" />,
  },
  {
    name: "Create Key",
    slug: "/keygen",
    icon: <Icons.arrowLeft className="mr-2 h-4 w-4" />,
  },
  {
    name: "Contact",
    slug: "/contact",
    icon: <Icons.arrowLeft className="mr-2 h-4 w-4" />,
  },
  {
    name: "Subscription",
    slug: "/huhu",
    icon: <Icons.arrowLeft className="mr-2 h-4 w-4" />,
    disabled: true,
  },
];

export const UserHeaderNav = () => {
  const path = usePathname();
  const beforeClassname =
    "before:h-[2px] hover:before:w-1/3 before:bg-cyan-600 before:absolute before:bottom-0 before:left-0 before:block";
  return (
    <div className="flex mr-6">
      {links.map((item: Links, index: number) => {
        return (
          item.slug && (
            <Link
              key={index}
              href={item.disabled ? "/" : item.slug}
              className="relative"
            >
              <span
                className={cn(
                  "group flex flex-col rounded-md px-3 py-2 text-md font-medium leading-7",
                  item.disabled
                    ? ""
                    : "hover:text-cyan-700 dark:hover:text-cyan-600",
                  path === item.slug ? "text-cyan-700 dark:text-cyan-600" : "",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
              >
                {/* {item.icon} */}
                <span>{item.name}</span>
                <span
                  className={`h-[2px] ${
                    item.disabled ? "" : "group-hover:w-full"
                  } ${
                    path === item.slug ? "w-full" : "w-0"
                  } block bg-cyan-600 duration-300`}
                ></span>
              </span>
            </Link>
          )
        );
      })}
    </div>
  );
};
