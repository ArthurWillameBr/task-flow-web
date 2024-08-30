import { api } from "@/lib/axios";

interface DeleteTaskBody {
    id: string;
}

export async function DeleteTask({id}: DeleteTaskBody) {
    await api.delete(`/tasks/${id}`);
}