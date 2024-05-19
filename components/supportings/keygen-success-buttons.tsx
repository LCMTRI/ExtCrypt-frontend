import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const KeygenSuccessButtons = () => {
  const router = useRouter();
  return (
    <div className="flex gap-8 mx-auto">
      <Button
        className="w-40 bg-cyan-600 hover:bg-cyan-500"
        onClick={() => router.push("/")}
      >
        Upload source code
      </Button>
      <Button
        className="w-40 bg-cyan-600 hover:bg-cyan-500"
        onClick={() => router.push("/me/tickets")}
      >
        See all tickets
      </Button>
    </div>
  );
};

export default KeygenSuccessButtons;
