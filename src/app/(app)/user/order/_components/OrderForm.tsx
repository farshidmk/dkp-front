"use client";

import { Alert, Box, Button, Container } from "@mui/material";
import React from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import OrderItemFields from "./OrderItemFields";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderSchema, orderSchemaValidation } from "../order.validation";
import { useMutation } from "@tanstack/react-query";
import { CreateReceipt, OrderItem } from "@/types/order";
import { ServerCall } from "@/types/server";
import PaymentMethod from "./PaymentMethod";
import useGetWallet from "@/hooks/useGetWallet";

export const DEFAULT_ORDER_ITEM = {
  dkp: "",
  image_url: "",
  quantity: 0,
  serial: "",
  title: "",
  warranty: 0,
  unit_price: 0,
};

const OrderForm = () => {
  const { data: wallet } = useGetWallet();
  const { mutate } = useMutation<OrderItem, Error, ServerCall<CreateReceipt>>(
    {},
  );
  const methods = useForm<OrderSchema>({
    defaultValues: {
      payment_method: "wallet",
      items: [DEFAULT_ORDER_ITEM],
    },
    resolver: zodResolver(orderSchemaValidation),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;
  const { fields, append } = useFieldArray({
    control,
    name: "items",
  });

  function onSubmit(values: OrderSchema) {
    const items = values.items.map((item) => ({
      dkp: item.dkp,
      quantity: item.quantity,
      serial: item.serial,
    }));
    mutate({
      url: "orders",
      method: "POST",
      data: {
        payment_method: "wallet",
        items,
      },
    });
  }
  const receiptItems = methods.watch("items");
  const totalPrice =
    receiptItems?.reduce(
      (total, item) => total + item.unit_price * item.quantity,
      0,
    ) ?? 0;
  const isOrderButtonEnabled =
    receiptItems.filter((item) => Boolean(item.dkp)).length > 0 &&
    totalPrice / 10 <= Number(wallet?.balance ?? 0);

  return (
    <Container maxWidth={"xl"}>
      <FormProvider {...methods}>
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4"
        >
          <div className="flex flex-col gap-2.5 mb-1.5 ">
            {fields?.map((_, index) => (
              <OrderItemFields key={index} index={index} />
            ))}
          </div>

          <Button
            variant="outlined"
            color="success"
            endIcon={<AddCircleOutlineIcon />}
            onClick={() =>
              append({
                ...DEFAULT_ORDER_ITEM,
              })
            }
            sx={{ mb: 1 }}
          >
            اضافه کردن محصول
          </Button>

          {errors.items?.message && (
            <Alert variant="filled" severity="error" sx={{ mt: 1 }}>
              {errors.items?.message}
            </Alert>
          )}

          <PaymentMethod
            control={control}
            totalPrice={totalPrice}
            walletBalance={Number(wallet?.balance ?? 0)}
          />
          <div className="w-full flex items-center justify-center mt-6">
            <Button
              variant="contained"
              color="success"
              endIcon={<CheckCircleIcon />}
              type="submit"
              className="w-60"
              disabled={!isOrderButtonEnabled}
            >
              ایجاد فاکتور
            </Button>
          </div>
        </Box>
      </FormProvider>
    </Container>
  );
};

export default OrderForm;
