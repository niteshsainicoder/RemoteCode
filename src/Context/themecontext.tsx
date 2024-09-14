'use client';
import { createContext, useContext, useEffect, useState } from "react";

interface themedata {
    theme: string,
    setTheme: (theme: string) => void;

}

const ThemeContext = createContext<themedata>({ theme: 'dark', setTheme: () => { } })
export function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<string>(() => {
        // Initialize the theme state with a value from localStorage or default to 'vs-dark'
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme : 'vs-dark';
    });


    useEffect(() => {
        // Save theme to localStorage whenever it changes
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>)

}
export function useTheme() {
    // Make sure to return the context value
    return useContext(ThemeContext);
}