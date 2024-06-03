"use client";

import GuideSection from "./guide";
import HeroSection from "./hero";
import ReasonSection from "./reason";
import SampleSection from "./sample";

const LandingPageComponent = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-500/50 to-emerald-500/50 relative">
      <HeroSection />
      <ReasonSection />
      <SampleSection />
      <GuideSection />
    </div>
  );
};

export default LandingPageComponent;
