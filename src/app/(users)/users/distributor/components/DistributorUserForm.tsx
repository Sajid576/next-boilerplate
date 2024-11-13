import { PasswordField } from "@app/(auth)/(login)/components/PasswordField";
import { useGetRolesQuery } from "@app/(users)/roles/roles.api";
import CustomSelect from "@components/custom/inputs/CustomSelect";
import CustomTextArea from "@components/custom/inputs/CustomTextArea";
import TextField from "@components/custom/inputs/TextField/TextField";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { distributorUserFormSchema } from "../distributor.schema";

type TDistributorUserForm = {
  defaultValues?: z.infer<typeof distributorUserFormSchema> | {};
  onSubmitHandler: (data: z.infer<typeof distributorUserFormSchema>) => void;
};

export type TDistributorUserFormData = z.infer<typeof distributorUserFormSchema>;

export default function DistributorUserForm({
  defaultValues = {},
  onSubmitHandler,
}: TDistributorUserForm) {
  const {
    data: roles,
    isLoading,
    isError,
  } = useGetRolesQuery({ page: 1, limit: 100 });
  const form = useForm<TDistributorUserFormData>({
    resolver: zodResolver(distributorUserFormSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(data: TDistributorUserFormData) {
    console.log("data", data);
    onSubmitHandler(data);
  }

  console.log("roles", roles, isLoading, isError);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <TextField label="Name" name="name" form={form} />
        <TextField label="Email" name="email" form={form} />
        <PasswordField />
        <CustomSelect
          label="Select Role"
          placeholder="Select Role"
          name="roleId"
          form={form}
          options={roles?.data?.roles}
        />
        <CustomTextArea label="Description" name="description" form={form} />
        <div className="flex justify-end">
          <Button type="submit" className="">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
