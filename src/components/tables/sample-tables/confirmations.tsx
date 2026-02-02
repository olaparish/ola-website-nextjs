"use client";

import {
  Confirmation,
  ColumnDef,
  CustomTableProps,
  PaginateResult,
} from "@/../types";
import TableText from "../ui/normal-text";
import CustomTable from "../smart-table";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { confirmationService } from "@/services/confirmation.service";

type Props = {
  wrapperClassName?: string;
  paginationClassname?: string;
};

const ConfrimationsTable = (props: Props) => {
  const router = useRouter();
  const tableColumns: ColumnDef<Confirmation>[] = [
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
      key: "count",
      label: "Count",
      headerClassName: "w-auto",
      render: (item) => item.count,
    },
    {
      key: "date",
      label: "Date",
      headerClassName: "w-40",
      render: (item) => {
        return <TableText className="block w-40" text={item.date} />;
      },
    },
  ];

  const tableProps: CustomTableProps<Confirmation> = {
    tableName: "List of Parishioners",
    queryKey: ["baptisms"],
    columns: tableColumns,
    tableWrapperClassName: cn(
      "bg-primary-100/30 w-auto h-120 no-scrollbar-y",
      props.wrapperClassName,
    ),
    index: true,
    pagination: true,
    showSearch: true,
    exportable: true,
    exportFileName: "Confirmation_Records",
    paginationClassName: cn("mt-12.5", props.paginationClassname),
    onRowClick: (item) => {
      router.push("confirmations/" + item.id);
    },
    fetchData: async (
      page: number | undefined,
      search?: string,
    ): Promise<PaginateResult<Confirmation>> => {
      return await confirmationService.getAll(page, search);
    },
  };

  return (
    <div className={cn("")}>
      <CustomTable<Confirmation> {...tableProps} />
    </div>
  );
};

export default ConfrimationsTable;
