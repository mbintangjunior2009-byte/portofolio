/**
 * Centralized Design Tokens for HOSHI // SEES TERMINAL
 * Aesthetic: Persona 3 Reload (P3R)
 */

export const COLORS = {
    // Deep Ocean / Dark Hour Navy
    navy: {
        950: '#010611',
        900: '#020c1e',
        800: '#051633',
        700: '#0a2552',
        600: '#103774',
    },
    // Tartarus Electric Cyan (Primary Accent)
    cyan: {
        glow: 'rgba(0, 229, 255, 0.8)',
        neon: '#00e5ff',
        light: '#67e8f9',
        dark: '#0088ff',
    },
    // SEES Crimson / Evoker Red (Combat & Alert Accent)
    red: {
        glow: 'rgba(255, 30, 86, 0.8)',
        neon: '#ff1e56',
        crimson: '#d90429',
        pinkGlow: '#ff2a85',
    },
    // Moonlight & SP Gold (Secondary Accent)
    gold: {
        glow: 'rgba(255, 208, 0, 0.8)',
        neon: '#ffd000',
        amber: '#f59e0b',
    },
    // Neutral & Typography
    white: '#ffffff',
    slate: {
        100: '#f1f5f9',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        700: '#334155',
        800: '#1e293b',
    },
};

export const FONTS = {
    display: '"Chakra Petch", sans-serif',
    tactical: '"Rajdhani", sans-serif',
    mono: '"Share Tech Mono", monospace',
    body: '"Inter", sans-serif',
};

export const STATUS_STATES = {
    ONLINE: {
        label: 'OPERATIONAL',
        color: COLORS.cyan.neon,
        badgeBg: 'bg-[#00e5ff]/10',
        badgeBorder: 'border-[#00e5ff]/40',
        dotClass: 'bg-[#00e5ff]',
    },
    COMBAT_READY: {
        label: 'COMBAT READY',
        color: COLORS.red.neon,
        badgeBg: 'bg-[#ff1e56]/10',
        badgeBorder: 'border-[#ff1e56]/40',
        dotClass: 'bg-[#ff1e56]',
    },
    STANDBY: {
        label: 'STANDBY',
        color: COLORS.gold.neon,
        badgeBg: 'bg-[#ffd000]/10',
        badgeBorder: 'border-[#ffd000]/40',
        dotClass: 'bg-[#ffd000]',
    },
    DARK_HOUR: {
        label: 'DARK HOUR ACTIVE',
        color: COLORS.red.pinkGlow,
        badgeBg: 'bg-[#ff2a85]/20',
        badgeBorder: 'border-[#ff2a85]',
        dotClass: 'bg-[#ff2a85] animate-ping',
    },
};

export const NAVIGATION_ROUTES = [
    { name: 'PROFILE', path: '/dossier', labelJa: '調書', code: '01' },
    { name: 'ABILITIES', path: '/skills', labelJa: '能力値', code: '02' },
    { name: 'OPERATIONS', path: '/operations', labelJa: '作戦録', code: '03' },
    { name: 'RECORDS', path: '/records', labelJa: '記録', code: '04' },
    { name: 'CONTACT', path: '/comms', labelJa: '通信', code: '05' },
];

