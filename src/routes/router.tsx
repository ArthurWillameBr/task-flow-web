import { SignIn } from "@/pages/auth/signIn";
import { SignUp } from "@/pages/auth/signUp";
import { AuthLayout } from "@/pages/layout/auth";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            { path: "sign-in", element: <SignIn /> },
            {path: "sign-up", element: <SignUp />}
        ]
    }
])