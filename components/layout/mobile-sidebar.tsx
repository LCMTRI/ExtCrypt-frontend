"use client";
import { DashboardNav } from "@/components/dashboard-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/constants/data";
import { ManagementLinks, NavLinks } from "@/constants/links";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { Icons } from "../icons";
import Link from "next/link";
import { Separator } from "../ui/separator";

// import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[];
}

export function MobileSidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4">
            <div className="px-3 py-2">
              {/* <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Overview
              </h2> */}
              <Link href="/" className="flex items-center px-4 mb-5">
                <Icons.logo className="h-7 w-7 text-emerald-500" />
                <span className="font-semibold text-lg text-emerald-500">
                  Ext
                </span>
                <span className="font-semibold text-lg text-cyan-600">
                  Crypt
                </span>
              </Link>
              <div className="space-y-1 flex flex-col gap-2">
                <DashboardNav items={NavLinks} setOpen={setOpen} />
                <Separator />
                <DashboardNav items={ManagementLinks} setOpen={setOpen} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
