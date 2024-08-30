import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckIcon, XIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TaskProps {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface TaskTableProps {
  tasks: TaskProps[];
  setTasks: (tasks: TaskProps[]) => void;
  handleDeleteTask: (taskId: string) => void;
}

export function TaskTable({ tasks, setTasks, handleDeleteTask }: TaskTableProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getTasks = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/tasks");
        setTasks(response.data.tasks);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getTasks();
  }, []);

  async function handleTurnStatus(taskId: string) {
    try {
      await api.patch(`/tasks/${taskId}/turn_status`)
      window.location.reload()
      toast.success("Status da tarefa alterado com sucesso")
    } catch (error) {
      console.log(error)
      toast.error("Erro ao alterar status da tarefa")
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold text-base">Titulo</TableHead>
          <TableHead className="font-semibold text-base">Descrição</TableHead>
          <TableHead className="font-semibold text-base">Status</TableHead>
          <TableHead className="font-semibold text-base">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={4}>
              <Skeleton className="h-8" />
            </TableCell>
          </TableRow>
        ) : (
          tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                {task.completed ? (
                  <Button onClick={() => handleTurnStatus(task.id)}>
                    <CheckIcon className="text-green-500 cursor-pointer" />
                    Completa
                  </Button>
                ) : (
                  <Button onClick={() => handleTurnStatus(task.id)}>
                    <XIcon className="text-red-500 cursor-pointer" />
                    A fazer
                  </Button>
                )}
              </TableCell>
              <TableCell>
                <Button onClick={() => handleDeleteTask(task.id)}>
                  <TrashIcon className="mr-2 h-4 w-4" /> 
                  Deletar
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
