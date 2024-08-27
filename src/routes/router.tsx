import { SignIn } from "@/pages/auth/signIn";
import { SignUp } from "@/pages/auth/signUp";
import { AuthLayout } from "@/pages/layout/auth";
import { TaskPage } from "@/pages/task";
import { createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "./private-routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [{ path: "/home", element: <TaskPage /> }],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
    ],
  },
]);
