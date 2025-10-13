import { useQuery } from "@tanstack/react-query";
import { serverCall } from "@/services/serverCall";
import { GetTransactionsResponse } from "@/types/wallet";

export const useWalletTransactions = (page: number, pageSize: number) => {
  return useQuery<GetTransactionsResponse>({
    queryKey: ["wallets", "transactions", page, pageSize],
    queryFn: async () => {
      return await serverCall<GetTransactionsResponse>({
        url: `wallets/transactions?page=${page}&limit=${pageSize}`,
        method: "GET",
      });
    },
    staleTime: 30000, // 30 seconds
  });
};
