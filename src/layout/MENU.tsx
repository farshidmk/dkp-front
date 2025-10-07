import React from "react";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import HistoryIcon from "@mui/icons-material/History";
import GroupIcon from "@mui/icons-material/Group";

type MenuType = {
  title: string;
  icon: React.ReactNode;
  path: string;
};
export const USER_MENU: MenuType[] = [
  { title: "سفارش", icon: <ReceiptLongIcon />, path: "/user/order" },
  { title: "تاریخجه سفارشات", icon: <HistoryIcon />, path: "/user/history" },
];

export const ADMIN_MENU: MenuType[] = [
  { title: "کاربران", icon: <GroupIcon />, path: "/admin/users" },
];
