import { Warranty } from "@/types/warranty";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { warrantySchemaValidation } from "../warranty.validation";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

type Props = {
  warrantyInfo: Warranty;
};

const WarrantyCard = ({ warrantyInfo }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const {
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Warranty>({
    defaultValues: {
      ...warrantyInfo,
    },
    resolver: zodResolver(warrantySchemaValidation),
  });

  async function onSubmitHandler(data: Warranty) {
    //   mutate(
    //     {
    //       method: "post",
    //       url: "auth/signup",
    //       data,
    //     },
    //     {
    //       onSuccess: () => {
    //         toast.success("کاربر با موفقیت ثبت شد");
    //         reset();
    //         router.push("/auth/login");
    //       },
    //     }
    //   );
  }
  return (
    <div className="flex items-center gap-2 rounded-xl border border-primary p-4">
      <form
        className="flex items-center gap-2"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Controller
          disabled={!isEdit}
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
                helperText={errors?.["min_price"]?.message}
              />
            );
          }}
        />
        <Controller
          disabled={!isEdit}
          name={"max_price"}
          control={control}
          render={({ field }) => {
            return (
              <TextField
                size="small"
                label="حداقل قیمت"
                type="number"
                {...field}
                error={Boolean(errors?.["max_price"]?.message)}
                helperText={errors?.["max_price"]?.message}
              />
            );
          }}
        />

        <FormControlLabel
          label="گارانتی به صورت درصدی اضافه شود"
          control={
            <Checkbox
              disabled={!isEdit}
              checked={watch("is_percentage")}
              onChange={(_, checked) => setValue("is_percentage", checked)}
            />
          }
        />
        <Controller
          disabled={!isEdit}
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
                helperText={errors?.["warranty_price"]?.message}
              />
            );
          }}
        />
      </form>
      <IconButton
        onClick={() => setIsEdit((p) => !p)}
        color={isEdit ? "warning" : "primary"}
      >
        {isEdit ? <CancelIcon /> : <EditIcon />}
      </IconButton>
    </div>
  );
};

export default WarrantyCard;
