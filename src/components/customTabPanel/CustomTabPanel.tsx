import { Box } from "@mui/material";
import React from "react";

interface TabPanelProps<T> {
  children?: React.ReactNode;
  activeTab: T;
  value: T;
}

function CustomTabPanel<T>(props: TabPanelProps<T>) {
  const { children, value, activeTab } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== activeTab}
      id={`simple-tabpanel-${activeTab}`}
      aria-labelledby={`simple-tab-${activeTab}`}
    >
      {value === activeTab && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

export default CustomTabPanel;
