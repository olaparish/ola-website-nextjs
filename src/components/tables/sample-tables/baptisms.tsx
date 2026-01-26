"use client";

import {
  Baptism,
  ColumnDef,
  CustomTableProps,
  PaginateResult,
} from "../../../../types";
import TableText from "../ui/normal-text";
import CustomTable from "../smart-table";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { baptismService } from "@/services/baptism.service";

type Props = {
  wrapperClassName?: string;
  paginationClassname?: string;
};

const BaptismsTable = (props: Props) => {
  const router = useRouter();
  const tableColumns: ColumnDef<Baptism>[] = [
    {
      key: "id",
      label: "ID",
      headerClassName: "w-30",
      render: (item) => {
        // console.log("Item: ", item);
        return <TableText className="block w-30" text={item.id.slice(0, 8)} />;
      },
    },
    {
      key: "baptismType",
      label: "Baptism Type",
      headerClassName: "w-40",
      render: (item) => {
        return <TableText className="block w-40" text={item.type} />;
      },
    },
    {
      key: "priestName",
      label: "Priest Name",
      headerClassName: "w-40",
      render: (item) => {
        const title = item.officiatingPriest?.title;
        const firstName = item.officiatingPriest?.user.firstName;
        const lastName = item.officiatingPriest?.user.lastName;
        const priestName = [title, firstName, lastName].join(" ");
        return <TableText className="block w-40" text={priestName} />;
      },
    },
    {
      key: "date",
      label: "Date",
      headerClassName: "w-40",
      render: (item) => {
        return <TableText className="block w-40" text={item.date} />;
      },
    },
    {
      key: "count",
      label: "Count",
      headerClassName: "w-auto",
      render: (item) => item.count,
    },
  ];

  const tableProps: CustomTableProps<Baptism> = {
    tableName: "List of Parishioners",
    queryKey: ["baptisms"],
    columns: tableColumns,
    tableWrapperClassName: cn(
      "bg-primary-100/30 w-auto h-120 no-scrollbar-y",
      props.wrapperClassName,
    ),
    index: true,
    pagination: true,
    paginationClassName: cn("mt-12.5", props.paginationClassname),
    onRowClick: (item) => {
      router.push("baptisms/" + item.id);
    },
    fetchData: async (
      page: number | undefined,
    ): Promise<PaginateResult<Baptism>> => {
      return await baptismService.getAll(page);
    },
  };

  return (
    <div className={cn("")}>
      <CustomTable<Baptism> {...tableProps} />
    </div>
  );
};

export default BaptismsTable;
