"use client";

import {
  ColumnDef,
  CustomTableProps,
  PaginateResult,
  Marriage,
} from "../../../../types";
import TableText from "../ui/normal-text";
import CustomTable from "../smart-table";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { marriageService } from "@/services/marriage.service";

type Props = {
  wrapperClassName?: string;
  paginationClassname?: string;
};

const MarriageTable = (props: Props) => {
  const router = useRouter();
  const tableColumns: ColumnDef<Marriage>[] = [
    {
      key: "id",
      label: "ID",
      headerClassName: "w-30",
      render: (item) => {
        return <TableText className="block w-30" text={item.id.slice(0, 8)} />;
      },
    },

    {
      key: "priestName",
      label: "Officiating Priest",
      headerClassName: "w-40",
      render: (item) => {
        const title = item.officiatingPriest?.title;
        const firstName = item.officiatingPriest?.user.firstName;
        const lastName = item.officiatingPriest?.user.lastName;
        const otherNames = item.husband?.otherNames;
        const priestName = [title, firstName, lastName, otherNames].join(" ");
        return <TableText className="block w-40" text={priestName} />;
      },
    },
    {
      key: "husbandName",
      label: "Husband Name",
      headerClassName: "w-40",
      render: (item) => {
        const firstName = item.husband?.firstName;
        const lastName = item.husband?.lastName;
        const otherNames = item.husband?.otherNames;
        const priestName = [firstName, lastName, otherNames].join(" ");
        return <TableText className="block w-40" text={priestName} />;
      },
    },
    {
      key: "wifeName",
      label: "Wife Name",
      headerClassName: "w-40",
      render: (item) => {
        const firstName = item.wife?.firstName;
        const lastName = item.wife?.lastName;
        const otherNames = item.wife?.otherNames;
        const priestName = [firstName, lastName, otherNames].join(" ");
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
  ];

  const tableProps: CustomTableProps<Marriage> = {
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
      router.push("marriages/" + item.id);
    },
    fetchData: async (
      page: number | undefined,
    ): Promise<PaginateResult<Marriage>> => {
      const res = await marriageService.getAll(page);
      return res;
    },
  };

  return (
    <div className={cn("")}>
      <CustomTable<Marriage> {...tableProps} />
    </div>
  );
};

export default MarriageTable;
