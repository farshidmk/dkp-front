import { ServerCall } from "@/types/server";
import { User } from "@/types/user";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { toast } from "react-toastify";

type Props = {
  userId: User["id"];
  isApproved: boolean;
};

const ApproveButton = ({ userId, isApproved }: Props) => {
  const { mutate, isPending } = useMutation<boolean, Error, ServerCall>({});
  const queryClient = useQueryClient();

  function onUpdate() {
    const type = isApproved ? "reject" : "approve";
    mutate(
      {
        url: `users/${type}/${userId}`,
        method: "PATCH",
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries({ queryKey: ["users"] });
        },
        onError: () => {
          toast.error("خطا در عملیات");
        },
      }
    );
  }
  return (
    <Tooltip title={isApproved ? "عدم تایید" : "تایید"}>
      <IconButton
        color={isApproved ? "error" : "success"}
        onClick={() => onUpdate()}
      >
        {isPending ? (
          <CircularProgress size={16} />
        ) : isApproved ? (
          <PersonRemoveIcon />
        ) : (
          <PersonAddIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ApproveButton;
