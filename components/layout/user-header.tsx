import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import Link from "next/link";
import { Icons } from "../icons";
import { UserHeaderNav } from "./user-header-nav";

export default function UserHeader() {
  return (
    <div className="sticky top-0 left-0 right-0 z-50">
      <nav 
        // className="h-14 flex items-center justify-between px-4 border-b bg-background/95 backdrop-blur z-20"
        className="flex items-center justify-between py-5 pl-32 pr-12 border-b dark:bg-zinc-900/80 bg-white/95 backdrop-blur-[2px] z-20"
      >
        <div className="hidden lg:block">
          <Link
            className="flex items-center"
            href={"/"}
          >
            <Icons.logo className="h-9 w-9 text-emerald-500" />
            <span className="font-bold text-2xl text-emerald-500">Ext</span>
            <span className="font-bold text-2xl text-cyan-600">Crypt</span>
          </Link>
        </div>
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-4">
          <UserHeaderNav />
          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
