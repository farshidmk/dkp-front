"use client";

import React from "react";
import RenderFormItem from "@/components/formItems/RenderFormItem";

import { SignUpFormItems, SignUpResponse } from "./signUp-types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormValidation } from "./signUp.validations";
import Link from "next/link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FormFieldInput } from "@/types/renderFormItem";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { ServerCall } from "@/types/server";
import { toast } from "react-toastify";
import ShowErrors from "@/components/errors/ShowErrors";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const { mutate, error } = useMutation<
    SignUpResponse,
    Error,
    ServerCall<SignUpFormItems>
  >({});
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      password: "",
      mobile: "",
    },
    resolver: zodResolver(SignUpFormValidation),
  });
  async function onSubmitHandler(data: SignUpFormItems) {
    mutate(
      {
        method: "post",
        url: "auth/signup",
        data,
      },
      {
        onSuccess: () => {
          toast.success("کاربر با موفقیت ثبت شد");
          reset();
          router.push("/auth/login");
        },
      }
    );
  }

  return (
    <div>
      <Typography
        variant="h5"
        textAlign={"center"}
        fontWeight={500}
        color="primary"
      >
        ثبت نام
      </Typography>

      <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-4">
        <Grid container spacing={1} sx={{ mb: 1 }}>
          {SIGN_UP_FORM_ITEMS.map((item) => (
            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
              key={item.name}
            >
              <Controller
                name={item.name as keyof SignUpFormItems}
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
        <Button
          color="success"
          variant="contained"
          disabled={isSubmitting}
          fullWidth
          type="submit"
          sx={{ mt: 1 }}
          endIcon={
            isSubmitting ? <CircularProgress size={18} /> : <CheckCircleIcon />
          }
        >
          ثبت نام
        </Button>
      </form>
      <div className="w-full grid text-blue-600 hover:text-blue-800">
        <Link
          href="/auth/login"
          className="no-underline font-semibold text-sm mt-2 text-blue-500 hover:text-blue-700"
        >
          قبلا ثبت نام کرده اید. وارد شوید
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;

//TODO: complete the fields
const SIGN_UP_FORM_ITEMS: FormFieldInput<SignUpFormItems>[] = [
  {
    name: "first_name", // Corresponds to the entity field
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
    name: "password",
    inputType: "text",
    label: "رمز عبور",
    inputProps: {
      type: "password", // Explicitly set input type as password
    },
  },
  {
    name: "last_name",
    inputType: "text",
    label: "نام خانوادگی",
  },
  {
    name: "national_code",
    inputType: "text",
    label: "کد ملی",
    inputProps: {
      placeholder: "مثال 1234567890",
    },
  },
  {
    name: "digikala_panel_name",
    inputType: "text",
    label: "نام پنل دیجی‌کالا",
  },
  {
    name: "digikala_merchant_number",
    inputType: "text",
    label: "شماره مرچنت دیجی‌کالا",
  },
  {
    name: "province",
    inputType: "text",
    label: "استان",
  },
  {
    name: "city",
    inputType: "text",
    label: "شهر",
  },
  {
    name: "address",
    inputType: "text",
    label: "آدرس",
  },
  {
    name: "postal_code",
    inputType: "text",
    label: "کد پستی",
    inputProps: {
      placeholder: "مثال 1234567890",
    },
  },
  {
    name: "telephone",
    inputType: "text",
    label: "تلفن ثابت",
    inputProps: {
      placeholder: "مثال 02112345678",
    },
  },
];
