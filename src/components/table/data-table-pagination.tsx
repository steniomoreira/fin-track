import { type Table } from '@tanstack/react-table';

import { Button } from '../ui/button';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="bg-muted/30 flex items-center justify-between px-6 py-3">
      <div className="text-muted-foreground flex-1 text-sm">
        Exibindo {table.getState().pagination.pageIndex + 1} de{' '}
        {table.getPageCount()} páginas de transações
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            Anterior
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
