import { api } from "@/lib/axios";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export async function Register({
  email,
  name,
  password,
  passwordConfirmation,
}: RegisterRequest) {
  await api.post("/users", {
    name,
    email,
    password,
    passwordConfirmation,
  });
}
