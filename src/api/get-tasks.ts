import { api } from "@/lib/axios";

interface GetTaskQuery {
  id: string;
  title: string;
  description: string | null;
  status: "TODO" | "DONE" | "BACKLOG" | "IN_PROGRESS" | "CANCELLED";
  createdAt: Date;
  updatedAt: Date;
  priority: "LOW" | "MEDIUM" | "HIGH";
  user_id: string;
}
interface GetTaskResponse {
  tasks: GetTaskQuery[];
}
interface GetTaskParams {
  status?: string | null;
  priority?: string | null;
  title?: string | null;
}

export async function GetTask({
  status,
  priority,
  title,
}: GetTaskParams): Promise<GetTaskQuery[]> {
  const response = await api.get<GetTaskResponse>("/tasks", {
    params: {
      status,
      priority,
      title,
    },
  });
  return response.data.tasks;
}
