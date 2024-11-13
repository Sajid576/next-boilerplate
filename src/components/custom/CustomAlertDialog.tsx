import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@components/ui/alert-dialog";
import { TReactNode, TSetState } from "@types";

type TAlertDialogProps = {
  title?: string;
  description?: string;
  cancelHandler?: () => void;
  continueHandler:  () => void | Promise<void>;
  isOpen: boolean;
  setIsOpen: TSetState;
};

export function CustomAlertDialog({
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete your data.",
  cancelHandler,
  continueHandler,
  isOpen,
  setIsOpen,
}: TAlertDialogProps) {
  if (isOpen)
    return (
      <AlertDialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelHandler}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={continueHandler}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
}
