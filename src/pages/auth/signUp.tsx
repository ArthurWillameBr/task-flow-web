/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

type SignUpFormSchema = z.infer<typeof signUpSchema>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormSchema>({});

  const handleSignUp = async ({ name, email, password }: SignUpFormSchema) => {
    try {
      await api.post("/users", {
        name,
        email,
        password,
      });
      toast.success("Cadastro realizado com sucesso", {
        action: {
          label: "login",
          onClick: () => navigate(`/sign-in?email=${email}`),
        },
      });
    } catch (error) {
      toast.error("Erro ao realizar cadastro");
    }
  };

  return (
    <div className="mx-auto grid w-[350px] gap-5">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Cadastre-se</h1>
        <p className="text-balance text-muted-foreground">
          Faça seu cadastro de maneira rápida e fácil
        </p>
      </div>
      <form onSubmit={handleSubmit(handleSignUp)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Nome</Label>
          <Input
            placeholder="Jhon Doe"
            required
            {...register("name")}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            placeholder="jhondoe@example.com"
            required
            {...register("email")}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
          </div>
          <Input
            type="password"
            placeholder="*******"
            required
            {...register("password")}
          />
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          Cadastrar
        </Button>
      </form>
      <div className="text-center text-sm">
        Já tem uma conta?{" "}
        <Link to="/sign-in" className="underline">
          fazer login
        </Link>
      </div>
    </div>
  );
}
