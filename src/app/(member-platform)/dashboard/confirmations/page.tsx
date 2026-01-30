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

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <ConfirmationsTable
          wrapperClassName="h-[calc(100vh-320px)] border-none bg-transparent"
          paginationClassname="flex justify-end p-4 border-t border-gray-50"
        />
      </div>
    </div>
  );
};

export default Page;
