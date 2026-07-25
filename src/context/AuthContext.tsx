import { createContext, ReactNode, useContext, useState } from "react";

type AuthContextType = {
    isLogged: boolean;
    setIsLogged: (value: boolean) => void;
    user: UserData | null;
    setUser: (user: UserData | null) => void;
};

type UserData = {
    uuid: string;
    name: string;
    username: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {

    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<UserData | null>(null);

    return <AuthContext.Provider value={{ isLogged, setIsLogged, user, setUser }}>{children}</AuthContext.Provider>

}

export function useAuth() {
    const context = useContext(AuthContext);

    if (context == null) throw new Error("useAuth, AuthProvider içinde kullanılmalı");

    return context

}