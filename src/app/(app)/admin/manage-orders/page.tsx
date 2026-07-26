"use client";
import { AppDataGrid } from "@/components/dataGrid/AppDataGrid";
import StatusHandler from "@/components/statusHandler/StatusHandler";
import { useDataGridQuery } from "@/hooks/useDataGridQuery";
import convertGridQueryToApiFilterParam, {
  toQueryString,
} from "@/services/convertGridQueryToApiFilterParam";
import { AppGridColDef } from "@/types/data-grid";
import { OrderGridData, OrderSearchItems, OrderStatus } from "@/types/order";
import { PaginatedServerResponse } from "@/types/server";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import PaidIcon from "@mui/icons-material/Paid";
import PendingRoundedIcon from "@mui/icons-material/PendingRounded";
import { Chip, Container, Tooltip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";

const ManageOrdersPage = () => {
  const {
    query,
    paginationModel,
    setPaginationModel,
    sortModel,
    setSortModel,
  } = useDataGridQuery();

  const [filter, setFilter] = useState<OrderSearchItems>({
    creatorName: undefined,
    status: undefined,
    trackingCode: "",
  });

  const { data, status, refetch, isFetching } = useQuery<
    PaginatedServerResponse<OrderGridData>,
    Error,
    PaginatedServerResponse<OrderGridData>
  >({
    queryKey: [
      "orders/all",
      `?${convertGridQueryToApiFilterParam(query)}&${toQueryString(filter)}`,
    ],
  });

  const columns = useMemo(
    (): AppGridColDef<OrderGridData>[] => [
      {
        field: "status",
        headerName: "وضعیت",
        flex: 1,
        filterable: false,
        sortable: false,
        renderCell: ({ value }) => {
          const status = orderStatusConfig[value as OrderStatus];

          if (!status) return null;

          return (
            <Tooltip title={status.label}>
              <Chip
                label={status.label}
                color={status.color}
                icon={status.icon}
                size="small"
                variant="filled"
              />
            </Tooltip>
          );
        },
      },
      {
        field: "created_at",
        headerName: "تاریخ درخواست",
        flex: 1,
        filterable: false,
        sortable: false,
        renderCell: (params) => {
          const createdDate = params.value as OrderGridData["created_at"];
          return new Date(createdDate).toLocaleString("fa");
        },
      },
      {
        field: "total_price",
        headerName: "قیمت کل",
        flex: 1,
        filterable: false,
        sortable: false,
        renderCell: (params) => {
          const totalPrice = Number(
            params.value,
          ) as OrderGridData["total_price"];
          return totalPrice.toLocaleString("fa") + " ريال";
        },
      },
      {
        field: "user",
        headerName: "درخواست دهنده",
        flex: 1,
        filterable: false,
        sortable: false,
        renderCell: (params) => {
          const user = params.value as OrderGridData["user"];
          return `${user.first_name} ${user.last_name}`;
        },
      },
      {
        field: "order_items",
        headerName: "تعداد کالاها",
        flex: 1,
        filterable: false,
        sortable: false,
        renderCell: (params) => {
          const orderItems = params.value as OrderGridData["order_items"];
          return (
            <Tooltip
              title={
                <ul className="disk">
                  {orderItems.map((item, i) => (
                    <li key={item.dkp}>
                      {(i + 1).toLocaleString("fa")}
                      {"- "}
                      {item.title}
                    </li>
                  ))}
                </ul>
              }
            >
              <span>{orderItems.length.toLocaleString("fa")}</span>
            </Tooltip>
          );
        },
      },
      {
        field: "action",
        headerName: "عملیات",
        flex: 1,
        filterable: false,
        sortable: false,
        renderCell: (params) => {
          const user = params.row as OrderGridData;

          return <div className="flex items-center gap-2"></div>;
        },
      },
    ],
    [],
  );

  return (
    <div>
      <div className="h-full flex flex-col gap-1">
        <Container maxWidth="xl" sx={{ flex: 1, overflow: "auto" }}>
          <StatusHandler status={status} refetch={refetch} skeletonHeight={500}>
            <AppDataGrid
              rows={data?.items ?? []}
              columns={columns}
              loading={false}
              totalRows={data?.total ?? 0}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              sortModel={sortModel}
              onSortModelChange={setSortModel}
              gridProps={{
                getRowId: (row: OrderGridData) => row.id,
              }}
            />
          </StatusHandler>
        </Container>
      </div>
    </div>
  );
};

export default ManageOrdersPage;

const orderStatusConfig: Record<
  OrderStatus,
  {
    label: string;
    color: "success" | "warning" | "error" | "default";
    icon: React.ReactElement;
  }
> = {
  [OrderStatus.PENDING]: {
    label: "در انتظار پرداخت",
    color: "warning",
    icon: <PendingRoundedIcon fontSize="small" />,
  },
  [OrderStatus.PAID]: {
    label: "پرداخت شده",
    color: "success",
    icon: <PaidIcon fontSize="small" />,
  },
  [OrderStatus.FAILED]: {
    label: "پرداخت ناموفق",
    color: "error",
    icon: <HighlightOffRoundedIcon fontSize="small" />,
  },
  [OrderStatus.CANCELED]: {
    label: "لغو شده",
    color: "default",
    icon: <CancelRoundedIcon fontSize="small" />,
  },
  [OrderStatus.COMPLETED]: {
    label: "تکمیل شده",
    color: "success",
    icon: <DoneAllIcon fontSize="small" />,
  },
};
