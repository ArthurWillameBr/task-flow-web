import { useAuth } from "@/hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom"

export function PrivateRoutes() {
    const { isAuthenticated } = useAuth()

    return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />
}