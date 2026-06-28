"use client";
import AddNewWarranty from "./_components/AddNewWarranty";
import WarrantyGrid from "./_components/WarrantyGrid";

const WarrantiesPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <AddNewWarranty />
      <WarrantyGrid />
    </div>
  );
};

export default WarrantiesPage;
