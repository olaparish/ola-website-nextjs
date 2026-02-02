"use client";

import {
  ColumnDef,
  CustomTableProps,
  PaginateResult,
  ParishionerWitUser,
} from "@/../types";
import TableText from "../ui/normal-text";
import CustomTable from "../smart-table";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { baptismService } from "@/services/baptism.service";

type Props = {
  wrapperClassName?: string;
  paginationClassname?: string;
  baptismId: string;
};

const BaptismTable = (props: Props) => {
  const router = useRouter();
  const tableColumns: ColumnDef<ParishionerWitUser>[] = [
    {
      key: "id",
      label: "ID",
      headerClassName: "w-30",
      render: (item) => {
        return (
          <TableText
            className="block w-30"
            text={item.id?.slice(0, 8) as string}
          />
        );
      },
    },
    {
      key: "firstName",
      label: "First Name",
      headerClassName: "w-40",
      render: (item) => {
        return <TableText className="block w-40" text={item.user.firstName} />;
      },
    },
    {
      key: "lastName",
      label: "Last Name",
      headerClassName: "w-40",
      render: (item) => {
        return <TableText className="block w-40" text={item.user.lastName} />;
      },
    },
    {
      key: "otherNames",
      label: "OtherNames",
      headerClassName: "w-40",
      render: (item) => {
        return (
          <TableText
            className="block w-40"
            text={item.user.otherNames as string}
          />
        );
      },
    },
    {
      key: "phoneNumber",
      label: "Phone Number",
      headerClassName: "w-40",
      render: (item) => {
        return (
          <TableText
            className="block w-40"
            text={item.user.phoneNumber || ""}
          />
        );
      },
    },
  ];

  const tableProps: CustomTableProps<ParishionerWitUser> = {
    tableName: "List of Parishioners",
    queryKey: ["baptisms", "parishioners"],
    columns: tableColumns,
    tableWrapperClassName: cn(
      "bg-primary-100/30 w-auto h-120 no-scrollbar-y",
      props.wrapperClassName,
    ),
    index: true,
    pagination: true,
    paginationClassName: cn("mt-12.5", props.paginationClassname),
    onRowClick: (item) => {
      router.push("/dashboard/parishioners/" + item.user.id);
    },
    fetchData: async (
      page: number | undefined,
    ): Promise<PaginateResult<ParishionerWitUser>> => {
      return await baptismService.getBaptismData(props.baptismId, page);
    },
  };

  return (
    <div className={cn("")}>
      <CustomTable<ParishionerWitUser> {...tableProps} />
    </div>
  );
};

export default BaptismTable;
