import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TReactNode } from "@types";

type TCustomTooltip = {
  message?: string;
  triggerComponent?: TReactNode;
  tooltipComponent?: TReactNode;
};

export function CustomTooltip({
  message,
  triggerComponent,
  tooltipComponent,
}: TCustomTooltip) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{triggerComponent}</TooltipTrigger>
        <TooltipContent>
          {message ? <p>{message}</p> : tooltipComponent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
