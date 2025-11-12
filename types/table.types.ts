export type ColumnDef<T> = {
  key: keyof T | string;
  label: string;
  render: (item: T) => React.ReactNode;
};

export interface CustomTableProps<T> {
  tableName: string;
  columns: ColumnDef<T>[];
  fetchData: () => Promise<T>;
  actions?: (items: T) => React.ReactNode;
  queryKey: string | unknown[];
  actionLabel?: string;
}
