import ConfirmationsTable from "@/components/tables/sample-tables/confirmations";

const Page = () => {
  return (
    <div className="">
      <ConfirmationsTable
        wrapperClassName="h-[calc(100vh-290px)]"
        paginationClassname="flex justify-end"
      />
    </div>
  );
};

export default Page;
