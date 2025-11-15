import { useQuery } from '@tanstack/react-query';
import React, { useState } from "react";
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
        toast.success("Fetched members");
        return result;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Error fetching members");
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
    <div>
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
      <div>
        <div className={cn("lg:w-fit")}>
          {isSuccess && (
            <div
              className={cn(
                "h-125 overflow-scroll",
                props.tableWrapperClassName
              )}
            >
              <Table className={props.tableClassName}>
                <TableHeader>
                  <TableRow>
                    {props.index && <TableHead className="w-5"></TableHead>}
                    {props.columns.map((col, index) => {
                      return (
                        <TableHead key={index} className={col.headerClassName}>
                          {col.label}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.docs.map((row, index) => {
                    return (
                      <TableRow key={index}>
                        {props.index && (
                          <TableCell>{index + data.pagingCounter}</TableCell>
                        )}
                        {props.columns.map((cel, indx) => {
                          return (
                            <TableCell key={indx} className={cel.cellClassName}>
                              {cel.render(row)}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>{props.footer}</TableFooter>
              </Table>
            </div>
          )}
          <div className={props.paginationClassName}>
            <PaginationControls {...paginationControlsProps} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTable