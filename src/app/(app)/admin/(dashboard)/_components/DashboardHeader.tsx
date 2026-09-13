"use client";
import { useUserInfo } from "@/hooks/useUserInfo";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
export default function DashboardHeader({
  isFetching,
  onRefresh,
}: {
  isFetching?: boolean;
  onRefresh?: () => void;
}) {
  const { firstName } = useUserInfo();
  return (
    <div className="flex items-center justify-between rounded-3xl bg-white/80 px-5 py-4 shadow-sm">
      <div>
        <Typography variant="h5" fontWeight={800}>
          سلام، {firstName} 👋
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mt-1">
          نمای کلی عملکرد سامانه و فعالیت‌های اخیر
        </Typography>
      </div>
      <Tooltip title="به‌روزرسانی اطلاعات">
        <IconButton aria-label="به‌روزرسانی اطلاعات" onClick={onRefresh}>
          {isFetching ? <CircularProgress size={22} /> : <RefreshRoundedIcon />}
        </IconButton>
      </Tooltip>
    </div>
  );
}
