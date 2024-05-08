"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InferType, mixed, object, string } from "yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// const maskAddressRegex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
const maskAddressRegex = "^((25[0-5]|(2[0-4]|1d|[1-9]|)d).?\b){4}$";

const formSchema = object({
  maskAddress: string(),
  // .matches(maskAddressRegex, "Invalid mask address!")
  // .notRequired(),
  volumeSerial: string(),
  cpuId: string(),
  biosDate: string(),
  deviceName: string(),
  // .matches(phoneRegExp, FALSE_PHONE_NUMBER_MSG),
  zipFile: mixed<File>()
    .required("You have to provide your source code!")
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && value.type == "application/x-zip-compressed",
    ),

  id: string().notRequired(),
});

type OptionSchema = InferType<typeof formSchema>;

const OptionForm = () => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = React.useState<Date>();
  const [step, setStep] = React.useState(0);
  const form = useForm<OptionSchema>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data: OptionSchema) => {
    console.log("data: ", data);
  };

  // const {
  //   form: { register, handleSubmit, reset },
  //   isError,
  //   getErrorMessage,
  // } = useFormContact();
  return (
    <div className="">
      <h1 className="font-semibold text-2xl mb-2">
        {step === 0 ? "Options" : "Upload Source Code"}
      </h1>
      <div className="mb-8">
        {step === 0 ? (
          <span className="font-light text-base">
            Enter optional informations to create a more secure key.
          </span>
        ) : (
          <span className="font-light text-base">
            Please compress your project file/folder to a{" "}
            <span className="font-semibold">.zip</span> file.
          </span>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div
            className={`max-w-screen flex flex-col gap-5 ${
              step === 0 ? "" : "hidden"
            }`}
          >
            <FormField
              control={form.control}
              name="maskAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    Mask Address{" "}
                    <span className="text-foreground/50">(Optional)</span>:
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ex: 255.0.0.0"
                      disabled={loading}
                      className="px-4 py-5"
                      pattern={maskAddressRegex}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="volumeSerial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    Volume Serial{" "}
                    <span className="text-foreground/50">(Optional)</span>:
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ex: 06D4-EEBD"
                      disabled={loading}
                      className="px-4 py-5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpuId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    CPU Id{" "}
                    <span className="text-foreground/50">(Optional)</span>:
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ex: ..."
                      disabled={loading}
                      className="px-4 py-5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="biosDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    BIOS Activate Date{" "}
                    <span className="text-foreground/50">(Optional)</span>:
                  </FormLabel>
                  <FormControl>
                    {/* <Calendar/> */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deviceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    Device Name{" "}
                    <span className="text-foreground/50">(Optional)</span>:
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ex: DESKTOP-7A6HRSI"
                      disabled={loading}
                      className="px-4 py-5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={`${step === 1 ? "" : "hidden"} h-[482px]`}>
            <FormField
              control={form.control}
              name="zipFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    Mask Address<span className="text-red-500">*</span> :
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".zip"
                      disabled={loading}
                      onChange={(e) =>
                        field.onChange(
                          e.target.files ? e.target.files[0] : null,
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex justify-end gap-2 mt-5">
            <Button
              disabled={loading}
              variant="outline"
              className={`px-8 border-cyan-500/70 text-foreground text-base hover:bg-cyan-500/10 ${
                step === 1 ? "hidden" : ""
              }`}
              type="button"
              onClick={() => setStep(1)}
            >
              Next
            </Button>
            {/* <Button
              disabled={loading}
              variant="outline"
              className={`px-8 border-cyan-500/70 text-foreground text-base hover:bg-cyan-500/10 ${
                step === 1 ? "hidden" : ""
              }`}
              onClick={() => setStep(0)}
            >
              Test
            </Button> */}
            <Button
              disabled={loading}
              variant="outline"
              className={`px-8 border-cyan-500/70 text-foreground text-base hover:bg-cyan-500/10 ${
                step === 0 ? "hidden" : ""
              }`}
              onClick={() => setStep(0)}
              type="button"
            >
              Back
            </Button>
            <Button
              disabled={
                loading || !form.formState.isDirty || !form.formState.isValid
              }
              className={`px-8 bg-cyan-500/50 text-foreground text-base hover:bg-cyan-700/70 ${
                step === 0 ? "hidden" : ""
              }`}
              type="submit"
            >
              Finish
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OptionForm;
