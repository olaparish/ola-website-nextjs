"use client";

import { useQuery } from "@tanstack/react-query";
import { parishGroupService } from "@/services/parish-groups.service";
import { PageHeader } from "@/components/common/PageHeader";
import { MapPin, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import GroupsListTable from "@/components/tables/sample-tables/groups-list";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { data: groupsData, isLoading, isError } = useQuery({
    queryKey: ["parish-groups"],
    queryFn: () => parishGroupService.getGroups(),
  });

  if (isLoading) return <DataFetchSpinner />;
  if (isError) return <div className="p-8 text-center text-red-500">Error fetching outstations. Please try again.</div>;

  const outstations = groupsData?.outstations || [];
  const filteredOutstations = outstations.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8">
      <PageHeader
        title="Outstations"
        subtitle="Manage and view all parish outstations"
        icon={MapPin}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search outstations..."
        actionLabel="New Outstation"
        onAction={() => router.push("/dashboard/outstations/new")}
        actionIcon={UserPlus}
      />

      <GroupsListTable 
        groups={filteredOutstations} 
        title="Active Outstations" 
        onRowClick={(g) => router.push(`/dashboard/outstations/${g.slug}`)}
      />
    </div>
  );
};

export default Page;
