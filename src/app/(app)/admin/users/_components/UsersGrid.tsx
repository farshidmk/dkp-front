import { AppDataGrid } from "@/components/dataGrid/AppDataGrid";
import StatusHandler from "@/components/statusHandler/StatusHandler";
import { useDataGridQuery } from "@/hooks/useDataGridQuery";
import convertGridQueryToApiFilterParam from "@/services/convertGridQueryToApiFilterParam";
import { AppGridColDef } from "@/types/data-grid";
import { UserInfo } from "@/types/user";
import { Chip, IconButton, Tooltip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import ApproveButton from "./ApproveButton";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import FilterUsers from "./FilterUsers";
import { PaginatedServerResponse } from "@/types/server";
import { UserFilterItems, UserIsApproved } from "../users.type";

const UsersGrid = () => {
  const {
    query,
    paginationModel,
    setPaginationModel,
    sortModel,
    setSortModel,
  } = useDataGridQuery();

  const [filter, setFilter] = useState<UserFilterItems>({
    isApproved: UserIsApproved.All,
    mobile: "",
    name: "",
  });

  const { data, status, refetch, isFetching } = useQuery<
    PaginatedServerResponse<UserInfo>,
    Error,
    PaginatedServerResponse<UserInfo>
  >({
    queryKey: ["users", `?${convertGridQueryToApiFilterParam(query)}`],
    // queryKey: ["users", `?filter=${JSON.stringify(testFilter)}`],
  });

  const columns = useMemo(
    (): AppGridColDef<UserInfo>[] => [
      {
        field: "profile",
        headerName: "نام",
        flex: 1,
        filterable: false,
        sortable: false,
        renderCell: (params) => {
          const user = params.value as UserInfo["profile"];
          return user.first_name + " " + user.last_name;
        },
      },
      {
        field: "mobile",
        headerName: "تلفن همراه",
        flex: 1,
        filterable: false,
        sortable: false,
        renderCell: (params) => {
          const user = params.value as UserInfo["profile"];
          return user.telephone;
        },
      },
      {
        field: "custom",
        headerName: "شهر",
        flex: 1,
        filterable: false,
        sortable: false,
        renderCell: (params) => {
          const user = params.row as UserInfo;
          return user.profile.city;
        },
      },
      {
        field: "approved",
        headerName: "وضعیت",
        flex: 1,
        filterable: false,
        sortable: false,
        renderCell: (params) => {
          const approved = params.value as UserInfo["approved"];
          return (
            <Tooltip title={approved ? "تایید شده" : "منتظر تایید"}>
              {approved ? (
                <Chip label="تایید شده" color="success" size="small" />
              ) : (
                <Chip label="منتظر تایید" color="warning" size="small" />
              )}
            </Tooltip>
          );
        },
      },
      {
        field: "created_at",
        headerName: "تاریخ ثبت نام",
        flex: 1,
        filterable: false,
        sortable: false,
        renderCell: (params) => {
          const createdDate = params.value as UserInfo["created_at"];
          return new Date(createdDate).toLocaleString("fa");
        },
      },
      {
        field: "action",
        headerName: "عملیات",
        flex: 1,
        filterable: false,
        sortable: false,
        renderCell: (params) => {
          const user = params.row as UserInfo;

          return (
            <div>
              <ApproveButton isApproved={user.approved} userId={user.id} />
              <Tooltip title="ویرایش">
                <Link href={`/users/${user.id}`}>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                </Link>
              </Tooltip>
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className="h-full flex flex-col gap-1">
      <FilterUsers setFilter={setFilter} />
      <StatusHandler status={status} refetch={refetch} skeletonHeight={500}>
        <AppDataGrid
          rows={data?.items ?? []}
          columns={columns}
          loading={isFetching}
          totalRows={data?.total ?? 0}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          gridProps={{
            getRowId: (row: UserInfo) => row.id,
          }}
        />
      </StatusHandler>
    </div>
  );
};

export default UsersGrid;
