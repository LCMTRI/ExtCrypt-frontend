import { DashboardNav } from "@/components/dashboard-nav";
import { ManagementLinks } from "@/constants/links";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  return (
    <nav className={cn(`relative hidden h-screen border-r lg:block w-72`)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-7 px-4 text-xl font-semibold tracking-tight text-foreground/0">
              Overview
            </h2>
            <DashboardNav items={ManagementLinks} />
          </div>
        </div>
      </div>
    </nav>
  );
}
