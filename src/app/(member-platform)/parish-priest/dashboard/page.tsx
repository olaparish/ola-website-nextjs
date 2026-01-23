"use client";
import PopoverSelect from "@/components/ui/popover";
import Image from "next/image";
import {
  Accountant,
  AccountantUser,
  Catechist,
  CatechistUser,
  ColumnDef,
  CustomTableProps,
  NavElement,
  PaginateResult,
  User,
} from "../../../../../types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardCard from "@/components/ui/DashboardCard";
import { Fragment, useState } from "react";
import MainModal from "@/components/common/modal-main";
import { cn } from "@/lib/utils";
import TableText from "@/components/tables/ui/normal-text";
import { accountantService } from "@/services/accountant.service";
import CustomTable from "@/components/tables/smart-table";
import { catechistService } from "@/services/catechist.service";
import CatechistAccountantDetails from "@/components/pages/CatechistAccountantDetails";

const newOptions: NavElement[] = [
  { name: "Resident Priest", href: "/new/forms/resident-priest" },
  { name: "Visiting Priest", href: "/new/forms/visiting-priest" },
  { name: "Catechist", href: "/new/forms/catechist" },
  { name: "Accountant", href: "/new/forms/accountant" },
  { name: "Parishioner", href: "/new/forms/parishioner" },
];

const rangeOptions = [
  "Current Week",
  "Year",
  "Current Month",
  "1st Quarter",
  "2nd Quarter",
  "3rd Quarter",
  "4th Quarter",
] as const;

const miniRoutes = [{ name: "Catechists" }, { name: "Accountants" }];
const Page = () => {
  // const data = useParishPriestStore(
  //   useShallow((state) => {
  //     return {
  //       user: state.user,
  //       priest: state.priest,
  //       parishPriest: state.parishPriest,
  //     };
  //   })
  // );
  const [showAmountBreakdown, setShowAmountBreakdown] =
    useState<boolean>(false);
  const [miniRoute, setMiniRoute] =
    useState<(typeof miniRoutes)[number]["name"]>("Catechists");
  const [userDetails, setUserDetails] = useState<
    CatechistUser | AccountantUser | null
  >(null);

  const metrics = [
    { name: "Baptisms", value: "500" },
    { name: "First Communicants", value: "97" },
    { name: "Confirmations", value: "102" },
    { name: "Marriages", value: "300" },
  ];

  const payments = [
    { "FIRST MASS": 2700.0 },
    { "SECOND MASS": 2000.0 },
    { DUES: 100.0 },
    { "MASS REQUESTS": 2000.0 },
  ];

  const tableColumns: ColumnDef<AccountantUser | CatechistUser>[] = [
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

  if (miniRoute === "Catechists") {
    tableColumns.push({
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
    });
  }

  console.log("tableColumns", tableColumns);

  const tableProps: CustomTableProps<AccountantUser | CatechistUser> = {
    tableName: `List of ${miniRoute}`,
    queryKey: [miniRoute],
    columns: tableColumns,
    tableWrapperClassName: "h-auto bg-primary-100/30 no-scrollbar-y w-auto",
    index: true,
    pagination: true,
    paginationClassName: "mt-12.5",
    fetchData: async (
      pageNumber: number = 1,
    ): Promise<PaginateResult<AccountantUser | CatechistUser>> => {
      const api =
        miniRoute === "Catechists"
          ? catechistService.getAll
          : accountantService.getAll;
      const members: PaginateResult<AccountantUser | CatechistUser> =
        await api(pageNumber);
      return members;
    },
  };

  return (
    <Fragment>
      <MainModal
        isOpen={showAmountBreakdown}
        onClose={() => setShowAmountBreakdown(false)}
      >
        <div>I am here</div>
      </MainModal>
      {!!userDetails && (
        <MainModal
          wrapperClassName="bg-transparent"
          isOpen={!!userDetails}
          onClose={() => setUserDetails(null)}
        >
          <CatechistAccountantDetails user={userDetails} />
        </MainModal>
      )}
      <div className="mt-20">
        <div className="flex justify-end-safe mt-4 mb-5.5">
          <PopoverSelect
            name="Add"
            items={newOptions}
            render={renderAddPopover}
          />
        </div>
        <div className="flex justify-between">
          <header>
            <h2 className="font-normal">Activity Overview</h2>
            <p className="text-secondary-900">Platform details</p>
          </header>

          <div>
            <p className="font-light text-sm">Select a range</p>
            <select className="bg-gold-200 px-3 py-2.5 font-medium text-sm">
              {rangeOptions.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex mt-6">
          <div className="relative mr-12.5 pt-8 pl-6 w-102.5 h-48.25">
            <Image
              src="/vectors/total-number.svg"
              fill
              alt="vector"
              className="top-0 left-0 absolute w-full h-full"
            />
            <div className="z-10 absolute">
              <p className="font-light text-sm">Total Number Onboarded</p>
              <p className="mt-7.5 font-medium text-2xl">999</p>
            </div>
          </div>
          <ul className="gap-x-7.5 gap-y-2 grid grid-cols-[auto_auto]">
            {metrics.map((metric, index) => (
              <li key={index}>
                <DashboardCard title={metric.name} subtitle={metric.value} />
              </li>
            ))}
          </ul>
          <div
            className="bg-primary-100 ml-7.5 px-5.5 py-4 w-70 h-fit cursor-pointer"
            onClick={() => setShowAmountBreakdown(true)}
          >
            <p className="block mb-3 font-light">Total Payments</p>
            <p className="font-medium">GHC 5301.00</p>
            <hr className="bg-black/30 my-5 border-none h-[0.5px]" />
            <p className="block mb-3 text-sm">DUES: GHS 1000.00</p>
            <p className="block mb-3 text-sm">OTHER: GHS 1000.00</p>
          </div>
        </div>
        <div className="mt-20">
          <div className="flex gap-4">
            {miniRoutes.map((route, index) => (
              <div
                className={cn(
                  "flex justify-center items-center border-2 border-secondary-900 w-37.5 h-10.5 font-bold text-secondary-900 text-sm cursor-pointer",
                  miniRoute === route.name ? "" : "bg-secondary-900 text-white",
                )}
                key={index}
                onClick={() => setMiniRoute(route.name)}
              >
                {route.name}
              </div>
            ))}
          </div>
          <div className="mt-5 w-full overflow-scroll">
            <CustomTable<AccountantUser | CatechistUser>
              {...tableProps}
              onRowClick={(item) => setUserDetails(item)}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const renderAddPopover = ({ name, href }: NavElement) => {
  return (
    <Link className="block w-30 truncate" href={href}>
      {name}
    </Link>
  );
};
export default Page;
