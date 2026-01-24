"use client";
import {
  AccountantUser,
  ColumnDef,
  CustomTableProps,
  PaginateResult,
} from "../../../../types";
import TableText from "../ui/normal-text";
import CustomTable from "../smart-table";
import { Fragment, useState } from "react";
import MainModal from "@/components/common/modal-main";
import CatechistAccountantDetails from "@/components/pages/CatechistAccountantDetails";
import { cn } from "@/lib/utils";
import { accountantService } from "@/services/accountant.service";

type Props = {
  wrapperClassName?: string;
};

const AccountantTable = (props: Props) => {
  const [userDetails, setUserDetails] = useState<AccountantUser | null>(null);

  const tableColumns: ColumnDef<AccountantUser>[] = [
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
  ];

  const tableProps: CustomTableProps<AccountantUser> = {
    tableName: "List of Catechists",
    queryKey: ["accountants"],
    columns: tableColumns,
    tableWrapperClassName: "h-auto bg-primary-100/30 no-scrollbar-y w-auto",
    index: true,
    pagination: true,
    paginationClassName: "mt-12.5",
    fetchData: async (
      pageNumber: number = 1,
    ): Promise<PaginateResult<AccountantUser>> => {
      const api = accountantService.getAll;

      const members: PaginateResult<AccountantUser> = await api(pageNumber);
      return members;
    },
  };

  return (
    <Fragment>
      {!!userDetails && (
        <MainModal
          wrapperClassName="bg-transparent"
          isOpen={!!userDetails}
          onClose={() => setUserDetails(null)}
        >
          <CatechistAccountantDetails user={userDetails} />
        </MainModal>
      )}
      <div className={cn("w-full overflow-scroll", props.wrapperClassName)}>
        <CustomTable<AccountantUser>
          {...tableProps}
          onRowClick={(item) => setUserDetails(item)}
        />
      </div>
    </Fragment>
  );
};

export default AccountantTable;
