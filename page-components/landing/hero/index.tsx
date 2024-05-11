import DownloadButton from "@/components/buttons/download";
import { Icons } from "@/components/icons";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div
      className="relative w-full py-28 xl:px-44 sm:px-32 px-6 flex items-center justify-between overflow-hidden"
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
        <DownloadButton />
      </div>

      <Image
        src={"/hero2.svg"}
        alt=""
        width={350}
        height={350}
        className="xl:mr-20 mr-0 lg:scale-x-[-1] lg:scale-y-[1] scale-x-[-1.5] scale-y-[1.5] lg:relative lg:bottom-0 lg:right-0 absolute -bottom-[10%] -right-[5%] z-0 lg:opacity-100 opacity-60"
      />
    </div>
  );
};

export default HeroSection;
