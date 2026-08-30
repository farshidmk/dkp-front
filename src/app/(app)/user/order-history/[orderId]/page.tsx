"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { Container, Paper, Button, Typography } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import StatusHandler from "@/components/statusHandler/StatusHandler";
import InvoiceContent from "@/components/invoice/InvoiceContent";
import { OrderGridData } from "@/types/order";

type Props = { params: Promise<{ orderId: string }> };

const InvoicePage = ({ params }: Props) => {
  const { orderId } = use(params);
  const { data, status, error, refetch } = useQuery<OrderGridData>({
    queryKey: ["orders", orderId],
  });

  return (
    <Container maxWidth="lg" className="py-4">
      <div className="flex items-center justify-between mb-3 print:hidden">
        <Link href="/user/order-history">
          <Button startIcon={<ArrowBackIcon />}>بازگشت</Button>
        </Link>
        <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => window.print()}>
          چاپ فاکتور
        </Button>
      </div>

      <Paper className="p-4">
        <Typography variant="h5" className="mb-2">
          فاکتور {data ? `#${data.id}` : ""}
        </Typography>
        <StatusHandler status={status} error={error} refetch={refetch} skeletonHeight={400}>
          {data && <InvoiceContent order={data} />}
        </StatusHandler>
      </Paper>
    </Container>
  );
};

export default InvoicePage;