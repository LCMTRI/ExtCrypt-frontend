"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const KeygenSuccessButtons = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <div className="flex gap-8 mx-auto">
      <Button
        className="bg-cyan-600 hover:bg-cyan-500"
        onClick={() => router.push(`/upload-src-code/${id}`)}
      >
        Upload source code
      </Button>
      <Button
        className="bg-cyan-600 hover:bg-cyan-500"
        onClick={() => router.push("/me/tickets")}
      >
        See all tickets
      </Button>
    </div>
  );
};

export default KeygenSuccessButtons;
