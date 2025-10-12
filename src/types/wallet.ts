export enum TransactionType {
  CHARGE = "charge",
  WITHDRAW = "withdraw",
}

export enum TransactionStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export type WalletBalance = {
  id: number;
  user_id: number;
  balance: string;
  created_at: string;
  updated_at: string;
};

export type Transaction = {
  id: number;
  type: TransactionType;
  amount: number;
  order_id: number;
  idempotency_key: string;
  description?: string;
  status: TransactionStatus;
  created_at: string;
  updated_at: string;
  user_id?: number;
  user_mobile?: string;
  user_name?: string;
};

export type CreateTransactionRequest = {
  type: TransactionType;
  amount: number;
  order_id: number;
  idempotency_key?: string;
  description?: string;
};

export type GetTransactionsResponse = {
  data: Transaction[];
  total: number;
  page: number;
  limit: number;
};

export type UpdateTransactionStatusRequest = {
  status: TransactionStatus;
};
