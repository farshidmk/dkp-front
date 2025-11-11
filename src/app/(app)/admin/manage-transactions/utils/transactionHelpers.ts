import { TransactionStatus, TransactionType } from "@/types/wallet";

export const getTransactionStatusColor = (
  status: TransactionStatus
): string => {
  switch (status) {
    case TransactionStatus.APPROVED:
      return "#4caf50";
    case TransactionStatus.REJECTED:
      return "#f44336";
    case TransactionStatus.PENDING:
      return "#ff9800";
    default:
      return "#757575";
  }
};

export const getTransactionStatusChipColor = (
  status: TransactionStatus
): "success" | "error" | "warning" | "default" => {
  switch (status) {
    case TransactionStatus.APPROVED:
      return "success";
    case TransactionStatus.REJECTED:
      return "error";
    case TransactionStatus.PENDING:
      return "warning";
    default:
      return "default";
  }
};

export const getTransactionStatusLabel = (status: TransactionStatus): string => {
  switch (status) {
    case TransactionStatus.APPROVED:
      return "تایید شده";
    case TransactionStatus.REJECTED:
      return "رد شده";
    case TransactionStatus.PENDING:
      return "در انتظار تایید";
    default:
      return status;
  }
};

export const getTransactionTypeLabel = (type: TransactionType): string => {
  return type === TransactionType.CHARGE ? "شارژ" : "برداشت";
};

export const formatPersianDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("fa");
};

export const formatPersianAmount = (amount: number): string => {
  return amount.toLocaleString("fa");
};
