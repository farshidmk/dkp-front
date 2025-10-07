"use client";
import { usePathname } from "next/navigation";
import { Box, Typography } from "@mui/material";
import React from "react";
import { ADMIN_MENU, USER_MENU } from "@/layout/MENU";

const PageName = () => {
  const APP_ROUTES = [...ADMIN_MENU, ...USER_MENU];
  const pathname = usePathname();

  // Find the route object matching current path
  const currentRoute = APP_ROUTES.find((route) => route.path === pathname);

  if (!currentRoute) return null; // No match

  return (
    <Box
      className="flex items-center gap-2 px-2 py-1 shadow w-fit rounded-3xl border bg-white"
      sx={{
        borderColor: (t) => t.palette.primary.dark,
        color: (t) => t.palette.primary.dark,
      }}
    >
      {currentRoute.icon}
      <Typography variant="h6">{currentRoute.title}</Typography>
    </Box>
  );
};
export default PageName;
