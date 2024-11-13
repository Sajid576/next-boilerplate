import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { FieldName, FieldValues } from "react-hook-form";

type Option = {
  id: string | number;
  name: string;
};

type CustomSelectProps<TFieldValues extends FieldValues = FieldValues> = {
  form: any;
  name: FieldName<TFieldValues>;
  label: string;
  placeholder?: string;
  description?: string;
  options:Option[];
  className?: string;
};

export default function CustomSelect({
  form,
  name,
  label,placeholder="Select...",
  options,
  description,className
}: CustomSelectProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options && Array.isArray(options) &&
                options?.map((item, index) => (
                  <SelectItem key={item?.id} value={item?.id}>
                    {item.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
