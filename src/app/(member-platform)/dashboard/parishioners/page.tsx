"use client";

import { useState } from "react";
import ParishionersTable from "@/components/tables/sample-tables/parishioners";
import { PageHeader } from "@/components/common/PageHeader";
import { Users, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Parishioners"
        subtitle="Manage and view all registered parishioners"
        icon={Users}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search parishioners..."
        actionLabel="Add Parishioner"
        onAction={() => router.push("/dashboard/parishioners/new")}
        actionIcon={UserPlus}
      />

      <ParishionersTable
        wrapperClassName="border-none"
        paginationClassname="flex justify-end p-4"
      />
    </div>
  );
};

export default Page;
