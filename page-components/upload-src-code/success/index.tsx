import { Icons } from "@/components/icons";
import Link from "next/link";
import React from "react";

const UploadCodeSuccessPageComponent = () => {
  return (
    <div className="w-full lg:h-[calc(100vh-175px)] sm:h-[calc(100vh-165px)] h-screen flex flex-col gap-5 items-center justify-center">
      <Icons.checkCircle className="text-emerald-500 w-16 h-16" />
      <h1 className="font-bold text-2xl">2/2 completed!</h1>
      <div className="flex flex-col gap-2 text-lg">
        <span className="mx-auto text-center">
          Your encrypted source code has been successfully downloaded.
          <br />
          Unzip it and run on the target machine.
        </span>
      </div>
    </div>
  );
};

export default UploadCodeSuccessPageComponent;
