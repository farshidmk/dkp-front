import { SIGN_UP_FORM_ITEMS } from "@/app/auth/sign-up/page";
import {
  SignUpFormItems,
  SignUpResponse,
} from "@/app/auth/sign-up/signUp-types";
import ShowErrors from "@/components/errors/ShowErrors";
import RenderFormItem from "@/components/formItems/RenderFormItem";
import StatusHandler from "@/components/statusHandler/StatusHandler";
import { ServerCall } from "@/types/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress, Grid } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { toast } from "react-toastify";
import { UserProfileFormValidation } from "../profile.validation";

type FormItems = Omit<SignUpFormItems, "mobile" | "password">;

const PROFILE_DEFAULT_VALUES: FormItems = {
  first_name: "",
  last_name: "",
  national_code: "",
  digikala_panel_name: "",
  digikala_merchant_number: "",
  province: "",
  city: "",
  address: "",
  postal_code: "",
  telephone: "",
  email: "",
};

const ProfileForm = () => {
  const { data, status, refetch } = useQuery<
    SignUpFormItems,
    Error,
    SignUpFormItems
  >({
    queryKey: ["users", "profile"],
    staleTime: 5 * 60 * 60,
  });

  const { mutate, error, isPending } = useMutation<
    SignUpResponse,
    Error,
    ServerCall<Partial<SignUpFormItems>>
  >({});
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormItems>({
    resolver: zodResolver(UserProfileFormValidation),
    defaultValues: PROFILE_DEFAULT_VALUES,
  });

  useEffect(() => {
    if (status === "success" && data) {
      reset(data);
    }
  }, [status, data, reset]);

  async function onSubmitHandler(data: FormItems) {
    mutate(
      {
        method: "patch",
        url: "users/profile",
        data,
      },
      {
        onSuccess: () => {
          toast.success("اطلاعات کاربری با موفقیت تغییر کرد.");
        },
        onError: () => {
          toast.error("خطا در ثبت اطلاعات!");
        },
      }
    );
  }

  return (
    <StatusHandler status={status} refetch={refetch} skeletonHeight={300}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-4">
        <Grid container spacing={1} sx={{ mb: 1 }}>
          {SIGN_UP_FORM_ITEMS.filter(
            (item) => item.name !== "password" && item.name !== "mobile"
          ).map((item) => (
            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
              key={item.name}
            >
              <Controller
                name={item.name as keyof FormItems}
                control={control}
                disabled={item.name === "mobile"}
                render={({ field }) => {
                  return (
                    <RenderFormItem
                      {...item}
                      inputProps={{ ...field, ...item.inputProps } as any}
                      error={errors?.[item.name as keyof FormItems]?.message}
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
            disabled={isPending}
            fullWidth
            type="submit"
            sx={{ mt: 1, maxWidth: "200px" }}
            endIcon={
              isPending ? <CircularProgress size={18} /> : <CheckCircleIcon />
            }
          >
            تایید
          </Button>
        </div>
      </form>
    </StatusHandler>
  );
};

export default ProfileForm;
