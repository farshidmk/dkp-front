import React from "react";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import HistoryIcon from "@mui/icons-material/History";
import GroupIcon from "@mui/icons-material/Group";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PriceChangeIcon from "@mui/icons-material/PriceChange";

type MenuType = {
  title: string;
  icon: React.ReactNode;
  path: string;
};
export const USER_MENU: MenuType[] = [
  { title: "سفارش", icon: <ReceiptLongIcon />, path: "/user/order" },
  { title: "تاریخجه سفارشات", icon: <HistoryIcon />, path: "/user/history" },
  {
    title: "کیف پول",
    icon: <AccountBalanceWalletIcon />,
    path: "/user/wallet",
  },
  { title: "پروفایل", icon: <AccountCircleIcon />, path: "/user/profile" },
];

export const ADMIN_MENU: MenuType[] = [
  { title: "کاربران", icon: <GroupIcon />, path: "/admin/users" },
  {
    title: "تراکنش ها",
    icon: <PriceChangeIcon />,
    path: "/admin/transactions",
  },
];
