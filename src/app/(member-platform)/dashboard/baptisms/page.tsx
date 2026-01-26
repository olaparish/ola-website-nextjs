import BaptismsTable from "@/components/tables/sample-tables/baptisms";

const Page = () => {
  return (
    <div className="">
      <BaptismsTable
        wrapperClassName="h-[calc(100vh-290px)]"
        paginationClassname="flex justify-end"
      />
    </div>
  );
};

export default Page;
