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
        actionLabel="Add Accountant"
        onAction={() => router.push("/dashboard/accountants/new")}
        actionIcon={UserPlus}
      />

      <AccountantTable
        wrapperClassName="border-none"
      />
    </div>
  );
};

export default Page;
