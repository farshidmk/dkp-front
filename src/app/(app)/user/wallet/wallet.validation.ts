import { z } from "zod";
import { TransactionType } from "@/types/wallet";

export const WalletFormValidation = z.object({
  type: z.nativeEnum(TransactionType),
  amount: z
    .string()
    .min(1, "مبلغ الزامی است")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), "مبلغ باید عدد باشد")
    .refine((val) => val >= 1000, "حداقل مبلغ ۱۰۰۰ تومان است")
    .refine((val) => val <= 100000000, "حداکثر مبلغ ۱۰۰ میلیون تومان است"),
  order_id: z
    .string()
    .min(1, "کد پیگیری الزامی است")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), "کد پیگیری باید عدد باشد")
    .refine((val) => val >= 1, "کد پیگیری باید بزرگتر از صفر باشد")
    .refine((val) => val <= 999999999, "کد پیگیری نباید بیش از ۹ رقم باشد"),
  description: z
    .string()
    .max(500, "توضیحات نباید بیش از ۵۰۰ کاراکتر باشد")
    .optional(),
});
