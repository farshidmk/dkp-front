import { AppDataGrid } from "@/components/dataGrid/AppDataGrid";
import StatusHandler from "@/components/statusHandler/StatusHandler";
import { useDataGridQuery } from "@/hooks/useDataGridQuery";
import convertGridQueryToApiFilterParam, {
  toQueryString,
} from "@/services/convertGridQueryToApiFilterParam";
import { AppGridColDef } from "@/types/data-grid";
import { PaginatedServerResponse } from "@/types/server";
import { UserInfo } from "@/types/user";
import { Chip, Container, Tooltip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { UserFilterItems } from "../users.type";
import ApproveButton from "./ApproveButton";
import FilterUsers from "./FilterUsers";
import ViewUserProfileButton from "./ViewUserProfileButton";

const UsersGrid = () => {
  const {
    query,
    paginationModel,
    setPaginationModel,
    sortModel,
    setSortModel,
  } = useDataGridQuery();

  const [filter, setFilter] = useState<UserFilterItems>({
    isApproved: undefined,
    mobile: "",
    name: "",
  });

  const { data, status, refetch, isFetching } = useQuery<
    PaginatedServerResponse<UserInfo>,
    Error,
    PaginatedServerResponse<UserInfo>
  >({
    queryKey: [
      "users",
      `?${convertGridQueryToApiFilterParam(query)}&${toQueryString(filter)}`,
    ],
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
            <div className="flex items-center gap-2">
              <ApproveButton isApproved={user.approved} userId={user.id} />
              <ViewUserProfileButton userId={user.id} /> 
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className="h-full flex flex-col gap-1">
      <FilterUsers setFilter={setFilter} isFetching={isFetching} />
      <Container maxWidth="xl" sx={{ flex: 1, overflow: "auto" }}>
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
      </Container>
    </div>
  );
};

export default UsersGrid;
