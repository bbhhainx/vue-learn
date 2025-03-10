import '@tanstack/vue-table'
declare module "@tanstack/vue-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    cell_class?: string;
		header_class?: string;
  }
}

