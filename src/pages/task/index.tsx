import { Input } from "@/components/ui/input";
import { AccountMenu } from "@/components/account-menu";
import { CreateTaskDialog } from "@/components/create-task-dialog";
import { TaskTable } from "@/components/tasks-table";

export function TaskPage() {

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Task Flow</h1>
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
