import {
  FALSE_EMAIL_MSG,
  FALSE_PHONE_NUMBER_MSG,
  INPUT_MAX_LENGTH_100,
  INPUT_MAX_LENGTH_1000,
  REQUIRED_INPUT_MSG,
} from "@/constants/constants";
import { getErrorMessage, isError } from "@/utils/yupForm.utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { InferType, object, string } from "yup";

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
    .required(REQUIRED_INPUT_MSG)
    .max(20, FALSE_PHONE_NUMBER_MSG),

  id: string().notRequired(),
});

export type ContactSchema = InferType<typeof formSchema>;

export function useFormContact() {
  const form = useForm<ContactSchema>({
    reValidateMode: "onChange",
    mode: "onSubmit",
    resolver: yupResolver(formSchema),
  });

  return {
    form,
    formSchema,
    isError: isError<ContactSchema>(form),
    getErrorMessage: getErrorMessage<ContactSchema>(form),
  };
}
