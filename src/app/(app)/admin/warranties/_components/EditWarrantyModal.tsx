import { Warranty } from "@/types/warranty";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";
import WarrantyForm from "./WarrantyForm";

type Props = {
  warranty: Warranty;
  open: boolean;
  handleClose: () => void;
};

const EditWarrantyModal = ({ open, handleClose, warranty }: Props) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>
        <Typography variant="h5" fontWeight={500}>
          ویرایش گارانتی
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        <div className="flex flex-col gap-1  justify-center items-center p-4">
          <WarrantyForm warranty={warranty} onSuccess={() => handleClose()} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditWarrantyModal;
