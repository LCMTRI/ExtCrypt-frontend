import OptionsSection from "@/components/accordion";
import ContactForm from "@/components/forms/contact-form";
import React from "react";

const KeygenPageComponent = () => {
  return (
    <div className="w-full h-full py-16 flex flex-col gap-20 items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="inline-block text-4xl">Contact</h1>
        <span className=" text-lg font-light">
          If you have any questions or feedbacks, feel free to contact us!
        </span>
      </div>
      <div className="p-20 w-full flex gap-8">
        <div className="w-full p-5 border rounded">
          <OptionsSection />
        </div>
        <div className="md:w-1/2 p-5 border rounded">
          <h1 className="font-semibold">Configuring explain</h1>
        </div>
      </div>
    </div>
  );
};

export default KeygenPageComponent;
