import { z } from "zod";

export const orderItemSchema = z.object({
  title: z.string().min(1, "عنوان کالا الزامی است"),
  dkp: z.string().min(1, "کد کالا را وارد کنید"),
  quantity: z.number().min(1, "مقدار باید حداقل 1 باشد"),
  image_url: z.string(),
  serial: z.string().min(1, "سریال دستگاه را وارد کنید"),
  unit_price: z.number().min(0, "قیمت کالا را به درستی وارد کنید"),
  warranty: z.number().optional(),
});

export const orderSchemaValidation = z.object({
  payment_method: z.literal("wallet"),
  items: z.array(orderItemSchema).min(1, "سفارش باید حداقل شامل یک کالا باشد"),
});

export type OrderSchema = z.infer<typeof orderSchemaValidation>;
export type OrderItem = z.infer<typeof orderItemSchema>;
