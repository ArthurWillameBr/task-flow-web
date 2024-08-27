import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  TrashIcon,
  CheckIcon,
  XIcon,
  SquareCheckBig,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function TaskPage() {
  const { signOut } = useAuth();

  return (
    <div className="container mx-auto p-8 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SquareCheckBig className="size-8" />
          <p className="font-semibold text-lg">
            Task <span className="text-primary">Flow</span>
          </p>
        </div>
        <Button onClick={signOut} variant="default" size="icon">
          <LogOut />
        </Button>
      </div>
      <div className="flex space-x-2 mb-4">
        <Input placeholder="Buscar tarefa..." className="flex-grow" />
      </div>

      <div className="flex space-x-2 mb-4">
        <Input placeholder="Titulo da tarefa" />
        <Input placeholder="Descrição da tarefa" />
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> Adicionar
        </Button>
      </div>
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
          <TableRow>
            <TableCell>Primeira Task</TableCell>
            <TableCell>Segunda Task</TableCell>
            <TableCell>
              <Button size="sm">
                <>
                  <XIcon className="mr-2 h-4 w-4" /> pendente
                </>
              </Button>
            </TableCell>
            <TableCell>
              <Button variant="destructive" className="bg-red-600" size="sm">
                <TrashIcon className="mr-2 size-4" /> Delete
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Primeira Task</TableCell>
            <TableCell>Segunda Task</TableCell>
            <TableCell>
              <Button size="sm">
                <>
                  <CheckIcon className="mr-2 h-4 w-4" /> Concluída
                </>
              </Button>
            </TableCell>
            <TableCell>
              <Button variant="destructive" className="bg-red-600" size="sm">
                <TrashIcon className="mr-2 size-4" /> Delete
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
