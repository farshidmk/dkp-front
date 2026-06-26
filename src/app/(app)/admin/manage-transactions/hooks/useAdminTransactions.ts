import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Transaction } from "@/types/wallet";
import { serverCall } from "@/services/serverCall";

const INITIAL_PAGINATION = {
  page: 0,
  pageSize: 10,
};

export const useAdminTransactions = () => {
  const [paginationModel, setPaginationModel] = useState(INITIAL_PAGINATION);

  const query = useQuery<Transaction[]>({
    queryKey: [
      "wallets",
      "transactions",
      "admin",
      "manage",
      paginationModel.page,
      paginationModel.pageSize,
    ],
    queryFn: async () => {
      const filter = {
        skip: paginationModel.page * paginationModel.pageSize,
        take: paginationModel.pageSize,
        order: { created_at: "DESC" },
      };
      const filterParam = encodeURIComponent(JSON.stringify(filter));
      return await serverCall({
        method: "GET",
        url: `wallets/transactions/admin/pending?filter=${filterParam}`,
      });
    },
  });

  return {
    paginationModel,
    setPaginationModel,
    ...query,
  };
};

