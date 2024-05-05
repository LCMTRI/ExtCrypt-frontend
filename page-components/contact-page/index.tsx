"use client";

import ContactForm from "@/components/forms/contact-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
});

type UserFormValue = z.infer<typeof formSchema>;

const ContactPageComponent = () => {
  return (
    <div className="w-full h-full py-16 flex flex-col gap-20 items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="inline-block text-4xl">Contact</h1>
        <span className=" text-lg font-light">
          If you have any questions or feedbacks, feel free to contact us!
        </span>
      </div>
      <ContactForm />
    </div>
  );
};

export default ContactPageComponent;
