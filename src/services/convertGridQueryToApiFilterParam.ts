import { DataGridQuery } from "@/hooks/useDataGridQuery";

const convertGridQueryToApiFilterParam = (query: DataGridQuery) => {
  const pageNumber = query.page;
  const pageSize = query.pageSize;

  return `pageNumber=${pageNumber}&pageSize=${pageSize}`;
};

export default convertGridQueryToApiFilterParam;
