import { _post } from "@/app/api/backend/api-client";
import DownloadButton from "@/components/buttons/download";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative w-full py-16 xl:px-44 sm:px-32 px-6 flex items-center justify-between overflow-hidden">
      <div className="z-10 back">
        <h1 className="font-medium tracking-tight text-4xl text-zinc-800 dark:text-zinc-100">
          Protect PHP Source Code
        </h1>
        <ul className="list-inside text-lg font-medium text-zinc-600 dark:text-zinc-200 my-4 leading-8">
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
            Simple and easy to use.
          </li>
        </ul>
        <DownloadButton />
      </div>

      <Image
        src={"/hero2.svg"}
        alt=""
        width={400}
        height={400}
        className="xl:mr-20 mr-0 lg:scale-x-[-1] lg:scale-y-[1] scale-x-[-1.5] scale-y-[1.5] lg:relative lg:bottom-0 lg:right-0 absolute -bottom-[10%] -right-[5%] z-0 lg:opacity-100 opacity-60"
      />
    </div>
  );
};

export default HeroSection;
