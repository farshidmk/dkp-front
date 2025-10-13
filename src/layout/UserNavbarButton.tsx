"use client";

import { useUserInfo } from "@/hooks/useUserInfo";
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Popover,
  Typography,
} from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { WalletBalance } from "@/types/wallet";
import RefreshIcon from "@mui/icons-material/Refresh";

const UserNavbarButton = () => {
  const router = useRouter();
  const { firstName, lastName } = useUserInfo();
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const { data, status, refetch } = useQuery<
    WalletBalance,
    Error,
    WalletBalance
  >({
    queryKey: ["wallets", "me"],
    staleTime: Infinity,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    handleClose();
    router.push(path);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div
        className="flex items-center gap-2 border py-1 px-2 rounded-lg hover:bg-black/10 cursor-pointer transition-colors  bg-white/10  min-w-32"
        onClick={(e) => handleClick(e)}
      >
        <AccountCircleIcon />

        <div className="flex flex-col gap-0 ">
          <Typography
            variant="body1"
            fontSize={12}
          >{`${firstName} ${lastName}`}</Typography>
          {status === "pending" ? (
            <LinearProgress />
          ) : status === "error" ? (
            <IconButton onClick={() => refetch()} color="error">
              <RefreshIcon />
            </IconButton>
          ) : (
            <Typography variant="body2" fontSize={10} fontWeight={500}>
              موجودی{`: ${Number(data.balance).toLocaleString("fa")} ريال`}
            </Typography>
          )}
        </div>
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            width: "100px",
            alignItems: "center",
            justifyContent: "center",
            p: 0.5,
          }}
        >
          <Button
            endIcon={<AccountCircleIcon />}
            color="primary"
            variant="text"
            fullWidth
            sx={{ justifyContent: "space-between" }}
            onClick={() => handleNavigate("/user/profile")}
          >
            پروفایل
          </Button>

          <Button
            endIcon={<AccountBalanceWalletIcon />}
            color="info"
            variant="text"
            fullWidth
            sx={{ justifyContent: "space-between" }}
            onClick={() => handleNavigate("/user/wallet")}
          >
            کیف پول
          </Button>

          <Button
            endIcon={<LogoutIcon />}
            color="error"
            variant="text"
            fullWidth
            sx={{ justifyContent: "space-between" }}
            onClick={() => {
              Cookies.remove("token", { path: "/" });
              Cookies.remove("userInfo", { path: "/" });
              handleClose();
              router.push("/auth/login");
            }}
          >
            خروج
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default UserNavbarButton;
