"use client";

import { useState } from "react";
import ConfirmationsTable from "@/components/tables/sample-tables/confirmations";
import { PageHeader } from "@/components/common/PageHeader";
import { Flame } from "lucide-react";

const Page = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Confirmations"
        subtitle="View and manage confirmation records"
        icon={Flame}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search confirmation records..."
      />

      <ConfirmationsTable
        wrapperClassName="border-none"
        paginationClassname="flex justify-end p-4"
      />
    </div>
  );
};

export default Page;
