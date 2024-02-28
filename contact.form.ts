import { SubmitErrorHandler, useForm } from "react-hook-form";
import U from "./U";

export interface ContactType {
  mecanic: string;
  company: string;
  department: string;
  manager: string;
  email: string;
  check_agree_privacy: boolean;
}

export const useContactForm = () => {
  const form = useForm<ContactType>({
    mode: "onChange",
    defaultValues: {
      mecanic: undefined,
      company: "",
      department: "",
      manager: "",
      email: "",
      check_agree_privacy: false,
    },
  });

  const register = {
    mecanic: form.register("mecanic", {
      required: "필수 입력 항목입니다",
      validate: {
        isMatch: value => {
          if (value !== "default") {
            return true;
          } else {
            return "필수 입력 항목입니다";
          }
        },
      },
    }),
    company: form.register("company", {
      required: "필수 입력 항목입니다",
    }),
    department: form.register("department", {
      required: "필수 입력 항목입니다",
    }),
    manager: form.register("manager", {
      required: "필수 입력 항목입니다",
    }),
    email: form.register("email", {
      required: "필수 입력 항목입니다",
      pattern: {
        value: U.validEmailPattern,
        message: "유효하지않은 이메일입니다",
      },
    }),
    check_agree_privacy: form.register("check_agree_privacy", {
      required: "필수",
    }),
  };

  const onError: SubmitErrorHandler<ContactType> = err => {
    console.log(err);
  };

  const onSumbit = form.handleSubmit(async (data: ContactType) => {
    if (data.mecanic === "default") {
      form.setError("mecanic", {
        message: "필수 입력 항목입니다",
      });
      throw new Error("mecanic");
    } else {
      //메일 전송
      await fetch("/api", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.alert("문의를 완료하였습니다.");
    }
  }, onError);

  return { form, register, onSumbit };
};
