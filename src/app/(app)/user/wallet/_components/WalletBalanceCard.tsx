"use client";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Card, CardContent, Typography, Box, Skeleton } from "@mui/material";

import { WalletBalance } from "@/types/wallet";

interface WalletBalanceCardProps {
  balance?: WalletBalance;
  isLoading?: boolean;
}

const WalletBalanceCard = ({ balance, isLoading }: WalletBalanceCardProps) => {
  return (
    <Card
      sx={{
        background: "linear-gradient(135deg, #636ed8 0%, #4c63d2 100%)",
        color: "white",
        borderRadius: 3,
        boxShadow: "0 8px 32px rgba(99, 110, 216, 0.3)",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box className="flex items-center gap-2 mb-3">
          <AccountBalanceWalletIcon sx={{ fontSize: 28 }} />
          <Typography variant="h6" fontWeight="bold">
            موجودی
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 1 }}>
          {isLoading ? (
            <Skeleton variant="text" width="60%" height={60} />
          ) : (
            <Typography variant="h3" fontWeight="bold">
              {balance?.balance?.toLocaleString("fa") || "0"}
            </Typography>
          )}
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            تومان
          </Typography>
        </Box>

        <Typography
          variant="caption"
          sx={{ opacity: 0.7, mt: 1, display: "block" }}
        >
          آخرین بروزرسانی:{" "}
          {balance?.updated_at 
            ? new Date(balance.updated_at).toLocaleString("fa")
            : "نامشخص"
          }
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WalletBalanceCard;
