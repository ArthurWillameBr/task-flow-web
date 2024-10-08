import TaskTableSkeleton from "@/components/task-table-skeleton"
import { useAuth } from "@/hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom"

export function PrivateRoutes() {
    const { isAuthenticated, isLoading } = useAuth()

  if(isLoading) {
    return <TaskTableSkeleton />
  }

    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/sign-in" replace/>
}