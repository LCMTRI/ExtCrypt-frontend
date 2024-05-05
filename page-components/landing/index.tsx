"use client";

import React from "react";
import HeroSection from "./hero";
import ReasonSection from "./reason";
import SampleSection from "./sample";
import { useSession } from "next-auth/react";

const LandingPageComponent = () => {
  const { data: session } = useSession();
  console.log("session: ", session);
  return (
    <div className="bg-gradient-to-r from-cyan-500/50 to-emerald-500/50 relative">
      <HeroSection />
      <ReasonSection />
      <SampleSection />
    </div>
  );
};

export default LandingPageComponent;
