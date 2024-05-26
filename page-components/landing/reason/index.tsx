import { Icons } from "@/components/icons";
import React, { ReactNode } from "react";

type ReasonEl = {
  title: string;
  content: string;
  icon: ReactNode;
};

const reasons: ReasonEl[] = [
  {
    title: "Licensing",
    content: "Generate key to run code on specific computers.",
    icon: <Icons.key className="h-9 w-9 text-emerald-500" />,
  },
  {
    title: "Advanced Encryption",
    content: "Create code that is really hard to decrypt.",
    icon: <Icons.lock className="h-9 w-9 text-emerald-500" />,
  },
  {
    title: "Copyright",
    content: "Prevent others from spreading your valuable source code.",
    icon: <Icons.checkCircle className="h-9 w-9 text-emerald-500" />,
  },
];

const ReasonSection = () => {
  return (
    <div className="h-fit w-full bg-background flex flex-col items-center lg:px-40 px-8 py-24 gap-16">
      <h1 className=" font-medium tracking-tight text-4xl text-center">
        Why do you need to encrypt php codes with ExtCrypt?
      </h1>
      <span className="h-[2px] max-w-[400px] w-1/2 bg-cyan-600"></span>
      <div className="grid sm:grid-cols-3 grid-cols-1 lg:w-4/5 w-full gap-16 lg:gap-20">
        {reasons.map((el: ReasonEl, index: number) => (
          <div className="flex flex-col items-start" key={index}>
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
