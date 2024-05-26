"use client";

import { _delete, _get, _post, _put } from "@/app/api/backend/api-client";
import { Button } from "@/components/ui/button";
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
import { Dialog } from "@radix-ui/react-dialog";
import axios from "axios";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { InferType, date, mixed, object, string } from "yup";
import { DialogContent } from "../ui/dialog";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import moment from "moment";

const formSchema = object({
  sourceName: string().required("This field is required"),
  password: string().required("This field is required"),
  host: string().required("This field is required"),
  expireDate: date().required("This field is required"),
  zipFile: mixed<File>()
    .required("You have to provide your source code!")
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && value.type == "application/x-zip-compressed",
    ),
  hwidFile: mixed<File>()
    .required("You have to provide hwid.txt")
    .test("fileName", `Please upload a file with named "hwid.txt"`, (value) => {
      return value && value.name === "hwid.txt";
    }),

  id: string().notRequired(),
});

type UploadCodeSchema = InferType<typeof formSchema>;

const SrcCodeForm = ({
  optionBit,
  ticketId,
}: {
  optionBit: string;
  ticketId: string;
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  // const [fileContent, setFileContent] = useState<string>("");

  if (!session) {
    router.push("/signin");
  }
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<UploadCodeSchema>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data: UploadCodeSchema) => {
    const result = new FormData();
    var key = "";

    result.append("code", data.zipFile);
    result.append("hwid", data.hwidFile);
    result.append("optionBit", optionBit);
    result.append("password", data.password);
    result.append("host", data.host);
    result.append("expireDate", moment(data.expireDate).format("YYYYMMDD"));
    setLoading(true);
    setOpen(true);

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result as string;
      if (content) key = content;
    };
    reader.readAsText(data.hwidFile);

    await _post("/upload-code", result, {
      responseType: "blob",
    })
      .then((res) => {
        const url = window.URL.createObjectURL(
          new Blob([res.data], { type: res.headers["content-type"] }),
        );

        // Create a link element, set its href to the blob URL, and trigger the download
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = data.zipFile.name;
        document.body.appendChild(a);
        a.click();

        // Clean up and remove the link
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .finally(async () => {
        console.log("key: ", key);
        await _post("/src-codes", {
          user_email: session?.user?.email,
          src_name: data.sourceName,
          password: data.password,
          host: data.host,
          key: key,
          option_bit: optionBit,
          expire_date: data.expireDate.toISOString(),
        });
        await _delete(`/tickets/${ticketId}`);
        await _put(`/users/${session?.user?.email}`);
        setLoading(false);
        setOpen(false);
        router.push("/upload-src-code/success");
      });
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          ref={formRef}
          // encType="multipart/form-data"
        >
          <div>
            <h1 className="font-semibold text-2xl mb-2">Upload Source Code</h1>
            <div className="font-light text-base mb-8">
              Please compress your project file/folder to a{" "}
              <span className="font-semibold">.zip</span> file.
            </div>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="sourceName"
                render={({ field }) => (
                  <FormItem>
                    <div className="text-base space-y-2 leading-none">
                      {/* <FormLabel className="space-y-1 leading-none"> */}
                      <FormLabel className="text-[17px]">
                        Project name<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormDescription className="text-[15px] leading-5">
                        Enter project name.
                      </FormDescription>
                      <FormControl>
                        <Input type="text" disabled={loading} {...field} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="text-base space-y-2 leading-none">
                      {/* <FormLabel className="space-y-1 leading-none"> */}
                      <FormLabel className="text-[17px]">
                        Password<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormDescription className="text-[15px] leading-5">
                        Enter your addtional secret password.
                      </FormDescription>
                      <FormControl>
                        <Input type="text" disabled={loading} {...field} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="host"
                render={({ field }) => (
                  <FormItem>
                    <div className="text-base space-y-2 leading-none">
                      {/* <FormLabel className="space-y-1 leading-none"> */}
                      <FormLabel className="text-[17px]">
                        Host<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormDescription className="text-[15px] leading-5">
                        Enter your host. Ex: localhost, example.com,...
                      </FormDescription>
                      <FormControl>
                        <Input type="text" disabled={loading} {...field} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expireDate"
                render={({ field }) => (
                  <FormItem>
                    <div className="text-base space-y-2 leading-none">
                      {/* <FormLabel className="space-y-1 leading-none"> */}
                      <FormLabel className="text-[17px]">
                        Expire date<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormDescription className="text-[15px] leading-5">
                        Enter the date that this source code no longer be
                        distributed.
                      </FormDescription>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hwidFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Key file<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription className="text-[15px] leading-5">
                      Upload your{" "}
                      <span className="font-semibold">hwid.txt</span> from
                      running <span className="font-semibold">install.php</span>
                      .
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".txt"
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
              <FormField
                control={form.control}
                name="zipFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Source code<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription className="text-[15px] leading-5">
                      Compress your source code to a{" "}
                      <span className="font-semibold">.zip</span> file and
                      upload.
                    </FormDescription>
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
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-2">
                <FormControl>
                  <Checkbox
                    // checked={field.value}
                    // onCheckedChange={field.onChange}
                    disabled={loading}
                  />
                </FormControl>
                <div className="text-sm space-y-2 leading-none">
                  <FormLabel>
                    <span className="text-foreground/60">(Optional)</span>{" "}
                    Obfuscate source code before encrypting.
                  </FormLabel>
                </div>
              </FormItem>
            </div>
          </div>

          <div className="w-full flex justify-end mt-5">
            <Button
              disabled={
                loading || !form.formState.isDirty || !form.formState.isValid
              }
              className="px-8 bg-cyan-500/50 text-foreground text-base hover:bg-cyan-700/70"
              type="submit"
            >
              {/* {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Submit"
              )} */}
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          {/* <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader> */}
          <div className="flex flex-col gap-4 items-center justify-center">
            <Loader2 className="mr-2 h-8 w-8 text-cyan-500 animate-spin" />
            <div className="text-center">
              Your source code is being encrypted.
              <br />
              Please wait. This might take a while...
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* <button onClick={() => setOpen(true)}>haha</button> */}
    </div>
  );
};

export default SrcCodeForm;
