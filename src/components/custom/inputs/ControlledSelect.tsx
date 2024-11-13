import { Label } from "@components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { FieldValues } from "react-hook-form";

type Option = {
  id: string;
  name: string;
};

type CustomSelectProps<TFieldValues extends FieldValues = FieldValues> = {
  onChange: (value: string) => void; // Updated to accept a value
  label: string;
  placeholder?: string;
  defaultValue?: string;
  options: Option[];
  className?: string;
};

export default function ControlledSelect({
  onChange,
  label,
  placeholder = "Select...",
  options,
  defaultValue,
  className,
}: CustomSelectProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <Select
        onValueChange={onChange}
        defaultValue={defaultValue}
      >
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options &&
            Array.isArray(options) &&
            options?.map((item, index) => (
              <SelectItem key={item?.id} value={item?.id}>
                {item.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
