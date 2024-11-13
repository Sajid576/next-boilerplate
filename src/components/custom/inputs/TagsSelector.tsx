import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { cn } from "@lib/utils";
import { Tag, TagInput } from "emblor";
import React, { useEffect } from "react";
import { FieldName, FieldValues, UseFormReturn } from "react-hook-form";

type TagsSelectorProps<TFieldValues extends FieldValues = FieldValues> = {
  label: string;
  name: FieldName<TFieldValues>;
  form: any;
  className?: string;
  placeholder?: string;
  description?: string;
  defaultValues?: string[];
};

export default function TagsSelector({
  form,
  label = "Tags",
  name,
  className,
  placeholder = "Select tags...",
  description,
  defaultValues = [],
}: TagsSelectorProps) {
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(
    null
  );

  useEffect(() => {
    console.log("tags", tags);
    const tempTags = tags.map((item) => item.text).join(", ");
    form.setValue(name, tempTags);
  }, [tags]);

  useEffect(() => {
    if (defaultValues && defaultValues?.length > 0) {
      const tempTags = defaultValues.map((item, index) => {
        return { text: item, id: index };
      });
      setTags(tempTags);
    }
  }, [defaultValues]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col items-start", className)}>
          <FormLabel className="text-left">{label}</FormLabel>
          <FormControl className="w-full">
            <TagInput
              {...field}
              placeholder={placeholder}
              tags={tags}
              setTags={(newTags) => {
                setTags(newTags);
              }}
              activeTagIndex={activeTagIndex}
              setActiveTagIndex={setActiveTagIndex}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
