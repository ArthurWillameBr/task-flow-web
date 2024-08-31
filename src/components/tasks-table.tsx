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
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskStatus } from "@/components/task-status";
import { TaskPriority } from "@/components/task-priority";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetTask } from "@/api/get-tasks";
import { DeleteTask } from "@/api/delete-tasks";
import { toast } from "sonner";
import { TurnTaskStatus, TurnTaskStatusProps } from "@/api/turn-task-status";

export function TaskTable() {
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["tasks"]   });
    }
  });

  async function handleChangeTaskStatus(id: string, newStatus: TaskStatus) {
    await updateTaskStatus({ id, status: newStatus });
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
                    <Button asChild variant="ghost" className="w-fit hover:bg-transparent outline-none">
                      <TaskStatus status={task.status} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                  {(["TODO", "DONE", "BACKLOG", "IN_PROGRESS", "CANCELLED"] as TaskStatus[]).map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => handleChangeTaskStatus(task.id, status)}
                      >
                        <TaskStatus status={status}/>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>
                <TaskPriority priority={task.priority} />
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Ellipsis />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
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
