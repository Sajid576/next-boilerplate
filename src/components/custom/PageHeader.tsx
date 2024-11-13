import React from "react";
import SectionTitle from "./SectionTitle";
import { Button, ButtonProps } from "@components/ui/button";
import { cn } from "@lib/utils";
import { TReactNode } from "@types";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type TSectionTitle = {
  title: string;
  buttonLabel?: string;
  buttonHandler?: () => void;
  customComponent?: TReactNode;
  className?: string;
  noButton?: boolean;
};

export default function PageHeader({
  title = "Title",
  buttonLabel,
  buttonHandler,
  customComponent,
  noButton=false,
  className,
}: TSectionTitle) {
  const router = useRouter()
  return (
    <div className={cn("flex justify-between items-center ", className)}>
      <div className="flex gap-2">
        <Button onClick={()=>{
          router.back()
        }} variant="outline" size="icon" className="h-7 w-7">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <SectionTitle title={title} />
      </div>

      {customComponent}
      {!customComponent && !noButton && buttonLabel && buttonHandler && (
        <Button onClick={buttonHandler}>{buttonLabel}</Button>
      )}
    </div>
  );
}
