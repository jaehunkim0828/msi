import { SubmitErrorHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import U from "./U";

export interface ContactFormData {
  type: "제품" | "서비스";
  // 공통
  company: string;
  manager: string;
  position: string;
  email: string;
  phone: string;
  content: string;
  check_agree_privacy: boolean;
  // 제품 전용
  product?: string;
  inquiryType?: string;
  expectedTimeline?: string;
  currentEquipment?: string;
  productionVolume?: string;
  budgetRange?: string;
  // 서비스 전용
  department?: string;
  equipmentModel?: string;
  serialNumber?: string;
  installLocation?: string;
  issueType?: string;
  lineStatus?: string;
  issueDate?: string;
  attachments?: string;
}

const productFields = [
  "product",
  "inquiryType",
  "expectedTimeline",
  "currentEquipment",
  "productionVolume",
  "budgetRange",
] as const;

const serviceFields = [
  "department",
  "equipmentModel",
  "serialNumber",
  "installLocation",
  "issueType",
  "lineStatus",
  "issueDate",
] as const;

export const useContactForm = () => {
  const form = useForm<ContactFormData>({
    mode: "onChange",
    defaultValues: {
      type: "제품",
      company: "",
      manager: "",
      position: "",
      email: "",
      phone: "",
      content: "",
      check_agree_privacy: false,
    },
  });

  const watchedType = form.watch("type");

  // 유형 변경 시 반대 유형 필드 unregister
  useEffect(() => {
    if (watchedType === "제품") {
      serviceFields.forEach((f) => form.unregister(f));
    } else if (watchedType === "서비스") {
      productFields.forEach((f) => form.unregister(f));
    }
  }, [watchedType, form]);

  const register = {
    // 공통 필드
    company: form.register("company", {
      required: "필수 입력 항목입니다",
    }),
    manager: form.register("manager", {
      required: "필수 입력 항목입니다",
    }),
    position: form.register("position"),
    email: form.register("email", {
      required: "필수 입력 항목입니다",
      pattern: {
        value: U.validEmailPattern,
        message: "유효하지않은 이메일입니다",
      },
    }),
    phone: form.register("phone", {
      required: "필수 입력 항목입니다",
      pattern: {
        value: /^[0-9\-+() ]{8,20}$/,
        message: "유효하지 않은 전화번호입니다",
      },
    }),
    content: form.register("content", {
      required: "필수 입력 항목입니다",
      maxLength: {
        value: 1000,
        message: "내용은 최대 1000자까지 입력 가능합니다",
      },
    }),
    check_agree_privacy: form.register("check_agree_privacy", {
      required: "필수",
    }),
    // 제품 전용
    product: form.register("product", {
      required: watchedType === "제품" ? "필수 입력 항목입니다" : false,
      validate: (value) => {
        if (watchedType !== "제품") return true;
        return value && value !== "default" ? true : "필수 입력 항목입니다";
      },
    }),
    inquiryType: form.register("inquiryType", {
      required: watchedType === "제품" ? "필수 입력 항목입니다" : false,
      validate: (value) => {
        if (watchedType !== "제품") return true;
        return value && value !== "default" ? true : "필수 입력 항목입니다";
      },
    }),
    expectedTimeline: form.register("expectedTimeline"),
    currentEquipment: form.register("currentEquipment"),
    productionVolume: form.register("productionVolume"),
    budgetRange: form.register("budgetRange"),
    // 서비스 전용
    department: form.register("department", {
      required: watchedType === "서비스" ? "필수 입력 항목입니다" : false,
    }),
    equipmentModel: form.register("equipmentModel", {
      required: watchedType === "서비스" ? "필수 입력 항목입니다" : false,
      validate: (value) => {
        if (watchedType !== "서비스") return true;
        return value && value !== "default" ? true : "필수 입력 항목입니다";
      },
    }),
    serialNumber: form.register("serialNumber", {
      required: watchedType === "서비스" ? "필수 입력 항목입니다" : false,
    }),
    installLocation: form.register("installLocation", {
      required: watchedType === "서비스" ? "필수 입력 항목입니다" : false,
    }),
    issueType: form.register("issueType", {
      required: watchedType === "서비스" ? "필수 입력 항목입니다" : false,
      validate: (value) => {
        if (watchedType !== "서비스") return true;
        return value && value !== "default" ? true : "필수 입력 항목입니다";
      },
    }),
    lineStatus: form.register("lineStatus", {
      required: watchedType === "서비스" ? "필수 입력 항목입니다" : false,
      validate: (value) => {
        if (watchedType !== "서비스") return true;
        return value && value !== "default" ? true : "필수 입력 항목입니다";
      },
    }),
    issueDate: form.register("issueDate", {
      required: watchedType === "서비스" ? "필수 입력 항목입니다" : false,
    }),
  };

  const onError: SubmitErrorHandler<ContactFormData> = (err) => {
    console.log(err);
  };

  const onSubmit = form.handleSubmit(async (data: ContactFormData) => {
    await fetch("/api", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.alert("문의를 완료하였습니다.");
  }, onError);

  return { form, register, onSubmit, watchedType };
};
