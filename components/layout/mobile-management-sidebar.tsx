"use client";
import { DashboardNav } from "@/components/dashboard-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/constants/data";
import { NavLinks } from "@/constants/links";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { Icons } from "../icons";
import Link from "next/link";

// import { Playlist } from "../data/playlists";

interface ManagementSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[];
}

export function MobileManagementSidebar({ className }: ManagementSidebarProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <Link href={"/"} className="flex items-center px-4 mb-5">
                <Icons.logo className="h-7 w-7 text-emerald-500" />
                <span className="font-semibold text-lg text-emerald-500">
                  Ext
                </span>
                <span className="font-semibold text-lg text-cyan-600">
                  Crypt
                </span>
              </Link>
              <div className="space-y-1">
                <DashboardNav items={NavLinks} setOpen={setOpen} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
