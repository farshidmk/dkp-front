"use client";

import ErrorHandler from "@/components/errors/ErrorHandler";
import { Balance } from "@/types/wallet";
import {
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const UserWallet = () => {
  const {
    data: balance,
    status: balanceStatus,
    refetch: balanceRefetch,
  } = useQuery<Balance, Error, Balance>({
    queryKey: ["wallets", "me"],
    staleTime: Infinity,
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <div className="w-full flex justify-center">
        {balanceStatus === "pending" ? (
          <CircularProgress size={60} color="secondary" />
        ) : balanceStatus === "error" ? (
          <ErrorHandler onRefetch={balanceRefetch} />
        ) : (
          <Typography
            variant="h4"
            color="success"
            textAlign="center"
            fontWeight={700}
          >
            موجودی: {Number(balance.balance).toLocaleString("fa")}
          </Typography>
        )}
      </div>
      <div className="border border-gray-500 rounded-lg p-4 mt-4 mb-4">
        <Typography variant="h6">افزایش موجودی</Typography>
        <Typography variant="body2">
          برای افزایش موجودی کد RRN تراکنش را اینجا قرار دهید
        </Typography>
        <form className="flex gap-2 w-full ">
          <TextField label={"RRN"} fullWidth size="small" />
          <TextField label={"مبلغ"} fullWidth size="small" />
        </form>
      </div>
      {/* TODO: Table with pagination */}
      <Typography>لیست تراکنشهای قبلی</Typography>
    </Container>
  );
};

export default UserWallet;
