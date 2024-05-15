"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GoogleSignInButton() {
  return (
    <Button
      className="w-full h-fit py-3"
      variant="outline"
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      <Icons.google className="mr-2 h-5 w-5" />
      Continue with Google
    </Button>
  );
}
