import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "@/hooks/use-color-scheme";
// Tip tanımlamaları
type ThemeContextType = {
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    resolvedTheme: 'light' | 'dark';
};

const VALID_MODES = ['light', 'dark', 'system'] as const;
export type ThemeMode = typeof VALID_MODES[number]

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = "theme_mode";

export function ThemeModeProvider({ children }: { children: ReactNode }) {
    const systemScheme = useColorScheme();
    const [themeMode, setThemeModeState] = useState<ThemeMode>('system');

    // buraya AsyncStorage okuma gelecek (adım 3)
    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
            if (VALID_MODES.includes(saved as ThemeMode)) {
                setThemeModeState(saved as ThemeMode);
            }
        });

    }, [])

    // buraya setThemeMode fonksiyonu gelecek (adım 4)
    const setThemeMode = (mode: ThemeMode) => {
        setThemeModeState(mode);
        AsyncStorage.setItem(STORAGE_KEY, mode);
    }

    // buraya resolvedTheme hesaplaması gelecek (adım 5)
    const resolvedTheme: 'light' | 'dark' =
        themeMode === 'system'
            ? (systemScheme === 'dark' ? 'dark' : 'light')
            : themeMode;

    return <ThemeContext.Provider value={{ themeMode, setThemeMode, resolvedTheme }}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
    const context = useContext(ThemeContext)

    if (context == null) throw new Error("useThemeMode, ThemeModeProvider içinde kullanılmalı");

    return context;

};

