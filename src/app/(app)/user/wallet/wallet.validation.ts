import { z } from "zod";
import { TransactionType } from "@/types/wallet";

export const WalletFormValidation = z.object({
  type: z.nativeEnum(TransactionType, {
    error: () => ({ message: "نوع تراکنش نامعتبر است" }),
  }),
  amount: z
    .string({ error: "مبلغ الزامی است" })
    .min(1, "مبلغ الزامی است")
    .refine((val) => !isNaN(Number(val)), "مبلغ باید عدد باشد")
    .refine((val) => Number(val) >= 1000, "حداقل مبلغ ۱۰۰۰ تومان است")
    .refine(
      (val) => Number(val) <= 100000000,
      "حداکثر مبلغ ۱۰۰ میلیون تومان است"
    ),
  order_id: z
    .string({ error: "کد پیگیری الزامی است" })
    .min(1, "کد پیگیری الزامی است")
    .refine((val) => !isNaN(Number(val)), "کد پیگیری باید عدد باشد")
    .refine((val) => Number(val) >= 1, "کد پیگیری باید بزرگتر از صفر باشد")
    .refine(
      (val) => Number(val) <= 999999999,
      "کد پیگیری نباید بیش از ۹ رقم باشد"
    ),
  description: z
    .string()
    .max(500, "توضیحات نباید بیش از ۵۰۰ کاراکتر باشد")
    .optional(),
});
