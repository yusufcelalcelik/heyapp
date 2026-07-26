import { createContext, ReactNode, useContext, useState } from "react";

// Context üzerinden dışarı açılan değerlerin ve fonksiyonların tipi.
type AuthContextType = {
    isLogged: boolean;
    setIsLogged: (value: boolean) => void;
    user: UserData | null;
    setUser: (user: UserData | null) => void;
    logout: () => void;
};

// Login sonrası API'den dönen ve context'te tutulan kullanıcı bilgileri.
type UserData = {
    uuid: string;
    name: string;
    username: string;
    post: number;
    follow: number;
    follower: number;
    bio: string;
};

// Başlangıç değeri null: Provider dışında useContext çağrılırsa bunu yakalayıp hata fırlatıyoruz (bkz. useAuth).
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Uygulama genelinde giriş durumunu ve kullanıcı bilgisini yönetir.
 * _layout.tsx içinde tüm uygulamayı sarmalayacak şekilde kullanılır.
 */
export function AuthProvider({ children }: { children: ReactNode }) {

    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<UserData | null>(null);

    // Çıkış yapıldığında hem giriş durumu hem kullanıcı bilgisi sıfırlanır.
    // isLogged false olunca _layout.tsx'teki Stack.Protected guard'ı otomatik olarak login ekranına yönlendirir.
    const logout = () => {
        setUser(null);
        setIsLogged(false);
    };

    return <AuthContext.Provider value={{ isLogged, setIsLogged, user, setUser, logout }}>{children}</AuthContext.Provider>

}

/**
 * AuthContext'e erişim için kullanılan hook.
 * AuthProvider dışında çağrılırsa anlamlı bir hata verir, sessizce undefined dönmez.
 */
export function useAuth() {
    const context = useContext(AuthContext);

    if (context == null) throw new Error("useAuth, AuthProvider içinde kullanılmalı");

    return context

}