import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/services/serverCall";
import { WalletBalance } from "@/types/wallet";

export const useWalletBalance = () => {
  return useQuery<WalletBalance>({
    queryKey: ["wallets", "balance"],
    queryFn: getRequest(),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
  });
};
