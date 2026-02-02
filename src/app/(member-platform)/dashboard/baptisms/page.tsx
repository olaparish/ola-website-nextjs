"use client";

import { useState } from "react";
import BaptismsTable from "@/components/tables/sample-tables/baptisms";
import { PageHeader } from "@/components/common/PageHeader";
import { Droplets } from "lucide-react";

const Page = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Baptisms"
        subtitle="View and manage baptismal records"
        icon={Droplets}
      />

      <BaptismsTable
        wrapperClassName="border-none"
        paginationClassname="flex justify-end p-4"
      />
    </div>
  );
};

export default Page;
