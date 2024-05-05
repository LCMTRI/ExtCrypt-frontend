"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  FALSE_EMAIL_MSG,
  FALSE_PHONE_NUMBER_MSG,
  INPUT_MAX_LENGTH_100,
  INPUT_MAX_LENGTH_1000,
  REQUIRED_INPUT_MSG,
} from "@/constants/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InferType, object, string } from "yup";
import { Textarea } from "../ui/textarea";
// import { z } from "zod";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const formSchema = object({
  name: string().required(REQUIRED_INPUT_MSG).max(100, INPUT_MAX_LENGTH_100),
  email: string()
    .email(FALSE_EMAIL_MSG)
    .required(REQUIRED_INPUT_MSG)
    .max(100, INPUT_MAX_LENGTH_100),
  question: string()
    .required(REQUIRED_INPUT_MSG)
    .max(1000, INPUT_MAX_LENGTH_1000),
  phoneNo: string()
    .matches(phoneRegExp, FALSE_PHONE_NUMBER_MSG)
    .required(REQUIRED_INPUT_MSG)
    .max(20, FALSE_PHONE_NUMBER_MSG),

  id: string().notRequired(),
});

type ContactSchema = InferType<typeof formSchema>;

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<ContactSchema>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data: ContactSchema) => {
    // signIn("credentials", {
    //   email: data.email,
    // });
  };

  // const {
  //   form: { register, handleSubmit, reset },
  //   isError,
  //   getErrorMessage,
  // } = useFormContact();
  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-screen-md grid sm:grid-cols-6 gap-4 mx-auto"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="sm:col-span-3">
                {/* <FormLabel className="text-lg">Name</FormLabel> */}
                <FormControl>
                  <Input
                    type="name"
                    placeholder="Your name *"
                    disabled={loading}
                    // style={{ height: "3rem", font }}
                    className="font-semibold h-12 p-4 text-md focus:outline-none active:outline-none border-0 bg-foreground/10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="sm:col-span-3">
                {/* <FormLabel className="text-lg">Email</FormLabel> */}
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your email *"
                    disabled={loading}
                    // style={{ height: "3rem", font }}
                    className="font-semibold h-12 p-4 text-md focus:outline-none active:outline-none border-0 bg-foreground/10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem className="sm:col-span-6">
                {/* <FormLabel>Question/Feedback</FormLabel> */}
                <FormControl>
                  <Textarea
                    placeholder="Messages, questions or feedbacks *"
                    disabled={loading}
                    // style={{ height: "3rem", font }}
                    className="font-semibold h-64 p-4 text-md focus:outline-none active:outline-none border-0 bg-foreground/10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                {/* <FormLabel className="text-lg">Phone Number</FormLabel> */}
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Phone number *"
                    disabled={loading}
                    // style={{ height: "3rem", font }}
                    className="placeholder:font-semibold h-12 p-4 text-md focus:outline-none active:outline-none border-0 bg-foreground/10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="sm:col-span-4"></div>

          <Button
            disabled={loading}
            className="sm:col-span-1 font-semibold bg-cyan-500/80 text-foreground text-base hover:bg-cyan-700/70"
            type="submit"
          >
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
