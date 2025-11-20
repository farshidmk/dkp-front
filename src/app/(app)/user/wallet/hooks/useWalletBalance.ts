import { useQuery } from "@tanstack/react-query";

import { WalletBalance } from "@/types/wallet";
import { getRequest } from "@/services/serverCall";

export const useWalletBalance = () => {
  return useQuery<WalletBalance>({
    queryKey: ["wallets", "me"],
    queryFn: getRequest(),
    staleTime: 30000,
  });
};

