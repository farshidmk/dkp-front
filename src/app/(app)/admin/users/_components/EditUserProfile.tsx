import { User } from "@/types/user";
import { Box, Dialog, DialogTitle } from "@mui/material";
import React from "react";

type Props = {
  handleClose: () => void;
  userId: undefined | User["id"];
};

const EditUserProfile = ({ userId, handleClose }: Props) => {
  const open = Boolean(userId);
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>ویرایش کاربر</DialogTitle>
      <Box sx={{ p: 2 }}>TODO: show update user form</Box>
    </Dialog>
  );
};

export default EditUserProfile;
