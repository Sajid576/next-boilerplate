import { Input } from "@components/ui/input";

type TControlledTextFieldProps = {
  placeholder?: string;
  value?: string;
  setValue: (value: string) => {};
};

export default function ControlledTextField({
  value,
  setValue,
  placeholder,
}: TControlledTextFieldProps) {
  return (
    <Input
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      placeholder={placeholder}
    />
  );
}
