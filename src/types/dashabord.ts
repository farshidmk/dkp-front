import { OrderStatus } from "./order";
import { Transaction } from "./wallet";

export type AdminDashboardResponse = {
  pendingOrders: PendingOrder[];
  pendingUsers: PendingUser[];
  registeredUsersToday: number;
  pendingTransactions: Transaction[];
  confirmedTransactionsAmountToday: number;
  totalTransactionAmountThisWeek: number;
  totalTransactionAmountThisMonth: number;
};

type PendingOrder = {
  id: number;
  ownerId: number;
  totalPrice: number;
  trackingCode: number;
  status: OrderStatus;
  paymentMethod: "wallet";
  createdAt: Date;
  ownerFirstName: string;
  ownerLastName: string;
  orderItemsCount: number;
};

type PendingUser = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
};
