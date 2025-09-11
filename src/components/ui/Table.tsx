"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TableProps = React.ComponentPropsWithoutRef<"table">;
type TableCaptionProps = React.ComponentPropsWithoutRef<"caption">;
type TableHeaderProps = React.ComponentPropsWithoutRef<"thead">;
type TableRowProps = React.ComponentPropsWithoutRef<"tr">;
type TableHeadProps = React.ComponentPropsWithoutRef<"th">;
type TableBodyProps = React.ComponentPropsWithoutRef<"tbody">;
type TableCellProps = React.ComponentPropsWithoutRef<"td">;
type TableFooterProps = React.ComponentPropsWithoutRef<"tfoot">;

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ children, className, ...props }, ref) => (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        ref={ref}
        data-slot="table"
        className={cn("px-10 py-7.5 w-full border-collapse", className)}
        {...props}
      >
        {children}
      </table>
    </div>
  )
);
Table.displayName = "Table";

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ children, className, ...props }, ref) => (
  <caption
    ref={ref}
    data-slot="table-caption"
    className={cn("mb-5 font-medium text-muted-foreground text-xl", className)}
    {...props}
  >
    {children}
  </caption>
));
TableCaption.displayName = "TableCaption";

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ children, className, ...props }, ref) => (
  <thead
    ref={ref}
    data-slot="table-header"
    className={cn("border-[0.5] border-black/20 [&_tr]:border-b", className)}
    {...props}
  >
    {children}
  </thead>
));
TableHeader.displayName = "TableHeader";

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, className, ...props }, ref) => (
    <tr
      ref={ref}
      data-slot="table-row"
      className={cn(
        "data-[state=selected]:bg-muted hover:bg-muted/50 border-t border-black/20 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  )
);
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ children, className, ...props }, ref) => (
    <th
      ref={ref}
      data-slot="table-head"
      className={cn(
        "py-3.5 font-semibold text-left px-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
);
TableHead.displayName = "TableHead";

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ children, className, ...props }, ref) => (
  <tbody
    ref={ref}
    data-slot="table-body"
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  >
    {children}
  </tbody>
));
TableBody.displayName = "TableBody";

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, className, ...props }, ref) => (
    <td
      ref={ref}
      data-slot="table-cell"
      className={cn(
        "py-3.5 p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    >
      {children}
    </td>
  )
);
TableCell.displayName = "TableCell";

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(({ children, className, ...props }, ref) => (
  <tfoot
    ref={ref}
    data-slot="table-footer"
    className={cn(
      "bg-muted/50 border-t [&>tr]:last:border-b-0 font-medium",
      className
    )}
    {...props}
  >
    {children}
  </tfoot>
));
TableFooter.displayName = "TableFooter";
