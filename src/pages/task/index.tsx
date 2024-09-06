import { AccountMenu } from "@/components/account-menu";
import { TaskDialog } from "@/components/create-task-dialog";
import { TaskTable } from "@/components/tasks-table";
import { Plus, SquareCheckBig } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { CreateTaskForm } from "@/components/create-task-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TaskTableFilter } from "@/components/task-table-filter";

export function TaskPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SquareCheckBig className="size-8" />
          <h1 className="text-2xl font-bold group">Task <span className="group-hover:text-violet-500 transition-colors duration-300">Flow</span></h1>
        </div>
        <div className="flex items-center gap-2">
          <AccountMenu />
          <ModeToggle />
        </div>
      </div>
      <div className="flex items-center gap-4 mb-6 justify-between">
        <TaskTableFilter />
       <div>
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
      </div>
    <TaskTable />
    </div>
  );
}