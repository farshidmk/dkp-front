import { z } from "zod";

const parseNumber = (value: number) => {
  const parsedValue = Number(value);
  if (isNaN(parsedValue)) {
    throw new Error("Value must be a number");
  }
  return parsedValue;
};

export const warrantySchemaValidation = z.object({
  min_price: z
    .number()
    .transform(parseNumber) // Convert string to number
    .refine((val) => val >= 0, { message: "حداقل مقدار نباید کمتر از 0 باشد" }), // Ensure min_price is not less than 0
  max_price: z
    .number()
    .transform(parseNumber) // Convert string to number
    .refine((val) => !isNaN(val), {
      message: "مقدار حداکثر قیمت باید عدد باشد",
    }),
  warranty_price: z
    .number()
    .transform(parseNumber) // Convert string to number
    .refine((val) => !isNaN(val), {
      message: "مقدار قیمت گارانتی باید عدد باشد",
    }),
  is_percentage: z.boolean(),
});

export type WarrantySchemaType = z.infer<typeof warrantySchemaValidation>;
