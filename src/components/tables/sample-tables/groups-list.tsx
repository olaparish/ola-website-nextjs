import { useState } from "react";
import { ParishGroup } from "../../../../types";
import TableText from "../ui/normal-text";
import { useRouter } from "next/navigation";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, DashboardColumn } from "@/components/common/DataTable";

type Props = {
  groups: ParishGroup[];
  title: string;
  onRowClick?: (group: ParishGroup) => void;
  showSearch?: boolean;
};

const GroupsListTable = ({ groups, title, onRowClick, showSearch = false }: Props) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
  const paginatedGroups = filteredGroups.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const columns: DashboardColumn<ParishGroup>[] = [
    {
      header: "Group Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center bg-secondary-100 rounded-full w-10 h-10 font-bold text-secondary-700">
            {item.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <TableText text={item.name} className="font-semibold text-gray-900" />
        </div>
      ),
    },
    {
      header: "Type",
      render: (item) => <TableText text={item.type} className="capitalize" />,
    },
    {
      header: "Email",
      render: (item) => <TableText text={item.email || "N/A"} />,
    },
    {
      header: "Phone",
      render: (item) => <TableText text={item.phone || "N/A"} />,
    },
    {
      header: "Founded",
      render: (item) => (
        <TableText
          text={
            item.dateFounded
              ? new Date(item.dateFounded).toLocaleDateString()
              : "N/A"
          }
        />
      ),
    },
  ];

  return (
    <DataTable
      title={title}
      data={paginatedGroups}
      columns={columns}
      onRowClick={(group) =>
        onRowClick
          ? onRowClick(group)
          : router.push(`/dashboard/groups/${group.slug}`)
      }
      searchTerm={showSearch ? searchTerm : undefined}
      onSearchChange={
        showSearch
          ? (val) => {
              setSearchTerm(val);
              setPage(1);
            }
          : undefined
      }
      searchPlaceholder={`Search ${title.toLowerCase()}...`}
      actions={
        showSearch ? (
          <Button
            variant="outline"
            size="sm"
            className="h-10 gap-2 border-gray-200"
          >
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        ) : undefined
      }
      pagination={{
        page,
        totalPages: totalPages || 1,
        totalDocs: filteredGroups.length,
        onPageChange: (newPage) => setPage(newPage),
      }}
    />
  );
};

export default GroupsListTable;
