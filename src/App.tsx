import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/authContext";

export function App() {
  return (
    <>
      <AuthProvider>
          <RouterProvider router={router} />
          <Toaster richColors />
      </AuthProvider>
    </>
  );
}
