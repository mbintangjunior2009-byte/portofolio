import '../css/app.css';
import './bootstrap';

import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import LoadingScreen from './Components/Sees/LoadingScreen';
import ThemeProvider from './Components/ThemeProvider';

const appName = import.meta.env.VITE_APP_NAME || 'HOSHI // SEES TERMINAL';

createInertiaApp({
    title: (title) => (title ? `${title} — ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <ThemeProvider>
                <LoadingScreen>
                    <App {...props} />
                </LoadingScreen>
            </ThemeProvider>,
        );
    },
    progress: {
        color: '#00f0ff',
        showSpinner: true,
    },
});
