import { z } from "zod";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";

const taskTableSchema = z.object({
  status: z.string().optional(),
  priority: z.string().optional(),
});

type TaskTableProps = z.infer<typeof taskTableSchema>;

export function TaskTableFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get("status");
  const priority = searchParams.get("priority");

  const { handleSubmit, control } = useForm<TaskTableProps>({
    defaultValues: {
      status: status ?? "",
      priority: priority ?? "",
    },
  });

  function handleStatusFilter({ status }: TaskTableProps) {
    setSearchParams((state) => {
      if (status) {
        state.set("status", status);
      } else {
        state.delete("status");
      }
      if (priority) {
        state.set("priority", priority);
      } else {
        state.delete("priority");
      }

      return state;
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleStatusFilter)}
      className="flex items-center gap-2"
    >
      <Input
        type="text"
        placeholder="Pesquisar tarefas..."
        className="w-auto"
      />
      <Controller
        name="status"
        control={control}
        render={({ field: { name, value, disabled, onChange } }) => {
          return (
            <Select
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-10 w-[166px]">
                <SelectValue placeholder="Status"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TODO">A fazer</SelectItem>
                <SelectItem value="DONE">Feito</SelectItem>
                <SelectItem value="BACKLOG">Backlog</SelectItem>
                <SelectItem value="IN_PROGRESS">Em progresso</SelectItem>
                <SelectItem value="CANCELLED">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      />
      <Controller
        name="priority"
        control={control}
        render={({ field: { name, value, disabled, onChange } }) => {
          return (
            <Select
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-10 w-[166px]">
                <SelectValue placeholder="Prioridade"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Baixa</SelectItem>
                <SelectItem value="MEDIUM">Média</SelectItem>
                <SelectItem value="HIGH">Alta</SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      />
      <Button type="submit">Aplicar filtros</Button>
    </form>
  );
}
