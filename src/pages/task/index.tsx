 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  SquareCheckBig,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { AccountMenu } from "@/components/account-menu";
import { TaskTable } from "@/components/task-table";
import { z } from "zod";

const CreateTaskSchema = z.object({})

export function TaskPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  return (
    <div className="container mx-auto p-8 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SquareCheckBig className="size-8" />
          <p className="font-semibold text-lg">
            Task <span className="text-primary">Flow</span>
          </p>
        </div>
        <AccountMenu />
      </div>
      <div className="flex space-x-2 mb-4">
        <Input placeholder="Buscar tarefa..." className="flex-grow" />
      </div>
      <div className="flex space-x-2 mb-4">
        <Input placeholder="Titulo da tarefa" />
        <Input placeholder="Descrição da tarefa" />
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> Adicionar
        </Button>
      </div>
      <TaskTable />
    </div>
  );
}
