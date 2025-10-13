"use client";

import { Alert, Box, Button, Container } from "@mui/material";
import React from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import OrderItemFields from "./OrderItemFields";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderSchema, orderSchemaValidation } from "../order.validation";

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
    //TODO: check balance in wallet and if it's enough continue

    console.log({ values });
  }

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
          >
            اضافه کردن محصول
          </Button>

          {errors.items?.message && (
            <Alert variant="filled" severity="error" sx={{ mt: 1 }}>
              {errors.items?.message}
            </Alert>
          )}
          <div className="w-full flex items-center justify-center mt-6">
            <Button
              variant="contained"
              color="success"
              endIcon={<CheckCircleIcon />}
              type="submit"
              className="w-60"
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
