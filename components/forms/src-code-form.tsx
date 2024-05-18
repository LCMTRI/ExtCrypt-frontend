"use client";

import { _get, _post } from "@/app/api/backend/api-client";
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
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { InferType, mixed, object, string } from "yup";

const formSchema = object({
  password: string().required("This field is required"),
  // ticketId: string().required("This field is required"),
  host: string().required("This field is required"),
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

const SrcCodeForm = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    router.push("/signin");
  }
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<UploadCodeSchema>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data: UploadCodeSchema) => {
    const result = new FormData();

    result.append("code", data.zipFile);
    result.append("hwid", data.hwidFile);
    result.append("ticketId", ticketId);
    result.append("password", data.password);
    result.append("host", data.host);
    setLoading(true);

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
      .finally(() => {
        setLoading(false);
        router.push("/upload-src-code/success");
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="text-base space-y-2 leading-none">
                      {/* <FormLabel className="space-y-1 leading-none"> */}
                      <FormLabel className="text-[17px]">
                        Password{" "}
                        <span className="text-foreground/50">(Optional)</span>
                      </FormLabel>
                      <FormDescription className="text-[15px] leading-5">
                        You can manage your mobile notifications in the{" "}
                        <span className="hover:underline cursor-pointer underline-offset-2">
                          mobile settings
                        </span>{" "}
                        page.
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
                        Host{" "}
                        <span className="text-foreground/50">(Optional)</span>
                      </FormLabel>
                      <FormDescription className="text-[15px] leading-5">
                        You can manage your mobile notifications in the{" "}
                        <span className="hover:underline cursor-pointer underline-offset-2">
                          mobile settings
                        </span>{" "}
                        page.
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
                name="hwidFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Key file<span className="text-red-500">*</span> :
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
                      Source code<span className="text-red-500">*</span> :
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
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SrcCodeForm;
