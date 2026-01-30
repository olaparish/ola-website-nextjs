"use client";

// import { TableHeader } from "@/components/ui/Table";
import { ParishGroup, ColumnDef } from "../../../../types";
import TableText from "../ui/normal-text";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

type Props = {
  groups: ParishGroup[];
  title: string;
  onRowClick?: (group: ParishGroup) => void;
};

const GroupsListTable = ({ groups, title, onRowClick }: Props) => {
  const router = useRouter();

  const columns: ColumnDef<ParishGroup>[] = [
    {
      key: "name",
      label: "Group Name",
      render: (item) => (
        <TableText text={item.name} className="font-semibold text-gray-900" />
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (item) => <TableText text={item.type} className="capitalize" />,
    },
    {
      key: "email",
      label: "Email",
      render: (item) => <TableText text={item.email || "N/A"} />,
    },
    {
      key: "phone",
      label: "Phone",
      render: (item) => <TableText text={item.phone || "N/A"} />,
    },
    {
      key: "dateFounded",
      label: "Founded",
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
    <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
      <div className="bg-gray-50/50 px-6 py-4 border-gray-50 border-b">
        <h3 className="font-bold text-gray-900">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead key={idx}>{col.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-8 text-gray-500 text-center"
                >
                  No records found.
                </TableCell>
              </TableRow>
            ) : (
              groups.map((group, idx) => (
                <TableRow
                  key={idx}
                  onClick={() =>
                    onRowClick
                      ? onRowClick(group)
                      : router.push(`/dashboard/groups/${group.slug}`)
                  }
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {columns.map((col, cIdx) => (
                    <TableCell key={cIdx}>{col.render(group)}</TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GroupsListTable;
