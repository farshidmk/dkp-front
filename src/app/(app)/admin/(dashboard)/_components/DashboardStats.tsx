import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import { Paper, Typography } from "@mui/material";
import { AdminDashboardResponse } from "@/types/dashabord";
const money = (v: number) => `${(v || 0).toLocaleString("fa-IR")} ریال`;
export default function DashboardStats({
  data,
}: {
  data: AdminDashboardResponse;
}) {
  const cards = [
    [
      "کاربران جدید امروز",
      (data.registeredUsersToday ?? 0).toLocaleString("fa-IR"),
      <TodayRoundedIcon key="TodayRoundedIcon" />,
      "#2563eb",
    ],
    [
      "سفارش‌های در انتظار",
      (data.pendingOrders?.length ?? 0).toLocaleString("fa-IR"),
      <ShoppingCartCheckoutRoundedIcon key="ShoppingCartCheckoutRoundedIcon" />,
      "#ea580c",
    ],
    [
      "تراکنش تاییدشده امروز",
      money(data.confirmedTransactionsAmountToday),
      <AccountBalanceWalletRoundedIcon key="AccountBalanceWalletRoundedIcon" />,
      "#059669",
    ],
    [
      "کل تراکنش‌های این ماه",
      money(data.totalTransactionAmountThisMonth),
      <GroupRoundedIcon key="GroupRoundedIcon" />,
      "#7c3aed",
    ],
  ] as const;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(([title, value, icon, color]) => (
        <Paper
          key={title}
          elevation={0}
          className="rounded-3xl border border-slate-100 p-5 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div
              className="rounded-2xl p-3 text-white"
              style={{ backgroundColor: color }}
            >
              {icon}
            </div>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              {title}
            </Typography>
          </div>
          <Typography
            variant="h5"
            fontWeight={800}
            className="mt-5 text-center"
          >
            {value}
          </Typography>
        </Paper>
      ))}
    </div>
  );
}
