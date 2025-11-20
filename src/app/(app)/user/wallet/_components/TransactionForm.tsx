"use client";

import { Controller, FormProvider } from "react-hook-form";
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
import { useWalletTransactionForm } from "../hooks/useWalletTransactionForm";

const TransactionForm = () => {
  const { form, isCharge, isSubmitting, handleSubmitForm } =
    useWalletTransactionForm();
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          ثبت کد پیگیری پرداخت
        </Typography>

        <FormProvider {...form}>
          <form onSubmit={handleSubmitForm}>
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
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
