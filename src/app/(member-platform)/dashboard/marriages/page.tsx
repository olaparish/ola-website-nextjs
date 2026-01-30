"use client";

import { useState } from "react";
import MarriageTable from "@/components/tables/sample-tables/marriage";
import { PageHeader } from "@/components/common/PageHeader";
import { Heart } from "lucide-react";

const Page = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Marriages"
        subtitle="View and manage matrimonial records"
        icon={Heart}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search marriage records..."
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <MarriageTable
          wrapperClassName="h-[calc(100vh-320px)] border-none bg-transparent"
          paginationClassname="flex justify-end p-4 border-t border-gray-50"
        />
      </div>
    </div>
  );
};

export default Page;
