import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Label } from "@components/ui/label";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";
import CustomPopover from "./CustomPopover";


type TCustomDatePicker = {
  label: string;
  placeholder?: string;
  form:any;
  name?: string;
  date: string;
  setDate: Function;
  className?: string;
};

function FormComponent({
  label,
  placeholder = "Pick a date",
  form,
  name,
  className,
}: TCustomDatePicker) {
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
                  onSelect={(value) => {
                    field.onChange(value);
                    // setIsOpen(false);
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
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

function ControlledComponent({
  label,
  placeholder = "Pick a date",
  date,
  setDate,
  className,
}: TCustomDatePicker) {
  const [isOpen, setIsOpen] = useState(false);

  // console.log("form", form);
  // console.log("date", date);

  return (
    <div>
      <Label title={label} />
      <CustomPopover
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        triggerComponent={
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
              className
            )}
          >
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        }
        mainComponent={
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(value) => {
                setDate(value);
                // setIsOpen(false);
              }}
              initialFocus
            />
            <div className="flex items-center justify-end gap-2 mt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setDate(null);
                }}
              >
                Clear
              </Button>
              <Button
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Done
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
}



export default function CustomDatePicker({
  label,
  placeholder = "Pick a date",
  form,
  name,
  date,
  setDate,
  className = "",
}:TCustomDatePicker) {
  console.log("form", form);
  console.log("date", date);

  if (form)
    return (
      <FormComponent
        label={label}
        name={name}
        placeholder={placeholder}
        form={form}
        className={className}
      />
    );
  else {
    return (
      <ControlledComponent
        label={label}
        placeholder={placeholder}
        date={date}
        setDate={setDate}
        className={className}
      />
    );
  }
}
