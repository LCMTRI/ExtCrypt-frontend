import { Icons } from "@/components/icons";
import Link from "next/link";
import React from "react";

const KeygenSuccessPageComponent = () => {
  return (
    <div className="w-full lg:h-[calc(100vh-175px)] sm:h-[calc(100vh-165px)] h-screen flex flex-col gap-5 items-center justify-center">
      <Icons.info className="text-cyan-500 w-16 h-16" />
      <h1 className="font-bold text-2xl">1/2 completed!</h1>
      <div className="flex flex-col gap-2 text-lg">
        <span className="mx-auto text-center">
          File <span className="font-semibold">install.php</span> has been
          successfully downloaded.
          <br />
          Your ticket has also been created (visit{" "}
          <Link
            href={"/me/tickets"}
            className="text-cyan-700 underline underline-offset-2 hover:text-cyan-500 font-semibold"
          >
            tickets
          </Link>
          ).
        </span>
        <br /> You are half-way done. Please continue to follow these steps:
        <ul className=" list-inside list-disc">
          <li>
            <span>
              Run <span className="font-semibold">install.php</span> on the
              target machine.
            </span>
          </li>
          <li>
            <span>
              Receive <span className="font-semibold">hwid.txt</span> which
              contains the key.
            </span>
          </li>
          <li>
            <span>
              Upload source code and{" "}
              <span className="font-semibold">hwid.txt</span> on created ticket.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default KeygenSuccessPageComponent;
