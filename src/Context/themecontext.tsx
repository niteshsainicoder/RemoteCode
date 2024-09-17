'use client';
import { createContext, useContext, useEffect, useState } from 'react';

interface Themedata {
    theme: string;
    setTheme: (theme: string) => void;
}

const ThemeContext = createContext<Themedata>({ theme: 'vs-dark', setTheme: () => {} });

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<string>('vs-dark');

    useEffect(() => {
        // Initialize the theme state with a value from localStorage or default to 'vs-dark'
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        // Save theme to localStorage whenever it changes
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    // Make sure to return the context value
    return useContext(ThemeContext);
}
