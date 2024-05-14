import { Metadata } from "next";
import Link from "next/link";
import GoogleSignInButton from "@/components/google-auth-button";
import { Icons } from "@/components/icons";
import { redirect } from "next/navigation";
import { BackToHomeButton } from "@/components/buttons";
import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default async function AuthenticationPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="z-[100] fixed px-8 py-6 top-0 right-0 flex items-center sm:flex-col sm:items-end justify-end w-full gap-2">
        <BackToHomeButton />
        <ThemeToggle />
      </div>
      {/* <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 hidden top-4 md:right-8 md:top-8",
        )}
      >
        Login
      </Link> */}
      <div className="relative hidden h-full flex-col bg-zinc-900 p-10 justify-center gap-16 text-white dark:border-r lg:flex">
        {/* <div className="absolute inset-0 bg-zinc-900" /> */}
        <div className="relative z-20 flex flex-col items-center text-5xl h-fit font-medium">
          <Icons.logo
            className="relative mr-2 h-24 w-24 text-emerald-500"
            strokeWidth={1}
          />
          <div>
            <span className="text-emerald-500 mr-1">Ext</span>
            <span className=" text-cyan-600 dark:text-cyan-500">Crypt</span>
          </div>
        </div>
        <div className="relative z-20">
          <blockquote className="space-y-2 text-center">
            <p className="text-xl">
              A powerful PHP extension <br /> for encrypting your PHP projects
            </p>
            {/* <footer className="text-sm">- Sofia Davis -</footer> */}
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 flex items-center h-full min-h-[400px]">
        <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[330px]">
          <div className="flex flex-col space-y-5 text-center items-center">
            <div className="relative lg:hidden z-20 flex flex-col items-center text-3xl font-medium">
              <Icons.logo
                className="relative h-16 w-16 text-emerald-500"
                strokeWidth={1}
              />
              <div>
                <span className="text-emerald-500 mr-1">Ext</span>
                <span className=" text-cyan-500">Crypt</span>
              </div>
            </div>
            <hr className="border-t border-zinc-300 w-3/4 lg:hidden" />
            <h1 className="text-3xl font-semibold tracking-tight">Sign In</h1>
            <p className="text-md text-muted-foreground">
              Please sign in with Google
            </p>
          </div>
          {/* <UserAuthForm /> */}
          <GoogleSignInButton />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
