import { OrderGridData, OrderStatus } from "@/types/order";
import { PaginatedServerResponse, ServerCall } from "@/types/server";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";

type Props = {
  order: OrderGridData;
};

type StatusAction = {
  label: string;
  color: "success" | "warning" | "error";
  icon: React.ReactElement;
};

const statusActionConfig: Partial<Record<OrderStatus, StatusAction>> = {
  [OrderStatus.PENDING]: {
    label: "لغو سفارش",
    color: "error",
    icon: <CancelRoundedIcon />,
  },
  [OrderStatus.PAID]: {
    label: "تکمیل سفارش",
    color: "success",
    icon: <DoneAllIcon />,
  },
  [OrderStatus.FAILED]: {
    label: "تلاش مجدد پرداخت",
    color: "warning",
    icon: <ReplayRoundedIcon />,
  },
};

const OrderStatusButton = ({ order }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation<
    ChangeOrderStatus,
    Error,
    ServerCall<ChangeOrderStatus>
  >({});
  const action = statusActionConfig[order.status];
  const isPaid = order.status === OrderStatus.PAID;

  if (!action) return null;

  return (
    <Tooltip title={action.label}>
      <IconButton
        color={action.color}
        aria-label={action.label}
        onClick={() => {
          if (!isPaid) return;
          mutate(
            {
              url: `orders/update-order-status/${order.id}`,
              method: "PATCH",
              data: {
                status: OrderStatus.COMPLETED,
              },
            },
            {
              onError: (err) =>
                toast.error(err.message ?? "خطا در به روزرسانی فاکتور"),

              onSuccess: () => {
                queryClient.setQueriesData<
                  PaginatedServerResponse<OrderGridData>
                >({ queryKey: ["orders/all"] }, (old) => {
                  if (!old) return old;

                  return {
                    ...old,
                    items: old.items.map((item) =>
                      item.id === order.id
                        ? { ...item, status: OrderStatus.COMPLETED }
                        : item,
                    ),
                  };
                });
              },
            },
          );
        }}
        disabled={isPending}
      >
        {isPending ? <CircularProgress size={18} /> : action.icon}
      </IconButton>
    </Tooltip>
  );
};

export default OrderStatusButton;

type ChangeOrderStatus = {
  status: OrderStatus;
};
