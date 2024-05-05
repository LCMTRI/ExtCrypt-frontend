"use client"

import React from "react";
import { Icons } from "../icons";
import { useRouter } from "next/navigation";

export const BackToHomeButton = () => {
	const router = useRouter()
	return (
		<div 
			className="group flex gap-1 items-center cursor-pointer decoration-2 underline-offset-2 hover:underline"
			onClick={() => router.push('/')}
		>
			<Icons.arrowLeft className=" group-hover:text-foreground z-20 sm:translate-x-10 translate-x-0 group-hover:translate-x-0 duration-200" />
			<span className="font-semibold text-xl bg-background z-30 py-2 sm:block hidden">Back to Home</span>
		</div>
	)
};

// export default BackToHomeButton;
