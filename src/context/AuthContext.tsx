import { createContext, ReactNode, useContext, useState } from "react";

type AuthContextType = {
    isLogged: boolean;
    setIsLogged: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {

    const [isLogged, setIsLogged] = useState(false);

    return <AuthContext.Provider value={{ isLogged, setIsLogged }}>{children}</AuthContext.Provider>

}
export function useAuth() {
    const context = useContext(AuthContext);

    if (context == null) throw new Error("useAuth, AuthProvider içinde kullanılmalı");

    return context

}