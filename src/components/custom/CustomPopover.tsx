import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TReactNode } from "@types";

type TCustomPopover = {
  align?: "end" | "center" | "start" | undefined;
  isOpen: boolean;
  setIsOpen: Function;
  triggerComponent: TReactNode;
  mainComponent: TReactNode;
};

export default function CustomPopover({
  align = "end",
  isOpen,
  setIsOpen,
  triggerComponent,
  mainComponent,
}: TCustomPopover) {
  return (
    <>
      <Popover
        modal={true}
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
        }}
      >
        <PopoverTrigger asChild>{triggerComponent}</PopoverTrigger>

        <PopoverContent align={align} className="w-auto">
          {mainComponent}
        </PopoverContent>
      </Popover>
    </>
  );
}
