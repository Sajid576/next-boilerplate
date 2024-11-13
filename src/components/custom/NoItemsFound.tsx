import { Button, ButtonProps } from "@components/ui/button";
import { cn } from "@lib/utils";
import React from "react";

interface NoItemsFoundProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  className?: string;
  buttonHandler?: () => void;
}

export default function NoItemsFound({
  title='No content found!',
  description,
  buttonLabel,
  buttonHandler=()=>{},className
}: NoItemsFoundProps) {
  return (
    <div
      className={cn(
        "h-full flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm",
        className
      )}
    >
      <div className="flex flex-col items-center gap-1 text-center py-[200px]">
        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {buttonLabel && (
          <Button type="button" onClick={buttonHandler} className="mt-4">
            {buttonLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
