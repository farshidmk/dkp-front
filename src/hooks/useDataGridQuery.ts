"use client";

import { useMemo, useState } from "react";
import { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";

export const useDataGridQuery = (initialPageSize = 10) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: initialPageSize,
  });

  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  const query = useMemo((): DataGridQuery => {
    const sort = sortModel[0];

    return {
      pageNumber: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
      sortField: sort?.field,
      sortDirection: sort?.sort || undefined,
    };
  }, [paginationModel, sortModel]);

  return {
    query,

    paginationModel,
    setPaginationModel,

    sortModel,
    setSortModel,
  };
};

export type DataGridQuery = {
  pageNumber: number;
  pageSize: number;
  sortField?: string;
  sortDirection?: string;
};
