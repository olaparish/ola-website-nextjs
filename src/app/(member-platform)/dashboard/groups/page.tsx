"use client";

import { useQuery } from "@tanstack/react-query";
import { parishGroupService } from "@/services/parish-groups.service";
import { PageHeader } from "@/components/common/PageHeader";
import { Users, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import GroupsListTable from "@/components/tables/sample-tables/groups-list";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const { data: groupsData, isLoading, isError } = useQuery({
    queryKey: ["parish-groups"],
    queryFn: () => parishGroupService.getGroups(),
  });

  if (isLoading) return <DataFetchSpinner />;
  if (isError) return <div className="p-8 text-center text-red-500">Error fetching groups. Please try again.</div>;

  const communities = groupsData?.communities || [];
  const societies = groupsData?.societies || [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Parish Groups"
        subtitle="Manage communities and societies within the parish"
        icon={Users}
        actionLabel="New Group"
        onAction={() => router.push("/dashboard/groups/new")}
        actionIcon={UserPlus}
      />

      <div className="space-y-6">
        <GroupsListTable
          groups={communities}
          title="Communities"
          showSearch={true}
        />

        <GroupsListTable
          groups={societies}
          title="Societies"
          showSearch={true}
        />
      </div>
    </div>
  );
};

export default Page;
