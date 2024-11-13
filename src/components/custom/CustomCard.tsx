import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TReactNode } from "@types";

export default function CustomCard({
  children,
  title,
  description,className
}: {
  title?: string;
  description?: string;
  children: TReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>
          {description}
        </CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
