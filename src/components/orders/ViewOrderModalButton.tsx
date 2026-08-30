import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { OrderGridData } from "@/types/order";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InvoiceContent from "@/components/invoice/InvoiceContent";

type Props = {
  order: OrderGridData;
};

const ViewOrderModalButton = ({ order }: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <IconButton onClick={() => setShowModal(true)}>
        <VisibilityIcon />
      </IconButton>

      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="lg" fullWidth>
        <DialogTitle className="flex items-center justify-between border-b">
          <div>
            <h2 className="text-xl font-bold">فاکتور</h2>
            <p className="text-sm text-gray-500">شماره فاکتور #{order.id}</p>
          </div>
          <IconButton onClick={() => setShowModal(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <InvoiceContent order={order} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewOrderModalButton;