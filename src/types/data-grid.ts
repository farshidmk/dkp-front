// types/data-grid.ts

import { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid";

export interface DataGridQuery {
  page: number;
  pageSize: number;

  sortField?: string | null;
  sortDirection?: "asc" | "desc" | null;
}

export interface DataGridResult<T> {
  items: T[];
  total: number;
}

export interface DataGridState {
  paginationModel: GridPaginationModel;
  sortModel: GridSortModel;
}

export type AppGridColDef<T> = Omit<GridColDef, "field"> & {
  field: keyof T | "action" | "custom";
};
