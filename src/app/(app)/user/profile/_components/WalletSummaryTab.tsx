"use client";

import { Container, IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import useGetWallet from "@/hooks/useGetWallet";
import WalletBalanceCard from "@/app/(app)/user/wallet/_components/WalletBalanceCard";

const WalletSummaryTab = () => {
  const { data: balance, status, refetch, isFetching } = useGetWallet();

  return (
    <Container maxWidth="sm" className="mt-4">
      <div className="flex justify-end mb-1">
        <Tooltip title="بروزرسانی موجودی">
          <IconButton onClick={() => refetch()} disabled={isFetching} color="primary">
            <RefreshIcon className={isFetching ? "animate-spin" : ""} />
          </IconButton>
        </Tooltip>
      </div>
      <WalletBalanceCard balance={balance} isLoading={status === "pending"} />
    </Container>
  );
};

export default WalletSummaryTab;