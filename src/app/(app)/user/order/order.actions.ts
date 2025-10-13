"use server";

import { DkpResponse } from "@/types/order";

export async function getProduct(dkpcode: string) {
  if (!dkpcode) {
    throw new Error("Product code (dkpcode) is required.");
  }
  try {
    const res = await fetch(`https://api.digikala.com/v2/product/${dkpcode}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`خطا در دریافت کالا`);
    }

    if (res.status !== 200) {
      throw new Error(`خطا در دریافت کالا`);
    }
    const data = (await res.json()) as DkpResponse;

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`خطا در دریافت کالا`);
  }
}
