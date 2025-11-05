import { Warranty } from "@/types/warranty";
import { zodResolver } from "@hookform/resolvers/zod";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  WarrantySchemaType,
  warrantySchemaValidation,
} from "../warranty.validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ServerCall } from "@/types/server";
import { toast } from "react-toastify";

const AddNewWarranty = () => {
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation<Warranty, Error, ServerCall<Warranty>>(
    {}
  );
  const [isInAddMode, setIsInAddMode] = useState(false);
  const {
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WarrantySchemaType>({
    defaultValues: {
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
        method: "post",
        url: "warranties",
        data,
      },
      {
        onSuccess: () => {
          toast.success("گارانتی با موفقیت ثبت شد");
          reset();
          queryClient.invalidateQueries({ queryKey: ["warranties"] });
        },
      }
    );
  }

  console.log(watch("min_price").toLocaleString("fa"));

  return (
    <div className="flex items-start gap-2 p-4 rounded-xl border border-green-600">
      {isInAddMode && (
        <form
          className="flex items-start gap-2 "
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <Controller
            name={"min_price"}
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  size="small"
                  label="حداقل قیمت"
                  type="number"
                  {...field}
                  error={Boolean(errors?.["min_price"]?.message)}
                  helperText={
                    errors?.["min_price"]?.message ??
                    `${Number(watch("min_price")).toLocaleString("fa")} ريال`
                  }
                />
              );
            }}
          />
          <Controller
            name={"max_price"}
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  size="small"
                  label="حداکثر قیمت"
                  type="number"
                  {...field}
                  error={Boolean(errors?.["max_price"]?.message)}
                  helperText={
                    errors?.["max_price"]?.message ??
                    `${Number(watch("max_price")).toLocaleString("fa")} ريال`
                  }
                />
              );
            }}
          />

          <FormControlLabel
            label="گارانتی به صورت درصدی اضافه شود"
            control={
              <Checkbox
                checked={watch("is_percentage")}
                onChange={(_, checked) => setValue("is_percentage", checked)}
              />
            }
          />
          <Controller
            name={"warranty_price"}
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  size="small"
                  label={
                    watch("is_percentage")
                      ? "درصد اضافه شدن"
                      : "مبلغ اضافه شدن برای گارانتی (به ریال)"
                  }
                  type="number"
                  {...field}
                  error={Boolean(errors?.["warranty_price"]?.message)}
                  helperText={
                    errors?.["warranty_price"]?.message ??
                    `${Number(watch("warranty_price")).toLocaleString(
                      "fa"
                    )} ريال`
                  }
                />
              );
            }}
          />
          <Button
            type="submit"
            color={"success"}
            endIcon={<AddCircleIcon />}
            variant="contained"
          >
            اضافه کردن
          </Button>
        </form>
      )}

      <Button
        onClick={() => setIsInAddMode((p) => !p)}
        color={isInAddMode ? "warning" : "success"}
        endIcon={isInAddMode ? <CancelIcon /> : <AddCircleIcon />}
        variant="outlined"
      >
        {isInAddMode ? "خروج" : "اضافه کردن"}
      </Button>
    </div>
  );
};

export default AddNewWarranty;
