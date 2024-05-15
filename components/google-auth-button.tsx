"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GoogleSignInButton() {
  const router = useRouter();
  const popupCenter = (url: string, title: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 500) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${
        550 / systemZoom
      },top=${top},left=${left}`,
    );

    newWindow?.focus();
  };

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.data === "authComplete") {
        router.push("/");
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [router]);

  return (
    <Button
      className="w-full h-fit py-3"
      variant="outline"
      type="button"
      // onClick={() => popupCenter("/signin/google-signin", "Google Signin")}
      onClick={() => signIn("google")}
    >
      <Icons.google className="mr-2 h-5 w-5" />
      Continue with Google
    </Button>
  );
}
