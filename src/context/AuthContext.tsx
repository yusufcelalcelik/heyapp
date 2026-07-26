import { createContext, ReactNode, useContext, useState } from "react";

type AuthContextType = {
    isLogged: boolean;
    setIsLogged: (value: boolean) => void;
    user: UserData | null;
    setUser: (user: UserData | null) => void;
    logout: () => void;
};

type UserData = {
    uuid: string;
    name: string;
    username: string;
    post: number;
    follow: number;
    follower: number;
    bio: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<UserData | null>(null);
    const logout = () => {
        setUser(null);
        setIsLogged(false);
    };

    return <AuthContext.Provider value={{ isLogged, setIsLogged, user, setUser, logout }}>{children}</AuthContext.Provider>

}

export function useAuth() {
    const context = useContext(AuthContext);

    if (context == null) throw new Error("useAuth, AuthProvider içinde kullanılmalı");

    return context

}