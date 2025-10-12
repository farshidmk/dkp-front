import { z } from "zod";
import { TransactionType } from "@/types/wallet";

export const WalletFormValidation = z.object({
  type: z.nativeEnum(TransactionType),
  amount: z
    .number()
    .min(1000, "حداقل مبلغ ۱۰۰۰ تومان است")
    .max(100000000, "حداکثر مبلغ ۱۰۰ میلیون تومان است"),
  order_id: z
    .number()
    .min(1, "کد پیگیری الزامی است")
    .max(999999999, "کد پیگیری نباید بیش از ۹ رقم باشد"),
  description: z
    .string()
    .max(500, "توضیحات نباید بیش از ۵۰۰ کاراکتر باشد")
    .optional(),
});
