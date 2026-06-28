"use client";

import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridPaginationModel,
  GridSortModel,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { persianGridLocaleText } from "./persianLocalaizedGridText";

interface Props<T extends GridValidRowModel> {
  rows: T[];
  columns: GridColDef<T>[];

  localized?: boolean;
  loading?: boolean;
  totalRows?: number;

  paginationModel?: GridPaginationModel;
  onPaginationModelChange?: (model: GridPaginationModel) => void;

  sortModel?: GridSortModel;
  onSortModelChange?: (model: GridSortModel) => void;

  gridProps?: Partial<DataGridProps>;
}

export function AppDataGrid<T extends GridValidRowModel>({
  rows,
  columns,
  loading,
  totalRows,
  localized = true,
  paginationModel,
  onPaginationModelChange,

  sortModel,
  onSortModelChange,

  gridProps,
}: Props<T>) {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        minHeight: 0,
        width: "100%",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pagination
        paginationMode="server"
        sortingMode="server"
        disableRowSelectionOnClick
        rowCount={totalRows ?? 0}
        pageSizeOptions={[10, 25, 50, 100]}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        localeText={localized ? persianGridLocaleText : undefined}
        disableColumnMenu
        sx={{
          flex: 1,
          minHeight: 0,
          border: 0,
        }}
        {...gridProps}
      />
    </div>
  );
}
