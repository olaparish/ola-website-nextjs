"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { parishGroupService } from "@/services/parish-groups.service";
import { PageHeader } from "@/components/common/PageHeader";
import { Users, ArrowLeft, Mail, Phone, Search, Filter } from "lucide-react";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DataTable, DashboardColumn } from "@/components/common/DataTable";

const OutstationMembersPage = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: membersData,
    isLoading: isMembersLoading,
    isError: isMembersError,
  } = useQuery({
    queryKey: ["outstation-members", slug, page],
    queryFn: () =>
      parishGroupService.getGroupMembersBySlug(slug as string, page),
  });

  const { data: outstation, isLoading: isOutstationLoading } = useQuery({
    queryKey: ["outstation", slug],
    queryFn: () => parishGroupService.getGroupBySlug(slug as string),
  });

  if (isMembersLoading || isOutstationLoading) return <DataFetchSpinner />;
  if (isMembersError || !outstation)
    return (
      <div className="p-8 text-red-500 text-center">
        Error loading members or outstation not found.
      </div>
    );

  const filteredMembers =
    membersData?.docs.filter((member) => {
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
      return (
        fullName.includes(searchTerm.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.phoneNumber?.includes(searchTerm)
      );
    }) || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: DashboardColumn<any>[] = [
    {
      header: "Name",
      render: (member) => (
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center bg-primary-100 rounded-full w-10 h-10 overflow-hidden font-bold text-primary-700">
            {member.avatar && (
              <Image
                width={40}
                height={40}
                className="size-10"
                src={member.avatar}
                alt={
                  member.firstName +
                  " " +
                  member.lastName +
                  " " +
                  member.otherNames
                }
              />
            )}
            {!member.avatar && (
              <>
                {member.firstName[0]}
                {member.lastName[0]}
              </>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {member.firstName} {member.lastName}
            </p>
            <p className="text-gray-500 text-xs uppercase">
              ID: {member.id.slice(0, 8)}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Contact",
      render: (member) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Mail className="w-3.5 h-3.5" />
            {member.email || "N/A"}
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Phone className="w-3.5 h-3.5" />
            {member.phoneNumber || "N/A"}
          </div>
        </div>
      ),
    },
    {
      header: "Join Date",
      render: (member) => (
        <p className="text-gray-600 text-sm">
          {new Date(member.createdAt).toLocaleDateString()}
        </p>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      render: (member) => (
        <Link
          href={`/dashboard/parishioners/${member.id}`}
          className="hover:bg-primary-50 font-medium text-primary-600 hover:text-primary-700 text-sm"
        >
          View Profile
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <PageHeader
          title={`${outstation.name} Members`}
          subtitle={`Managing parishioners for ${outstation.name} outstation`}
          icon={Users}
          className="flex-1 mb-0"
        />
      </div>

      <DataTable
        data={filteredMembers}
        columns={columns}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search by name, email or phone..."
        actions={
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-gray-200 h-10"
          >
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        }
        pagination={
          membersData
            ? {
                page: membersData.page,
                totalPages: membersData.totalPages,
                totalDocs: membersData.totalDocs,
                onPageChange: (newPage) => setPage(newPage),
              }
            : undefined
        }
      />
    </div>
  );
};;

export default OutstationMembersPage;
