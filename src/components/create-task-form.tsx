import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTasks } from "@/api/create-tasks";

const taskFormSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  status: z.enum(["TODO", "DONE", "BACKLOG", "IN_PROGRESS", "CANCELLED"]),
});

type TaskForm = z.infer<typeof taskFormSchema>;

interface CreateTaskFormProps {
  setIsDialogOpen: (isOpen: boolean) => void;
}

export function CreateTaskForm({ setIsDialogOpen }: CreateTaskFormProps) {
  const { register, handleSubmit, control } = useForm<TaskForm>();

  const queryClient = useQueryClient();

  const { mutateAsync: createTask, isPending } = useMutation({
    mutationFn: CreateTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsDialogOpen(false);
    },
  });

  async function handleCreateTask(data: TaskForm) {
    await createTask(data);
  }

  return (
    <form onSubmit={handleSubmit(handleCreateTask)} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Título
        </Label>
        <Input id="title" {...register("title")} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Descrição
        </Label>
        <Input
          id="description"
          {...register("description")}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="status" className="text-right">
          Status
        </Label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="col-span-3">
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
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="priority" className="text-right">
          Prioridade
        </Label>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="col-span-3">
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
      <DialogFooter className="mt-4">
        <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
          Cancelar
        </Button>
        <Button disabled={isPending} type="submit">
          Salvar
        </Button>
      </DialogFooter>
    </form>
  );
}
