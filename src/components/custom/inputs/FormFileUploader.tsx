import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { FieldName, FieldValues } from "react-hook-form";
import { FileUploader } from "../file-uploader";

type FormFileUploader<TFieldValues extends FieldValues = FieldValues> = {
  form: any;
  name: FieldName<TFieldValues>;
  label: string;
  description?: string;
  defaultValues?: File[];
};

export default function FormFileUploader({
  form,
  name,
  label,
  description,
  defaultValues=[],
}: FormFileUploader) {
  
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <FileUploader
              value={field.value}
              onValueChange={field.onChange}
              maxFiles={4}
              maxSize={4 * 1024 * 1024}
              defaultValues={defaultValues}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
