import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Textarea } from "@components/ui/textarea";
import { FieldName, FieldValues } from "react-hook-form";

type CustomTextAreaProps<TFieldValues extends FieldValues = FieldValues> = {
  form: any;
  name: FieldName<TFieldValues>;
  label: string;
  placeholder?: string;
  description?: string;
  className?: string;
};

export default function CustomTextArea({
  form,
  name,
  label,
  placeholder,
  description,className
}: CustomTextAreaProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea className={className} placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
