"use client";

import { Container, Grid } from "@mui/material";
import React from "react";

import WalletBalanceCard from "./_components/WalletBalanceCard";
import TransactionsTable from "./_components/TransactionsTable";
import TransactionForm from "./_components/TransactionForm";
import { useWalletBalance } from "./hooks/useWalletBalance";

const UserWallet = () => {
  const { data: balance, status: balanceStatus } = useWalletBalance();

  return (
    <Container maxWidth="lg" className="py-4">
      <Grid container spacing={3}>
        {/* Balance Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <WalletBalanceCard
            balance={balance}
            isLoading={balanceStatus === "pending"}
          />
        </Grid>

        {/* Transaction Form */}
        <Grid size={{ xs: 12, md: 8 }}>
          <TransactionForm />
        </Grid>

        {/* Transactions Table */}
        <Grid size={{ xs: 12 }}>
          <TransactionsTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserWallet;
