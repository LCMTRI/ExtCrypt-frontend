"use client";

// import { LucideIcon } from "lucide-react";
import { Links, NavLinks } from "@/constants/links";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const UserHeaderNav = () => {
  const path = usePathname();
  return (
    <div className="mr-6 lg:flex hidden">
      {NavLinks.map((item: Links, index: number) => {
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
