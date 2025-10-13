"use client";

import { Transaction, TransactionStatus } from "@/types/wallet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { serverCall } from "@/services/serverCall";
import { ServerCall } from "@/types/server";
import { Button, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface ApproveTransactionButtonProps {
  transaction: Transaction;
  onSuccess?: () => void;
}

const ApproveTransactionButton = ({ transaction, onSuccess }: ApproveTransactionButtonProps) => {
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
      queryClient.invalidateQueries({ queryKey: ["admin", "transactions"] });
      onSuccess?.();
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
      queryClient.invalidateQueries({ queryKey: ["admin", "transactions"] });
      onSuccess?.();
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
      <Button
        size="small"
        color="success"
        variant="outlined"
        startIcon={<CheckCircleIcon />}
        disabled
      >
        تایید شده
      </Button>
    );
  }

  if (isRejected) {
    return (
      <Button
        size="small"
        color="error"
        variant="outlined"
        startIcon={<CancelIcon />}
        disabled
      >
        رد شده
      </Button>
    );
  }

  return (
    <div className="flex gap-2">
      <Button
        size="small"
        color="success"
        variant="contained"
        onClick={() => approveTransaction()}
        disabled={isApproving || isRejecting}
        startIcon={isApproving ? <CircularProgress size={16} /> : <CheckCircleIcon />}
      >
        {isApproving ? "در حال تایید..." : "تایید"}
      </Button>
      <Button
        size="small"
        color="error"
        variant="outlined"
        onClick={() => rejectTransaction()}
        disabled={isApproving || isRejecting}
        startIcon={isRejecting ? <CircularProgress size={16} /> : <CancelIcon />}
      >
        {isRejecting ? "در حال رد..." : "رد"}
      </Button>
    </div>
  );
};

export default ApproveTransactionButton;
