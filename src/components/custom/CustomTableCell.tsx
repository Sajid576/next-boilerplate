import { cn, formatDate } from "@lib/utils";
import { Row } from "@tanstack/react-table";
import { TReactNode } from "@types";
import React from "react";

type TTableCellProps<T> = {
  className?: string;
  row: Row<T>;
  column: keyof T & string; // Restrict to keys of T and coerce to string
  children?: TReactNode
  context?: string
};

export default function CustomTableCell<T>({
  className,
  row,
  column,children, context
}: TTableCellProps<T>) {
  if(context === 'date') return <div className={cn("capitalize", className)}>{formatDate(row?.getValue(column))}</div>
  return (
    <div className={cn("capitalize", className)}>{children ? children : row?.getValue(column)}</div>
  );
}
