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

import { Box, Chip, Container, Tooltip, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import ViewOrderModalButton from "./_components/ViewOrderModalButton";
import FilterOrders from "./_components/FilterOrders";
import { orderStatusConfig } from "@/shared/orderStatusStyle";
import OrderStatusButton from "./_components/OrderStatusButton";

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
        field: "tracking_code",
        headerName: "کد پیگیری",
        flex: 1,
        filterable: false,
        sortable: false,
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
                <div className="px-2">
                  <ul className="list-disc">
                    {orderItems.map((item) => (
                      <li key={item.dkp}>{item.title}</li>
                    ))}
                  </ul>
                </div>
              }
            >
              <Box
                component="div"
                sx={{
                  border: (t) => `1px solid ${t.palette.info.light}`,
                  color: (t) => t.palette.info.dark,
                }}
                className="flex items-center rounded-full p-3 w-10 h-10 justify-center"
              >
                <Typography variant="body1">
                  {orderItems.length.toLocaleString("fa")}
                </Typography>
              </Box>
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
          const order = params.row as OrderGridData;

          return (
            <div className="flex items-center gap-2">
              <ViewOrderModalButton order={order} />
              <OrderStatusButton order={order} />
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <div>
      <div className="h-full flex flex-col gap-1">
        <FilterOrders setFilter={setFilter} isFetching={isFetching} />
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
