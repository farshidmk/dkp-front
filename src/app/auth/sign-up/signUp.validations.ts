import { z } from "zod";

export const signUpFormValidation = z.object({
  name: z.string({ error: "" }).min(3, "نام را به صورت کامل وارد کنید"),
  phoneNumber: z
    .string()
    .min(10, "تلفن همراه را به درستی وارد کنید")
    .refine(
      (value) => {
        if (!value) {
          return false;
        }
        const regex = /^09\d{9}$/;
        if (regex.test(value)) {
          return true;
        } else {
          return false;
        }
      },
      { message: "تلفن همراه را به درستی وارد کنید (مثال 0912345678)" }
    ),
  password: z.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
});
