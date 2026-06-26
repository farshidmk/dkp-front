"use client";

import { errorHasMessage } from "@/services/typeGuards";
import { Order } from "@/types/order";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ImageIcon from "@mui/icons-material/Image";
import { Grid, IconButton, TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import DkpErrorModal from "./DkpErrorModal";
import { DEFAULT_ORDER_ITEM } from "./OrderForm";
import { useOrderItemLookup } from "../hooks/useOrderItemLookup";

//TODO: use reactQuery and mutation - add spinner for loading data
type Props = {
  index: number;
};
const OrderItemFields = ({ index }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    control,
    formState: { errors },
  } = useFormContext<Order>();
  const { fields, update, remove } = useFieldArray({
    control,
    name: "items",
  });
  const { mutateAsync: fetchItem } = useOrderItemLookup();
  const item = fields?.[index];
  const error = errors.items?.[index];

  async function getItem(dkpCode: string) {
    if (dkpCode.length < 4) return false;
    try {
      const result = await fetchItem(dkpCode);
      update(index, {
        ...result,
        dkp: dkpCode,
      });
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

  if (!item) return null;

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
              {item.image_url ? (
                <Image
                  alt={item?.title}
                  src={item.image_url}
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
            error={Boolean(error?.dkp?.message)}
            helperText={error?.dkp?.message || `${"\u00A0"}`}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <TextField
            label={"سریال دستگاه"}
            onChange={(e) => update(index, { ...item, serial: e.target.value })}
            value={item.serial}
            placeholder="سریال دستگاه"
            fullWidth
            error={Boolean(error?.serial?.message)}
            helperText={error?.serial?.message || `${"\u00A0"}`}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 2.5 }}>
          <TextField
            label="عنوان کالا"
            placeholder="عنوان کالا"
            value={item.title ?? ""}
            disabled
            fullWidth
            variant="filled"
            error={Boolean(error?.title?.message)}
            helperText={error?.title?.message || `${"\u00A0"}`}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <TextField
            label={"قیمت کالا ریال"}
            placeholder="قیمت به ریال"
            value={item.unit_price?.toLocaleString("fa")}
            disabled
            fullWidth
            variant="filled"
            error={Boolean(error?.unit_price?.message)}
            helperText={error?.unit_price?.message || `${"\u00A0"}`}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 1.5 }}>
          <TextField
            label={"مدت گارانتی"}
            value={item.warranty}
            disabled
            fullWidth
            error={Boolean(error?.warranty?.message)}
            helperText={error?.warranty?.message || `${"\u00A0"}`}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 1 }}>
          <TextField
            label={"تعداد"}
            onChange={(e) =>
              update(index, { ...item, quantity: Number(e.target.value) })
            }
            value={item.quantity}
            placeholder="تعداد"
            type="number"
            error={Boolean(error?.quantity?.message)}
            helperText={error?.quantity?.message || `${"\u00A0"}`}
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

export default OrderItemFields;

function isOnlyNumbers(value: string): boolean {
  return /^\d+$/.test(value);
}
