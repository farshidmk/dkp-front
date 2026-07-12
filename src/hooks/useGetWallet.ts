import { WalletBalance } from "@/types/wallet";
import { useQuery } from "@tanstack/react-query";

const useGetWallet = () => {
  return useQuery<WalletBalance>({
    queryKey: ["wallets", "me"],
    staleTime: 30000, // 30 seconds
  });
};

export default useGetWallet;
