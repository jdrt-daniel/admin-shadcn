"use client";

import { createContext, ReactNode, useContext } from "react";

interface ContextProps {
  user: string;
}

const AuthContext = createContext<ContextProps>({} as ContextProps);

interface AuthContextType {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthContextType) => {
  return (
    <AuthContext.Provider value={{ user: "user" }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
