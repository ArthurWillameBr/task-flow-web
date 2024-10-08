import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { LoaderCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Register } from "@/api/register";

const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  passwordConfirmation: z.string().min(6),
});

type SignUpFormSchema = z.infer<typeof signUpSchema>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormSchema>({});

  const { mutateAsync: signUp } = useMutation({
    mutationFn: Register,
    onSuccess: (_, variables) => {
      const { email } = variables;
      toast.success("Cadastro realizado com sucesso", {
        action: {
          label: "fazer login",
          onClick: () => navigate(`/auth/sign-in?email=${email}`),
        },
      });
    }
  })

  async function handleSignUp(data: SignUpFormSchema) {
    await signUp(data);
  }

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-10 right-6">
        <ModeToggle />
      </div>
      <main className="flex items-center mt-28 justify-center md:mt-0 md:w-full md:h-full">
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
              <Input placeholder="Jhon Doe" required {...register("name")} />
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
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirmar Senha</Label>
              </div>
              <Input
                type="password"
                placeholder="*******"
                required
                {...register("passwordConfirmation")}
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Cadastrar"
              )}
            </Button>
          </form>
          <div className="text-center text-sm">
            Já tem uma conta?{" "}
            <Link to="/sign-in" className="underline">
              fazer login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
