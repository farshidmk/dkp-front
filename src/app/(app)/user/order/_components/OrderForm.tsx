"use client";

import { Order } from "@/types/order";
import { Box, Button, Container } from "@mui/material";
import React from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import OrderItem from "./OrderItem";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

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
  const methods = useForm<Order>({
    defaultValues: {
      payment_method: "wallet",
      items: [DEFAULT_ORDER_ITEM],
    },
  });
  const { control } = methods;
  const { fields, append } = useFieldArray({
    control,
    name: "items",
  });
  return (
    <Container maxWidth={"xl"}>
      <FormProvider {...methods}>
        <Box
          component={"form"}
          onSubmit={(e) => {
            e.preventDefault();
            console.log("outter form");
          }}
          className="mt-4"
        >
          <div className="flex flex-col gap-2.5 mb-1.5 ">
            {fields.map((_, index) => (
              <OrderItem key={index} index={index} />
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
        </Box>
      </FormProvider>
    </Container>
  );
};

export default OrderForm;
