import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import WarningIcon from "@mui/icons-material/Warning";
import {
  alpha,
  Box,
  Button,
  Container,
  Paper,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Control, Controller } from "react-hook-form";

interface Props {
  control: Control<any>;

  walletBalance: number;

  totalPrice: number;
}

export default function PaymentMethod({
  control,
  walletBalance,
  totalPrice,
}: Props) {
  const enoughBalance = walletBalance >= totalPrice;

  return (
    <Container maxWidth="md">
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 3,
          border: "1px solid",
          borderColor: enoughBalance ? "success.light" : "warning.light",
          bgcolor: enoughBalance ? "success.50" : "warning.50",
        }}
      >
        <div className="w-full flex items-center justify-between mb-1">
          <Typography variant="h6" fontSize={18} fontWeight={600}>
            روش پرداخت
          </Typography>
          <Typography fontWeight={500} variant="body1">
            هزینه کل
            {` ${totalPrice.toLocaleString("fa")} `}
            ریال
          </Typography>
        </div>
        <Controller
          control={control}
          name="paymentMethod"
          defaultValue="wallet"
          render={({ field }) => (
            <Stack spacing={1.5}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  background: (t) => alpha(t.palette.divider, 0.5),
                  p: 0.5,
                  borderRadius: 2,
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <AccountBalanceWalletRoundedIcon color="primary" />

                  <Box>
                    <Typography fontWeight={700} fontSize={15}>
                      کیف پول
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      موجودی: {walletBalance.toLocaleString("fa-IR")} ریال
                    </Typography>
                  </Box>
                </Stack>

                <Radio
                  checked={field.value === "wallet"}
                  onChange={() => field.onChange("wallet")}
                />
              </Stack>

              {!enoughBalance && (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="caption" color="warning.main">
                    <WarningIcon sx={{ mx: 1 }} />
                    موجودی کیف پول کافی نیست.
                  </Typography>

                  <Link href={"/user/wallet"}>
                    <Button
                      size="small"
                      variant="contained"
                      // onClick={onChargeWallet}
                      sx={{
                        borderRadius: 2,
                        minWidth: 100,
                      }}
                    >
                      شارژ کیف پول
                    </Button>
                  </Link>
                </Stack>
              )}
            </Stack>
          )}
        />
      </Paper>
    </Container>
  );
}
