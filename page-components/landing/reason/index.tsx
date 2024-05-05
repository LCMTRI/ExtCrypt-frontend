import { Icons } from "@/components/icons";
import React, { ReactNode } from "react";

type ReasonEl = {
  title: string;
  content: string;
  icon: ReactNode;
};

const reasons: ReasonEl[] = [
  {
    title: "Advanced Protection",
    content: "Generate a specific key for each customer.",
    icon: <Icons.key className="h-9 w-9 text-emerald-500" />,
  },
  {
    title: "Online Encryption",
    content: "Encrypt source code from online also possible.",
    icon: <Icons.lock className="h-9 w-9 text-emerald-500" />,
  },
  {
    title: "It's your code!",
    content: "Prevent others to keep spreading your valuable source code",
    icon: <Icons.checkCircle className="h-9 w-9 text-emerald-500" />,
  },
];

const ReasonSection = () => {
  return (
    <div className="h-fit w-full bg-background flex flex-col items-center px-40 py-24 gap-16">
      <h1 className=" font-medium tracking-tight text-4xl text-center">
        Why do you need encryption for php?
      </h1>
      <span className="h-[2px] max-w-[400px] w-1/2 bg-cyan-600"></span>
      <div className="grid grid-cols-3 w-4/5 gap-16 lg:gap-24">
        {reasons.map((el: ReasonEl, index: number) => (
          <div className="flex flex-col items-start">
            {el.icon}
            <h1 className="text-xl font-semibold mt-6 mb-3">{el.title}</h1>
            <p>{el.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReasonSection;
