"use client";

import { CustomAlertDialog } from "@components/custom/CustomAlertDialog";
import { CustomDropdown } from "@components/custom/CustomDropdown";
import CustomTable from "@components/custom/CustomTable";
import CustomTableCell from "@components/custom/CustomTableCell";
import { Modal } from "@components/custom/Modal";
import PageHeader from "@components/custom/PageHeader";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { useCreateDistributorUserMutation, useDeleteDistributorUserMutation, useEditDistributorUserMutation, useGetDistributorUserQuery, useGetDistributorUsersQuery } from "./distributor.api";
import { MODULE_NAME, MODULE_NAME_SINGULAR } from "./distributor.config";
import { TDistributorUser } from "./distributor.types";
import DistributorUserForm, { TDistributorUserFormData } from "./components/DistributorUserForm";

export default function DistributorUsersPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openAssignWarehouseModal, setOpenAssignWarehouseModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteWarning, setOpenDeleteWarning] = useState(false)
  const { data: users, isLoading, isError } = useGetDistributorUsersQuery(null)
  const {
    data: user,
    isLoading: isDistributorUserLoading,
    isError: isDistributorUserError,
  } = useGetDistributorUserQuery(selectedId, {
    skip: !selectedId,
  });
  
  const [
    createDistributorUser,
    { isLoading: isCreateDistributorUserLoading, isError: isCreateDistributorUserError },
  ] = useCreateDistributorUserMutation();

  const [editDistributorUser, { isLoading: isEditDistributorUserLoading, isError: isEditDistributorUserError }] =
    useEditDistributorUserMutation();

    const [
    deleteDistributorUser,
    {
      isSuccess: isDeleteSuccess,
      isLoading: isDeleteLoading,
      isError: isDeleteError,
    },
  ] = useDeleteDistributorUserMutation();

  const rows = users?.data;

  const columns: ColumnDef<TDistributorUser>[] = [
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
      accessorKey: "userName",
      header: "Name",
      cell: ({ row }) => (
        <CustomTableCell className="capitalize" row={row} column="userName" />
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <CustomTableCell className="" row={row} column="email" />
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <CustomTableCell className="capitalize" row={row} column="role" />
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
                  setOpenEditModal(true);
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

  
  const createHandler = async (data: TDistributorUserFormData) => {
    await createDistributorUser({ ...data, distributionHubName: 'Distribution Hub' });
    if (!isCreateDistributorUserLoading && !isCreateDistributorUserError) {
      setOpenCreateModal(false);
      toast.success(
        `A new ${MODULE_NAME_SINGULAR} has been created successfully!`,
        {
          dismissible: true,
        }
      );
    }
  };

  const editHandler = async (data: TDistributorUserFormData) => {
    await editDistributorUser({ id: selectedId, data });
    if (!isEditDistributorUserLoading && !isEditDistributorUserError) {
      setOpenEditModal(false);
      toast.success(`${MODULE_NAME_SINGULAR} has been updated successfully!`, {
        dismissible: true,
      });
    }
  };

  const deleteHandler = async () => {
    if (selectedId) {
      try {
        await deleteDistributorUser(selectedId).unwrap();
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

  return (
    <>
      <PageHeader
        title={MODULE_NAME}
        buttonLabel={`Create new ${MODULE_NAME_SINGULAR}`}
        buttonHandler={() => {
          setOpenCreateModal(true);
        }}
      />
      <CustomTable
        moduleNameSingular={MODULE_NAME_SINGULAR}
        isLoading={isLoading}
        isError={isError}
        rows={rows}
        columns={columns}
        setOpenCreateModal={setOpenCreateModal}
        onPageChange={()=>{}}
      />

      {/* Modals & AlertDialogs */}
      <Modal
        isOpen={openCreateModal}
        setIsOpen={setOpenCreateModal}
        title={`Create new ${MODULE_NAME_SINGULAR}`}
      >
        <DistributorUserForm onSubmitHandler={createHandler} />
      </Modal>
      
      <Modal
        isOpen={openEditModal}
        setIsOpen={setOpenEditModal}
        title={`Edit ${MODULE_NAME_SINGULAR}`}
      >
        {user?.data && (
          <DistributorUserForm
            defaultValues={{ ...user?.data }}
            onSubmitHandler={editHandler}
          />
        )}
      </Modal>
      <CustomAlertDialog
        isOpen={openDeleteWarning}
        setIsOpen={setOpenDeleteWarning}
        continueHandler={deleteHandler}
      />
    </>
  );
}
