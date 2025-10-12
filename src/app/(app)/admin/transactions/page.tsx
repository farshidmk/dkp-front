"use client";

import React, { useState } from "react";
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/services/serverCall";
import StatusHandler from "@/components/statusHandler/StatusHandler";
import ApproveTransactionButton from "./_components/ApproveTransactionButton";
import { Transaction, TransactionStatus } from "@/types/wallet";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridFilterModel,
  GridPaginationModel,
} from "@mui/x-data-grid";

const AdminTransactionsPage = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const { data, status, refetch } = useQuery<{ data: Transaction[]; total: number; page: number; limit: number }>({
    queryKey: ["admin", "transactions", paginationModel.page, paginationModel.pageSize, filterStatus],
    queryFn: getRequest(),
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
      field: "user_info",
      headerName: "اطلاعات کاربر",
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
      field: "created_at",
      headerName: "تاریخ تراکنش",
      width: 150,
      renderCell: (params) => formatDate(params.value),
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
      field: "type",
      headerName: "نوع",
      width: 100,
      renderCell: (params) => getTypeLabel(params.value),
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
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <ApproveTransactionButton transaction={params.row} />
      ),
    },
  ];

  const handleFilterChange = (event: any) => {
    setFilterStatus(event.target.value);
  };

  return (
    <Container maxWidth="xl" className="py-4">
      <Typography variant="h4" gutterBottom>
        مدیریت تراکنش‌ها
      </Typography>

      <Box sx={{ mb: 3, display: "flex", gap: 2, alignItems: "center" }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>فیلتر بر اساس وضعیت</InputLabel>
          <Select
            value={filterStatus}
            label="فیلتر بر اساس وضعیت"
            onChange={handleFilterChange}
          >
            <MenuItem value="all">همه</MenuItem>
            <MenuItem value={TransactionStatus.PENDING}>در حال بررسی</MenuItem>
            <MenuItem value={TransactionStatus.APPROVED}>تایید شده</MenuItem>
            <MenuItem value={TransactionStatus.REJECTED}>رد شده</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <StatusHandler status={status} refetch={refetch}>
        <div style={{ height: 600, width: "100%" }}>
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
          />
        </div>
      </StatusHandler>
    </Container>
  );
};

export default AdminTransactionsPage;
