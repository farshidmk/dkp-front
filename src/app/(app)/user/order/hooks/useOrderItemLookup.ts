import { useMutation } from "@tanstack/react-query";

import mapDkpResponseToOrderItem from "../_services/mapDkpResponseToOrderItem";
import { DkpResponse } from "@/types/order";
import { OrderItem } from "@/types/order";

const fetchProductByDkp = async (dkpCode: string): Promise<OrderItem> => {
  if (!dkpCode) {
    throw new Error("کد محصول الزامی است");
  }

  const response = await fetch(
    `https://api.digikala.com/v2/product/${dkpCode}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("خطا در دریافت کالا");
  }

  const data = (await response.json()) as DkpResponse;

  if (data.status !== 200) {
    throw new Error("خطا در دریافت کالا");
  }

  if (data.data.product.is_inactive) {
    throw new Error("کالا غیر فعال شده است");
  }

  if (data.data.product.status === "out_of_stock") {
    throw new Error("کالا موجود نمیباشد");
  }

  return mapDkpResponseToOrderItem(data);
};

export const useOrderItemLookup = () => {
  return useMutation({
    mutationFn: fetchProductByDkp,
  });
};

