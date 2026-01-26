import MarriageTable from "@/components/tables/sample-tables/marriage";

const Page = () => {
  return (
    <div className="">
      <MarriageTable
        wrapperClassName="h-[calc(100vh-290px)]"
        paginationClassname="flex justify-end"
      />
    </div>
  );
};

export default Page;
