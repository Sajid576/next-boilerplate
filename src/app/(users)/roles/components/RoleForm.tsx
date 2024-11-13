import CustomCard from "@components/custom/CustomCard";
import CustomTextArea from "@components/custom/inputs/CustomTextArea";
import TextField from "@components/custom/inputs/TextField/TextField";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DISTRIBUTOR_PERMISSIONS, AGENT_PERMISSIONS, PERMISSIONS } from "../config";
import { roleFormSchema } from "../schema";
import { PermissionGroup } from "./PermissionGroup";
import { useSession } from "next-auth/react";

type TRoleForm = {
  defaultValues?: z.infer<typeof roleFormSchema> | {};
  onSubmitHandler: (data: z.infer<typeof roleFormSchema>) => void;
};

export type TRoleFormData = z.infer<typeof roleFormSchema>;

export default function RoleForm({
  defaultValues = {},
  onSubmitHandler,
}: TRoleForm) {
  const { data: session } = useSession();
  const userType = session?.user?.userType;
  const form = useForm<TRoleFormData>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: defaultValues,
  });
  // console.log("defaultValues", defaultValues);
  const [moduleIdentifierPermissions, setModuleIdentifierPermissions] =
    useState<{ identifier: string; actions: { id: string; name: string }[] }[]>(
      []
    );

  useEffect(() => {
    if (defaultValues?.moduleIdentifierPermissions) {
      setModuleIdentifierPermissions(
        defaultValues?.moduleIdentifierPermissions
      );
    }
  }, [defaultValues]);

  async function onSubmit(data: TRoleFormData) {
    const formData = {
      ...data,
      moduleIdentifierPermissions: moduleIdentifierPermissions
        ?.filter(module => module.actions.length > 0)
        .map(module => ({
          identifier: module.identifier,
          actions: module.actions.map(action => ({
            action: action.id,
          })),
        })),
    };
    console.log("Form Data:", formData);
    onSubmitHandler(formData);
  }

  console.log("moduleIdentifierPermissions", moduleIdentifierPermissions);
  return (
    <CustomCard className="max-w-[800px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <TextField className="mb-6" label="Name" name="name" form={form} />
          <CustomTextArea label="Description" name="description" form={form} />
          <h2 className="mt-6 mb-4 font-bold">Permissions</h2>
          {userType === "distributor" && (
            <>
              <h2 className="mt-6 mb-4 font-semibold text-gray-500">
                Distributor Permissions
              </h2>
              <div className="space-y-6">
                {DISTRIBUTOR_PERMISSIONS.map((perm) => (
                  <PermissionGroup
                    key={perm.identifier.id}
                    permission={perm}
                    moduleIdentifierPermissions={moduleIdentifierPermissions}
                    setModuleIdentifierPermissions={
                      setModuleIdentifierPermissions
                    }
                  />
                ))}
              </div>
            </>
          )}

          <h2 className="mt-9 mb-4 font-semibold text-gray-500">
            Agent Permissions
          </h2>
          <div className="space-y-6">
            {AGENT_PERMISSIONS.map((perm) => (
              <PermissionGroup
                key={perm.identifier.id}
                permission={perm}
                moduleIdentifierPermissions={moduleIdentifierPermissions}
                setModuleIdentifierPermissions={setModuleIdentifierPermissions}
              />
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </CustomCard>
  );
}
