import RenderFormItem from "@/components/formItems/RenderFormItem";
import { FormFieldInput } from "@/types/renderFormItem";
import { OrderSearchItems, OrderStatus } from "@/types/order";
import { orderStatusConfig } from "@/shared/orderStatusStyle";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import React from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<OrderSearchItems>>;
  isFetching: boolean;
};

const FilterOrders = ({ setFilter, isFetching }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderSearchItems>({
    defaultValues: {
      creatorName: "",
      trackingCode: "",
      status: undefined,
    },
  });

  async function onSubmitHandler(data: OrderSearchItems) {
    setFilter({
      ...data,
      creatorName: data.creatorName?.trim() || undefined,
      trackingCode: data.trackingCode?.trim() || undefined,
      status: data.status || undefined,
    });
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={2} className="mb-2 p-3">
        <Typography variant="h6">فیلتر سفارش‌ها</Typography>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-4">
          <Grid container spacing={1} sx={{ mb: 1 }}>
            {FILTER_ITEMS.map((item) => {
              return (
                <Grid
                  size={{
                    xs: 12,
                    sm: 4,
                  }}
                  key={item.name}
                >
                  <Controller
                    name={item.name as keyof OrderSearchItems}
                    control={control}
                    render={({ field }) => {
                      return (
                        <RenderFormItem
                          {...item}
                          inputProps={{ ...field, ...item.inputProps } as any}
                          error={errors?.[item.name]?.message}
                        />
                      );
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "300px" }}
              endIcon={<FilterAltIcon />}
              loading={isFetching}
            >
              فیلتر
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default FilterOrders;

const FILTER_ITEMS: FormFieldInput<OrderSearchItems>[] = [
  {
    name: "creatorName",
    inputType: "text",
    label: "نام درخواست‌دهنده",
    inputProps: {
      placeholder: "جستجو بر اساس نام",
    },
  },
  {
    name: "trackingCode",
    inputType: "text",
    label: "کد پیگیری",
    inputProps: {
      placeholder: "مثال ۱۲۳۴۵۶",
    },
  },
  {
    name: "status",
    inputType: "select",
    label: "وضعیت سفارش",
    options: Object.values(OrderStatus).map((status) => ({
      title: orderStatusConfig[status].label,
      value: status,
    })),
  },
];
