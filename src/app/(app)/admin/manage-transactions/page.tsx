"use client";

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Container, Typography, Box, Chip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import StatusHandler from "@/components/statusHandler/StatusHandler";
import TransactionActions from "./_components/TransactionActions";
import { Transaction } from "@/types/wallet";
import { serverCall } from "@/services/serverCall";
import {
  getTransactionStatusChipColor,
  getTransactionStatusLabel,
  getTransactionTypeLabel,
  formatPersianDate,
  formatPersianAmount,
} from "@/app/(app)/admin/manage-transactions/utils/transactionHelpers";

const AdminManageTransactionsPage = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, status, refetch } = useQuery<Transaction[]>({
    queryKey: [
      "wallets",
      "transactions",
      "admin",
      "manage",
      paginationModel.page,
      paginationModel.pageSize,
    ],
    queryFn: async () => {
      const filter = {
        skip: paginationModel.page * paginationModel.pageSize,
        take: paginationModel.pageSize,
        order: { created_at: "DESC" },
      };
      const filterParam = encodeURIComponent(JSON.stringify(filter));
      return await serverCall({
        method: "GET",
        url: `wallets/transactions/admin/pending?filter=${filterParam}`,
      });
    },
  });

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "شناسه",
      width: 100,
      renderCell: (params) => `#${params.value}`,
    },
    {
      field: "user_info",
      headerName: "کاربر",
      width: 200,
      renderCell: (params) => (
        <div>
          <div>{params.row.user_name || "نامشخص"}</div>
          <div style={{ fontSize: "0.8em", color: "#666" }}>
            {params.row.user_mobile || "موبایل نامشخص"}
          </div>
        </div>
      ),
    },
    {
      field: "amount",
      headerName: "مبلغ",
      width: 120,
      renderCell: (params) => `${formatPersianAmount(params.value)} تومان`,
    },
    {
      field: "type",
      headerName: "نوع",
      width: 100,
      renderCell: (params) => getTransactionTypeLabel(params.value),
    },
    {
      field: "order_id",
      headerName: "کد پیگیری",
      width: 150,
    },
    {
      field: "description",
      headerName: "توضیحات",
      width: 200,
      renderCell: (params) => params.value || "-",
    },
    {
      field: "created_at",
      headerName: "تاریخ",
      width: 150,
      renderCell: (params) => formatPersianDate(params.value),
    },
    {
      field: "status",
      headerName: "وضعیت",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={getTransactionStatusLabel(params.value)}
          color={getTransactionStatusChipColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "عملیات",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => <TransactionActions transaction={params.row} />,
    },
  ];

  return (
    <Container maxWidth="xl" className="py-4">
      <StatusHandler status={status} refetch={refetch}>
        <Box style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={data || []}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 20, 50]}
            pagination
            disableRowSelectionOnClick
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            sx={{
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #e0e0e0",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f5f5f5",
                borderBottom: "2px solid #e0e0e0",
              },
            }}
            localeText={{
              noRowsLabel: "تراکنش در انتظار تایید موجود نیست",
              footerRowSelected: (count) => `${count} سطر انتخاب شده`,
              footerTotalRows: "مجموع سطرها:",
              paginationRowsPerPage: "تعداد سطر:",
              paginationDisplayedRows: ({ from, to, count }) =>
                `${from}–${to} از ${count}`,
            }}
          />
        </Box>
      </StatusHandler>
    </Container>
  );
};

export default AdminManageTransactionsPage;
