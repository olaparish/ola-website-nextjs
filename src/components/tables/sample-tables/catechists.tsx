"use client";
import {
  CatechistUser,
  ColumnDef,
  CustomTableProps,
  PaginateResult,
} from "../../../../types";
import TableText from "../ui/normal-text";
import { catechistService } from "@/services/catechist.service";
import CustomTable from "../smart-table";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Props = {
  wrapperClassName?: string;
};

const CatechistTable = (props: Props) => {
    const router = useRouter();

  const tableColumns: ColumnDef<CatechistUser>[] = [
    {
      key: "id",
      label: "ID",
      headerClassName: "w-30",
      render: (item) => {
        return <TableText className="block w-30" text={item.id.slice(0, 8)} />;
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
      label: "Other Names",
      headerClassName: "w-40",
      render: (item) => {
        return (
          <TableText className="block w-40" text={item.user.otherNames || ""} />
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
    {
      key: "name",
      label: "Parish",
      headerClassName: "w-auto",
      render: (item) => {
        if ("groups" in item && item.groups[0]) {
          return (
            <TableText
              className="block w-auto"
              text={item.groups[0].name || ""}
            />
          );
        }
      },
    },
  ];

  const tableProps: CustomTableProps<CatechistUser> = {
    tableName: "List of Catechists",
    queryKey: ["catechists"],
    columns: tableColumns,
    tableWrapperClassName: "bg-primary-100/30 w-auto",
    index: true,
    pagination: true,
    paginationClassName: "mt-12.5",
    onRowClick: (item) => {
      router.push("/dashboard/catechists/" + item.id);
    },
    fetchData: async (
      pageNumber: number = 1,
    ): Promise<PaginateResult<CatechistUser>> => {
      const api = catechistService.getAll;

      const members: PaginateResult<CatechistUser> = await api(pageNumber);
      return members;
    },
  };

  return (
    <div className={cn("w-full", props.wrapperClassName)}>
      <CustomTable<CatechistUser> {...tableProps} />
    </div>
  );
};

export default CatechistTable;
