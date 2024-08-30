/* eslint-disable @typescript-eslint/no-unused-vars */
 
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoveVerticalIcon, Plus } from "lucide-react";
import { AccountMenu } from "@/components/account-menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetTask } from "@/api/get-tasks";
import { CreateTasks } from "@/api/create-tasks";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const taskFormSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  status: z.enum(["TODO", "DONE", "BACKLOG", "IN_PROGRESS", "CANCELLED"]),
});

type TaskForm = z.infer<typeof taskFormSchema>;

export function TaskPage() {
  const queryClient = useQueryClient();

  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: GetTask,
  });

  const { mutateAsync: createTask, isPending } = useMutation({
    mutationFn: CreateTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });


  const { register, handleSubmit, control } = useForm<TaskForm>();

  async function handleCreateTask(data: TaskForm) {
    await createTask(data);
  }

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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="size-5" />
              Nova Tarefa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Nova Tarefa</DialogTitle>
              <DialogDescription>
                Adicione uma nova tarefa ao seu gerenciamento.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(handleCreateTask)}
              className="grid gap-4 py-4"
            >
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="title" className="text-right">
                  Título
                </Label>
                <Input className="col-span-3" {...register("title")} />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="title" className="text-right">
                  Descrição
                </Label>
                <Input className="col-span-3" {...register("description")} />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Controller 
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TODO">A fazer</SelectItem>
                        <SelectItem value="DONE">Feito</SelectItem>
                        <SelectItem value="BACKLOG">Backlog</SelectItem>
                        <SelectItem value="IN_PROGRESS">Em progresso</SelectItem>
                        <SelectItem value="CANCELLED">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="priority" className="text-right">
                  Prioridade
                </Label>
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LOW">Baixa</SelectItem>
                        <SelectItem value="MEDIUM">Média</SelectItem>
                        <SelectItem value="HIGH">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button variant="ghost">Cancelar</Button>
                </DialogClose>
                <Button disabled={isPending} type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
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
                <TableCell>{task.title}</TableCell>
                <TableCell>
                  <Badge
                    variant={task.status === "DONE" ? "default" : "destructive"}
                  >
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge>{task.priority}</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoveVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Excluir</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
