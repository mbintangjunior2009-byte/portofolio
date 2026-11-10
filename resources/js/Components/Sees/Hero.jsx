import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { useClock } from '../../utils/useClock';
import { playHoverSfx, playConfirmSfx } from '../../utils/soundEffects';

/**
 * Hero — HOSHI // SEES TERMINAL homepage.
 *
 * P3R editorial composition (ref: screenshots 3 & 4):
 * - HOSHI as a massive vertical typographic anchor, left-aligned, bleeds
 *   toward the bottom edge — dominant, not decorative.
 * - "WELCOME TO THE DARK HOUR" stacks to the right at dramatically
 *   smaller scale — strong typographic hierarchy.
 * - Moon bleeds partially off the top-right edge as a structural element
 *   that defines the composition, not a floating ornament.
 * - CTAs are slim P3R diagonal bands from screenshot 4 (SKILL menu style).
 * - Telemetry shrinks to micro-text at bottom — incidental, not competing.
 * - No dashboard borders, no glowing-border panels.
 */
export default function Hero({
    terminalStatus = 'ONLINE',
    securityLevel = 'LEVEL 4 S-RANK',
}) {
    const { time, date, isDarkHour } = useClock();

    return (
        <section className="relative w-full min-h-[calc(100vh-4.5rem)] flex flex-col overflow-hidden">

            {/* ── ATMOSPHERE LAYERS ──────────────────────────────────── */}

            {/* Deep navy base with blue radial lift */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_75%_-10%,rgba(0,85,255,0.18),transparent_60%)] pointer-events-none" />

            {/* Diagonal light shaft — structural, from top-right */}
            <div
                className="absolute pointer-events-none"
                style={{
                    top: '-10%', right: '-5%',
                    width: '55%', height: '110%',
                    background: 'linear-gradient(205deg, rgba(0,229,255,0.07) 0%, transparent 55%)',
                    transform: 'skewX(-8deg)',
                }}
            />

            {/* Secondary red accent diagonal — bottom-left grounding line */}
            <div
                className="absolute bottom-0 left-0 pointer-events-none"
                style={{
                    width: '40%', height: '3px',
                    background: 'linear-gradient(90deg, #ff1e56 0%, transparent 100%)',
                    transform: 'skewX(-20deg)',
                    transformOrigin: 'left bottom',
                }}
            />

            {/* THE MOON — structural top-right anchor, bleeds off edge */}
            <div
                className="absolute pointer-events-none animate-moon-glow"
                style={{ top: '-8%', right: '-6%' }}
                aria-hidden="true"
            >
                {/* Outer atmospheric halo */}
                <div
                    className="absolute rounded-full"
                    style={{
                        inset: '-40px',
                        background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)',
                    }}
                />
                {/* Moon disc */}
                <div
                    style={{
                        width: 'clamp(260px, 28vw, 480px)',
                        height: 'clamp(260px, 28vw, 480px)',
                        borderRadius: '50%',
                        backgroundImage: [
                            'radial-gradient(circle at 62% 38%, rgba(20,40,70,0.5) 0%, transparent 7%)',
                            'radial-gradient(circle at 40% 62%, rgba(20,40,70,0.45) 0%, transparent 6%)',
                            'radial-gradient(circle at 70% 68%, rgba(20,40,70,0.4) 0%, transparent 5%)',
                            'radial-gradient(circle at 30% 40%, rgba(20,40,70,0.3) 0%, transparent 4%)',
                            'radial-gradient(circle at 34% 30%, #d8eeff 0%, #8ab8d8 30%, #4a7aaa 60%, #1a3a60 85%, #0a1a30 100%)',
                        ].join(', '),
                        boxShadow: [
                            '0 0 120px rgba(0,100,200,0.35)',
                            '0 0 50px rgba(0,180,255,0.2)',
                            'inset -18px -20px 60px rgba(0,0,0,0.65)',
                        ].join(', '),
                    }}
                />
                {/* Thin rim ring */}
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        border: '1px solid rgba(0,229,255,0.12)',
                        transform: 'scale(1.04)',
                    }}
                />
            </div>

            {/* Faint "DARK HOUR" watermark — low-opacity, bottom-anchored */}
            <div
                className="absolute bottom-0 left-0 w-full p3r-section-kanji pointer-events-none select-none"
                style={{
                    fontSize: 'clamp(80px, 14vw, 200px)',
                    lineHeight: 0.85,
                    paddingLeft: '0.02em',
                }}
                aria-hidden="true"
            >
                DARK HOUR
            </div>

            {/* Vertical side label */}
            <div
                className="p3r-side-label absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
                aria-hidden="true"
            >
                S.E.E.S. TACTICAL OS · 2026
            </div>

            {/* ── CONTENT ────────────────────────────────────────────── */}
            <div className="relative z-10 flex-1 flex flex-col w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                {/* Micro telemetry strip — incidental, not competing */}
                <div className="flex items-center justify-between pt-5 sm:pt-6 pb-0">
                    <div className="flex items-center gap-3 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                        <span
                            className="inline-flex items-center gap-1.5"
                            style={{ color: isDarkHour ? '#ff2a85' : '#00e5ff' }}
                        >
                            <span
                                className="w-1.5 h-1.5 rounded-full animate-pulse"
                                style={{ background: isDarkHour ? '#ff2a85' : '#00e5ff' }}
                            />
                            {isDarkHour ? 'DARK HOUR ACTIVE' : `SYSTEM: ${terminalStatus}`}
                        </span>
                        <span className="hidden sm:inline text-slate-600">·</span>
                        <span className="hidden sm:inline">{securityLevel}</span>
                    </div>
                    <div className="font-mono text-[10px] text-slate-600 tabular-nums tracking-widest">
                        {time} · {date}
                    </div>
                </div>

                {/* ── MAIN EDITORIAL STAGE ── */}
                <div className="flex-1 flex flex-col justify-center lg:justify-end pb-16 sm:pb-20">

                    {/*
                      Two-part editorial composition:
                      LEFT  — "HOSHI" as massive vertical text, bottom-anchored
                      RIGHT — headline stack + intro + CTAs
                    */}
                    <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-0">

                        {/* HOSHI — the dominant typographic anchor */}
                        <div className="lg:pr-8 flex-shrink-0">
                            {/* Kicker line above the name */}
                            <div className="mb-1 flex items-center gap-2">
                                <div
                                    className="h-px flex-shrink-0"
                                    style={{
                                        width: '32px',
                                        background: '#ff1e56',
                                    }}
                                />
                                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-[0.2em]">
                                    Persona 3 Reload · Operator
                                </span>
                            </div>

                            <h1
                                className="font-['Chakra_Petch'] font-black uppercase leading-[0.82] text-white p3r-bleed-left"
                                style={{
                                    fontSize: 'clamp(88px, 14vw, 200px)',
                                    textShadow: '0 0 80px rgba(0,229,255,0.12)',
                                }}
                            >
                                HOSHI
                            </h1>

                            {/* Kanji + subtitle under the name */}
                            <div className="mt-2 flex items-baseline gap-3">
                                <span
                                    className="font-['Chakra_Petch'] font-black text-2xl sm:text-3xl"
                                    style={{ color: 'rgba(0,229,255,0.35)' }}
                                >
                                    星
                                </span>
                                <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">
                                    // SEES TERMINAL
                                </span>
                            </div>
                        </div>

                        {/* RIGHT — headline, intro, CTAs */}
                        <div className="lg:border-l lg:border-[rgba(0,229,255,0.12)] lg:pl-10 flex flex-col justify-end">

                            {/* Headline — dramatic scale contrast with HOSHI */}
                            <h2 className="font-['Chakra_Petch'] font-black uppercase leading-[0.9] mb-5">
                                <span
                                    className="block text-slate-400 tracking-[0.15em]"
                                    style={{ fontSize: 'clamp(11px, 1.1vw, 14px)' }}
                                >
                                    WELCOME TO THE
                                </span>
                                <span
                                    className="block text-white"
                                    style={{
                                        fontSize: 'clamp(36px, 6.5vw, 96px)',
                                        letterSpacing: '-0.02em',
                                        textShadow: '0 2px 40px rgba(0,100,255,0.3)',
                                    }}
                                >
                                    DARK
                                </span>
                                <span
                                    className="block"
                                    style={{
                                        fontSize: 'clamp(36px, 6.5vw, 96px)',
                                        letterSpacing: '-0.02em',
                                        background: 'linear-gradient(100deg, #ffffff 0%, #00e5ff 55%, #0055ff 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    HOUR.
                                </span>
                            </h2>

                            {/* Short intro — small, below the headline */}
                            <p
                                className="font-sans text-slate-400 leading-relaxed mb-7 max-w-sm"
                                style={{ fontSize: 'clamp(12px, 1.1vw, 14px)' }}
                            >
                                Vocational software engineering cadet.{' '}
                                <span className="text-slate-200">Laravel 12</span>,{' '}
                                <span className="text-slate-200">Inertia.js 2</span>,{' '}
                                <span className="text-slate-200">React 18</span>.
                            </p>

                            {/*
                              CTAs — slim P3R diagonal bands (ref: screenshot 4 SKILL menu).
                              Primary = white bg + red border (the SKILL slash style).
                              Secondary = dark navy, no fill.
                            */}
                            <div className="flex flex-col sm:flex-row gap-3 items-start">
                                <Link
                                    href="/dossier"
                                    onMouseEnter={playHoverSfx}
                                    onClick={playConfirmSfx}
                                    className="group relative inline-flex items-center gap-3 px-7 py-3 font-['Chakra_Petch'] font-black uppercase tracking-wider text-sm overflow-hidden"
                                    style={{
                                        background: '#ffffff',
                                        color: '#010814',
                                        transform: 'skewX(-14deg)',
                                        boxShadow: '4px 4px 0 #ff1e56, -2px -2px 0 #00e5ff',
                                        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)',
                                    }}
                                >
                                    <span
                                        className="flex items-center gap-2"
                                        style={{ transform: 'skewX(14deg)' }}
                                    >
                                        ACCESS PROFILE
                                        <ChevronRight className="w-4 h-4 text-[#ff1e56] transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>

                                <Link
                                    href="/operations"
                                    onMouseEnter={playHoverSfx}
                                    onClick={playConfirmSfx}
                                    className="group inline-flex items-center gap-3 px-7 py-3 font-['Chakra_Petch'] font-bold uppercase tracking-wider text-sm text-[#00e5ff]"
                                    style={{
                                        transform: 'skewX(-14deg)',
                                        border: '1px solid rgba(0,229,255,0.35)',
                                        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)',
                                    }}
                                >
                                    <span
                                        className="flex items-center gap-2"
                                        style={{ transform: 'skewX(14deg)' }}
                                    >
                                        VIEW OPERATIONS
                                        <ArrowRight className="w-4 h-4 opacity-60 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom micro strip */}
                <div className="pb-5 flex items-center justify-between">
                    <div className="flex items-center gap-4 font-mono text-[9px] text-slate-700 uppercase tracking-widest">
                        <span>Laravel 12</span>
                        <span className="text-slate-800">·</span>
                        <span>Inertia 2</span>
                        <span className="text-slate-800">·</span>
                        <span>React 18</span>
                        <span className="text-slate-800">·</span>
                        <span>Tailwind 4</span>
                    </div>
                    <div className="font-mono text-[9px] text-slate-700 uppercase tracking-widest hidden sm:block">
                        S.E.E.S. · REV 2026.11
                    </div>
                </div>
            </div>
        </section>
    );
}
