import {ArrowDown, ArrowRight, ArrowUp, LucideIcon } from "lucide-react";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

interface TaskPriorityProps {
    priority: TaskPriority;
}

const taskPriorityMap: Record<TaskPriority, string> = {
    LOW: "Baixa",
    MEDIUM: "Média",
    HIGH: "Alta",
}

const taskPriorityIcon: Record<TaskPriority, LucideIcon> = {
    LOW: ArrowDown,
    MEDIUM: ArrowRight,
    HIGH: ArrowUp,
};

export function TaskPriority({priority}: TaskPriorityProps) {
    const Icon = taskPriorityIcon[priority];
    return (
        <span className="flex items-center gap-2 font-medium ">
            <Icon className="size-4" />
            {taskPriorityMap[priority]}
        </span>
    )
}
