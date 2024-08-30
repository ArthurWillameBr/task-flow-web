import { api } from "@/lib/axios";

interface CreateTasksBody {
  title: string;
  description?: string | null;
  status: "TODO" | "DONE" | "BACKLOG" | "IN_PROGRESS" | "CANCELLED";
  priority: "LOW" | "MEDIUM" | "HIGH";
}

export async function CreateTasks({
  title,
  description,
  priority,
  status,
}: CreateTasksBody) {
  await api.post("/tasks", {
    title,
    description,
    priority,
    status,
  });
}
