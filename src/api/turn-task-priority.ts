import { api } from "@/lib/axios";

export interface TurnTaskPriorityProps {
    id: string;
    priority: "LOW" | "MEDIUM" | "HIGH"
}

interface TurnTaskPriorityResponse {
    priority: "LOW" | "MEDIUM" | "HIGH"
}

export async function TurnTaskPriority({id, priority}: TurnTaskPriorityProps) {
    const response = await api.patch<TurnTaskPriorityResponse>(`/tasks/${id}/priority`, {
        priority
    });

    return response.data;
}