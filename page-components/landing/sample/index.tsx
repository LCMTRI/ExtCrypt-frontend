import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

const SampleSection = () => {
  return (
    <div className="grid lg:grid-cols-2 max-w-screen-xl mx-auto xl:px-5 w-full py-16 md:py-24 lg:py-36">
      <div className="w-full flex justify-center items-center px-5 xl:px-0">
        <div className="sm:max-w-[480px]">
          <h2 className="text-4xl font-bold md:text-5xl">
            Write code for the joy of it.
          </h2>
          <p className="mt-6 text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
            Laravel values beauty. We love clean code just as much as you do.
            Simple, elegant syntax puts amazing functionality at your
            fingertips. Every feature has been thoughtfully considered to
            provide a wonderful developer experience.
          </p>
          <Button className="bg-cyan-500/80 gap-2 hover:bg-cyan-500/50 shadow-lg text-zinc-800 dark:text-white">
            Find out more
            <Icons.arrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Image src={"/sample_code.svg"} width={587} height={342} alt="" />
    </div>
  );
};

export default SampleSection;
