"use client";

import { useUserInfo } from "@/hooks/useUserInfo";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, Popover } from "@mui/material";
import Link from "next/link";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const UserNavbarButton = () => {
  const route = useRouter();
  const { firstName, lastName } = useUserInfo();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button color="inherit" startIcon={<PersonIcon />} onClick={handleClick}>
        {`${firstName} ${lastName}`}
      </Button>

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
          component="div"
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
          <Link href="/user/profile" className="w-full">
            <Button
              endIcon={<AccountCircleIcon />}
              color="primary"
              variant="text"
              fullWidth
              sx={{ justifyContent: "space-between" }}
            >
              پروفایل
            </Button>
          </Link>

          <Link href="/user/wallet" className="w-full">
            <Button
              endIcon={<AccountBalanceWalletIcon />}
              color="info"
              variant="text"
              fullWidth
              sx={{ justifyContent: "space-between" }}
            >
              کیف پول
            </Button>
          </Link>

          <Button
            endIcon={<LogoutIcon />}
            color="error"
            variant="text"
            fullWidth
            sx={{ justifyContent: "space-between" }}
            onClick={() => {
              Cookies.remove("token", { path: "/" });
              Cookies.remove("userInfo", { path: "/" });
              route.push("/auth/login");
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
