"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { parishGroupService } from "@/services/parish-groups.service";
import { PageHeader } from "@/components/common/PageHeader";
import { Users, ArrowLeft, Mail, Phone, Search, Filter } from "lucide-react";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";

const MembersPage = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: membersData,
    isLoading: isMembersLoading,
    isError: isMembersError,
  } = useQuery({
    queryKey: ["group-members", slug],
    queryFn: () => parishGroupService.getGroupMembersBySlug(slug as string),
  });

  const { data: group, isLoading: isGroupLoading } = useQuery({
    queryKey: ["group", slug],
    queryFn: () => parishGroupService.getGroupBySlug(slug as string),
  });

  if (isMembersLoading || isGroupLoading) return <DataFetchSpinner />;
  if (isMembersError || !group)
    return (
      <div className="p-8 text-red-500 text-center">
        Error loading members or group not found.
      </div>
    );

  const filteredMembers = membersData?.docs.filter((member) => {
    const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phoneNumber?.includes(searchTerm)
    );
  });

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
          title={`${group.name} Members`}
          subtitle={`Managing community members for ${group.name}`}
          icon={Users}
          className="flex-1 mb-0"
        />
      </div>

      <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
        <div className="p-6 border-gray-100 border-b">
          <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
              <Input
                placeholder="Search by name, email or phone..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              {/* <Button
                size="sm"
                className="bg-primary-900 hover:bg-primary-800 text-white"
              >
                Add Member
              </Button> */}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead className="font-semibold text-gray-900">
                  Name
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Contact
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Join Date
                </TableHead>
                <TableHead className="font-semibold text-gray-900 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers && filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <TableRow
                    key={member.id}
                    className="hover:bg-gray-50/30 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center bg-primary-100 rounded-full w-10 h-10 font-bold text-primary-700">
                          {member.firstName[0]}
                          {member.lastName[0]}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {member.firstName} {member.lastName}
                          </p>
                          <p className="text-gray-500 text-xs">
                            ID: {member.id.toUpperCase().slice(0, 8)}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>
                      <p className="text-gray-600 text-sm">
                        {new Date(member.createdAt).toLocaleDateString()}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/dashboard/parishioners/${member.id}`}
                        className="hover:bg-primary-50 font-medium text-primary-600 hover:text-primary-700 text-sm"
                      >
                        View Profile
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-12 text-gray-500 text-center"
                  >
                    No members found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {membersData && membersData.totalPages > 1 && (
          <div className="flex justify-between items-center p-6 border-gray-100 border-t">
            <p className="text-gray-500 text-sm">
              Showing{" "}
              <span className="font-medium">{filteredMembers?.length}</span> of{" "}
              <span className="font-medium">{membersData.totalDocs}</span>{" "}
              members
            </p>
            <div className="flex items-center gap-2">
              {/* Pagination logic would go here if needed, but keeping it simple for now */}
              <Button
                variant="outline"
                size="sm"
                disabled={membersData.page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={membersData.page === membersData.totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersPage;
