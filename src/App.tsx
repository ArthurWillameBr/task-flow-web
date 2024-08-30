import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster richColors />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
