"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";

const SampleSection = () => {
  const router = useRouter();
  return (
    <div className="grid lg:grid-cols-2 max-w-screen-xl mx-auto xl:px-5 w-full py-16 md:py-24 lg:py-36">
      <div className="w-full flex justify-center items-center px-5 xl:px-0">
        <div className="sm:max-w-[480px]">
          <h2 className="text-4xl font-bold md:text-5xl">
            A sample PHP file after encryption
          </h2>
          <p className="mt-6 text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
            As you can see, this file looks nothing like PHP code, making it
            really hard to decrypt. However after encryption, you can still run
            the source code the same way as before, on the target computer.
          </p>
          <Button
            className="bg-cyan-500/80 gap-2 hover:bg-cyan-500/50 shadow-lg text-zinc-800 dark:text-white"
            onClick={() => router.push("/key-options")}
          >
            Start encrypt now
            <Icons.arrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Image
        src={"/sample_code2.png"}
        className="overflow-hidden rounded-xl shadow-lg"
        width={587}
        height={342}
        alt=""
      />
    </div>
  );
};

export default SampleSection;
