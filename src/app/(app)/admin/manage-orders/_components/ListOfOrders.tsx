import { AppDataGrid } from "@/components/dataGrid/AppDataGrid";
import { AppGridColDef } from "@/types/data-grid";
import { OrderGridData, OrderStatus } from "@/types/order";
import { Chip, Container, Tooltip } from "@mui/material";
import React, { useMemo } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PendingRoundedIcon from "@mui/icons-material/PendingRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

type Props = {
  data: OrderGridData[];
};

const ListOfOrders = ({ data }: Props) => {
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
          const totalPrice = params.value as OrderGridData["total_price"];
          return totalPrice.toLocaleString("fa") + "ريال";
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
    <div className="h-full flex flex-col gap-1">
      <Container maxWidth="xl" sx={{ flex: 1, overflow: "auto" }}>
        <AppDataGrid
          rows={data ?? []}
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
      </Container>
    </div>
  );
};

export default ListOfOrders;

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
    icon: <CheckCircleRoundedIcon fontSize="small" />,
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
    icon: <CheckCircleRoundedIcon fontSize="small" />,
  },
};
