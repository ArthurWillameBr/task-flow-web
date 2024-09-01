import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskStatus } from "@/components/task-status";
import { TaskPriority } from "@/components/task-priority";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetTask } from "@/api/get-tasks";
import { DeleteTask } from "@/api/delete-tasks";
import { toast } from "sonner";
import { TurnTaskStatus } from "@/api/turn-task-status";
import {
  TurnTaskPriority,
  TurnTaskPriorityProps,
} from "@/api/turn-task-priority";
import { TaskDialog } from "./create-task-dialog";
import { UpdateTaskForm } from "./update-task-form";
import { useState } from "react";

export function TaskTable() {
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: GetTask,
  });
  const { mutateAsync: deleteTask, isPending: isLoading } = useMutation({
    mutationFn: DeleteTask,
    onSuccess: () => {
      toast.success("Tarefa excluída com sucesso");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  async function handleDeleteTask(id: string) {
    await deleteTask({ id });
  }

  const { mutateAsync: updateTaskStatus } = useMutation({
    mutationFn: TurnTaskStatus,
    onSuccess: () => {
      toast.success("Status da tarefa atualizado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  async function handleChangeTaskStatus(id: string, newStatus: TaskStatus) {
    await updateTaskStatus({ id, status: newStatus });
  }

  const { mutateAsync: updateTaskPriority } = useMutation({
    mutationFn: TurnTaskPriority,
    onSuccess: () => {
      toast.success("Prioridade da tarefa atualizada com sucesso");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  async function handleChangeTaskPriority(
    id: string,
    newPriority: TurnTaskPriorityProps["priority"]
  ) {
    await updateTaskPriority({ id, priority: newPriority });
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Prioridade</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks &&
          tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="max-w-[188px] truncate">
                {task.title}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Button
                      asChild
                      variant="ghost"
                      className="w-fit hover:bg-transparent outline-none"
                    >
                      <TaskStatus status={task.status} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    {(
                      [
                        "TODO",
                        "DONE",
                        "BACKLOG",
                        "IN_PROGRESS",
                        "CANCELLED",
                      ] as TaskStatus[]
                    ).map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => handleChangeTaskStatus(task.id, status)}
                      >
                        <TaskStatus status={status} />
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Button
                      asChild
                      variant="ghost"
                      className="w-fit hover:bg-transparent outline-none"
                    >
                      <TaskPriority priority={task.priority} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    {(
                      [
                        "LOW",
                        "MEDIUM",
                        "HIGH",
                      ] as TurnTaskPriorityProps["priority"][]
                    ).map((priority) => (
                      <DropdownMenuItem
                        key={priority}
                        onClick={() =>
                          handleChangeTaskPriority(task.id, priority)
                        }
                      >
                        <TaskPriority priority={priority} />
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Ellipsis />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    <TaskDialog
                      title="Atualizar Tarefa"
                      description="Atualize sua Tarefa"
                      isDialogOpen={isDialogOpen}
                      setIsDialogOpen={setIsDialogOpen}
                      TaskTrigger={
                        <p className="flex items-center select-none cursor-pointer gap-[46px] text-sm pl-2 rounded-sm w-full p-1 hover:bg-accent">
                          Editar <Pencil className="size-4" />
                        </p>
                      }
                    >
                      <UpdateTaskForm
                        setIsDialogOpen={setIsDialogOpen}
                        taskId={task.id}
                        task={task}
                      />
                    </TaskDialog>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                    className="cursor-pointer"
                      disabled={isLoading}
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Excluir
                      <span className="ml-10">⌫</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
