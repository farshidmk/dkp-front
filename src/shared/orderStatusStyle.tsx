import { OrderStatus } from "@/types/order";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import PaidIcon from "@mui/icons-material/Paid";
import PendingRoundedIcon from "@mui/icons-material/PendingRounded";

export const orderStatusConfig: Record<
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
