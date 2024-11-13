"use client";

import PageHeader from "@components/custom/PageHeader";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import RoleForm, { TRoleFormData } from "../components/RoleForm";
import { MODULE_NAME_SINGULAR } from "../config";
import { useCreateRoleMutation } from "../roles.api";

export default function CreateRole() {
  const router = useRouter();
  const [
    createRole,
    { isLoading: isCreateRoleLoading, isError: isCreateRoleError },
  ] = useCreateRoleMutation();

  const createHandler = async (data: TRoleFormData) => {
    await createRole(data);
    if (!isCreateRoleLoading && !isCreateRoleError) {
      toast.success(
        `A new ${MODULE_NAME_SINGULAR} has been created successfully!`,
        {
          dismissible: true,
        }
      );
      router.push("/roles");
    }
  };
  
  return (
    <>
      <PageHeader title={`Create new ${MODULE_NAME_SINGULAR}`} />
      <RoleForm onSubmitHandler={createHandler} />
    </>
  );
}
