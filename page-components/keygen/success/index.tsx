"use client";

import { Icons } from "@/components/icons";
import KeygenSuccessButtons from "@/components/supportings/keygen-success-buttons";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const KeygenSuccessPageComponent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("created-ticket-id");
  return (
    <div className="w-full lg:h-[calc(100vh-175px)] sm:h-[calc(100vh-165px)] h-screen flex flex-col gap-5 items-center justify-center">
      <Icons.info className="text-cyan-500 w-16 h-16" />
      <h1 className="font-bold text-2xl">1/2 completed!</h1>
      <div className="flex flex-col gap-2 text-lg">
        <span className="mx-auto text-center">
          File <span className="font-semibold">install.php</span> has been
          successfully downloaded.
          <br />
          Your ticket has also been created.
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
        <br />
        {id && <KeygenSuccessButtons id={id} />}
      </div>
    </div>
  );
};

export default KeygenSuccessPageComponent;
