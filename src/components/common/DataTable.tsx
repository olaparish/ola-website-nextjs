"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";

export interface DashboardColumn<T> {
  header: string;
  render: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: DashboardColumn<T>[];
  isLoading?: boolean;
  isError?: boolean;
  onRowClick?: (item: T) => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  pagination?: {
    page: number;
    totalPages: number;
    totalDocs: number;
    onPageChange: (page: number) => void;
  };
  actions?: React.ReactNode;
  emptyMessage?: string;
  title?: string;
}

export function DataTable<T>({
  data,
  columns,
  isLoading,
  isError,
  onRowClick,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search...",
  pagination,
  actions,
  emptyMessage = "No records found.",
  title,
}: DataTableProps<T>) {
  if (isLoading) return <div className="p-12 flex justify-center bg-white rounded-xl border border-gray-100 shadow-sm"><DataFetchSpinner /></div>;
  
  if (isError) {
    return (
       <div className="p-12 text-center text-red-500 bg-white rounded-xl border border-red-100 italic shadow-sm">
          Error loading data. Please try again later.
       </div>
    );
  }

  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
      {/* Header with Search and Actions */}
      {(onSearchChange || actions || title) && (
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="flex flex-col gap-2 flex-1">
               {title && <h3 className="font-semibold text-gray-900">{title}</h3>}
               {onSearchChange !== undefined && (
                  <div className="relative flex-1 max-w-md">
                    <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                    <Input
                      placeholder={searchPlaceholder}
                      className="pl-10 h-10 bg-gray-50/50 border-gray-100 focus:bg-white transition-colors"
                      value={searchTerm}
                      onChange={(e) => onSearchChange(e.target.value)}
                    />
                  </div>
               )}
            </div>
            <div className="flex items-center gap-2">
              {actions}
            </div>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="overflow-x-auto no-scrollbar-x">
        <Table className="w-full min-w-full overflow-x-auto">
          <TableHeader>
            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 border-none">
              {columns.map((col, idx) => (
                <TableHead
                  key={idx}
                  className={cn(
                    "font-semibold text-gray-900 py-4 px-6",
                    col.className
                  )}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, rowIdx) => (
                <TableRow
                  key={rowIdx}
                  onClick={() => onRowClick?.(item)}
                  className={cn(
                    "transition-colors border-gray-50",
                    onRowClick
                      ? "cursor-pointer hover:bg-gray-50/30"
                      : "hover:bg-gray-50/10"
                  )}
                >
                  {columns.map((col, colIdx) => (
                    <TableCell
                      key={colIdx}
                      className={cn("py-4 px-6", col.className)}
                    >
                      {col.render(item)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-12 text-center text-gray-500 italic"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      {pagination && (
        <div className="flex flex-col sm:flex-row justify-between items-center p-6 border-t border-gray-100 gap-4">
          <p className="text-gray-500 text-sm">
            Showing <span className="font-medium">{data.length}</span> of{" "}
            <span className="font-medium">{pagination.totalDocs}</span> records
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page <= 1}
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              className="gap-1 px-4 border-gray-200 hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              className="gap-1 px-4 border-gray-200 hover:bg-gray-50"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
