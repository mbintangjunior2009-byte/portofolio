import { createContext, useContext, useEffect, useState } from 'react';

/**
 * useTheme — light/dark theme system for HOSHI // SEES TERMINAL.
 *
 * Strategy:
 *  - Default is 'dark'.
 *  - Selected theme is persisted to localStorage under 'hoshi_theme'.
 *  - On mount the hook reads localStorage and sets data-theme on <html>
 *    so CSS custom-property overrides apply immediately.
 *  - Flash prevention: app.blade.php injects an inline script that reads
 *    the same key and applies the attribute before React hydrates.
 */

export const ThemeContext = createContext({
    theme: 'dark',
    toggleTheme: () => {},
    isLight: false,
});

const STORAGE_KEY = 'hoshi_theme';

export function useThemeState() {
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') return 'dark';
        return localStorage.getItem(STORAGE_KEY) || 'dark';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'light') {
            root.setAttribute('data-theme', 'light');
        } else {
            root.removeAttribute('data-theme');
        }
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return { theme, toggleTheme, isLight: theme === 'light' };
}

export function useTheme() {
    return useContext(ThemeContext);
}
