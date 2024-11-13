import React from "react";
import SectionTitle from "./SectionTitle";
import { Button, ButtonProps } from "@components/ui/button";
import { cn } from "@lib/utils";
import { TReactNode } from "@types";

type TSectionTitle = {
  title: string;
  buttonLabel?: string;
  buttonHandler?: () => void;
  customButton?: TReactNode; // Add type for buttonProps
  className?: string;
};

export default function PageTitle({
  title = "Title",
  buttonLabel,
  buttonHandler,
  customButton,
  className,
}: TSectionTitle) {
  return (
    <div className={cn("flex justify-between items-center", className)}>
      <SectionTitle title={title} />
      {customButton}
      {!customButton && buttonLabel && buttonHandler && (
        <Button onClick={buttonHandler}>{buttonLabel}</Button>
      )}
    </div>
    // <div className="flex items-center gap-4">
    //           <Button variant="outline" size="icon" className="h-7 w-7">
    //             <ChevronLeft className="h-4 w-4" />
    //             <span className="sr-only">Back</span>
    //           </Button>
    //           <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
    //             Pro Controller
    //           </h1>
    //           <Badge variant="outline" className="ml-auto sm:ml-0">
    //             In stock
    //           </Badge>
    //           <div className="hidden items-center gap-2 md:ml-auto md:flex">
    //             <Button variant="outline" size="sm">
    //               Discard
    //             </Button>
    //             <Button size="sm">Save Product</Button>
    //           </div>
  );
}
