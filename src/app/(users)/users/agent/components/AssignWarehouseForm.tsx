import { useGetWarehousesQuery } from "@app/warehouses/redux/warehouseApi";
import CustomSelect from "@components/custom/inputs/CustomSelect";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { assignWarehouseFormSchema } from "../agent.schema";

type TAssignWarehouseForm = {
  defaultValues?: z.infer<typeof assignWarehouseFormSchema> | {};
  onSubmitHandler: (data: z.infer<typeof assignWarehouseFormSchema>) => void;
};

export type TAssignWarehouseFormData = z.infer<typeof assignWarehouseFormSchema>;

export default function AssignWarehouseForm({
  onSubmitHandler,
}: TAssignWarehouseForm) {
  const { data: warehouses } = useGetWarehousesQuery(null);
  const form = useForm<TAssignWarehouseFormData>({
    // resolver: zodResolver(userFormSchema),
  });

  async function onSubmit(data: TAssignWarehouseFormData) {
    console.log("data", data);
    onSubmitHandler(data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomSelect
          label="Select warehouse"
          placeholder="Select warehouse"
          name="warehouseId"
          form={form}
          options={warehouses?.data}
        />
        <div className="flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}
