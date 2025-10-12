"use client";

import { Card, CardContent, Typography, Chip } from "@mui/material";
import { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridPaginationModel,
} from "@mui/x-data-grid";

import { TransactionStatus } from "@/types/wallet";
import { useWalletTransactions } from "@/hooks/useWalletTransactions";

const TransactionsTable = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, status, refetch } = useWalletTransactions(
    paginationModel.page,
    paginationModel.pageSize
  );

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.APPROVED:
        return "success";
      case TransactionStatus.REJECTED:
        return "error";
      case TransactionStatus.PENDING:
        return "warning";
      default:
        return "default";
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fa");
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString("fa");
  };

  const columns: GridColDef[] = [
    {
      field: "created_at",
      headerName: "تاریخ ثبت",
      width: 150,
      renderCell: (params) => (params.value ? formatDate(params.value) : "-"),
    },
    {
      field: "order_id",
      headerName: "کد پیگیری",
      width: 150,
    },
    {
      field: "amount",
      headerName: "مبلغ",
      width: 120,
      renderCell: (params) => `${formatAmount(params.value)} تومان`,
    },
    {
      field: "status",
      headerName: "وضعیت",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={getStatusLabel(params.value)}
          color={getStatusColor(params.value) as any}
          size="small"
        />
      ),
    },
    {
      field: "description",
      headerName: "توضیحات",
      width: 200,
      renderCell: (params) => params.value || "-",
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          تاریخچه تراکنش‌ها
        </Typography>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data?.data || []}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 20]}
            pagination
            disableRowSelectionOnClick
            loading={status === "pending"}
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
              noRowsLabel: "تراکنشی موجود نیست",
              footerRowSelected: (count) => `${count} سطر انتخاب شده`,
              footerTotalRows: "مجموع سطرها:",
              paginationRowsPerPage: "تعداد سطر:",
              paginationDisplayedRows: ({ from, to, count }) => `${from}–${to} از ${count}`,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsTable;
