/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { MoveVerticalIcon, Plus } from "lucide-react"
import { AccountMenu } from "@/components/account-menu"
import { useQuery } from "@tanstack/react-query"
import { GetTask } from "@/api/get-tasks"

export function TaskPage() {
  const [search, setSearch] = useState("")

  const { data: tasks} = useQuery({
    queryKey: ["tasks"],
    queryFn: GetTask,
  })

  const handleSearch = (e: any) => {
    setSearch(e.target.value)
  }
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Task Flow</h1>
        <AccountMenu />
      </div>
      <div className="flex items-center gap-4 mb-6">
        <Input
          type="text"
          placeholder="Pesquisar tarefas..."
          value={search}
          onChange={handleSearch}
          className="w-full"
        />
        <Button className="flex items-center gap-2">
          <Plus className="size-5"/>
          Nova Tarefa
          </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks && tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>
                <Badge
                  variant={task.status === "DONE" ? "default" : "destructive"}
                >
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                >
                  {task.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoveVerticalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem>Excluir</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}