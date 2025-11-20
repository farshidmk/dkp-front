import { useQuery } from "@tanstack/react-query";

import { Transaction } from "@/types/wallet";
import { serverCall } from "@/services/serverCall";

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
    staleTime: 30000,
  });
};

