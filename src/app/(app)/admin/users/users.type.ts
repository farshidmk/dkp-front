import { UserInfo } from "@/types/user";
import { WalletBalance } from "@/types/wallet";
import { PaginatedServerResponse } from "@/types/server";
import { OrderGridData } from "@/types/order";

export type UserFilterItems = {
  name: string;
  mobile: string;
  isApproved?: boolean;
};

export type UserDetailResponse = {
  user: UserInfo;
  balance: WalletBalance;
  orders: PaginatedServerResponse<OrderGridData>;
};

export type AdminResetPasswordRequest = {
  newPassword: string;
};