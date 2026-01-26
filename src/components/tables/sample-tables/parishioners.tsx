"use client";

import {
  ParishionerUser,
  ColumnDef,
  CustomTableProps,
  PaginateResult,
} from "../../../../types";
import TableText from "../ui/normal-text";
import CustomTable from "../smart-table";
import { cn } from "@/lib/utils";
import { parishionerService } from "@/services/parishioner.service";
import { useRouter } from "next/navigation";

type Props = {
  wrapperClassName?: string;
  paginationClassname?: string;
  fetchData?: (pageNumber?: number) => Promise<PaginateResult<ParishionerUser>>;
};

const ParishionersTable = (props: Props) => {
  const router = useRouter();
  let fetchData;

  if (props.fetchData) fetchData = props.fetchData;
  else {
    fetchData = async (
      page: number | undefined,
    ): Promise<PaginateResult<ParishionerUser>> => {
      return await parishionerService.getAll(page);
    };
  }

  const tableColumns: ColumnDef<ParishionerUser>[] = [
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
      key: "firstName",
      label: "First Name",
      headerClassName: "w-40",
      render: (item) => {
        return <TableText className="block w-40" text={item.firstName} />;
      },
    },
    {
      key: "lastName",
      label: "Last Name",
      headerClassName: "w-40",
      render: (item) => {
        return <TableText className="block w-40" text={item.lastName} />;
      },
    },
    {
      key: "otherNames",
      label: "Other Names",
      headerClassName: "w-40",
      render: (item) => {
        return (
          <TableText className="block w-40" text={item.otherNames || ""} />
        );
      },
    },
    {
      key: "phoneNumber",
      label: "Phone Number",
      headerClassName: "w-40",
      render: (item) => {
        return (
          <TableText className="block w-40" text={item.phoneNumber || ""} />
        );
      },
    },
    {
      key: "community",
      label: "Community",
      headerClassName: "w-auto",
      render: (item) => item.community[0].name,
    },
  ];

  const tableProps: CustomTableProps<ParishionerUser> = {
    tableName: "List of Parishioners",
    queryKey: ["parishioners"],
    columns: tableColumns,
    tableWrapperClassName: cn(
      "bg-primary-100/30 w-auto h-120 no-scrollbar-y",
      props.wrapperClassName,
    ),
    index: true,
    pagination: true,
    paginationClassName: cn("mt-12.5", props.paginationClassname),
    onRowClick: (item) => {
      router.push("parishioners/" + item.id);
    },
    fetchData,
  };

  return (
    <div className={cn("")}>
      <CustomTable<ParishionerUser> {...tableProps} />
    </div>
  );
};

export default ParishionersTable;
