export type ColumnDef<T> = {
    key: keyof T | string;
    label: string;
    render: (item: T) => React.ReactNode;
};

export interface CustomTableProps<T> {
    tableName: string;
    columns: ColumnDef<T>;
    fetchData: (item: T) => React.ReactNode;
    actions?: (items: T) => React.ReactNode;
    queryKey: string | unknown[]
    actionLabel?: string;
}