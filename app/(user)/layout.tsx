// import Header from "@/components/layout/header";
import UserFooter from "@/components/layout/user-footer";
import UserHeader from "@/components/layout/user-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ext Crypt",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full min-h-screen h-fit">
      <UserHeader />
      {/* <div className="w-full h-[87px] bg-gradient-to-r from-cyan-500/50 to-emerald-500/50 absolute top-0"></div> */}
      <div className="relative w-full">
        {children}
        {/* <ScrollToTopButton /> */}
      </div>
      <UserFooter />
    </div>
  );
}
