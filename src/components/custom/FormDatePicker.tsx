import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";
import CustomPopover from "./CustomPopover";

type TFormDatePicker = {
  label: string;
  placeholder?: string;
  form: any;
  defaultValue?: string;
  name: string;
  className?: string;
};

export default function FormDatePicker({
  label,
  placeholder = "Pick a date",
  form,
  name,
  className,
}: TFormDatePicker) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <CustomPopover
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            triggerComponent={
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !field.value && "text-muted-foreground",
                  className
                )}
              >
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>{placeholder}</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            }
            mainComponent={
              <div>
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  // disabled={(date) =>
                  //   date > new Date() || date < new Date("1900-01-01")
                  // }
                  initialFocus
                />
                <div className="flex items-center justify-end gap-2 mt-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      field.onChange(null);
                      // setIsOpen(false);
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Ok
                  </Button>
                </div>
              </div>
            }
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
