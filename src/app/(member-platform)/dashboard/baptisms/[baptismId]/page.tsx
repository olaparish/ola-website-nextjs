"use client";
import BaptismTable from "@/components/tables/sample-tables/baptism";
import { useParams } from "next/navigation";

const Page = () => {
  const { baptismId } = useParams();
  return (
    <div>
      <BaptismTable
        wrapperClassName="h-[calc(100vh-290px)]"
        paginationClassname="flex justify-end"
        baptismId={baptismId as string}
      />
    </div>
  );
};

export default Page;
