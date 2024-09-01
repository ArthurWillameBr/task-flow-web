import { api } from "@/lib/axios";

interface UpdateTaskRequest {
    taskId: string;
    title: string;
    description: string | null;
    status: "TODO" | "DONE" | "BACKLOG" | "IN_PROGRESS" | "CANCELLED";
    priority: "LOW" | "MEDIUM" | "HIGH";
}

interface UpdateTaskResponse {
    task: {
        id: string;
        title: string;
        description: string | null;
        status: "TODO" | "DONE" | "BACKLOG" | "IN_PROGRESS" | "CANCELLED";
        createdAt: Date;
        updatedAt: Date;
        priority: "LOW" | "MEDIUM" | "HIGH";
        user_id: string;
    }
}

export async function UpdateTask({title, description, status, priority, taskId}: UpdateTaskRequest) {
    const response = await api.put<UpdateTaskResponse>(`/tasks/${taskId}`, {
        title,
        description,
        status,
        priority
    })

    return response.data.task
} 