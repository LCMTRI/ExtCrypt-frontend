import { Icons } from "@/components/icons";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div
      className=" w-full py-28 px-44 flex items-center justify-between"
      // style={{ padding: "7rem 11rem" }}
    >
      <div>
        <h1 className="font-medium tracking-tight text-4xl text-zinc-800 dark:text-zinc-100">
          Protect PHP Source Code
        </h1>
        <ul className="list-inside text-lg font-medium text-zinc-600 dark:text-zinc-200 mt-4 leading-8">
          <li className="flex gap-2.5 items-center">
            <Icons.check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Encrypt and decrypt php source code.
          </li>
          <li className="flex gap-2.5 items-center">
            <Icons.check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Ensure only licensed people are using.
          </li>
          <li className="flex gap-2.5 items-center">
            <Icons.check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Free for small and medium companies.
          </li>
          <li className="flex gap-2.5 items-center">
            <Icons.check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Encode and run PHP files.
          </li>
          <li className="flex gap-2.5 items-center">
            <Icons.check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Ioncube alternative (free)
          </li>
        </ul>
      </div>

      <Image
        src={"/hero2.svg"}
        alt=""
        width={350}
        height={30}
        className="mr-20 scale-x-[-1]"
      />
    </div>
  );
};

export default HeroSection;
