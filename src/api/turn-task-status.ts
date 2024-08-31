import { api } from "@/lib/axios";

export interface TurnTaskStatusProps {
    id: string;
    status: "TODO" | "DONE" | "BACKLOG" | "IN_PROGRESS" | "CANCELLED";
}

interface TurnTaskStatusResponse {
    status: "TODO" | "DONE" | "BACKLOG" | "IN_PROGRESS" | "CANCELLED";
}

export async  function TurnTaskStatus({id, status}: TurnTaskStatusProps) {
   const response = await api.patch<TurnTaskStatusResponse>(`/tasks/${id}/status`, {
        status
    });

    return response.data;
}