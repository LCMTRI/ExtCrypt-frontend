import OptionsSection from "@/components/accordion";
import ContactForm from "@/components/forms/contact-form";
import OptionForm from "@/components/forms/option-form";
import React from "react";

const KeygenPageComponent = () => {
  return (
    <div className="w-full h-full py-16 flex flex-col gap-20 items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="inline-block text-4xl">Key Generation</h1>
        <span className="text-lg">
          Upload your source code in a .zip file, and choose additional options
          for a more secure key.
        </span>
      </div>
      <div className="p-20 w-full flex gap-8">
        <div className="w-full py-8 px-12 border rounded">
          {/* <OptionsSection /> */}
          <OptionForm />
        </div>
        <div className="md:w-1/2 p-5 border rounded hidden md:block">
          <h1 className="font-semibold">Configuring explain</h1>
        </div>
      </div>
    </div>
  );
};

export default KeygenPageComponent;
