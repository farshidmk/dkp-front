import { z } from "zod";

export const SignUpFormValidation = z.object({
  mobile: z
    .string()
    .nonempty("شماره موبایل نباید خالی باشد")
    .regex(/^(\+98|0)?9\d{9}$/, "شماره موبایل را به درستی وارد کنید"), // Matches Persian mobile numbers
  password: z
    .string()
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
    .nonempty("رمز عبور نباید خالی باشد"),
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
  postal_code: z.string().nonempty("کد پستی نباید خالی باشد"),
  // .regex(/^\d{10}$/, "کد پستی نامعتبر است"), // Matches Iranian postal codes
  telephone: z.string().nonempty("تلفن نباید خالی باشد"),
});
