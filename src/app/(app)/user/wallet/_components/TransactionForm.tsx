"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import { TransactionType } from "@/types/wallet";
import { WalletFormValidation } from "../wallet.validation";
import { serverCall } from "@/services/serverCall";
import { ServerCall } from "@/types/server";
import { z } from "zod";

// Type for the form data after validation transformation
type WalletFormData = z.infer<typeof WalletFormValidation>;

const TransactionForm = () => {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<WalletFormData>({
    resolver: zodResolver(WalletFormValidation),
    defaultValues: {
      type: TransactionType.CHARGE,
      amount: "",
      order_id: "",
      description: "",
    },
  });

  const isCharge = watch("type") === TransactionType.CHARGE;

  const { mutate } = useMutation({
    mutationFn: async (data: WalletFormData) => {
      const payload: any = {
        ...data,
        amount: Number(data.amount),
        idempotency_key: crypto.randomUUID(),
      };
      // Only send tracking_number for charge, never send order_id
      if (
        data.type === TransactionType.CHARGE &&
        data.order_id &&
        String(data.order_id).trim() !== ""
      ) {
        payload.tracking_number = Number(data.order_id);
      }
      delete payload.order_id;

      const config: ServerCall = {
        method: "POST",
        url: "wallets/transactions",
        data: payload,
      };
      return await serverCall(config);
    },
    onSuccess: () => {
      toast.success("تراکنش با موفقیت ثبت شد");
      reset();
      queryClient.invalidateQueries({ queryKey: ["wallets", "transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallets", "me"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "خطا در ثبت تراکنش");
    },
  });

  const onSubmit = async (data: WalletFormData) => {
    setIsSubmitting(true);
    try {
      mutate(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          ثبت کد پیگیری پرداخت
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: isCharge ? 2 : 3 }}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={Boolean(errors.type)}>
                    <InputLabel>نوع تراکنش</InputLabel>
                    <Select {...field} label="نوع تراکنش">
                      <MenuItem value={TransactionType.CHARGE}>شارژ</MenuItem>
                      <MenuItem value={TransactionType.WITHDRAW}>
                        برداشت
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              {errors.type && (
                <Typography color="error" variant="caption">
                  {errors.type.message}
                </Typography>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: isCharge ? 4 : 9 }}>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="مبلغ (تومان)"
                    type="number"
                    error={Boolean(errors.amount)}
                    helperText={errors.amount?.message}
                  />
                )}
              />
            </Grid>

            {isCharge && (
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="order_id"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      fullWidth
                      label="کد پیگیری"
                      error={Boolean(errors.order_id)}
                      helperText={errors.order_id?.message}
                    />
                  )}
                />
              </Grid>
            )}

            <Grid size={{ xs: 12 }}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="توضیحات (اختیاری)"
                    multiline
                    rows={3}
                    error={Boolean(errors.description)}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                sx={{ mt: 2 }}
                endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              >
                {isSubmitting ? "در حال ثبت..." : "ثبت"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
