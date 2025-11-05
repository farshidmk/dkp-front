import { SIGN_UP_FORM_ITEMS } from "@/app/auth/sign-up/page";
import { UserInfo } from "@/types/user";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState } from "react";

type Props = {
  user: UserInfo["profile"];
};

const ViewUserProfileButton = ({ user }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Tooltip title="نمایش مشخصات کاربر">
        <IconButton onClick={() => setOpenModal(true)}>
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        onClose={() => setOpenModal(false)}
        open={openModal}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          مشخصات کاربر
          <IconButton onClick={() => setOpenModal(false)} color="warning">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={1} sx={{ mb: 1 }}>
            {SIGN_UP_FORM_ITEMS.filter((item) => item.name !== "password").map(
              (item) => {
                return (
                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                    }}
                    key={item.name}
                  >
                    <TextField
                      label={item.label}
                      defaultValue={user[item.name]}
                      fullWidth
                      size="small"
                      disabled
                    />
                  </Grid>
                );
              }
            )}
          </Grid>
        </Box>
      </Dialog>
    </>
  );
};

export default ViewUserProfileButton;
