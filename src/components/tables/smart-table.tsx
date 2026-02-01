import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from "react";
import {
  CustomTableProps,
  PaginateResult,
  PaginationControlsType,
} from "../../../types";
import { ErrorSpan } from "../ui/errors";
import { Button } from "../ui/button";
import DataFetchSpinner from "../ui/data-fetch-spinner";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import PaginationControls from "./ui/pagination-controls";
import { toast } from "sonner";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { ExportButton } from "../common/ExportButton";

function CustomTable<T>(props: CustomTableProps<T>) {
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPageNumber(1);
  }, [debouncedSearch]);

  const { data, isLoading, isError, refetch, isSuccess } = useQuery<
    PaginateResult<T>
  >({
    queryKey: Array.isArray(props.queryKey)
      ? ["table", ...props.queryKey, pageNumber, debouncedSearch]
      : ["table", props.queryKey, pageNumber, debouncedSearch],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const result: PaginateResult<T> = await props.fetchData(pageNumber, debouncedSearch);
        return result;
      } catch (error) {
        toast.error("Error fetching data");
        throw new Error("Error fetching data");
      }
    },
  });

  const changePage = (newPage: number) => {
    setPageNumber(newPage);
  };

  const paginationControlsProps: PaginationControlsType = {
    totalDocs: data?.totalDocs || 0,
    limit: data?.limit || 0,
    totalPages: data?.totalPages || 0,
    page: data?.page || 0,
    pagingCounter: data?.pagingCounter || 0,
    hasPrevPage: data?.hasPrevPage || false,
    hasNextPage: data?.hasNextPage || false,
    prevPage: data?.prevPage || null,
    nextPage: data?.nextPage || null,
    changePage: (page: number) => {
      changePage(page);
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {props.showSearch && (
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
            />
          </div>
        )}
        <div className="flex items-center gap-2 ml-auto">
          {props.exportable && (
            <ExportButton 
              data={data?.docs || []} 
              columns={props.columns.map(c => ({ key: c.key as string, label: c.label || (c.key as string) }))}
              fileName={props.exportFileName || props.tableName} 
            />
          )}
        </div>
      </div>

      {isError && (
        <div
          className={cn(
            "relative flex flex-col justify-center items-center gap-2 h-50",
            props.tableClassName
          )}
        >
          <ErrorSpan message="Error fetching data" />
          <Button
            className="bg-secondary-900 hover:bg-secondary-900/90 cursor-pointer"
            onClick={() => refetch()}
          >
            Retry
          </Button>
        </div>
      )}

      {isLoading && (
        <div
          className={cn(
            "relative flex flex-col justify-center items-center gap-2 h-50",
            props.tableClassName
          )}
        >
          <DataFetchSpinner />
        </div>
      )}

      {isSuccess && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          <div className={cn("overflow-x-auto", props.tableWrapperClassName)}>
            <Table className={props.tableClassName}>
              <TableHeader>
                <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                  {props.index && <TableHead className="w-12 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">#</TableHead>}
                  {props.columns.map((col, index) => (
                    <TableHead key={index} className={cn("text-xs font-semibold text-gray-500 uppercase tracking-wider py-4", col.headerClassName)}>
                      {col.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.docs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={props.columns.length + (props.index ? 1 : 0)} className="h-32 text-center text-gray-500">
                      No matching records found
                    </TableCell>
                  </TableRow>
                ) : (
                  data.docs.map((row, index) => (
                    <TableRow
                      key={index}
                      onClick={() => props.onRowClick?.(row)}
                      className={cn(
                        "group transition-colors",
                        props.onRowClick && "cursor-pointer hover:bg-gray-50/80"
                      )}
                    >
                      {props.index && (
                        <TableCell className="text-center text-sm text-gray-500 font-medium">
                          {index + data.pagingCounter}
                        </TableCell>
                      )}
                      {props.columns.map((cel, indx) => (
                        <TableCell key={indx} className={cn("py-4 text-sm text-gray-600", cel.cellClassName)}>
                          {cel.render(row)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
              {props.footer && <TableFooter>{props.footer}</TableFooter>}
            </Table>
          </div>

          {props.pagination && (
            <div
              className={cn(
                "flex flex-col sm:flex-row justify-between items-center p-6 border-t border-gray-100 gap-4",
                props.paginationClassName
              )}
            >
              <p className="text-gray-400 text-sm">
                Showing <span className="font-medium text-gray-700">{data.docs.length}</span> of{" "}
                <span className="font-medium text-gray-700">{data.totalDocs}</span> records
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!data.hasPrevPage}
                  onClick={() => changePage(data.prevPage as number)}
                  className="gap-1 px-4 border-gray-200 hover:bg-gray-50 h-9 rounded-lg"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!data.hasNextPage}
                  onClick={() => changePage(data.nextPage as number)}
                  className="gap-1 px-4 border-gray-200 hover:bg-gray-50 h-9 rounded-lg"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CustomTable;