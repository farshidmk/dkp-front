"use client";
import StatusHandler from "@/components/statusHandler/StatusHandler";
import { Warranty } from "@/types/warranty";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import WarrantyCard from "./_components/WarrantyCard";
import AddNewWarranty from "./_components/AddNewWarranty";
import WarrantyGrid from "./_components/WarrantyGrid";

const WarrantiesPage = () => {
  const { data, status, refetch } = useQuery<Warranty[], Error, Warranty[]>({
    queryKey: ["warranties"],
  });
  return (
    <div className="flex flex-col gap-4 p-4">
      <StatusHandler status={status} refetch={refetch} skeletonHeight={500}>
        {/* {data && data?.length > 0 ? (
          <div className="flex flex-col gap-1">
            {data.map((warranty) => (
              <WarrantyCard key={warranty.id} warrantyInfo={warranty} />
            ))}
          </div>
        ) : (
          <Typography
            variant="body1"
            fontWeight={600}
            textAlign={"center"}
            color="textDisabled"
          >
            گارانتی تعریف نشده
          </Typography>
        )} */}
        <WarrantyGrid warranties={data!} />
      </StatusHandler>

      <AddNewWarranty />
    </div>
  );
};

export default WarrantiesPage;
