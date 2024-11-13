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

import { useCreateAgentUserMutation, useDeleteAgentUserMutation, useEditAgentUserMutation, useGetAgentUserQuery, useGetAgentUsersQuery } from "./agent.api";
import { MODULE_NAME, MODULE_NAME_SINGULAR } from "./agent.config";
import AgentUserForm, { TAgentUserFormData } from "./components/AgentUserForm";
import { TAgentUser } from "./agent.types";

export default function AgentUsersPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openAssignWarehouseModal, setOpenAssignWarehouseModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteWarning, setOpenDeleteWarning] = useState(false)
  const { data: users, isLoading, isError } = useGetAgentUsersQuery(null)
  const {
    data: user,
    isLoading: isAgentUserLoading,
    isError: isAgentUserError,
  } = useGetAgentUserQuery(selectedId, {
    skip: !selectedId,
  });
  
  const [
    createAgentUser,
    { isLoading: isCreateAgentUserLoading, isError: isCreateAgentUserError },
  ] = useCreateAgentUserMutation();
  const [editAgentUser, { isLoading: isEditAgentUserLoading, isError: isEditAgentUserError }] =
    useEditAgentUserMutation();
  const [
    deleteAgentUser,
    {
      isSuccess: isDeleteSuccess,
      isLoading: isDeleteLoading,
      isError: isDeleteError,
    },
  ] = useDeleteAgentUserMutation();

  const rows = users?.data;

  const columns: ColumnDef<TAgentUser>[] = [
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
                label: "Assign a warehouse",
                handler: () => {
                  setSelectedId(row?.original?.id);
                  setOpenAssignWarehouseModal(true);
                },
              },
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

  
  const createHandler = async (data: TAgentUserFormData) => {
    await createAgentUser(data);
    if (!isCreateAgentUserLoading && !isCreateAgentUserError) {
      setOpenCreateModal(false);
      toast.success(
        `A new ${MODULE_NAME_SINGULAR} has been created successfully!`,
        {
          dismissible: true,
        }
      );
    }
  };

  const editHandler = async (data: TAgentUserFormData) => {
    await editAgentUser({ id: selectedId, data });
    if (!isEditAgentUserLoading && !isEditAgentUserError) {
      setOpenEditModal(false);
      toast.success(`${MODULE_NAME_SINGULAR} has been updated successfully!`, {
        dismissible: true,
      });
    }
  };

  const deleteHandler = async () => {
    await deleteAgentUser(selectedId);
    if (!isDeleteSuccess && !isDeleteLoading && !isDeleteError) {
      toast.success(`${MODULE_NAME_SINGULAR} has been deleted successfully!`, {
        dismissible: true,
      });
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
      />

      {/* Modals & AlertDialogs */}
      <Modal
        isOpen={openCreateModal}
        setIsOpen={setOpenCreateModal}
        title={`Create new ${MODULE_NAME_SINGULAR}`}
      >
        <AgentUserForm onSubmitHandler={createHandler} />
      </Modal>
      
      <Modal
        isOpen={openEditModal}
        setIsOpen={setOpenEditModal}
        title={`Edit ${MODULE_NAME_SINGULAR}`}
      >
        {user?.data && (
          <AgentUserForm
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
