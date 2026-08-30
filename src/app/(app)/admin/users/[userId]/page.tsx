"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { Container, Grid, Paper, Typography, Chip } from "@mui/material";
import StatusHandler from "@/components/statusHandler/StatusHandler";
import WalletBalanceCard from "@/app/(app)/user/wallet/_components/WalletBalanceCard";
import { SIGN_UP_FORM_ITEMS } from "@/app/auth/sign-up/page";
import { orderStatusConfig } from "@/shared/orderStatusStyle";
import { OrderStatus } from "@/types/order";
import { UserDetailResponse } from "../users.type";
import ResetPasswordButton from "./_components/ResetPasswordButton";

type Props = { params: Promise<{ userId: string }> };

const UserDetailPage = ({ params }: Props) => {
  const { userId } = use(params);
  const { data, status, refetch } = useQuery<UserDetailResponse>({
    queryKey: ["users", userId],
  });

  return (
    <Container maxWidth="lg" className="py-4">
      <StatusHandler status={status} refetch={refetch} skeletonHeight={400}>
        {data && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <WalletBalanceCard balance={data.balance} />
              <div className="mt-3">
                <ResetPasswordButton userId={data.user.id} />
              </div>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <Paper className="p-4">
                <Typography variant="h6" className="mb-3">مشخصات کاربر</Typography>
                <Grid container spacing={1}>
                  {SIGN_UP_FORM_ITEMS.filter((i) => i.name !== "password").map((item) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={item.name}>
                      <Typography variant="caption" color="text.secondary">{item.label}</Typography>
                      <Typography>{data.user.profile[item.name]}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Paper className="p-4">
                <Typography variant="h6" className="mb-3">تاریخچه سفارشات</Typography>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-right">
                      <th className="p-2">کد پیگیری</th>
                      <th className="p-2">وضعیت</th>
                      <th className="p-2">مبلغ کل</th>
                      <th className="p-2">تاریخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.orders.items.map((o) => {
                      const s = orderStatusConfig[o.status as OrderStatus];
                      return (
                        <tr key={o.id} className="border-t">
                          <td className="p-2">{o.tracking_code}</td>
                          <td className="p-2"><Chip label={s.label} color={s.color} size="small" /></td>
                          <td className="p-2">{Number(o.total_price).toLocaleString("fa")} ریال</td>
                          <td className="p-2">{new Date(o.created_at).toLocaleString("fa")}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Paper>
            </Grid>
          </Grid>
        )}
      </StatusHandler>
    </Container>
  );
};

export default UserDetailPage;