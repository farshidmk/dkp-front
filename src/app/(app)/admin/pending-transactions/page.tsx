"use client";

import { Container, Typography, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import StatusHandler from "@/components/statusHandler/StatusHandler";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import TransactionActions from "./_components/TransactionActions";
import { Transaction, TransactionStatus } from "@/types/wallet";
import { serverCall } from "@/services/serverCall";

const AdminPendingTransactionsPage = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, status, refetch } = useQuery<{
    data: Transaction[];
    total: number;
    page: number;
    limit: number;
  }>({
    queryKey: [
      "wallets",
      "transactions",
      "admin",
      "pending",
      paginationModel.page,
      paginationModel.pageSize,
    ],
    queryFn: async () =>
      await serverCall({
        method: "GET",
        url: `wallets/transactions/admin/pending?page=${paginationModel.page}&limit=${paginationModel.pageSize}`,
      }),
  });

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.APPROVED:
        return "#4caf50";
      case TransactionStatus.REJECTED:
        return "#f44336";
      case TransactionStatus.PENDING:
        return "#ff9800";
      default:
        return "#757575";
    }
  };

  const getStatusLabel = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.APPROVED:
        return "تایید شد";
      case TransactionStatus.REJECTED:
        return "رد شد";
      case TransactionStatus.PENDING:
        return "در حال بررسی";
      default:
        return status;
    }
  };

  const getTypeLabel = (type: string) => {
    return type === "charge" ? "شارژ" : "برداشت";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fa");
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString("fa");
  };

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
      renderCell: (params) => `${formatAmount(params.value)} تومان`,
    },
    {
      field: "type",
      headerName: "نوع",
      width: 100,
      renderCell: (params) => getTypeLabel(params.value),
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
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "status",
      headerName: "وضعیت",
      width: 150,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: getStatusColor(params.value),
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "0.8em",
            textAlign: "center",
          }}
        >
          {getStatusLabel(params.value)}
        </div>
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
            rows={data?.data || []}
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

export default AdminPendingTransactionsPage;
