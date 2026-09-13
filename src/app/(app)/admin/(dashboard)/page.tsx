"use client";
import { AdminDashboardResponse } from "@/types/dashabord";
import StatusHandler from "@/components/statusHandler/StatusHandler";
import { useQuery } from "@tanstack/react-query";
import DashboardHeader from "./_components/DashboardHeader";
import DashboardLists from "./_components/DashboardLists";
import DashboardStats from "./_components/DashboardStats";

const AdminRootPage = () => {
  const { data, status, error, refetch, isFetching } =
    useQuery<AdminDashboardResponse>({ queryKey: ["dashboard", "admin"] });
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 pb-8">
      <DashboardHeader isFetching={isFetching} onRefresh={refetch} />
      <StatusHandler
        status={status}
        error={error}
        refetch={refetch}
        skeletonHeight={420}
      >
        {data && (
          <>
            <DashboardStats data={data} />
            <DashboardLists data={data} />
          </>
        )}
      </StatusHandler>
    </div>
  );
};

export default AdminRootPage;
