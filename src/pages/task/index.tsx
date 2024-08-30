/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, SquareCheckBig } from "lucide-react";
import { AccountMenu } from "@/components/account-menu";
import { TaskTable } from "@/components/task-table";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { useState } from "react";
export interface TaskProps {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const createTaskSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  completed: z.boolean().default(false),
});

type CreateTaskFormSchema = z.infer<typeof createTaskSchema>;

export function TaskPage() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateTaskFormSchema>({
    defaultValues: {
      completed: false,
    },
  });

  async function handleCreateTask(data: CreateTaskFormSchema) {
    try {
      const response = await api.post("/tasks", data);
      setTasks((prevTasks) => [...prevTasks, response.data.task]);
      toast.success("Tarefa criada com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar tarefa");
    }
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
      <form
        onSubmit={handleSubmit(handleCreateTask)}
        className="flex space-x-2 mb-4"
      >
        <Input placeholder="Titulo da tarefa" {...register("title")} />
        <Input placeholder="Descrição da tarefa" {...register("description")} />
        <Button type="submit" disabled={isSubmitting}>
          <PlusIcon className="mr-2 h-4 w-4" /> Adicionar
        </Button>
      </form>
      <TaskTable tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
