import React from "react";

const userFooter = () => {
  return (
    // <div className="w-full h-28 px-20 bg-gradient-to-r from-cyan-100 to-emerald-100 dark:from-cyan-900 dark:to-emerald-900 flex items-center justify-between text-md">
    <div className="w-full h-28 px-20 bg-gradient-to-r from-cyan-300/30 to-emerald-300/30 flex items-center justify-between text-md">
      <span>
        Created by&nbsp;<span className="font-semibold">Le Cao Minh Tri</span>,
        2024.
      </span>
      <div className="flex flex-col text-sm items-end font-semibold">
        <span>Ho Chi Minh University of Technology</span>
        <span>Graduation Thesis</span>
      </div>
    </div>
  );
};

export default userFooter;
