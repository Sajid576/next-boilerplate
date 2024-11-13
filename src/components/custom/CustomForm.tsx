import { Button } from '@components/ui/button';
import { Form, useFormField } from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TReactNode } from '@types';
import React from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { ZodType, z } from 'zod';

interface ICustomFormProps<T extends FieldValues> {
  formSchema: ZodType<T, any>;
  children: TReactNode;
  onSubmit: SubmitHandler<T>;
  defaultValues?: T;
}


export default function CustomForm({
  formSchema,
  children,
  onSubmit,
  defaultValues,
}: ICustomFormProps<T>) {
  const form = useFormField<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  // async function onSubmit(data: z.infer<typeof formSchema>) {
  //   console.log("data", data);
  // }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        {children}
        <Button type="submit" className="w-full mt-4">
          Save
        </Button>
      </form>
    </Form>
  );
}
