import { CreateReceiptResponse } from "@/types/order";
import {
  alpha,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type Props = {
  open: boolean;
  order?: CreateReceiptResponse;
  handleClose: () => void;
};

const OrderPaidSuccessful = ({ open, order, handleClose }: Props) => {
  const theme = useTheme();
  const BG_COLOR = alpha(theme.palette.success.main, 0.2);

  const receiptDate = new Date(order?.date ?? "");

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ background: BG_COLOR }}>
        <div className="flex items-center gap-1">
          <CheckCircleIcon fontSize="large" color="success" />

          <Typography variant="h4" fontWeight={500} color="success">
            اطالاعات با موفقیت ثبت شد
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent sx={{ background: BG_COLOR, p: 2 }}>
        <div className="flex flex-col gap-1  justify-center items-center">
          <Typography
            variant="body1"
            fontWeight={500}
            sx={{ my: 2 }}
            color="success"
          >
            فاکتور با شماره پیگیری{" "}
            <Typography
              variant="caption"
              fontSize={16}
              fontWeight={600}
              sx={{ my: 1 }}
            >{` ${order?.id} `}</Typography>{" "}
            در تاریخ
            {` ${receiptDate.toLocaleDateString("fa")} - ${receiptDate.toLocaleTimeString("fa")} `}
            با موفقیت ثبت گردید.
          </Typography>

          <Typography variant="body2" sx={{ my: 2 }} color="warning">
            سفارش شما پس از تایید مدیریت کامل میگردد. برای پیگیری وضعیت سفارش به
            صفحه پیگیری سفارشات بروید.
          </Typography>

          <div className="flex items-center gap-2 justify-center">
            <Button
              variant="outlined"
              color="warning"
              onClick={handleClose}
              sx={{ width: "150px" }}
            >
              خروج
            </Button>
            <Link href={`/user/myOrder/${order?.id}`}>
              <Button
                variant="outlined"
                color="primary"
                sx={{ width: "150px" }}
              >
                مشاهده وضعیت
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderPaidSuccessful;
