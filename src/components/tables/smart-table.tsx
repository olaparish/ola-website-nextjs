import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  CustomTableProps,
  PaginateResult,
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
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import { Input } from "../ui/input";

function CustomTable<T>(props: CustomTableProps<T>) {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, isError, refetch, isSuccess } = useQuery<
    PaginateResult<T>
  >({
    queryKey: Array.isArray(props.queryKey)
      ? ["table", ...props.queryKey, pageNumber]
      : ["table", props.queryKey, pageNumber],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const result: PaginateResult<T> = await props.fetchData(pageNumber);
        // toast.success("Data fetched successfully"); // Removed toast for better UX
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

  if (isLoading) {
    return (
      <div className="p-12 flex justify-center bg-white rounded-xl border border-gray-100 shadow-sm">
        <DataFetchSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-12 flex flex-col items-center gap-4 bg-white rounded-xl border border-red-100 shadow-sm">
        <ErrorSpan message="Failed to load table data" />
        <Button
          variant="outline"
          onClick={() => refetch()}
          className="border-red-200 text-red-600 hover:bg-red-50"
        >
          Retry Loading
        </Button>
      </div>
    );
  }

  if (!isSuccess || !data) return null;

  return (
    <div
      className={cn(
        "bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden",
        props.tableWrapperClassName
      )}
    >
      {(props.tableName || props.actions) && (
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="flex flex-col gap-2 flex-1">
              {props.tableName && (
                <h3 className="font-semibold text-gray-900">{props.tableName}</h3>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-10 gap-2 border-gray-200">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              {props.actions && props.actions({} as T)} {/* Placeholder for actions */}
            </div>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto no-scrollbar-x">
        <Table className={cn("w-full min-w-full", props.tableClassName)}>
          <TableHeader>
            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 border-none">
              {props.index && (
                <TableHead className="w-12 py-4 px-6 font-semibold text-gray-900">
                  #
                </TableHead>
              )}
              {props.columns.map((col, index) => (
                <TableHead
                  key={index}
                  className={cn(
                    "py-4 px-6 font-semibold text-gray-900",
                    col.headerClassName
                  )}
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.docs.length > 0 ? (
              data.docs.map((row, index) => (
                <TableRow
                  key={index}
                  onClick={() => props.onRowClick?.(row)}
                  className={cn(
                    "transition-colors border-gray-50",
                    props.onRowClick
                      ? "cursor-pointer hover:bg-gray-50/30"
                      : "hover:bg-gray-50/10"
                  )}
                >
                  {props.index && (
                    <TableCell className="py-4 px-6 text-gray-500 font-medium">
                      {index + data.pagingCounter}
                    </TableCell>
                  )}
                  {props.columns.map((cel, indx) => (
                    <TableCell
                      key={indx}
                      className={cn("py-4 px-6", cel.cellClassName)}
                    >
                      {cel.render(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={props.columns.length + (props.index ? 1 : 0)}
                  className="py-12 text-center text-gray-500 italic"
                >
                  No records found.
                </TableCell>
              </TableRow>
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
          <p className="text-gray-500 text-sm">
            Showing <span className="font-medium">{data.docs.length}</span> of{" "}
            <span className="font-medium">{data.totalDocs}</span> records
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!data.hasPrevPage}
              onClick={() => changePage(data.prevPage as number)}
              className="gap-1 px-4 border-gray-200 hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!data.hasNextPage}
              onClick={() => changePage(data.nextPage as number)}
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

export default CustomTable;