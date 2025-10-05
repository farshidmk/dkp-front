"use client";

import { getRequest, mutationRequest } from "@/services/serverCall";
import { CacheProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { ToastContainer } from "react-toastify";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { CssBaseline, ThemeProvider } from "@mui/material";
import useAppTheme from "@/hooks/useAppTheme";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getRequest(),
    },
    mutations: {
      mutationFn: mutationRequest(),
    },
  },
});

const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ApplicationProviders = ({ children }: Props) => {
  const theme = useAppTheme();
  return (
    <CacheProvider value={rtlCache}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
          <ToastContainer />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
};

export default ApplicationProviders;
