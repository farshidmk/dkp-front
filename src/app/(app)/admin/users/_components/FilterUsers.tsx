import RenderFormItem from "@/components/formItems/RenderFormItem";
import { FormFieldInput } from "@/types/renderFormItem";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { UserFilterItems, UserIsApproved } from "../users.type";

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<UserFilterItems>>;
};

const FilterUsers = ({ setFilter }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFilterItems>({
    defaultValues: {
      mobile: "",
      isApproved: UserIsApproved.All,
      name: "",
    },
  });
  async function onSubmitHandler(data: UserFilterItems) {
    setFilter(data);
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={2} className="mb-2 p-3">
        <Typography variant="h6">جستجو کاربران</Typography>
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
                    name={item.name as keyof UserFilterItems}
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
        </form>
      </Paper>
    </Container>
  );
};

export default FilterUsers;

const FILTER_ITEMS: FormFieldInput<UserFilterItems>[] = [
  {
    name: "name",
    inputType: "text",
    label: "نام",
  },
  {
    name: "mobile",
    inputType: "text",
    label: "تلفن همراه",
    inputProps: {
      placeholder: "مثال 09123456789",
    },
  },
  {
    name: "isApproved",
    inputType: "select",
    label: "وضعیت",
    options: [
      {
        title: "تایید شده",
        value: UserIsApproved.Approved,
      },
      {
        title: "تایید نشده",
        value: UserIsApproved.NotApproved,
      },
      {
        title: "همه",
        value: UserIsApproved.All,
      },
    ],
  },
];
