"use client";

import { CircularProgress, Grid, Skeleton } from "@mui/material";

const OrderItemSkeleton = () => {
  return (
    <Grid container spacing={1} alignItems="center">
      <Grid size={{ xs: 12, md: 1 }}>
        <div className="w-full flex items-center justify-center border border-gray-300 bg-gray-100 rounded-b-lg">
          <div className="flex items-center justify-center h-28 w-28">
            <CircularProgress size={80} />
          </div>
        </div>
      </Grid>

      <Grid size={{ xs: 12, md: 11 }} container spacing={1}>
        <Grid size={{ xs: 12 }}>
          <Skeleton variant="rounded" height={56} />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <Skeleton variant="rounded" height={56} />
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Skeleton variant="rounded" height={56} />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Skeleton variant="rounded" height={56} />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Skeleton variant="rounded" height={56} />
        </Grid>
        <Grid size={{ xs: 12, md: 1 }}>
          <Skeleton variant="rounded" height={56} />
        </Grid>
        <Grid size={{ xs: 12, md: 1 }}>
          <Skeleton variant="rounded" height={56} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrderItemSkeleton;
