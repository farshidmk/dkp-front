import { z } from "zod";

export const UserProfileFormValidation = z.object({
  first_name: z.string().nonempty("نام نباید خالی باشد"),
  last_name: z.string().nonempty("نام خانوادگی نباید خالی باشد"),
  national_code: z.string().nonempty("کد ملی نباید خالی باشد"),
  digikala_panel_name: z.string().nonempty("نام پنل دیجی‌کالا نباید خالی باشد"),
  digikala_merchant_number: z
    .string()
    .nonempty("شماره مرچنت دیجی‌کالا نباید خالی باشد"),
  province: z.string().nonempty("استان نباید خالی باشد"),
  city: z.string().nonempty("شهر نباید خالی باشد"),
  address: z.string().nonempty("آدرس نباید خالی باشد"),
  email: z
    .string()
    .nonempty("آدرس نباید خالی باشد")
    .email("ایمیل را به درستی وارد کنید"),
  postal_code: z.string().nonempty("کد پستی نباید خالی باشد"),
  // .regex(/^\d{10}$/, "کد پستی نامعتبر است"), // Matches Iranian postal codes
  telephone: z.string().nonempty("تلفن نباید خالی باشد"),
});

export const ChangePasswordValidation = z
  .object({
    oldPassword: z.string().min(6, "رمز عبور قبلی حداقل ۶ کاراکتر باشد"),
    newPassword: z.string().min(6, "رمز عبور جدید حداقل ۶ کاراکتر باشد"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "تایید رمز عبور با رمز عبور جدید مطابقت ندارد",
  });

export type ChangePasswordFormData = z.infer<typeof ChangePasswordValidation>;
