"use client";

import { CustomAlertDialog } from "@components/custom/CustomAlertDialog";
import { CustomDropdown } from "@components/custom/CustomDropdown";
import CustomTable from "@components/custom/CustomTable";
import CustomTableCell from "@components/custom/CustomTableCell";
import PageHeader from "@components/custom/PageHeader";
import { Button } from "@components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { BASE_ROUTE, MODULE_NAME, MODULE_NAME_SINGULAR } from "./config";
// import {
//   useDeleteRoleMutation,
//   useGetRoleQuery,
//   useGetRolesQuery
// } from "./roles.api";
import { TRole } from "./types";

export default function IssueListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const limit = 10;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openDeleteWarning, setOpenDeleteWarning] = useState(false);

  const { data: rolesData, isLoading, isError } = useGetRolesQuery({ page, limit });
  const rows = rolesData?.data?.roles;
  const totalCount = rolesData?.data?.totalRows || 0;

  const columns: ColumnDef<TRole>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <CustomTableCell className="" row={row} column="name" />
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Description
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <CustomTableCell className="lowercase" row={row} column="description" />
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <CustomDropdown
            menuLabel="Actions"
            options={[
              {
                label: "Edit",
                handler: () => {
                  setSelectedId(row?.original?.id);
                  router.push(`/roles/edit?roleId=${row?.original?.id}`);
                },
              },
              {
                label: "Delete",
                handler: () => {
                  setSelectedId(row?.original?.id);
                  setOpenDeleteWarning(true);
                },
              },
            ]}
          />
        );
      },
    },
  ];

  const [deleteRole, { isSuccess: isDeleteSuccess, isLoading: isDeleteLoading, isError: isDeleteError }] = useDeleteRoleMutation();

  const deleteHandler = async () => {
    if (selectedId) {
      try {
        await deleteRole(selectedId).unwrap();
        toast.success(`${MODULE_NAME_SINGULAR} has been deleted successfully!`, {
          dismissible: true,
        });
        setOpenDeleteWarning(false);
      } catch (error) {
        toast.error(`Failed to delete ${MODULE_NAME_SINGULAR}. Please try again.`, {
          dismissible: true,
        });
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`/roles?page=${newPage}`);
  };

  
  return (
    <>
      <PageHeader
        title={MODULE_NAME}
        buttonLabel={`Create new ${MODULE_NAME_SINGULAR}`}
        buttonHandler={() => {
          router.push(`${BASE_ROUTE}/create`);
        }}
      />
      <CustomTable
        moduleNameSingular={MODULE_NAME_SINGULAR}
        isLoading={isLoading}
        isError={isError}
        rows={rows || []}
        columns={columns}
        createHandler={() => {
          router.push(`${BASE_ROUTE}/create`);
        }}
        page={page}
        limit={limit}
        totalCount={totalCount}
        onPageChange={handlePageChange}
      />

      {/* Modals & AlertDialogs */}

      <CustomAlertDialog
        isOpen={openDeleteWarning}
        setIsOpen={setOpenDeleteWarning}
        continueHandler={deleteHandler}
      />
    </>
  );
}
