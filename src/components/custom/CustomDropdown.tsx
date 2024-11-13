import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { TReactNode } from "@types";

type TCustomDropdown = {
  menuLabel?: string;
  triggerComponent?: TReactNode;
  options: {
    label: string;
    handler: Function;
  }[];
};

export function CustomDropdown({
  menuLabel,
  triggerComponent,
  options=[],
}: TCustomDropdown) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          {triggerComponent ? (
            triggerComponent
          ) : (
            <DotsHorizontalIcon className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {menuLabel && (
          <>
            <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {options?.length > 0 ? (
          options.map((item, index) => (
            <DropdownMenuItem key={index} onClick={()=>item.handler()}>
              {item?.label}
            </DropdownMenuItem>
          ))
        ) : (
          <p>No options available!</p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
