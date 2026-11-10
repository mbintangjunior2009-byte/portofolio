import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Terminal, Menu, X, Volume2, VolumeX, Sun, Moon } from 'lucide-react';
import { NAVIGATION_ROUTES } from '../constants/theme';
import { playHoverSfx, playConfirmSfx, toggleSound, isSoundEnabled } from '../utils/soundEffects';
import { useTheme } from '../hooks/useTheme';

/**
 * Navigation — redesigned to feel like an integrated P3R game interface.
 *
 * Design language extracted from screenshots 2 & 5:
 *  - Single unified bar: no stacked toolbar tiers, no ribbon banners.
 *  - Brand is a minimal left anchor — small skewed badge + "HOSHI", nothing more.
 *  - Nav links are a right-aligned P3R stairstep diagonal list:
 *      · Inactive items: dark, minimal, uniform height — like the party rows in screenshot 2.
 *      · Active item: white fill, red accent, dramatically taller — the inverted selection state.
 *  - Telemetry (clock, dark-hour state) shrinks to incidental 9px micro-text.
 *  - Mobile: full-bleed diagonal drawer matching screenshot 5's staircase pattern.
 */
export default function Navigation() {
    const { url } = usePage();
    const [currentTime, setCurrentTime] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isDarkHour, setIsDarkHour] = useState(false);
    const [soundActive, setSoundActive] = useState(true);

    useEffect(() => {
        setSoundActive(isSoundEnabled());
        const tick = () => {
            const now = new Date();
            const hh = String(now.getHours()).padStart(2, '0');
            const mm = String(now.getMinutes()).padStart(2, '0');
            const ss = String(now.getSeconds()).padStart(2, '0');
            setCurrentTime(`${hh}:${mm}:${ss}`);
            setIsDarkHour(now.getHours() === 0);
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const handleSoundToggle = () => setSoundActive(toggleSound());
    const { isLight, toggleTheme } = useTheme();

    return (
        <header className="relative z-40 bg-[#010814]/98 backdrop-blur-md" style={{ borderBottom: '1px solid rgba(0,229,255,0.08)' }}>

            {/* ── SINGLE UNIFIED BAR ─────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-stretch justify-between" style={{ minHeight: '52px' }}>

                    {/* LEFT — Brand anchor */}
                    <Link
                        href="/"
                        onMouseEnter={playHoverSfx}
                        onClick={playConfirmSfx}
                        className="flex items-center gap-3 py-2 group flex-shrink-0"
                        aria-label="HOSHI // SEES TERMINAL home"
                    >
                        {/* Skewed badge — the only decorated element on the left */}
                        <div
                            className="flex items-center justify-center font-['Chakra_Petch'] font-black text-[#010814] text-sm px-2.5 py-1"
                            style={{
                                background: isDarkHour
                                    ? 'linear-gradient(135deg,#ff1e56,#ff2a85)'
                                    : 'linear-gradient(135deg,#00e5ff,#0055ff)',
                                transform: 'skewX(-12deg)',
                                clipPath: 'polygon(0 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%)',
                            }}
                        >
                            <span style={{ transform: 'skewX(12deg)', display: 'block' }}>
                                <Terminal className="w-3.5 h-3.5" />
                            </span>
                        </div>

                        {/* Name */}
                        <div className="leading-tight">
                            <span
                                className="block font-['Chakra_Petch'] font-black uppercase tracking-wider text-white"
                                style={{ fontSize: '15px', letterSpacing: '0.12em' }}
                            >
                                HOSHI
                                <span className="font-normal text-[#00e5ff]/60 mx-1.5">//</span>
                                <span className="text-slate-400 font-normal text-xs">TERMINAL</span>
                            </span>
                            {/* Micro subtitle — incidental */}
                            <span className="block font-mono text-[8px] text-slate-700 uppercase tracking-[0.18em] leading-tight hidden sm:block">
                                S.E.E.S. · LSP RPL CADET
                            </span>
                        </div>
                    </Link>

                    {/* RIGHT — Desktop nav + micro telemetry */}
                    <div className="hidden md:flex items-stretch">

                        {/* Micro telemetry — absolute right edge, incidental */}
                        <div className="flex flex-col items-end justify-center pr-4 border-r border-[rgba(0,229,255,0.06)] mr-0">
                            <span
                                className="font-mono tabular-nums leading-none"
                                style={{
                                    fontSize: '9px',
                                    color: isDarkHour ? '#ff2a85' : 'rgba(0,229,255,0.45)',
                                    letterSpacing: '0.1em',
                                }}
                            >
                                {currentTime || '00:00:00'}
                            </span>
                            <span className="font-mono text-[8px] text-slate-700 uppercase tracking-widest leading-none mt-0.5">
                                {isDarkHour ? 'DARK HOUR' : 'SYSTEM TIME'}
                            </span>
                        </div>

                        {/* SFX toggle — ghost, incidental */}
                        <button
                            onClick={handleSoundToggle}
                            className="flex items-center justify-center px-3 border-r border-[rgba(0,229,255,0.06)] transition-colors"
                            style={{ color: soundActive ? 'rgba(0,229,255,0.4)' : 'rgba(100,116,139,0.4)' }}
                            title={soundActive ? 'Mute SFX' : 'Enable SFX'}
                            aria-label={soundActive ? 'Mute SFX' : 'Enable SFX'}
                        >
                            {soundActive
                                ? <Volume2 className="w-3.5 h-3.5" />
                                : <VolumeX className="w-3.5 h-3.5" />
                            }
                        </button>

                        {/* Theme toggle — light / dark */}
                        <button
                            onClick={toggleTheme}
                            className="flex items-center justify-center px-3 border-r border-[rgba(0,229,255,0.06)] transition-colors"
                            style={{ color: isLight ? 'rgba(0,85,255,0.7)' : 'rgba(0,229,255,0.4)' }}
                            title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                            aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                        >
                            {isLight
                                ? <Moon className="w-3.5 h-3.5" />
                                : <Sun className="w-3.5 h-3.5" />
                            }
                        </button>

                        {/* ── P3R STAIRSTEP NAV LINKS ── */}
                        {/*
                          Ref: screenshots 2 & 5.
                          Each link is a flat diagonal band. The active item:
                          - white fill, dark text, red left accent
                          - taller padding = larger visual weight
                          Inactive items: dark, minimal, equal height.
                          Links sit flush against each other — no gaps.
                        */}
                        <nav className="flex items-stretch" aria-label="Primary navigation">
                            {NAVIGATION_ROUTES.map((route, idx) => {
                                const isActive = url === route.path;
                                return (
                                    <Link
                                        key={route.code}
                                        href={route.path}
                                        onMouseEnter={playHoverSfx}
                                        onClick={playConfirmSfx}
                                        className="relative flex items-center transition-all duration-150 group"
                                        aria-current={isActive ? 'page' : undefined}
                                        style={{
                                            padding: isActive ? '0 20px' : '0 16px',
                                            background: isActive ? '#ffffff' : 'transparent',
                                            transform: 'skewX(-10deg)',
                                            clipPath: isActive
                                                ? 'polygon(0 0,100% 0,100% 100%,8px 100%)'
                                                : undefined,
                                            borderLeft: isActive
                                                ? '3px solid #ff1e56'
                                                : '1px solid rgba(0,229,255,0.06)',
                                            transition: 'background 0.2s ease, padding 0.2s ease, border-color 0.2s ease',
                                        }}
                                    >
                                        <div
                                            className="flex flex-col items-start"
                                            style={{ transform: 'skewX(10deg)' }}
                                        >
                                            {/* Code number */}
                                            <span
                                                className="font-mono font-bold leading-none mb-0.5"
                                                style={{
                                                    fontSize: '8px',
                                                    color: isActive ? '#ff1e56' : 'rgba(0,229,255,0.35)',
                                                    letterSpacing: '0.08em',
                                                }}
                                            >
                                                {route.code}
                                            </span>
                                            {/* Route name */}
                                            <span
                                                className="font-['Chakra_Petch'] font-black uppercase leading-none"
                                                style={{
                                                    fontSize: isActive ? '13px' : '11px',
                                                    letterSpacing: '0.08em',
                                                    color: isActive ? '#010814' : (
                                                        // Slightly brighten on hover via group
                                                        'rgba(148,163,184,0.85)'
                                                    ),
                                                    transition: 'color 0.15s',
                                                }}
                                            >
                                                {route.name}
                                            </span>
                                            {/* Japanese label — micro, incidental */}
                                            <span
                                                className="font-mono leading-none mt-0.5"
                                                style={{
                                                    fontSize: '7px',
                                                    letterSpacing: '0.05em',
                                                    color: isActive ? 'rgba(1,8,20,0.45)' : 'rgba(71,85,105,0.7)',
                                                }}
                                            >
                                                {route.labelJa}
                                            </span>
                                        </div>

                                        {/* Hover state for inactive items via CSS pseudo isn't easy in
                                            Tailwind inline, so we use a transparent overlay approach */}
                                        {!isActive && (
                                            <div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                style={{
                                                    background: 'rgba(0,85,255,0.08)',
                                                    pointerEvents: 'none',
                                                }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Mobile controls */}
                    <div className="flex md:hidden items-center gap-2">
                        <span
                            className="font-mono tabular-nums text-[10px]"
                            style={{ color: isDarkHour ? '#ff2a85' : 'rgba(0,229,255,0.5)' }}
                        >
                            {currentTime}
                        </span>
                        <button
                            onClick={handleSoundToggle}
                            className="p-1.5"
                            style={{ color: soundActive ? 'rgba(0,229,255,0.5)' : 'rgba(100,116,139,0.4)' }}
                            aria-label={soundActive ? 'Mute SFX' : 'Enable SFX'}
                        >
                            {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                        </button>
                        {/* Theme toggle mobile */}
                        <button
                            onClick={toggleTheme}
                            className="p-1.5"
                            style={{ color: isLight ? 'rgba(0,85,255,0.7)' : 'rgba(0,229,255,0.5)' }}
                            aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                        >
                            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={() => { playConfirmSfx(); setMobileOpen(!mobileOpen); }}
                            className="p-1.5 text-slate-300"
                            aria-label="Toggle navigation menu"
                            aria-expanded={mobileOpen}
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ── MOBILE DRAWER ──────────────────────────────────────── */}
            {/*
              P3R stairstep pattern: each item shifts right by a fixed amount
              (ref: screenshot 5's SKILL/ITEM/EQUIP diagonal cascade).
              Active = white fill + red left border.
              animate-drawer-down: slides in from slightly above on open.
            */}
            {mobileOpen && (
                <div
                    className="md:hidden py-3 px-4 animate-drawer-down"
                    style={{ background: '#010a1a', borderTop: '1px solid rgba(0,229,255,0.08)' }}
                >
                    {NAVIGATION_ROUTES.map((route, idx) => {
                        const isActive = url === route.path;
                        const indent = idx * 14;
                        return (
                            <Link
                                key={route.code}
                                href={route.path}
                                onClick={() => { playConfirmSfx(); setMobileOpen(false); }}
                                className="flex items-center justify-between mb-1.5 last:mb-0 transition-all"
                                style={{
                                    marginLeft: `${indent}px`,
                                    padding: '10px 14px',
                                    background: isActive ? '#ffffff' : 'rgba(5,22,51,0.7)',
                                    borderLeft: isActive
                                        ? '3px solid #ff1e56'
                                        : '1px solid rgba(0,229,255,0.12)',
                                    clipPath: 'polygon(0 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%)',
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className="font-mono font-bold"
                                        style={{
                                            fontSize: '9px',
                                            color: isActive ? '#ff1e56' : 'rgba(0,229,255,0.4)',
                                        }}
                                    >
                                        {route.code}
                                    </span>
                                    <span
                                        className="font-['Chakra_Petch'] font-black uppercase tracking-wider"
                                        style={{
                                            fontSize: '13px',
                                            color: isActive ? '#010814' : '#cbd5e1',
                                        }}
                                    >
                                        {route.name}
                                    </span>
                                </div>
                                <span
                                    className="font-mono"
                                    style={{
                                        fontSize: '9px',
                                        color: isActive ? 'rgba(1,8,20,0.4)' : 'rgba(71,85,105,0.8)',
                                    }}
                                >
                                    {route.labelJa}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            )}
        </header>
    );
}
