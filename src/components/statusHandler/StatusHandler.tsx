import { QueryStatus } from "@tanstack/react-query";
import React from "react";
import ErrorHandler from "../errors/ErrorHandler";
import { Skeleton } from "@mui/material";

type Props = {
  children: React.ReactNode;
  status: QueryStatus;
  error?: unknown;
  refetch?: () => void;
  skeletonHeight?: number;
};

function isForbidden(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    (error as { statusCode?: number }).statusCode === 403
  );
}

const StatusHandler = ({
  status,
  error,
  refetch,
  children,
  skeletonHeight = 100,
}: Props) => {
  return (
    <>
      {status === "pending" ? (
        <Skeleton height={skeletonHeight} />
      ) : status === "error" ? (
        isForbidden(error) ? (
          <ErrorHandler
            onRefetch={() => (window.location.href = "/user")}
            errorText="شما دسترسی لازم برای این بخش را ندارید"
          />
        ) : (
          <ErrorHandler onRefetch={refetch!} />
        )
      ) : (
        children
      )}
    </>
  );
};

export default StatusHandler;