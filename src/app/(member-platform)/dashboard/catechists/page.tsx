"use client";

import { useState } from "react";
import CatechistTable from "@/components/tables/sample-tables/catechists";
import { PageHeader } from "@/components/common/PageHeader";
import { GraduationCap, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Catechists"
        subtitle="Manage and view all parish catechists"
        icon={GraduationCap}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search catechists..."
        actionLabel="Add Catechist"
        onAction={() => router.push("/new/forms/catechist")}
        actionIcon={UserPlus}
      />

      <CatechistTable wrapperClassName="border-none" />
    </div>
  );
};

export default Page;
