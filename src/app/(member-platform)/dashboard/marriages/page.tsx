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
      />

      <MarriageTable
        wrapperClassName="border-none"
        paginationClassname="flex justify-end p-4"
      />
    </div>
  );
};

export default Page;
