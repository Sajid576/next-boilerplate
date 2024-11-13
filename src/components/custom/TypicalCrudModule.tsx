import { Button } from "@components/ui/button";
import { TReactNode } from "@types";
import React from "react";
import { CustomAlertDialog } from "./CustomAlertDialog";
import { DataTable } from "./DataTable";
import { Modal } from "./Modal";
import NoItemsFound from "./NoItemsFound";
import PageTitle from "./SectionTitle";
import TableSkeleton from "./skeletons/TableSkeleton";

type TTypicalCrudModuleProps = {
  moduleName: string;
  moduleNameSingular: string;
  isLoading: boolean;
  isError: boolean;
  rows: any[];
  columns: any[];
  deleteHandler: () => void | Promise<void>;
  createForm: TReactNode;
  editForm: TReactNode;
  openCreateModal: boolean;
  setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  openEditModal: boolean;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  openDeleteWarning: boolean;
  setOpenDeleteWarning: React.Dispatch<React.SetStateAction<boolean>>;
};

const TypicalCrudModule = ({
  moduleName,
  moduleNameSingular,
  isLoading,
  isError,
  rows,
  columns,
  deleteHandler,
  createForm,
  editForm,
  openCreateModal,
  setOpenCreateModal,
  openEditModal,
  setOpenEditModal,
  openDeleteWarning,
  setOpenDeleteWarning,
}: TTypicalCrudModuleProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle title={moduleName} />
        <Button onClick={() => setOpenCreateModal(true)}>
          {`Create new ${moduleNameSingular}`}
        </Button>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <h2 className="text-red-600">Something went wrong!</h2>
      ) : rows?.length === 0 ? (
        <NoItemsFound
          title={`You have no ${moduleNameSingular}`}
          buttonLabel={`Create ${moduleNameSingular}`}
          buttonHandler={() => setOpenCreateModal(true)}
        />
      ) : (
        <DataTable data={rows} columns={columns} />
      )}

      {/* Modals & AlertDialogs */}
      <Modal
        isOpen={openCreateModal}
        setIsOpen={setOpenCreateModal}
        title={`Create new ${moduleNameSingular}`}
      >
        {createForm}
      </Modal>
      <Modal
        isOpen={openEditModal}
        setIsOpen={setOpenEditModal}
        title={`Edit ${moduleNameSingular}`}
      >
        {editForm}
      </Modal>
      <CustomAlertDialog
        isOpen={openDeleteWarning}
        setIsOpen={setOpenDeleteWarning}
        continueHandler={deleteHandler}
      />
    </>
  );
};

export default TypicalCrudModule;
