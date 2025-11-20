import { useState } from "react";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { WalletFormValidation } from "../wallet.validation";
import { TransactionType } from "@/types/wallet";
import { ServerCall } from "@/types/server";
import { serverCall } from "@/services/serverCall";

type WalletFormData = z.infer<typeof WalletFormValidation>;

type UseWalletTransactionFormReturn = {
  form: UseFormReturn<WalletFormData>;
  isCharge: boolean;
  isSubmitting: boolean;
  handleSubmitForm: ReturnType<UseFormReturn<WalletFormData>["handleSubmit"]>;
};

export const useWalletTransactionForm = (): UseWalletTransactionFormReturn => {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<WalletFormData>({
    resolver: zodResolver(WalletFormValidation),
    defaultValues: {
      type: TransactionType.CHARGE,
      amount: "",
      order_id: "",
      description: "",
    },
  });

  const isCharge = form.watch("type") === TransactionType.CHARGE;

  const mutation = useMutation({
    mutationFn: async (data: WalletFormData) => {
      const payload: any = {
        ...data,
        amount: Number(data.amount),
        idempotency_key: crypto.randomUUID(),
      };

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
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["wallets", "transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallets", "me"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "خطا در ثبت تراکنش");
    },
  });

  const handleSubmitForm = form.handleSubmit(async (data: WalletFormData) => {
    setIsSubmitting(true);
    try {
      await mutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  });

  return {
    form,
    isCharge,
    isSubmitting,
    handleSubmitForm,
  };
};

