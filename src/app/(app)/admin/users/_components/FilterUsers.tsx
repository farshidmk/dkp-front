import RenderFormItem from "@/components/formItems/RenderFormItem";
import { FormFieldInput } from "@/types/renderFormItem";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { UserFilterItems } from "../users.type";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<UserFilterItems>>;
  isFetching: boolean;
};

const FilterUsers = ({ setFilter, isFetching }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFilterItems>({
    defaultValues: {
      mobile: "",
      name: "",
    },
  });
  async function onSubmitHandler(data: UserFilterItems) {
    setFilter(data);
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={2} className="mb-2 p-3">
        <Typography variant="h6">فیلتر کاربران</Typography>
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
          <div className="flex justify-center ">
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
        value: true,
      },
      {
        title: "تایید نشده",
        value: false,
      },
      // {
      //   title: "همه",
      //   // value: -1,
      // },
    ],
  },
];
