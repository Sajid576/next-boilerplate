import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { cn } from "@lib/utils";
import { TReactNode, TSetState } from "@types";

type TModal = {
  title?: string;
  className?: string;
  description?: string;
  children?: TReactNode;
  footerComponent?: TReactNode;
  isOpen: boolean;
  setIsOpen: TSetState;
};

export function Modal({
  title,
  description,
  children,
  footerComponent,
  isOpen,
  setIsOpen,className
}: TModal) {
    if (isOpen)
      return (
        <Dialog
          modal={true}
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
          }}
        >
          <DialogContent
            className={cn(
              "max-w-[700px] xl:max-w-[1024px] max-h-screen ",
              className
            )}
          >
            {(title || description) && (
              <DialogHeader>
                {title && (
                  <DialogTitle className="border-b py-4 text-primary">
                    {title}
                  </DialogTitle>
                )}
                {description && (
                  <DialogDescription>{description}</DialogDescription>
                )}
              </DialogHeader>
            )}
            <div className="p-2 overflow-auto max-h-[580px]">
              {children}
            </div>

            {footerComponent && <DialogFooter>{footerComponent}</DialogFooter>}
          </DialogContent>
        </Dialog>
      );
}
