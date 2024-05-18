import { Button } from "@/components/ui/button";
import { CheckSquare } from "lucide-react";

export const SubscriptionCardEnterprise = () => {
  return (
    <div className="bg-background/60 flex flex-col items-center justify-between h-[500px] xl:w-[300px] w-[400px] min-w-[300px] backdrop-blur-sm shadow-lg text-center text-base text-foreground/80 py-8 xl:px-5 px-12 rounded-lg">
      {/* <div className="bg-white/60 backdrop-blur-sm shadow-lg text-center text-base text-zinc-700 py-8 px-5 rounded-lg"> */}
      <div className="w-full">
        <h2 className="text-2xl font-semibold mb-3">Enterprise</h2>
        <h1 className="text-xl text-foreground/80 font-normal">
          <span className="text-4xl text-foreground font-semibold mr-1">
            349.99
          </span>
          VNĐ/Year
        </h1>
        <ul className="mt-10 text-foreground/80 flex flex-col gap-3">
          <li className="flex gap-3 items-center text-left">
            <CheckSquare className="text-emerald-500 dark:text-emerald-600 h-5 w-5" />
            <p>
              <span>Up to</span>
              <span className="font-bold">&nbsp;10 GB</span>
              <span>&nbsp;Upload Size</span>
            </p>
          </li>
          <li className="flex gap-3 items-center text-left">
            <CheckSquare className="text-emerald-500 dark:text-emerald-600 h-5 w-5" />
            <p>
              <span>Options for Company Usage</span>
            </p>
          </li>
          <li className="flex gap-3 items-center text-left">
            <CheckSquare className="text-emerald-500 dark:text-emerald-600 h-5 w-5" />
            <p>
              <span>Scaling Systems</span>
            </p>
          </li>
          <li className="flex gap-3 items-center text-left">
            <CheckSquare className="text-emerald-500 dark:text-emerald-600 h-5 w-5" />
            <p>
              <span>Organization Level Solution</span>
            </p>
          </li>
          <li className="flex gap-3 items-center text-left">
            <CheckSquare className="text-emerald-500 dark:text-emerald-600 h-5 w-5" />
            <p>
              <span>Unlimited Distribute Licenses</span>
            </p>
          </li>
        </ul>
      </div>
      {/* <Button
        disabled
        className="bg-cyan-400 dark:bg-cyan-700 hover:bg-cyan-500/70 dark:hover:bg-cyan-700/70 text-foreground px-8 py-6"
      >
        <h1 className="text-lg">Start Today</h1>
      </Button> */}
    </div>
  );
};
