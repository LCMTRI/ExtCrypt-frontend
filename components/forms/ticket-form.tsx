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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = object({
  zipFile: mixed<File>()
    .required("You have to provide your source code!")
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && value.type == "application/x-zip-compressed",
    ),

  id: string().notRequired(),
});

type TicketSchema = InferType<typeof formSchema>;

const TicketForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    router.push("/signin");
  }
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<TicketSchema>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data: TicketSchema) => {
    const result = new FormData();
    let bitStr = "";

    result.append("files", data.zipFile);
    // result.append("values", bitStr);
    const { data: res } = await _post("/tickets", result);
    router.push("/keygen/success");
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
              // disabled={
              //   loading || !form.formState.isDirty || !form.formState.isValid
              // }
              className="px-8 bg-cyan-500/50 text-foreground text-base hover:bg-cyan-700/70"
              type="submit"
            >
              Create ticket
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TicketForm;
