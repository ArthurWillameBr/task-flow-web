/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type SignUpFormSchema = z.infer<typeof signUpSchema>;

export function SignIn() {
  const [searchParams] = useSearchParams();
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormSchema>({
    defaultValues: {
      email: searchParams.get("email") || "",
    },
  });

  async function handleSignIn({ email, password }: SignUpFormSchema) {
    try {
      await signIn({ email, password });
      toast.success("Login efetuado com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao efetuar login");
    }
  }
  return (
    <div className="mx-auto grid w-[350px] gap-5">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-balance text-muted-foreground">
          Digite seu e-mail abaixo para acessar sua conta
        </p>
      </div>
      <form onSubmit={handleSubmit(handleSignIn)} className="grid gap-4">
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
          Entrar
        </Button>
      </form>
      <div className="text-center text-sm">
        Não tem uma conta?{" "}
        <Link to="/sign-up" className="underline">
          Cadastre-se
        </Link>
      </div>
    </div>
  );
}
