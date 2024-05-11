import { Icons } from "@/components/icons";

export type Links = {
  name: string;
  slug: string;
  icon: keyof typeof Icons;
  disabled?: boolean;
};

export const NavLinks: Links[] = [
  {
    name: "Home",
    slug: "/",
    // icon: <Icons.home className="mr-2 h-4 w-4" />,
    icon: "home",
  },
  {
    name: "Key Options",
    slug: "/keygen",
    icon: "key",
  },
  {
    name: "Contact",
    slug: "/contact",
    icon: "billing",
  },
  {
    name: "Subscription",
    slug: "/subscription",
    icon: "laptop",
  },
];
