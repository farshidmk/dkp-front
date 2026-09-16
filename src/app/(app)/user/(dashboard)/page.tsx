"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import useGetWallet from "@/hooks/useGetWallet";
import { useUserInfo } from "@/hooks/useUserInfo";
import { USER_MENU } from "@/layout/MENU";
import { OrderGridData, OrderStatus } from "@/types/order";
import { PaginatedServerResponse } from "@/types/server";

const menuDetails: Record<
  string,
  { description: string; color: string; background: string }
> = {
  "/user/order": {
    description: "سفارش جدید خود را ثبت کنید",
    color: "#4f46b8",
    background: "#eeedff",
  },
  "/user/order-history": {
    description: "جزئیات و وضعیت سفارش‌ها را ببینید",
    color: "#b45309",
    background: "#fff4df",
  },
  "/user/wallet": {
    description: "موجودی و تراکنش‌های خود را مدیریت کنید",
    color: "#087f70",
    background: "#e3f6f0",
  },
  "/user/profile": {
    description: "اطلاعات حساب و رمز عبور را تغییر دهید",
    color: "#2563a6",
    background: "#eaf3ff",
  },
};

const UserDashboardPage = () => {
  const { firstName } = useUserInfo();
  const orders = useQuery<
    PaginatedServerResponse<OrderGridData>,
    Error,
    number
  >({
    queryKey: [
      "orders",
      "history",
      `?status=${OrderStatus.PAID}&take=1&skip=0`,
    ],
    select: (response) => response.total,
  });
  const wallet = useGetWallet();

  return (
    <Container maxWidth="lg" dir="rtl">
      <Box className="flex flex-col gap-6">
        <Box className="flex items-center justify-between gap-3">
          <Box>
            <Typography component="h1" variant="h5" fontWeight={800}>
              سلام، {firstName || "دوست عزیز"} 👋
            </Typography>
          </Box>
        </Box>

        <Box
          component="section"
          aria-labelledby="dashboard-welcome"
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 5,
            color: "white",
            background:
              "radial-gradient(circle at 10% 10%, #8185e5 0%, transparent 45%), linear-gradient(120deg, #535ab5, #30376d)",
            boxShadow: "0 16px 40px #424a9c20",
          }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center"
        >
          <Box>
            <Typography variant="overline" sx={{ color: "#e0e2ff" }}>
              پنل کاربری
            </Typography>
            <Typography
              id="dashboard-welcome"
              component="h2"
              variant="h5"
              fontWeight={800}
              sx={{ mt: 1 }}
            >
              سفارش بعدی شما، از همین‌جا
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 1.5, color: "#e0e2ff", lineHeight: 2 }}
            >
              سفارش ثبت کنید، روند آن را دنبال کنید و کیف پولتان را مدیریت کنید.
            </Typography>
          </Box>
          <Button
            component={Link}
            href="/user/order"
            variant="contained"
            startIcon={<AddRoundedIcon />}
            disableElevation
            sx={{
              bgcolor: "white",
              color: "#373e82",
              borderRadius: 3,
              px: 3,
              py: 1.5,
              whiteSpace: "nowrap",
              fontWeight: 700,
              "&:hover": { bgcolor: "#eeedff" },
            }}
          >
            ثبت سفارش جدید
          </Button>
        </Box>

        <Box className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Box
            component="section"
            aria-labelledby="pending-orders-title"
            className="flex flex-col rounded-3xl border border-amber-100 bg-white p-6 shadow-sm"
          >
            <Box className="mb-4 flex items-center gap-3">
              <Box className="flex rounded-2xl bg-amber-50 p-3 text-amber-700">
                <PendingActionsRoundedIcon />
              </Box>
              <Typography
                id="pending-orders-title"
                component="h2"
                fontWeight={700}
              >
                سفارش‌های در انتظار تأیید
              </Typography>
            </Box>
            <Box
              aria-live="polite"
              aria-busy={orders.isFetching}
              className="flex-1"
            >
              {orders.isPending ? (
                <Skeleton
                  aria-label="در حال دریافت تعداد سفارش‌ها"
                  width={100}
                  height={64}
                />
              ) : orders.isError ? (
                <Alert
                  severity="error"
                  sx={{ borderRadius: 2 }}
                  action={
                    <Button
                      color="inherit"
                      size="small"
                      disabled={orders.isFetching}
                      onClick={() => void orders.refetch()}
                    >
                      تلاش مجدد
                    </Button>
                  }
                >
                  دریافت تعداد سفارش‌ها ناموفق بود.
                </Alert>
              ) : (
                <>
                  <Typography
                    component="p"
                    variant="h3"
                    fontWeight={800}
                    color="#9a580c"
                  >
                    {orders.data.toLocaleString("fa-IR")}
                    <Typography component="span" variant="body2" sx={{ mr: 1 }}>
                      سفارش
                    </Typography>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {orders.data === 0
                      ? "در حال حاضر سفارشی در انتظار تأیید ندارید."
                      : "سفارش‌های شما در انتظار بررسی و تأیید هستند."}
                  </Typography>
                </>
              )}
            </Box>
            <Button
              component={Link}
              href="/user/order-history"
              endIcon={<ArrowBackRoundedIcon />}
              sx={{ alignSelf: "flex-start", mt: 2, color: "#9a580c" }}
            >
              پیگیری سفارش‌ها
            </Button>
          </Box>

          <Box
            component="section"
            aria-labelledby="wallet-title"
            className="flex flex-col rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm"
          >
            <Box className="mb-4 flex items-center gap-3">
              <Box className="flex rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                <AccountBalanceWalletRoundedIcon />
              </Box>
              <Typography id="wallet-title" component="h2" fontWeight={700}>
                موجودی کیف پول
              </Typography>
            </Box>
            <Box
              aria-live="polite"
              aria-busy={wallet.isFetching}
              className="flex-1"
            >
              {wallet.isPending ? (
                <Skeleton
                  aria-label="در حال دریافت موجودی"
                  width={180}
                  height={64}
                />
              ) : wallet.isError ? (
                <Alert
                  severity="error"
                  sx={{ borderRadius: 2 }}
                  action={
                    <Button
                      color="inherit"
                      size="small"
                      disabled={wallet.isFetching}
                      onClick={() => void wallet.refetch()}
                    >
                      تلاش مجدد
                    </Button>
                  }
                >
                  دریافت موجودی ناموفق بود.
                </Alert>
              ) : (
                <>
                  <Typography
                    component="p"
                    variant="h3"
                    fontWeight={800}
                    color="#087f70"
                    sx={{
                      overflowWrap: "anywhere",
                      fontSize: { xs: "2rem", sm: "3rem" },
                    }}
                  >
                    {Number(wallet.data.balance).toLocaleString("fa-IR")}
                    <Typography component="span" variant="body2" sx={{ mr: 1 }}>
                      ریال
                    </Typography>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    موجودی در دسترس برای پرداخت سفارش‌ها
                  </Typography>
                </>
              )}
            </Box>
            <Button
              component={Link}
              href="/user/wallet"
              endIcon={<ArrowBackRoundedIcon />}
              sx={{ alignSelf: "flex-start", mt: 2, color: "#087f70" }}
            >
              مدیریت و شارژ کیف پول
            </Button>
          </Box>
        </Box>

        <Box component="nav" aria-labelledby="quick-access-title">
          <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {USER_MENU.map((item) => {
              const details = menuDetails[item.path];
              return (
                <Box
                  key={item.path}
                  component={Link}
                  href={item.path}
                  sx={{
                    p: 3,
                    bgcolor: "white",
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    color: "text.primary",
                    textDecoration: "none",
                    transition: "transform 180ms ease, box-shadow 180ms ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 28px #424a9c15",
                      borderColor: details.color,
                    },
                    "&:focus-visible": {
                      outline: `3px solid ${details.color}`,
                      outlineOffset: 3,
                    },
                    "@media (prefers-reduced-motion: reduce)": {
                      transition: "none",
                      "&:hover": { transform: "none" },
                    },
                  }}
                >
                  <Box className="mb-5 flex items-center justify-between">
                    <Box
                      sx={{
                        display: "flex",
                        p: 1.5,
                        borderRadius: 3,
                        bgcolor: details.background,
                        color: details.color,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <ArrowBackRoundedIcon
                      sx={{ fontSize: 20, color: "text.secondary" }}
                    />
                  </Box>
                  <Typography component="h3" fontWeight={800}>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, lineHeight: 1.9 }}
                  >
                    {details.description}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default UserDashboardPage;
