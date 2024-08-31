import { Input } from "@/components/ui/input";
import { AccountMenu } from "@/components/account-menu";
import { CreateTaskDialog } from "@/components/create-task-dialog";
import { TaskTable } from "@/components/tasks-table";
import { SquareCheckBig } from "lucide-react";

export function TaskPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SquareCheckBig className="size-8" />
          <h1 className="text-2xl font-bold">Task Flow</h1>
        </div>
        <AccountMenu />
      </div>
      <div className="flex items-center gap-4 mb-6">
        <Input
          type="text"
          placeholder="Pesquisar tarefas..."
          className="w-full"
        />
        <CreateTaskDialog />
      </div>
      <TaskTable />
    </div>
  );
}
