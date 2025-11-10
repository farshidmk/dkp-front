import { useQuery } from "@tanstack/react-query";
import { serverCall } from "@/services/serverCall";
import { Transaction } from "@/types/wallet";

export const useWalletTransactions = (page: number, pageSize: number) => {
  return useQuery<Transaction[]>({
    queryKey: ["wallets", "transactions", page, pageSize],
    queryFn: async () => {
      const filter = {
        skip: page * pageSize,
        take: pageSize,
        order: { created_at: "DESC" },
      };
      const filterParam = encodeURIComponent(JSON.stringify(filter));
      return await serverCall<Transaction[]>({
        url: `wallets/transactions?filter=${filterParam}`,
        method: "GET",
      });
    },
    staleTime: 30000, // 30 seconds
  });
};
