import { AxiosRequestConfig, Method } from "axios";

export type ServerCall<T = unknown> = Omit<AxiosRequestConfig<T>, "method"> & {
  method: Method;
};

export type PaginatedServerResponse<T> = {
  items: T[];
  pageNumber: number;
  pageSize: number;
  total: number;
  totalPages: number;
};
