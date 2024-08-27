import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function SignIn() {
  return (
    <div className="mx-auto grid w-[350px] gap-5">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-balance text-muted-foreground">
          Digite seu e-mail abaixo para acessar sua conta
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" placeholder="jhondoe@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
          </div>
          <Input id="password" type="password" placeholder="*******" required />
        </div>
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </div>
      <div className="text-center text-sm">
        Não tem uma conta?{" "}
        <Link to="/sign-up" className="underline">
          Cadastre-se
        </Link>
      </div>
    </div>
  );
}
