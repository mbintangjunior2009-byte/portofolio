import React from 'react';
import { ThemeContext, useThemeState } from '../hooks/useTheme';

/**
 * ThemeProvider — wraps the whole app and exposes { theme, toggleTheme, isLight }
 * to any descendant via useTheme(). Lives at the Inertia app root (app.jsx)
 * so it survives Inertia soft-navigations without resetting.
 */
export default function ThemeProvider({ children }) {
    const value = useThemeState();
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}
