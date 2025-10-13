import {
  Alert,
  alpha,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import ErrorIcon from "@mui/icons-material/Error";

type Props = {
  message?: string;
  handleClose: () => void;
};

const DkpErrorModal = ({ message, handleClose }: Props) => {
  const open = Boolean(message);
  const theme = useTheme();
  const BG_COLOR = alpha(theme.palette.error.main, 0.2);
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ background: BG_COLOR }}>
        <Typography variant="h5" fontWeight={500}>
          خطا در دریافت اطلاعات کالا
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ background: BG_COLOR, p: 2 }}>
        <div className="flex flex-col gap-1  justify-center items-center">
          <ErrorIcon
            fontSize="large"
            color="error"
            sx={{ transform: "scale(2)", my: 2 }}
          />
          <Typography
            variant="body1"
            fontWeight={500}
            sx={{ my: 2 }}
            color="error"
          >
            {message}
          </Typography>

          <Button
            variant="outlined"
            color="warning"
            onClick={handleClose}
            sx={{ width: "150px" }}
          >
            خروج
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DkpErrorModal;
