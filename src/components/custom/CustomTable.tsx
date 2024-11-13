"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TableSkeleton from "./skeletons/TableSkeleton";
import Error from "./Error";
import NoItemsFound from "./NoItemsFound";
import { Button } from "@components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type TCustomTableProps<T> = {
  moduleNameSingular: string;
  isLoading: boolean;
  isError: boolean;
  rows: T[];
  columns: ColumnDef<T>[];
  setOpenCreateModal?: React.Dispatch<React.SetStateAction<boolean>>;
  createHandler?: () => void;
  isCollapsible?: boolean;
  hideFilterBar?: boolean;
  hidePagination?: boolean;
  page?: number;
  limit?: number;
  totalCount?: number; // Changed from totalPages to totalCount
  onPageChange?: (page: number) => void;
};

const CustomTable = <T,>({
  moduleNameSingular,
  isLoading,
  isError,
  rows,
  columns,
  setOpenCreateModal,
  createHandler,
  hideFilterBar = false,
  hidePagination = false,
  className,
  page = 1,
  limit = 10,
  totalCount=0, // Changed from totalPages to totalCount
  onPageChange=()=>{},
}: TCustomTableProps<T> & { className?: string }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const [showInvalidPageDialog, setShowInvalidPageDialog] = useState(false);

  const table = useReactTable({
    data: rows,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isLoading) return <TableSkeleton />;
  if (isError) return <Error />;
  if (rows?.length === 0) {
    if (page > 1) {
      return (
        <AlertDialog open={true} onOpenChange={setShowInvalidPageDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Invalid Page</AlertDialogTitle>
              <AlertDialogDescription>
                The requested page does not exist. Please return to a valid page.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => onPageChange(1)}>
                Go to First Page
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    }
    return (
      <NoItemsFound
        title={`You have no ${moduleNameSingular}`}
        buttonLabel={`Create ${moduleNameSingular}`}
        buttonHandler={() => {
          if (createHandler) {
            createHandler();
          } else if (setOpenCreateModal) {
            setOpenCreateModal(true);
          }
        }}
      />
    );
  }

  const totalPages = Math.ceil(totalCount / limit); // Calculate totalPages

  return (
    <div className="w-full">
      {!hideFilterBar && (
        <div className="flex items-center py-4">
          <input
            placeholder="Search here..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm p-2 border rounded bg-background"
          />
          <div className="ml-auto relative">
            <button
              onClick={() => setIsColumnMenuOpen(!isColumnMenuOpen)}
              className="p-2 bg-background border rounded flex items-center"
            >
              Columns
              <svg
                className="ml-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isColumnMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <label key={column.id} className="flex items-center p-2 hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={column.getIsVisible()}
                        onChange={(e) => column.toggleVisibility(e.target.checked)}
                        className="mr-2"
                      />
                      <span className="capitalize">{column.id}</span>
                    </label>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
      <div className={`rounded-md border bg-white dark:bg-black ${className}`}>
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-2 text-left font-semibold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table?.getRowModel()?.rows?.length ? (
              table?.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-t"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-700"
                >
                  No results found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {!hidePagination && (
        <div className="flex items-center justify-end space-x-2 p-4">
          <div className="flex-1 text-sm text-gray-700">
            Page {page} of {totalPages}
          </div>
          <div className="space-x-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded bg-background disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages || totalCount <= page * limit}
              className="px-3 py-1 border rounded bg-background disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTable;
