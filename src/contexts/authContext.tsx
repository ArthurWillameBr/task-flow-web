import { UserProps } from "@/@types/user";
import { api } from "@/lib/axios";
import { createContext, ReactNode, useEffect, useState } from "react";
interface AuthContextProps {
  user: UserProps | null;
  signIn: (user: UserProps) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingStorageData = async () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        api.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };
    loadingStorageData();
  }, []);

  const signIn = async ({ email, password }: UserProps) => {
    const response = await api.post("/sessions", {
      email,
      password,
    });

    console.log(response);
    if (response.data.error) {
      console.log(response.data.error);
    } else {
      setUser(response.data.user);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));
      localStorage.setItem("@Auth:token", response.data.token);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("@Auth:user");
    localStorage.removeItem("@Auth:token");
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, user, isAuthenticated: !!user, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
