import {  UserProps } from "@/@types/user"
import { api } from "@/lib/axios";
import { createContext, ReactNode, useEffect, useState } from "react";
interface AuthContextProps {
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
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingStorageData = async () => {
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageToken) {
        setToken(storageToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
      } else {
        setToken(null);
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

    if (response.data.error) {
      console.log(response.data.error);
    } else {
      const token = response.data.token;
      setToken(token);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      localStorage.setItem("@Auth:token", response.data.token);
    }
  };

  const signOut = () => {
    setToken(null);
    localStorage.removeItem("@Auth:token");
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, isAuthenticated: !!token, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
