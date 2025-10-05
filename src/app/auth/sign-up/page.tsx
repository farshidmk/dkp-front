"use client";

import React from "react";
import RenderFormItem from "@/components/formItems/RenderFormItem";

import { SignUpFormItems } from "./signUp-types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormValidation } from "./signUp.validations";
import Link from "next/link";

import { FormFieldInput } from "@/types/renderFormItem";
import { Button, Card, CardContent, CardHeader } from "@mui/material";

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormItems>({
    defaultValues: {
      name: "",
      password: "",
      phoneNumber: "",
    },
    resolver: zodResolver(signUpFormValidation),
  });
  async function onSubmitHandler(values: SignUpFormItems) {}

  return (
    <Card>
      <CardHeader>ثبت نام</CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
          {SIGN_UP_FORM_ITEMS.map((item) => (
            <Controller
              key={item.name}
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
          ))}
          <Button className="w-full mt-2" disabled={isSubmitting} type="submit">
            ثبت نام
          </Button>
        </form>
        <Button variant="text">
          <Link href="/auth/login" className="no-underline font-semibold">
            قبلا ثبت نام کرده اید. وارد شوید
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginPage;

//TODO: complete the fields
const SIGN_UP_FORM_ITEMS: FormFieldInput<SignUpFormItems>[] = [
  {
    name: "name",
    inputType: "text",
    label: "نام",
  },
  {
    name: "phoneNumber",
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
      type: "password",
    },
  },
];
