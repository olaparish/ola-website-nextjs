"use client";
import React, { useState } from "react";
import SignoutBtn from "@/components/common/signout-btn";
import { IconEditThin } from "@/components/icons/icon-edit-thin";
import NavSelect from "@/components/ui/NavSelect";
import { parishGroupService } from "@/services/parish-groups.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  ColumnDef,
  CustomTableProps,
  GetUserDetails,
  PaginateResult,
  ParishGroup,
  Parishioner,
  User,
} from "../../../../../types";
import { toast } from "sonner";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";
import DataFetchError from "@/components/ui/data-fetch-error";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import CustomTable from "@/components/tables/smart-table";
import TableText from "@/components/tables/ui/normal-text";
import { formatDateWithDuration } from "@/utils/time";
import { IconFluentDelete } from "@/components/icons/icon-fluent-delete";

const Page = () => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const [text, setText] = useState("");
  const [expand, setExpand] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, isError } = useQuery<GetUserDetails<ParishGroup>>({
    queryKey: ["parish-group", session?.user?.id],
    queryFn: async () => {
      const groupData = await parishGroupService.getGroup();
      if (!groupData) {
        toast.error("User not found");
      }
      toast.success("User data fetched");
      setText(groupData.userData.writeup);
      return groupData;
    },
    enabled: !!session?.user?.id,
    refetchOnWindowFocus: false,
  });

  const updateGroup = useMutation({
    mutationKey: ["parish-group", session?.user?.id],
    mutationFn: async () => {
      if (text === data?.userData.writeup) return;
      await parishGroupService.updateGroup({ writeup: text });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["parish-group", session?.user?.id],
      });
      setIsEditing(false);
      toast.success("User data updated successfully");
    },
    onError: () => {
      toast.error("Error updating user data");
    },
  });

  const tableColumns: ColumnDef<User<Parishioner>>[] = [
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
      key: "dateInitiated",
      label: "Date Initiated",
      // headerClassName: "W-50",
      render: (item) => {
        const { formattedDate, duration } = formatDateWithDuration(
          item.userData.createdAt
        );
        return (
          <div className="flex flex-col gap-1.25">
            <span>{formattedDate}</span>
            <span className="font-light text-sm">{duration}</span>
          </div>
        );
      },
    },
    {
      key: "actions",
      label: "",
      headerClassName: "w-10",
      render: (item) => {
        return (
          <div className="">
            <IconFluentDelete className="text-red-500" />
          </div>
        );
      },
    },
  ];

  const tableProps: CustomTableProps<User<Parishioner>> = {
    tableName: `${data?.user.firstName} members`,
    queryKey: ["parish group members", data?.user.id],
    columns: tableColumns,
    tableWrapperClassName: "h-220",
    index: true,
    pagination: true,
    paginationClassName: "flex justify-end mt-12.5",
    fetchData: async (
      pageNumber: number = 1
    ): Promise<PaginateResult<User<Parishioner>>> => {
      const members: PaginateResult<User<Parishioner>> =
        await parishGroupService.getGroupMembers(pageNumber);
      return members;
    },
  };
  if (status === "loading" || isLoading) return <DataFetchSpinner />;
  if (!session?.user?.id || isError) return <DataFetchError />;

  return (
    <div className="">
      <div className="flex justify-end-safe pt-4.75">
        <NavSelect
          name="Add"
          items={[{ name: "Initation", href: "/society/new-initation" }]}
        />
      </div>

      <header>
        <h2 className="font-normal">{data?.user.firstName}</h2>
        <p className="text-secondary-900">All your details</p>
      </header>

      <div className="gap-6 grid grid-cols-[auto_1fr] mt-10">
        <div className="flex flex-col gap-4 w-20">
          <span className="block bg-primary-100 py-2.75 pr-8 pl-5 w-fit font-medium">
            Bio
          </span>
          <button
            className={cn([
              "flex justify-between hover:bg-primary-100 px-2 py-2.75 w-full cursor-pointer",
              isEditing ? "bg-primary-100" : "",
            ])}
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            <IconEditThin
              className="text-secondary-900/70"
              width={20}
              height={20}
            />
            <span className="font-medium">Edit</span>
          </button>
        </div>
        <div>
          {!isEditing && (
            <div>
              <div
                className={`flex flex-col gap-4 overflow-y-scroll ${
                  expand ? "" : "h-70 "
                }`}
              >
                {data?.userData.writeup.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>

              <div className="flex justify-center mt-5">
                <Button
                  className="bg-primary-900 hover:bg-primary-900/70 cursor-pointer"
                  onClick={() => setExpand((prev) => !prev)}
                >
                  {expand ? "Contract" : "Expand"}
                </Button>
              </div>
            </div>
          )}
          {isEditing && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateGroup.mutate();
              }}
            >
              <textarea
                disabled={updateGroup.isPending}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="p-4 w-full h-70"
              />
              <div className="flex justify-center gap-4 mt-5">
                <Button
                  onClick={() => setIsEditing(false)}
                  type="button"
                  variant="outline"
                  disabled={updateGroup.isPending}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>

                <Button
                  disabled={updateGroup.isPending}
                  type="submit"
                  className="bg-primary-900 hover:bg-primary-900/70 cursor-pointer"
                >
                  {updateGroup.isPending ? (
                    <div className="flex items-center gap-4 font-bold">
                      <span> Updating group data </span>
                      <Spinner />
                    </div>
                  ) : (
                    "submit"
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="mb-27">
        <header className="my-10">
          <h2 className="font-normal">List of Members</h2>
        </header>
        <CustomTable<User<Parishioner>> {...tableProps} />
      </div>
      <SignoutBtn />
    </div>
  );
};

export default Page;
