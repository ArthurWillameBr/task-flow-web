 
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { CheckIcon, XIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { api } from "@/lib/axios";
import { useState, useEffect } from "react";

interface TaskProps {
    id: string;
    title: string;
    description: string | null;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

export function TaskTable() {
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const getTasks = async () => {
          try {
            const response = await api.get("/tasks");
            setTasks(response.data.tasks);
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
          }
        };
        getTasks();
      }, []);
    return (
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-base">Titulo</TableHead>
            <TableHead className="font-semibold text-base">Descrição</TableHead>
            <TableHead className="font-semibold text-base">Status</TableHead>
            <TableHead className="font-semibold text-base">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4}>
                <Skeleton className="h-8" />
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  {task.completed ? (
                    <CheckIcon className="text-green-500" />
                  ) : (
                    <XIcon className="text-red-500" />
                  )}
                </TableCell>
                <TableCell>
                  <Button>
                    <TrashIcon className="mr-2 h-4 w-4" /> Deletar
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    )
}