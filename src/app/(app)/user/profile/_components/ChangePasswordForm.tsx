"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Container, Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import {
  ChangePasswordFormData,
  ChangePasswordValidation,
} from "../profile.validation";
import { ServerCall } from "@/types/server";
import { toast } from "react-toastify";
import { FormFieldInput } from "@/types/renderFormItem";
import RenderFormItem from "@/components/formItems/RenderFormItem";
import ShowErrors from "@/components/errors/ShowErrors";

export default function ChangePasswordForm() {
  const { mutate, isPending, error } = useMutation<
    ChangePasswordFormData,
    Error,
    ServerCall<ChangePasswordFormData>
  >({});

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePasswordValidation),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    mutate(
      {
        method: "put",
        url: "users/change-password",
        data,
      },
      {
        onSuccess: () => {
          reset();
          toast.success("رمز عبور با موفقیت تغییر کرد");
        },
        onError: () => {
          toast.error("خطا در ثبت اطلاعات!");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <Container maxWidth="sm">
        <Grid container spacing={1} sx={{ mb: 1 }}>
          {CHANGE_PASS_ITEMS.map((item) => (
            <Grid
              size={{
                xs: 12,
              }}
              key={item.name}
            >
              <Controller
                name={item.name as keyof ChangePasswordFormData}
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
          ))}
        </Grid>
        {error && <ShowErrors errors={error.message} />}
        <div className="w-full flex justify-center">
          <Button
            color="success"
            variant="contained"
            loading={isPending}
            fullWidth
            type="submit"
            sx={{ mt: 1, maxWidth: "200px" }}
            endIcon={<CheckCircleIcon />}
          >
            تایید
          </Button>
        </div>
      </Container>
    </form>
  );
}

export const CHANGE_PASS_ITEMS: FormFieldInput<ChangePasswordFormData>[] = [
  {
    name: "oldPassword",
    inputType: "text",
    label: "رمز عبور قدیمی",
    inputProps: {
      type: "password",
    },
  },
  {
    name: "newPassword",
    inputType: "text",
    label: "رمز عبور جدید",
    inputProps: {
      type: "password",
    },
  },
  {
    name: "confirmPassword",
    inputType: "text",
    label: "تکرار رمز عبور",
    inputProps: {
      type: "password",
    },
  },
];
