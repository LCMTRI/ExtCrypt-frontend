"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { InferType, boolean, mixed, object, string } from "yup";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { _post } from "@/app/api/backend/api-client";

const formSchema = object({
  maskAddress: boolean(),
  // .matches(maskAddressRegex, "Invalid mask address!")
  // .notRequired(),
  volumeSerial: boolean(),
  cpuId: boolean(),
  biosDate: boolean(),
  deviceName: boolean(),
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
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<OptionSchema>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data: OptionSchema) => {
    // const result: {
    //   bitStr: string;
    //   zipFile: File;
    // } = {
    //   bitStr: "",
    //   zipFile: data.zipFile,
    // };

    const result = new FormData();
    let bitStr = "";

    result.append("files", data.zipFile);
    bitStr += data.biosDate ? "1" : "0";
    bitStr += data.volumeSerial ? "1" : "0";
    bitStr += data.cpuId ? "1" : "0";
    bitStr += data.biosDate ? "1" : "0";
    bitStr += data.deviceName ? "1" : "0";
    result.append("values", bitStr);
    const { data: res } = await _post("/form", result, {});
    // const res = await axios.get("http://localhost:8000/health-check", {
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // });
    console.log("result: ", res);
  };

  // const {
  //   form: { register, handleSubmit, reset },
  //   isError,
  //   getErrorMessage,
  // } = useFormContact();
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          ref={formRef}
          encType="multipart/form-data"
        >
          <div className="max-w-screen flex flex-col gap-5 mb-12">
            <div>
              <h1 className="font-semibold text-2xl mb-2">1. Options</h1>
              <span className="font-light text-base mb-8">
                Enter optional informations to create a more secure key.
              </span>
            </div>

            <FormField
              control={form.control}
              name="maskAddress"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={loading}
                    />
                  </FormControl>
                  <div className="text-base space-y-2 leading-none">
                    {/* <FormLabel className="space-y-1 leading-none"> */}
                    <FormLabel className="text-[17px]">
                      Mask Address{" "}
                      <span className="text-foreground/50">(Optional)</span>
                    </FormLabel>
                    <FormDescription className="text-[15px] leading-5">
                      You can manage your mobile notifications in the{" "}
                      <span className="hover:underline cursor-pointer underline-offset-2">
                        mobile settings
                      </span>{" "}
                      page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="volumeSerial"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={loading}
                    />
                  </FormControl>
                  <div className="text-base space-y-1 leading-none">
                    <FormLabel className="text-[17px]">
                      Volume Serial{" "}
                      <span className="text-foreground/50">(Optional)</span>
                    </FormLabel>
                    <FormDescription className="text-[15px] leading-5">
                      You can manage your mobile notifications in the{" "}
                      <span className="hover:underline cursor-pointer underline-offset-2">
                        mobile settings
                      </span>{" "}
                      page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpuId"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={loading}
                    />
                  </FormControl>
                  <div className="text-base space-y-1 leading-none">
                    <FormLabel className="text-[17px]">
                      CPU Id{" "}
                      <span className="text-foreground/50">(Optional)</span>
                    </FormLabel>
                    <FormDescription className="text-[15px] leading-5">
                      You can manage your mobile notifications in the{" "}
                      <span className="hover:underline cursor-pointer underline-offset-2">
                        mobile settings
                      </span>{" "}
                      page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="biosDate"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={loading}
                    />
                  </FormControl>
                  <div className="text-base space-y-1 leading-none">
                    <FormLabel className="text-[17px]">
                      BIOS Activate Date{" "}
                      <span className="text-foreground/50">(Optional)</span>
                    </FormLabel>
                    <FormDescription className="text-[15px] leading-5">
                      You can manage your mobile notifications in the{" "}
                      <span className="hover:underline cursor-pointer underline-offset-2">
                        mobile settings
                      </span>{" "}
                      page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deviceName"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={loading}
                    />
                  </FormControl>
                  <div className="text-base space-y-1 leading-none">
                    <FormLabel className="text-[17px]">
                      Device Name{" "}
                      <span className="text-foreground/50">(Optional)</span>
                    </FormLabel>
                    <FormDescription className="text-[15px] leading-5">
                      You can manage your mobile notifications in the{" "}
                      <span className="hover:underline cursor-pointer underline-offset-2">
                        mobile settings
                      </span>{" "}
                      page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div>
            <h1 className="font-semibold text-2xl mb-2">
              2. Upload Source Code
            </h1>
            <div className="font-light text-base mb-8">
              Please compress your project file/folder to a{" "}
              <span className="font-semibold">.zip</span> file.
            </div>
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

          <div className="w-full flex justify-end mt-5">
            <Button
              disabled={
                loading || !form.formState.isDirty || !form.formState.isValid
              }
              className="px-8 bg-cyan-500/50 text-foreground text-base hover:bg-cyan-700/70"
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
