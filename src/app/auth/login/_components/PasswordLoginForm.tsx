"use client";

import RenderFormItem from "@/components/formItems/RenderFormItem";
import LoginIcon from "@mui/icons-material/Login";
import { FormFieldInput } from "@/types/renderFormItem";
import { Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { LoginFormItems } from "../login-types";
import { useMutation } from "@tanstack/react-query";
import { ServerCall } from "@/types/server";
import ShowErrors from "@/components/errors/ShowErrors";

const PasswordLoginForm = () => {
  const router = useRouter();
  const { mutate, error, data } = useMutation<
    LoginFormItems,
    Error,
    ServerCall
  >({});
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormItems>({
    defaultValues: {
      password: "",
      mobile: "",
    },
  });
  console.log({ error });
  async function onSubmitHandler(data: LoginFormItems) {
    mutate(
      {
        method: "post",
        url: "auth/login",
        data,
      },
      {
        onSuccess: (res) => {
          console.log({ res });
          console.log(res);
          router.push("/user");
        },
      }
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-2"
    >
      {PASSWORD_LOGIN_FORM.map((item) => (
        <Controller
          key={item.name}
          name={item.name as keyof LoginFormItems}
          control={control}
          render={({ field }) => {
            return (
              <RenderFormItem
                {...item}
                inputProps={{ ...field, ...item.inputProps } as any}
                error={errors?.[item.name as keyof LoginFormItems]?.message}
              />
            );
          }}
        />
      ))}
      {Boolean(error?.message) && <ShowErrors errors={error!.message!} />}
      <Button
        type="submit"
        fullWidth
        sx={{ mt: 0.5, mb: 2 }}
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        endIcon={isSubmitting ? <CircularProgress /> : <LoginIcon />}
      >
        ورود
      </Button>
    </form>
  );
};

export default PasswordLoginForm;

const PASSWORD_LOGIN_FORM: FormFieldInput<LoginFormItems>[] = [
  {
    name: "mobile",
    inputType: "text",
    label: "تلفن همراه",
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
