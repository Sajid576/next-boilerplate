import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Control, FieldName, FieldValues } from "react-hook-form";

type TextFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  form: any;
  name: FieldName<TFieldValues>;
  label: string;
  placeholder?: string;
  description?: string;
  className?: string;
  type?: string;
};

export default function TextField({
  form,
  name,
  label,
  placeholder,
  description,className,type='text'
}: TextFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input className={className} placeholder={placeholder} {...field} type={type} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
