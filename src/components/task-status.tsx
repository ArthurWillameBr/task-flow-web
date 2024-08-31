import { Badge } from "./ui/badge";

export type TaskStatus =
  | "TODO"
  | "DONE"
  | "BACKLOG"
  | "IN_PROGRESS"
  | "CANCELLED";

interface TaskStatusProps {
    status: TaskStatus;
}

const taskStatusMap: Record<TaskStatus, string> = {
    TODO: "A fazer",
    DONE: "Feito",
    BACKLOG: "Backlog",
    IN_PROGRESS: "Em progresso",
    CANCELLED: "Cancelado",
}

const taskStatusClasses: Record<TaskStatus, string> = {
    TODO: "bg-yellow-500",
    DONE: "bg-green-500",
    BACKLOG: "bg-violet-500",
    IN_PROGRESS: "bg-blue-500",
    CANCELLED: "bg-red-500",
};

export function TaskStatus({status}: TaskStatusProps) {
    return (
        <Badge className={`flex items-center w-fit gap-2 ${taskStatusClasses[status]}`}>
        <span className="font-medium text-primary-foreground truncate dark:font-semibold">
            {taskStatusMap[status]}
        </span>
    </Badge>
    )
}
