/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { MoveVerticalIcon, Plus } from "lucide-react"
import { AccountMenu } from "@/components/account-menu"

export function TaskPage() {
  const [search, setSearch] = useState("")
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Desenvolver a tela de login",
      status: "Em progresso",
      priority: "Alta",
    },
    {
      id: 2,
      title: "Criar o banco de dados",
      status: "Feito",
      priority: "Média",
    },
    {
      id: 3,
      title: "Implementar a funcionalidade de cadastro",
      status: "Backlog",
      priority: "Alta",
    },
    {
      id: 4,
      title: "Testar a aplicação",
      status: "Cancelado",
      priority: "Baixa",
    },
    {
      id: 5,
      title: "Documentar o projeto",
      status: "Todo",
      priority: "Média",
    },
  ])
  const handleSearch = (e: any) => {
    setSearch(e.target.value)
  }
  const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
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
          {filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>
                <Badge
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