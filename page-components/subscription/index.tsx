import {
  SubscriptionCardEnterprise,
  SubscriptionCardPro,
  SubscriptionCardTrial,
} from "@/components/cards/subscription-cards";
import React from "react";

const SubscriptionPageComponent = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-500/50 to-emerald-500/50 pt-32 pb-44">
      <div className="text-center xl:w-1/2 xl:px-0 px-20 w-full mx-auto mb-20">
        <h1 className="text-4xl font-bold mb-5">Our Pricing Plans</h1>
        <p className="text-xl">
          Explores the prices for the package that suits your needs, and starts
          distributing your PHP source codes today!
        </p>
      </div>
      <div className="px-52 grid xl:grid-cols-3 justify-items-center gap-12">
        <SubscriptionCardTrial />
        <SubscriptionCardPro />
        <SubscriptionCardEnterprise />
      </div>
    </div>
  );
};

export default SubscriptionPageComponent;
