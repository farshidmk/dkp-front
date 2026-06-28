import { Warranty } from "@/types/warranty";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  WarrantySchemaType,
  warrantySchemaValidation,
} from "../warranty.validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ServerCall } from "@/types/server";
import { toast } from "react-toastify";
import ShowErrors from "@/components/errors/ShowErrors";

type Props = {
  warranty?: Warranty;
  onSuccess?: () => void;
};

const WarrantyForm = ({ warranty, onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation<Warranty, Error, ServerCall<Warranty>>(
    {},
  );

  const isEditMode = Boolean(warranty);

  const {
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WarrantySchemaType>({
    defaultValues: isEditMode
      ? { ...warranty }
      : {
          min_price: 1000,
          max_price: 1000000,
          is_percentage: false,
          warranty_price: 1000,
        },
    resolver: zodResolver(warrantySchemaValidation),
  });

  async function onSubmitHandler(data: Warranty) {
    mutate(
      {
        method: isEditMode ? "patch" : "post",
        url: `warranties/${isEditMode ? warranty?.id : ""}`,
        data,
      },
      {
        onSuccess: () => {
          if (isEditMode && onSuccess) {
            toast.success("تغییرات با موفقیت ثبت شد");
            onSuccess();
          } else {
            toast.success("گارانتی با موفقیت ثبت شد");
            reset();
          }
          queryClient.invalidateQueries({ queryKey: ["warranties"] });
        },
      },
    );
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmitHandler)}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Controller
            name={"min_price"}
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  size="small"
                  label="حداقل قیمت"
                  type="number"
                  fullWidth
                  {...field}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val === "" ? "" : Number(val));
                  }}
                  value={field.value ?? ""}
                  error={Boolean(errors?.["min_price"]?.message)}
                  helperText={
                    errors?.["min_price"]?.message ??
                    `${Number(watch("min_price")).toLocaleString("fa")} ريال`
                  }
                />
              );
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Controller
            name={"max_price"}
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  size="small"
                  label="حداکثر قیمت"
                  type="number"
                  fullWidth
                  {...field}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val === "" ? "" : Number(val));
                  }}
                  value={field.value ?? ""}
                  error={Boolean(errors?.["max_price"]?.message)}
                  helperText={
                    errors?.["max_price"]?.message ??
                    `${Number(watch("max_price")).toLocaleString("fa")} ريال`
                  }
                />
              );
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <FormControlLabel
            label="گارانتی به صورت درصدی اضافه شود"
            control={
              <Checkbox
                checked={watch("is_percentage")}
                onChange={(_, checked) => setValue("is_percentage", checked)}
              />
            }
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Controller
            name={"warranty_price"}
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  size="small"
                  fullWidth
                  label={
                    watch("is_percentage")
                      ? "درصد اضافه شدن"
                      : "مبلغ اضافه شدن برای گارانتی (به ریال)"
                  }
                  type="number"
                  {...field}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val === "" ? "" : Number(val));
                  }}
                  error={Boolean(errors?.["warranty_price"]?.message)}
                  helperText={
                    errors?.["warranty_price"]?.message ??
                    `${Number(watch("warranty_price")).toLocaleString("fa")} ريال`
                  }
                />
              );
            }}
          />
        </Grid>
      </Grid>
      {error && <ShowErrors errors={error.message} />}
      <div className="flex items-center justify-center">
        <Button
          type="submit"
          color={"success"}
          endIcon={<AddCircleIcon />}
          variant="contained"
          fullWidth
          sx={{ maxWidth: "300px" }}
        >
          {isEditMode ? "ذخیره" : "اضافه کردن"}
        </Button>
      </div>
    </form>
  );
};

export default WarrantyForm;
