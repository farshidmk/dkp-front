"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IconButton, CircularProgress, Box } from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { toast } from "react-toastify";

import { Transaction, TransactionStatus } from "@/types/wallet";
import { serverCall } from "@/services/serverCall";
import { ServerCall } from "@/types/server";

interface TransactionActionsProps {
  transaction: Transaction;
}

const TransactionActions = ({ transaction }: TransactionActionsProps) => {
  const queryClient = useQueryClient();

  const { mutate: approveTransaction, isPending: isApproving } = useMutation({
    mutationFn: async () => {
      const config: ServerCall = {
        method: "PATCH",
        url: `wallets/transactions/${transaction.id}`,
        data: { status: TransactionStatus.APPROVED },
      };
      return await serverCall(config);
    },
    onSuccess: () => {
      toast.success("تراکنش تایید شد");
      queryClient.invalidateQueries({
        queryKey: ["admin", "transactions", "pending"],
      });
    },
    onError: (error: any) => {
      toast.error(error?.message || "خطا در تایید تراکنش");
    },
  });

  const { mutate: rejectTransaction, isPending: isRejecting } = useMutation({
    mutationFn: async () => {
      const config: ServerCall = {
        method: "PATCH",
        url: `wallets/transactions/${transaction.id}`,
        data: { status: TransactionStatus.REJECTED },
      };
      return await serverCall(config);
    },
    onSuccess: () => {
      toast.success("تراکنش رد شد");
      queryClient.invalidateQueries({
        queryKey: ["admin", "transactions", "pending"],
      });
    },
    onError: (error: any) => {
      toast.error(error?.message || "خطا در رد تراکنش");
    },
  });

  const isPending = transaction.status === TransactionStatus.PENDING;
  const isApproved = transaction.status === TransactionStatus.APPROVED;
  const isRejected = transaction.status === TransactionStatus.REJECTED;

  if (isApproved) {
    return (
      <IconButton color="success" disabled>
        <Check />
      </IconButton>
    );
  }

  if (isRejected) {
    return (
      <IconButton color="error" disabled>
        <Close />
      </IconButton>
    );
  }

  return (
    <Box style={{ display: "flex", gap: 4 }}>
      <IconButton
        color="success"
        onClick={() => approveTransaction()}
        disabled={isApproving || isRejecting}
        size="small"
      >
        {isApproving ? <CircularProgress size={16} /> : <Check />}
      </IconButton>
      <IconButton
        color="error"
        onClick={() => rejectTransaction()}
        disabled={isApproving || isRejecting}
        size="small"
      >
        {isRejecting ? <CircularProgress size={16} /> : <Close />}
      </IconButton>
    </Box>
  );
};

export default TransactionActions;
