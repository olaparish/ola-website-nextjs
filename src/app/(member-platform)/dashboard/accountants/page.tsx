"use client";

import { useState } from "react";
import AccountantTable from "@/components/tables/sample-tables/accountant";
import { PageHeader } from "@/components/common/PageHeader";
import { Landmark, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Accountants"
        subtitle="Manage and view all parish accountants"
        icon={Landmark}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search accountants..."
        actionLabel="Add Accountant"
        onAction={() => router.push("/dashboard/accountants/new")}
        actionIcon={UserPlus}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <AccountantTable
          wrapperClassName="h-[calc(100vh-320px)] border-none bg-transparent"
        />
      </div>
    </div>
  );
};

export default Page;
