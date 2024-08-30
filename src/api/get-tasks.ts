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

export async function GetTask() {
  const response = await api.get<GetTaskResponse>("/tasks");
  return response.data.tasks;
}
