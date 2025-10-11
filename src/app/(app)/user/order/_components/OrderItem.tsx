"use client";

import { errorHasMessage } from "@/services/typeGuards";
import { DkpResponse, Order } from "@/types/order";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ImageIcon from "@mui/icons-material/Image";
import { Grid, IconButton, TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { getProduct } from "../order.actions";
import DkpErrorModal from "./DkpErrorModal";
import { DEFAULT_ORDER_ITEM } from "./OrderForm";

//TODO: use reactQuery and mutation - add spinner for loading data
type Props = {
  index: number;
};
const OrderItem = ({ index }: Props) => {
  const [digikalaItem, setDigikalaItem] = useState<DkpResponse | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { control } = useFormContext<Order>();
  const { fields, update, remove } = useFieldArray({
    control,
    name: "items",
  });
  const item = fields?.[index];

  async function getItem(dkpCode: string) {
    if (dkpCode.length < 4) return false;
    try {
      const item = await getProduct(dkpCode);
      if (item?.status === 200) {
        debugger;
        if (item.data.product.is_inactive) {
          throw new Error("کالا غیر فعال شده است");
        }
        if (item.data.product.status === "out_of_stock") {
          throw new Error("کالا موجود نمیباشد");
        }
        setDigikalaItem(item);
      }
    } catch (e) {
      if (errorHasMessage(e)) {
        setErrorMessage(e.message);
      } else {
        setErrorMessage("خطا در دریافت کالا");
      }
      update(index, DEFAULT_ORDER_ITEM);
      console.log("error: ", e);
    }
  }
  return (
    <>
      <DkpErrorModal
        handleClose={() => {
          setErrorMessage("");
        }}
        message={errorMessage}
      />
      <Grid container spacing={1} alignItems={"center"}>
        <Grid size={{ xs: 12, md: 1 }}>
          <div className="w-full flex items-center justify-center border border-gray-300 bg-gray-100 rounded-b-lg">
            <div className="flex items-center justify-center h-20 w-20 ">
              {digikalaItem?.data?.product?.images?.main?.webp_url?.[0] ? (
                <Image
                  alt={item?.title}
                  src={digikalaItem?.data?.product?.images?.main?.webp_url?.[0]}
                  height={75}
                  width={75}
                />
              ) : (
                <ImageIcon />
              )}
            </div>
          </div>
        </Grid>

        <Grid size={{ xs: 12, md: 1.5 }}>
          <TextField
            label={"کد محصول(DKP)"}
            onChange={(e) => {
              if (isOnlyNumbers(e.target.value)) {
                update(index, { ...item, dkp: e.target.value });
              }
            }}
            placeholder="کد محصول"
            value={item.dkp}
            onBlur={(e) => getItem(e.target.value)}
            fullWidth
            helperText={`${"\u00A0"}`}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <TextField
            label={"سریال دستگاه"}
            onChange={(e) => update(index, { ...item, serial: e.target.value })}
            value={item.serial}
            placeholder="سریال دستگاه"
            fullWidth
            helperText={`${"\u00A0"}`}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 2.5 }}>
          <TextField
            label="عنوان کالا"
            placeholder="عنوان کالا"
            value={digikalaItem?.data?.product?.title_fa ?? ""}
            disabled
            fullWidth
            variant="filled"
            helperText={`${"\u00A0"}`}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <TextField
            label={"قیمت کالا ریال"}
            placeholder="قیمت به ریال"
            value={digikalaItem?.data?.product?.price?.selling_price?.toLocaleString(
              "fa"
            )}
            disabled
            fullWidth
            variant="filled"
            helperText={`${"\u00A0"}`}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 1.5 }}>
          <TextField
            label={"مدت گارانتی"}
            value={item.warranty}
            disabled
            fullWidth
            helperText={`${"\u00A0"}`}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 1 }}>
          <TextField
            label={"تعداد"}
            onChange={(e) =>
              update(index, { ...item, quantity: Number(e.target.value) })
            }
            value={item.serial}
            placeholder="تعداد"
            type="number"
            helperText={
              digikalaItem?.data?.product?.price?.order_limit
                ? `حداکثر سفارش ${digikalaItem?.data.product.price.order_limit.toLocaleString(
                    "fa"
                  )}`
                : `${"\u00A0"}`
            }
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, md: 0.5 }}>
          <IconButton color="error" onClick={() => remove(index)}>
            <DeleteForeverIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderItem;

function isOnlyNumbers(value: string): boolean {
  return /^\d+$/.test(value);
}
