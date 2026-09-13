import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import { Chip, Paper, Tooltip, Typography } from "@mui/material";
import { AdminDashboardResponse } from "@/types/dashabord";
const Empty = ({ text }: { text: string }) => (
  <div className="rounded-2xl bg-slate-50 py-8 text-center text-sm text-slate-500">
    {text}
  </div>
);
export default function DashboardLists({
  data,
}: {
  data: AdminDashboardResponse;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Paper
        elevation={0}
        className="rounded-3xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/60 p-5 shadow-sm transition-shadow hover:shadow-md"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ReceiptLongRoundedIcon color="warning" />
            <Typography variant="h6" fontWeight={800}>
              سفارش‌های در انتظار
            </Typography>
          </div>
          <Chip
            size="small"
            label={`${data.pendingOrders?.length ?? 0} مورد`}
            color="warning"
            variant="outlined"
          />
        </div>
        {data.pendingOrders?.length ? (
          <div className="flex flex-col gap-2">
            {data.pendingOrders.map((o, i) => (
              <div
                key={`${o.id}-${i}`}
                className="group rounded-2xl border border-orange-100 bg-white/80 px-4 py-3 transition-all "
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-orange-100 p-2 text-orange-600 ">
                    <ShoppingBagRoundedIcon fontSize="small" />
                  </div>
                  <div className="min-w-0 flex-1 ">
                    <div className="flex justify-between items-center">
                      <Typography noWrap fontWeight={700}>
                        {o.ownerFirstName} {o.ownerLastName}
                      </Typography>
                      <span>{o.orderItemsCount.toLocaleString("fa")} کالا</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 items-center">
                      <span className="inline-flex items-center gap-1">
                        <TagRoundedIcon sx={{ fontSize: 15 }} />
                        شماره پیگیری: {o.trackingCode || "-"}
                      </span>
                      <Tooltip title="مبلغ کل سفارش">
                        <span className="inline-flex items-center mr-auto text-xl font-bold">
                          <PaymentsRoundedIcon />
                          {(o.totalPrice || 0).toLocaleString("fa-IR")} ریال
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty text="سفارش در انتظاری وجود ندارد" />
        )}
      </Paper>
      <Paper
        elevation={0}
        className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/60 p-5 shadow-sm "
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PersonOutlineRoundedIcon color="primary" />
            <Typography variant="h6" fontWeight={800}>
              کاربران تایید نشده
            </Typography>
          </div>
          <Chip
            size="small"
            label={`${data.pendingUsers.length ?? 0} نفر`}
            color="primary"
            variant="outlined"
          />
        </div>
        {data.pendingUsers.length > 0 ? (
          <div className="flex flex-col gap-2">
            {data.pendingUsers.map((u) => (
              <div
                key={u.id}
                className="group flex items-center gap-3 rounded-2xl border border-blue-100 bg-white/80 px-4 py-3 "
              >
                <div className="rounded-xl bg-blue-100 p-2 text-blue-600 ">
                  <PersonOutlineRoundedIcon fontSize="small" />
                </div>
                <div>
                  <Typography fontWeight={700}>
                    {u.firstName} {u.lastName}
                  </Typography>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500">
                    <PhoneRoundedIcon sx={{ fontSize: 15 }} />
                    {u.phone || "شماره ثبت نشده"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty text="کاربر جدیدی امروز ثبت‌نام نکرده است" />
        )}
      </Paper>
    </div>
  );
}
