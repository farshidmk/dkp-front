"use client";

import PageName from "@/components/pageName/PageName";
import DrawerMenu from "@/layout/DrawerMenu";
import UserNavbarButton from "@/layout/UserNavbarButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};
const MainAppLayout = ({ children }: Props) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden">
      <AppBar position="static" className="flex-shrink-0" variant="elevation">
        <Toolbar className="flex w-full justify-between items-center ">
          <div className="flex gap-1">
            <UserNavbarButton />
            <Divider orientation="vertical" flexItem variant="middle" />

            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                bgcolor: (t) => t.palette.common.white,
                borderRadius: 4,
                px: 0.5,
                py: 0.2,
              }}
            >
              <Typography variant="caption" color="success" fontWeight={500}>
                <span className="text-black"> کیف پول: </span>
                {(1345345).toLocaleString("fa")} ريال
              </Typography>

              <IconButton
                color="success"
                sx={{
                  ":hover": {
                    scale: "1.2",
                  },
                  transition: "all linear 0.15s",
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Box>
          </div>
          <div className="flex-1" />
          <Image
            alt="دیجی تعمیر"
            src={"/assets/images/mainlogo.png"}
            width={130}
            height={60}
          />
          <div className="flex-1" />
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpenMenu(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DrawerMenu open={openMenu} setOpen={setOpenMenu} />

      <main className="flex-1 overflow-auto bg-gradient-to-r from-blue-200 to-blue-50 flex flex-col p-2">
        <PageName />
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
};

export default MainAppLayout;
