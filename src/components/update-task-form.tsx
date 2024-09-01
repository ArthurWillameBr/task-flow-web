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
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { UpdateTask } from "@/api/update-task";

const taskFormSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().nullable(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  status: z.enum(["TODO", "DONE", "BACKLOG", "IN_PROGRESS", "CANCELLED"]),
});

type TaskForm = z.infer<typeof taskFormSchema>;
interface CreateTaskFormProps {
  setIsDialogOpen: (isOpen: boolean) => void;
  taskId: string;
  task: TaskForm;
}

export function UpdateTaskForm({ setIsDialogOpen, taskId, task }: CreateTaskFormProps) {
  const { register, handleSubmit, control } = useForm<TaskForm>({
    defaultValues: task || {}
  });

  const queryClient = useQueryClient();

  const { mutateAsync: updateTask, isPending } = useMutation({
    mutationFn: (data: TaskForm) => UpdateTask({ ...data, taskId }),
    onSuccess: () => {
      toast.success("Tarefa atualizada com sucesso");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsDialogOpen(false);
    },
  });

  async function handleUpdateTask(data: TaskForm) {
    await updateTask(data);
  }

  return (
    <form onSubmit={handleSubmit(handleUpdateTask)} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Título
        </Label>
        <Input
          id="title"
          {...register("title")}
          className="col-span-3"
          required
        />
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
            <Select onValueChange={field.onChange} value={field.value} required>
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
            <Select onValueChange={field.onChange} value={field.value} required>
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
          {isPending ? <LoaderCircle className="animate-spin" /> : "Salvar"}
        </Button>
      </DialogFooter>
    </form>
  );
}
