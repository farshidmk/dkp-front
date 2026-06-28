import { AppDataGrid } from "@/components/dataGrid/AppDataGrid";
import { Warranty } from "@/types/warranty";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import EditWarrantyModal from "./EditWarrantyModal";

const WarrantyGrid = () => {
  const [selectedWarranty, setSelectedWarranty] = useState<
    Warranty | undefined
  >(undefined);
  const { data: warranties, isFetching } = useQuery<
    Warranty[],
    Error,
    Warranty[]
  >({
    queryKey: ["warranties"],
  });

  const columns: GridColDef<Warranty>[] = [
    {
      field: "min_price",
      headerName: "حداقل مبلغ (ريال)",
      ...DEFAULT_GRID_OPTIONS,
      renderCell: ({ row }) => (
        <div className="flex items-center h-full">
          <Typography variant="body1">
            {row.min_price.toLocaleString("fa")}
          </Typography>
        </div>
      ),
    },
    {
      field: "max_price",
      headerName: "حداکثر مبلغ (ريال)",

      renderCell: ({ row }) => (
        <div className="flex items-center h-full">
          <Typography variant="body1">
            {row.max_price.toLocaleString("fa")}
          </Typography>
        </div>
      ),
      ...DEFAULT_GRID_OPTIONS,
    },
    {
      field: "is_percentage",
      headerName: "نحوه اعمال",

      renderCell: ({ row }) => (
        <div className="flex items-center h-full">
          <Typography variant="body2" fontWeight={500}>
            {row.is_percentage ? "درصدی" : " غیر درصدی"}
          </Typography>
        </div>
      ),
      ...DEFAULT_GRID_OPTIONS,
    },
    {
      field: "warranty_price",
      headerName: "مبلغ/درصد ",
      ...DEFAULT_GRID_OPTIONS,
      renderCell: ({ row }) => (
        <div className="flex items-center gap-1 h-full">
          <Typography variant="body1">
            {row.warranty_price.toLocaleString("fa")}
          </Typography>
          <Typography variant="body2">
            {row.is_percentage ? "%" : " ريال "}
          </Typography>
        </div>
      ),
    },

    {
      field: "actions",
      headerName: "عملیات",
      type: "actions",
      ...DEFAULT_GRID_OPTIONS,
      renderCell: (params) => {
        const warranty = params.row as Warranty;
        return (
          <div className="flex items-center justify-center gap-1.5">
            <IconButton
              color="primary"
              onClick={() => setSelectedWarranty(warranty)}
            >
              <EditIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {selectedWarranty && (
        <EditWarrantyModal
          open={Boolean(selectedWarranty)}
          warranty={selectedWarranty}
          handleClose={() => setSelectedWarranty(undefined)}
        />
      )}
      <AppDataGrid
        rows={warranties || []}
        columns={columns}
        loading={isFetching}
        gridProps={{
          getRowId: (row: Warranty) => row.id!,
          paginationMode: "client",
        }}
      />
    </>
  );
};

export default WarrantyGrid;

const DEFAULT_GRID_OPTIONS: Partial<GridColDef> = {
  sortable: false,
  filterable: false,
  disableColumnMenu: true,
  resizable: false,
  flex: 1,
  editable: true,
};
