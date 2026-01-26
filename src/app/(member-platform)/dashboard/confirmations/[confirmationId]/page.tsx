"use client";
import ConfirmationTable from "@/components/tables/sample-tables/confirmation";
import { useParams } from "next/navigation";

const Page = () => {
  const { confirmationId } = useParams();
  return (
    <div>
      <ConfirmationTable
        wrapperClassName="h-[calc(100vh-290px)]"
        paginationClassname="flex justify-end"
        confirmationId={confirmationId as string}
      />
    </div>
  );
};

export default Page;
