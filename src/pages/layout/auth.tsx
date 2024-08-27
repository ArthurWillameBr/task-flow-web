import { SquareCheckBig } from "lucide-react";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="grid-cols-2 md:grid md:min-h-screen antialiased ">
    <div className="flex h-full p-3 gap-2 md:gap-0 mb-5 md:mb-0 flex-col justify-between border-r border-foreground/5 bg-muted md:p-10 text-muted-foreground">
      <div className="flex items-center gap-3 text-2xl text-foreground">
        <SquareCheckBig className="size-8" />
        <p className="font-semibold">Task <span className="text-primary">Flow</span></p>
      </div>
      <footer className="text-sm">
         &copy; task-flow - {new Date().getFullYear()}
      </footer>
    </div>
    <div className="flex flex-col justify-center items-center relative">
      <Outlet />
    </div>
  </div>
  );
}
