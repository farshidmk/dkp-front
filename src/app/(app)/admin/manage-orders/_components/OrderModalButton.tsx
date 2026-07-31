import React, { useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { OrderGridData, OrderStatus } from "@/types/order";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";

import Image from "next/image";
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { orderStatusConfig } from "@/shared/orderStatusStyle";

type Props = {
  order: OrderGridData;
};

const OrderModalButton = ({ order }: Props) => {
  const subtotal = order.order_items.reduce(
    (sum, item) => sum + Number(item.unit_price) * item.quantity,
    0,
  );

  const warrantyTotal = order.order_items.reduce(
    (sum, item) => sum + item.warrantyPrice,
    0,
  );

  const [showModal, setShowModal] = useState(false);
  const status = orderStatusConfig[order.status as OrderStatus];
  return (
    <>
      <IconButton onClick={() => setShowModal(true)}>
        <VisibilityIcon />
      </IconButton>

      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle className="flex items-center justify-between border-b">
          <div>
            <h2 className="text-xl font-bold">فاکتور</h2>
            <p className="text-sm text-gray-500">شماره فاکتور #{order.id}</p>
          </div>

          <IconButton onClick={() => setShowModal(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent className="bg-gray-50">
          {/* Header */}

          <div className="grid grid-cols-2 gap-6 py-6">
            <div>
              <div className="flex gap-3 items-center">
                <Typography variant="h6">وضعیت سفارش</Typography>
                <Chip
                  label={status.label}
                  color={status.color}
                  icon={status.icon}
                  size="small"
                  variant="filled"
                />
              </div>

              <div className="mt-4">
                <Typography
                  variant="h6"
                  className="font-semibold text-gray-700 mb-2"
                >
                  نام مشتری
                </Typography>
                <p className="font-normal">
                  {order.user.first_name} {order.user.last_name}
                </p>
              </div>
            </div>

            <div className="text-right ">
              <p>
                <span className="font-semibold">کد پیگیری سفارش:</span>{" "}
                {order.tracking_code}
              </p>

              <div className="flex items-center gap-2 mt-3">
                <span className="font-semibold">نحوه پرداخت:</span>{" "}
                <Box
                  component="div"
                  sx={{ background: (t) => t.palette.info.light }}
                  className="rounded-xl py-1 px-4 flex items-center gap-2 text-white"
                >
                  <AccountBalanceWalletRoundedIcon color="inherit" />

                  <Typography fontWeight={700} fontSize={15}>
                    کیف پول
                  </Typography>

                  {/* {order.payment_method} */}
                </Box>
              </div>

              <p className="mt-3">
                <span className="font-semibold">تاریخ سفارش:</span>{" "}
                {new Date(order.created_at).toLocaleString("fa")}
              </p>
            </div>
          </div>

          <Divider />

          {/* Items */}

          <div className="overflow-x-auto mt-6">
            <table className="w-full border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">تصویر</th>
                  <th className="p-3 border text-left">نام محصول</th>
                  <th className="p-3 border">DKP</th>
                  <th className="p-3 border">شماره سریال</th>
                  <th className="p-3 border">تعداد</th>
                  <th className="p-3 border">قیمت واحد</th>
                  <th className="p-3 border">گارانتی</th>
                  <th className="p-3 border">مجموع</th>
                </tr>
              </thead>

              <tbody>
                {order.order_items.map((item) => {
                  const rowTotal =
                    Number(item.unit_price) * item.quantity +
                    item.warrantyPrice;

                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border p-2">
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          width={60}
                          height={60}
                          className="rounded"
                        />
                      </td>

                      <td className="border p-3">{item.title}</td>

                      <td className="border p-3 text-center">{item.dkp}</td>

                      <td className="border p-3 text-center">{item.serial}</td>

                      <td className="border p-3 text-center">
                        {item.quantity}
                      </td>

                      <td className="border p-3 text-center">
                        {Number(item.unit_price).toLocaleString("fa")} ریال
                      </td>

                      <td className="border p-3 text-center">
                        {item.warrantyPrice.toLocaleString("fa")} ریال
                      </td>

                      <td className="border p-3 font-semibold text-center">
                        {rowTotal.toLocaleString("fa")} ریال
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary */}

          <div className="mt-8 flex justify-end">
            <div className="w-80 rounded-lg border bg-white p-5 shadow-sm">
              {/* <div className="flex justify-between mb-3">
                <span>مجموع اجناس</span>
                <span>{subtotal.toLocaleString("fa")} ریال</span>
              </div>

              <div className="flex justify-between mb-3">
                <span>مجموع گارانتی</span>
                <span>{warrantyTotal.toLocaleString("fa")} ریال</span>
              </div>

              <Divider className="my-3" /> */}

              <div className="flex justify-between text-lg font-bold">
                <span>مجموع</span>
                <span>
                  {Number(order.total_price).toLocaleString("fa")} ریال
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderModalButton;
