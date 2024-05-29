"use client";

import { _post } from "@/app/api/backend/api-client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { InferType, boolean, object, string } from "yup";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const formSchema = object({
  maskAddress: boolean(),
  // .matches(maskAddressRegex, "Invalid mask address!")
  // .notRequired(),
  volumeSerial: boolean(),
  cpuId: boolean(),
  biosDate: boolean(),
  deviceName: boolean(),
  // .matches(phoneRegExp, FALSE_PHONE_NUMBER_MSG),
  // zipFile: mixed<File>()
  //   .required("You have to provide your source code!")
  //   .test(
  //     "fileFormat",
  //     "Unsupported Format",
  //     (value) => value && value.type == "application/x-zip-compressed",
  //   ),

  id: string().notRequired(),
});

type OptionSchema = InferType<typeof formSchema>;

const OptionForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<OptionSchema>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data: OptionSchema) => {
    // redirect when submit form without login
    if (!session) {
      router.push("/signin");
      return;
    }
    let bitStr = "";

    // result.append("files", data.zipFile);
    bitStr += data.biosDate ? "1" : "0";
    bitStr += data.volumeSerial ? "1" : "0";
    bitStr += data.cpuId ? "1" : "0";
    bitStr += data.biosDate ? "1" : "0";
    bitStr += data.deviceName ? "1" : "0";
    setLoading(true);
    // result.append("values", bitStr);
    const { data: id } = await _post("/tickets", {
      option_bit: bitStr,
      email: session?.user?.email,
    });
    console.log("created id: ", id);
    await _post(
      "/options",
      {
        option_bit: bitStr,
        email: session?.user?.email,
      },
      {
        responseType: "blob",
      },
    )
      .then((res) => {
        const blob = new Blob([res.data], {
          type: res.headers["content-type"],
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "install.zip";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .finally(() => {
        setLoading(false);
        router.push(`/key-options/success?created-ticket-id=${id}`);
      });
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
              <h1 className="font-semibold text-2xl mb-2">Options Form</h1>
              <span className="font-light text-base mb-8">
                Enter optional informations to create a computer-specific key.
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
                      MAC Address{" "}
                      <span className="text-foreground/50">(Optional)</span>
                    </FormLabel>
                    <FormDescription className="text-[15px] leading-5">
                      Ex: 00:1A:2B:3C:4D:5E
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
                      Ex: 1A2B-3C4D
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
                      Ex: BFEBFBFF000306A9
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
                      Ex: 2023-08-12
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
                      Ex: DESKTOP-7A6HRSI
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* <div>
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
          </div> */}

          <div className="w-full flex justify-end mt-5">
            <Button
              // disabled={
              //   loading || !form.formState.isDirty || !form.formState.isValid
              // }
              className="px-8 bg-cyan-500/50 text-foreground text-base hover:bg-cyan-700/70"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OptionForm;
