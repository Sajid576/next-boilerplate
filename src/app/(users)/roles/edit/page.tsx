"use client";

import PageHeader from "@components/custom/PageHeader";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import RoleForm, { TRoleFormData } from "../components/RoleForm";
import { MODULE_NAME_SINGULAR } from "../config";
import { useEditRoleMutation, useGetRoleQuery } from "../roles.api";
import { convertPermissions } from "../utils";

export default function EditRole() {
  const searchParam = useSearchParams();
  const roleId = searchParam.get("roleId");
  const {
    data: role,
    isLoading: isRoleLoading,
    isError: isRoleError,
  } = useGetRoleQuery(roleId, {
    skip: !roleId,
  });
  const [editRole, { isLoading: isEditRoleLoading, isError: isEditRoleError }] =
    useEditRoleMutation();

  const editHandler = async (data: TRoleFormData) => {
    await editRole({ id: roleId, data });
    if (!isEditRoleLoading && !isEditRoleError) {
      toast.success(`${MODULE_NAME_SINGULAR} has been updated successfully!`, {
        dismissible: true,
      });
    }
  };

  // console.log("convertPermissions", convertPermissions(role?.data), role);
  return (
    <>
      <PageHeader title={`Edit ${MODULE_NAME_SINGULAR}`} />
      {role?.data && (
        <RoleForm
          onSubmitHandler={editHandler}
          defaultValues={convertPermissions(role?.data)}
        />
      )}
    </>
  );
}
