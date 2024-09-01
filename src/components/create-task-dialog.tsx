import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface TaskDialogProps {
  title: string;
  description: string | null;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  TaskTrigger: React.ReactNode;
}

export function TaskDialog({children, isDialogOpen, setIsDialogOpen, TaskTrigger, description, title}: TaskDialogProps) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {TaskTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
