"use client";

import { errorHasMessage } from "@/services/typeGuards";
import { Order, OrderItem } from "@/types/order";
import { ServerCall } from "@/types/server";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ImageIcon from "@mui/icons-material/Image";
import { Button, Grid, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import DkpErrorModal from "./DkpErrorModal";
import { DEFAULT_ORDER_ITEM } from "./OrderForm";
import OrderItemSkeleton from "./OrderItemSkeleton";

//TODO: use reactQuery and mutation - add spinner for loading data
type Props = {
  index: number;
};
const OrderItemFields = ({ index }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isDkpUpdated, setIsDkpUpdated] = useState<boolean>(false);
  const {
    control,
    formState: { errors },
  } = useFormContext<Order>();
  const { fields, update, remove } = useFieldArray({
    control,
    name: "items",
  });
  const { mutateAsync, isPending } = useMutation<
    OrderItem,
    Error,
    ServerCall<string>
  >({});
  const item = fields?.[index];
  const error = errors.items?.[index];

  async function getItem(dkpCode: string) {
    if (dkpCode.length < 4) return false;
    try {
      // const result = await fetchItem(dkpCode);
      const result = await mutateAsync({
        method: "get",
        url: `warranties/getProduct/${dkpCode}`,
      });
      update(index, {
        ...result,
        dkp: dkpCode,
        quantity: 1,
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

  if (isPending) {
    return <OrderItemSkeleton />;
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
            <div className="flex items-center justify-center h-28 w-28 ">
              {item.image_url ? (
                <Image
                  alt={item?.title}
                  src={item.image_url}
                  height={100}
                  width={100}
                />
              ) : (
                <ImageIcon />
              )}
            </div>
          </div>
        </Grid>

        <Grid size={{ xs: 12, md: 11 }} container spacing={1}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="عنوان کالا"
              placeholder="عنوان کالا"
              value={item.title ?? ""}
              disabled
              fullWidth
              size="small"
              variant="filled"
              error={Boolean(error?.title?.message)}
              helperText={error?.title?.message}
              sx={{ mb: 1 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              label={"کد محصول(DKP)"}
              onChange={(e) => {
                if (isOnlyNumbers(e.target.value)) {
                  setIsDkpUpdated(true);
                  update(index, { ...item, dkp: e.target.value });
                }
              }}
              placeholder="کد محصول"
              value={item.dkp}
              onBlur={(e) => {
                if (isDkpUpdated) {
                  getItem(e.target.value);
                  setIsDkpUpdated(false);
                }
              }}
              fullWidth
              error={Boolean(error?.dkp?.message)}
              helperText={error?.dkp?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              label={"سریال دستگاه"}
              onChange={(e) =>
                update(index, { ...item, serial: e.target.value })
              }
              value={item.serial}
              placeholder="سریال دستگاه"
              fullWidth
              error={Boolean(error?.serial?.message)}
              helperText={error?.serial?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              label={"قیمت کالا (ریال)"}
              placeholder="قیمت به ریال"
              value={item.unit_price?.toLocaleString("fa")}
              disabled
              fullWidth
              variant="filled"
              error={Boolean(error?.unit_price?.message)}
              helperText={error?.unit_price?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              label={"قیمت با گارانتی (ریال)"}
              value={item.warranty?.toLocaleString("fa")}
              disabled
              fullWidth
              error={Boolean(error?.warranty?.message)}
              helperText={error?.warranty?.message}
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
              helperText={error?.quantity?.message}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 1 }}>
            <Button
              sx={{ mt: 1 }}
              fullWidth
              variant="contained"
              color="error"
              onClick={() => remove(index)}
              endIcon={<DeleteForeverIcon />}
            >
              حذف
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderItemFields;

function isOnlyNumbers(value: string): boolean {
  return /^\d+$/.test(value);
}
