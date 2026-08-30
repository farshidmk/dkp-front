"use client";

import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { ServerCall } from "@/types/server";
import { toast } from "react-toastify";
import KeyIcon from "@mui/icons-material/Key";

type Props = { userId: number };

const ResetPasswordButton = ({ userId }: Props) => {
  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { mutate, isPending } = useMutation<unknown, Error, ServerCall>({});

  function handleSubmit() {
    mutate(
      { url: `users/${userId}/reset-password`, method: "PUT", data: { newPassword } },
      {
        onSuccess: () => {
          toast.success("رمز عبور کاربر تغییر یافت");
          setOpen(false);
          setNewPassword("");
        },
        onError: () => toast.error("خطا در تغییر رمز عبور"),
      }
    );
  }

  return (
    <>
      <Button variant="outlined" color="warning" endIcon={<KeyIcon />} onClick={() => setOpen(true)}>
        تغییر رمز عبور کاربر
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>تغییر رمز عبور کاربر</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="password"
            label="رمز عبور جدید"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>انصراف</Button>
          <Button variant="contained" disabled={isPending || newPassword.length < 6} onClick={handleSubmit}>
            ثبت
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ResetPasswordButton;