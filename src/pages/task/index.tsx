import { Input } from "@/components/ui/input";
import { AccountMenu } from "@/components/account-menu";
import { TaskDialog } from "@/components/create-task-dialog";
import { TaskTable } from "@/components/tasks-table";
import { Plus, SquareCheckBig } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { CreateTaskForm } from "@/components/create-task-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function TaskPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SquareCheckBig className="size-8" />
          <h1 className="text-2xl font-bold">Task Flow</h1>
        </div>
        <div className="flex items-center gap-2">
          <AccountMenu />
          <ModeToggle />
        </div>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <Input
          type="text"
          placeholder="Pesquisar tarefas..."
          className="w-full"
        />
        <TaskDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          title="Nova Tarefa"
          description="Adicione uma nova tarefa ao seu gerenciamento."
          TaskTrigger={
            <Button className="flex items-center gap-2">
              <Plus className="size-5" />
              Nova Tarefa
            </Button>
          }
        >
          <CreateTaskForm setIsDialogOpen={setIsDialogOpen} />
        </TaskDialog>
      </div>
      <TaskTable />
    </div>
  );
}
