import { PaginateResult } from "./inputs";

export type ColumnDef<T> = {
  key: keyof T | string;
  label?: string;
  headerClassName?: string;
  cellClassName?: string;
  render: (item: T) => React.ReactNode;
};

export interface CustomTableProps<T> {
  tableName: string;
  columns: ColumnDef<T>[];
  queryKey: string | unknown[];
  actionLabel?: string;
  index?: boolean;
  tableClassName?: string;
  tableWrapperClassName?: string;
  paginationClassName?: string;
  pagination?: boolean;
  footer?: React.ReactNode;
  fetchData: (pageNumber?: number) => Promise<PaginateResult<T>>;
  actions?: (items: T) => React.ReactNode;
  onRowClick?: (item: T) => void;
}
