import React from 'react';
import MainLayout from '../../Layouts/MainLayout';
import PrimaryButton from '../../Components/UI/PrimaryButton';
import SecondaryButton from '../../Components/UI/SecondaryButton';
import { PROFILE } from '../../data/portfolioData';
import {
    MapPin,
    Gamepad2,
    Code2,
    Music,
    BookOpen,
    Camera,
    Sparkles,
    GraduationCap,
} from 'lucide-react';

/**
 * Dossier — PROFILE / ABOUT page.
 *
 * P3R character-profile composition (ref: screenshots 2 & 5):
 *  - Left: avatar fills the panel edge-to-edge with no card border.
 *    Identity data sits as minimal flat mono rows below it — no boxes.
 *    A large 調書 kanji watermark bleeds behind both columns.
 *  - Right: section label oversized at top (macro), bio text normal (micro).
 *    Interests rendered as a P3R stairstep diagonal list — each item
 *    shifts right, creating the staircase depth from screenshot 2.
 *  - No symmetric bordered cards. No repeated cut-corner-lg framing.
 *  - Color is used sparingly: red accents on the active/first element only.
 */

const INTEREST_ICONS = [Gamepad2, Sparkles, Code2, Music, BookOpen, Camera];

export default function Dossier() {
    return (
        <MainLayout title="OPERATOR PROFILE">
            {/* ── PAGE FRAME ────────────────────────────────────────── */}
            <div className="relative min-h-[80vh]">

                {/* Large kanji watermark — structural background identity */}
                <div
                    className="absolute top-0 left-0 pointer-events-none select-none p3r-section-kanji"
                    style={{
                        fontSize: 'clamp(120px, 20vw, 280px)',
                        lineHeight: 0.8,
                        color: 'rgba(0,229,255,0.04)',
                        zIndex: 0,
                    }}
                    aria-hidden="true"
                >
                    調書
                </div>

                {/* Page header — category kicker + title */}
                <div className="relative z-10 mb-10 sm:mb-12">
                    {/* Category kicker */}
                    <div className="flex items-center gap-3 mb-3">
                        <div
                            className="h-px w-8 flex-shrink-0"
                            style={{ background: '#ff1e56' }}
                        />
                        <span
                            className="font-mono uppercase tracking-[0.2em] text-slate-500"
                            style={{ fontSize: '10px' }}
                        >
                            Personnel File · S.E.E.S.
                        </span>
                    </div>

                    {/* Title — macro/micro hierarchy */}
                    <div className="flex items-baseline gap-5">
                        <h1
                            className="font-['Chakra_Petch'] font-black uppercase text-white leading-none"
                            style={{ fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '-0.02em' }}
                        >
                            OPERATOR
                        </h1>
                        <span
                            className="font-['Chakra_Petch'] font-black uppercase leading-none"
                            style={{
                                fontSize: 'clamp(40px, 6vw, 80px)',
                                letterSpacing: '-0.02em',
                                background: 'linear-gradient(90deg,#00e5ff,#0055ff)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            PROFILE
                        </span>
                    </div>

                    {/* Slash divider under the title */}
                    <div className="mt-3 p3r-slash-divider" style={{ width: '60%', maxWidth: '480px' }} />
                </div>

                {/* ── MAIN LAYOUT ───────────────────────────────────── */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-10">

                    {/* LEFT COLUMN — avatar bleeds, minimal flat identity rows */}
                    <div className="lg:col-span-4 mb-10 lg:mb-0">

                        {/* Avatar: real photo, edge-to-edge, no card border */}
                        <div
                            className="relative overflow-hidden mb-6"
                            style={{
                                aspectRatio: '3/4',
                                maxWidth: '260px',
                                clipPath: 'polygon(0 0,100% 0,100% calc(100% - 24px),calc(100% - 24px) 100%,0 100%)',
                            }}
                        >
                            <img
                                src="/images/profile.jpg"
                                alt="Muhammad Bintang Junior — Operator HOSHI"
                                className="w-full h-full object-cover object-top"
                                loading="eager"
                            />

                            {/* Diagonal stripe texture overlay */}
                            <div
                                className="absolute inset-0 stripe-blue opacity-10 pointer-events-none mix-blend-overlay"
                                aria-hidden="true"
                            />

                            {/* Name block — anchored to bottom of avatar */}
                            <div
                                className="absolute bottom-0 left-0 right-0 px-5 py-4"
                                style={{
                                    background: 'linear-gradient(0deg,rgba(1,8,20,0.97) 0%,rgba(1,8,20,0.5) 60%,transparent 100%)',
                                }}
                            >
                                <div
                                    className="font-['Chakra_Petch'] font-black uppercase text-white leading-tight"
                                    style={{ fontSize: '22px', letterSpacing: '0.02em' }}
                                >
                                    Muhammad Bintang Junior
                                </div>
                                <div
                                    className="font-mono text-[#00e5ff] uppercase tracking-widest mt-0.5"
                                    style={{ fontSize: '9px' }}
                                >
                                    {PROFILE.arcana}
                                </div>
                            </div>

                            {/* Red accent line on left edge */}
                            <div
                                className="absolute left-0 top-0 bottom-0 w-0.5"
                                style={{ background: 'linear-gradient(180deg,#ff1e56 0%,transparent 100%)' }}
                            />
                        </div>

                        {/* Identity data — flat mono rows, no card wrapper */}
                        <div
                            className="space-y-0 font-mono"
                            style={{ fontSize: '10px' }}
                        >
                            {[
                                { label: 'PERSONA', value: PROFILE.assignedPersona },
                                { label: 'DIVISION', value: PROFILE.division },
                                {
                                    label: 'LOCATION',
                                    value: PROFILE.location,
                                    icon: <MapPin className="w-2.5 h-2.5 inline mr-1 text-[#00e5ff]" />,
                                },
                                { label: 'STATUS', value: PROFILE.status, highlight: true },
                            ].map(({ label, value, icon, highlight }) => (
                                <div
                                    key={label}
                                    className="flex items-baseline justify-between py-2 gap-4"
                                    style={{ borderBottom: '1px solid rgba(0,229,255,0.07)' }}
                                >
                                    <span style={{ color: 'rgba(100,116,139,0.8)', flexShrink: 0 }}>
                                        {label}
                                    </span>
                                    <span
                                        className="text-right leading-tight"
                                        style={{
                                            color: highlight ? '#ff1e56' : 'rgba(203,213,225,0.75)',
                                        }}
                                    >
                                        {icon}{value}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Current status note */}
                        <p
                            className="mt-5 font-mono leading-relaxed"
                            style={{ fontSize: '10px', color: 'rgba(100,116,139,0.7)' }}
                        >
                            {PROFILE.currentStatus}
                        </p>
                    </div>

                    {/* RIGHT COLUMN — bio + interests */}
                    <div className="lg:col-span-8 flex flex-col gap-10">

                        {/* Bio section */}
                        <div>
                            {/* Section micro-label */}
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="font-mono uppercase tracking-[0.18em] text-slate-500"
                                    style={{ fontSize: '9px' }}
                                >
                                    01 · Profile & Philosophy
                                </div>
                                <div className="flex-1 p3r-rule" />
                            </div>

                            {/* Bio text — not inside a card */}
                            <p
                                className="font-sans leading-relaxed text-slate-300 mb-4"
                                style={{ fontSize: '14px', maxWidth: '58ch' }}
                            >
                                {PROFILE.bio}
                            </p>
                            <p
                                className="font-sans leading-relaxed text-slate-400 mb-5"
                                style={{ fontSize: '13px', maxWidth: '58ch' }}
                            >
                                {PROFILE.bioExtended}
                            </p>

                            {/* Quote — P3R left-accent bar, no card */}
                            <div className="p3r-left-accent">
                                <p
                                    className="font-mono italic leading-relaxed"
                                    style={{ fontSize: '11px', color: 'rgba(148,163,184,0.65)' }}
                                >
                                    {PROFILE.quote}
                                </p>
                            </div>
                        </div>

                        {/* ── EDUCATION — Academic Dossier ──────────── */}
                        <div>
                            {/* Section micro-label */}
                            <div className="flex items-center gap-3 mb-5">
                                <div
                                    className="font-mono uppercase tracking-[0.18em] text-slate-500"
                                    style={{ fontSize: '9px' }}
                                >
                                    02 · Academic Record
                                </div>
                                <div className="flex-1 p3r-rule" />
                            </div>

                            {/* Education entries — most recent first */}
                            <div className="space-y-4">
                                {PROFILE.educationHistory.map((edu, idx) => {
                                    const isActive = edu.status === 'ACTIVE';
                                    return (
                                        <div
                                            key={idx}
                                            className="relative overflow-hidden"
                                            style={{
                                                background: isActive
                                                    ? 'rgba(0,85,255,0.06)'
                                                    : 'rgba(5,22,51,0.4)',
                                                border: isActive
                                                    ? '1px solid rgba(0,229,255,0.25)'
                                                    : '1px solid rgba(0,229,255,0.08)',
                                                clipPath: 'polygon(0 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%)',
                                            }}
                                        >
                                            {/* Active indicator stripe on left edge */}
                                            <div
                                                className="absolute left-0 top-0 bottom-0 w-0.5"
                                                style={{
                                                    background: isActive
                                                        ? 'linear-gradient(180deg,#00e5ff 0%,#0055ff 100%)'
                                                        : 'rgba(0,229,255,0.15)',
                                                }}
                                            />

                                            <div className="px-5 py-4">
                                                {/* Top row: status badge + period */}
                                                <div className="flex items-center justify-between gap-3 mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <GraduationCap
                                                            className="w-3.5 h-3.5 flex-shrink-0"
                                                            style={{ color: isActive ? '#00e5ff' : 'rgba(100,116,139,0.6)' }}
                                                        />
                                                        <span
                                                            className="font-mono uppercase tracking-widest"
                                                            style={{
                                                                fontSize: '9px',
                                                                color: isActive ? '#00e5ff' : '#64748b',
                                                            }}
                                                        >
                                                            {edu.status} · {edu.years}
                                                        </span>
                                                    </div>
                                                    <span
                                                        className="font-mono tabular-nums flex-shrink-0"
                                                        style={{ fontSize: '9px', color: isActive ? '#ffd000' : '#475569' }}
                                                    >
                                                        {edu.period}
                                                    </span>
                                                </div>

                                                {/* Institution name — prominent */}
                                                <h4
                                                    className="font-['Chakra_Petch'] font-black uppercase text-white leading-tight mb-0.5"
                                                    style={{ fontSize: 'clamp(13px, 1.5vw, 16px)', letterSpacing: '0.04em' }}
                                                >
                                                    {edu.institution}
                                                </h4>

                                                {/* Level + Major */}
                                                <p
                                                    className="font-mono mb-3"
                                                    style={{ fontSize: '10px', color: 'rgba(148,163,184,0.7)' }}
                                                >
                                                    {edu.level}
                                                    {edu.major && edu.major !== 'General Education' && (
                                                        <span style={{ color: '#00e5ff' }}> · {edu.major}</span>
                                                    )}
                                                </p>

                                                {/* Two-column detail grid: Focus + Coursework */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                                    {/* Focus Areas */}
                                                    {edu.focus && edu.focus.length > 0 && (
                                                        <div>
                                                            <span
                                                                className="font-mono uppercase tracking-widest block mb-1.5"
                                                                style={{ fontSize: '8px', color: 'rgba(100,116,139,0.6)' }}
                                                            >
                                                                Focus Areas
                                                            </span>
                                                            <div className="flex flex-wrap gap-1">
                                                                {edu.focus.map((f, fi) => (
                                                                    <span
                                                                        key={fi}
                                                                        className="font-mono"
                                                                        style={{
                                                                            fontSize: '9px',
                                                                            padding: '2px 6px',
                                                                            border: '1px solid rgba(0,229,255,0.15)',
                                                                            color: 'rgba(148,163,184,0.65)',
                                                                            clipPath: 'polygon(0 0,100% 0,100% calc(100% - 4px),calc(100% - 4px) 100%,0 100%)',
                                                                        }}
                                                                    >
                                                                        {f}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Coursework */}
                                                    {edu.coursework && edu.coursework.length > 0 && edu.coursework[0] !== '[Update with relevant subjects]' && (
                                                        <div>
                                                            <span
                                                                className="font-mono uppercase tracking-widest block mb-1.5"
                                                                style={{ fontSize: '8px', color: 'rgba(100,116,139,0.6)' }}
                                                            >
                                                                Coursework
                                                            </span>
                                                            <div className="flex flex-wrap gap-1">
                                                                {edu.coursework.map((c, ci) => (
                                                                    <span
                                                                        key={ci}
                                                                        className="font-mono"
                                                                        style={{
                                                                            fontSize: '9px',
                                                                            padding: '2px 6px',
                                                                            background: 'rgba(0,85,255,0.12)',
                                                                            border: '1px solid rgba(0,85,255,0.25)',
                                                                            color: '#60a5fa',
                                                                            clipPath: 'polygon(0 0,100% 0,100% calc(100% - 4px),calc(100% - 4px) 100%,0 100%)',
                                                                        }}
                                                                    >
                                                                        {c}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Interests — P3R stairstep diagonal list */}
                        <div>
                            {/* Section micro-label */}
                            <div className="flex items-center gap-3 mb-5">
                                <div
                                    className="font-mono uppercase tracking-[0.18em] text-slate-500"
                                    style={{ fontSize: '9px' }}
                                >
                                    03 · Interests & Affinities
                                </div>
                                <div className="flex-1 p3r-rule" />
                            </div>

                            {/*
                              Stairstep list (ref: screenshot 2 party rows).
                              Each item: flat diagonal band, shifts right by idx*10px,
                              first item has white fill + red accent (active state).
                            */}
                            <div className="space-y-1.5">
                                {PROFILE.interests.map((interest, idx) => {
                                    const Icon = INTEREST_ICONS[idx % INTEREST_ICONS.length];
                                    const isFirst = idx === 0;
                                    return (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-4 transition-all"
                                            style={{
                                                marginLeft: `${Math.min(idx * 10, 40)}px`,
                                                padding: '10px 16px',
                                                background: isFirst
                                                    ? '#ffffff'
                                                    : 'rgba(5,22,51,0.6)',
                                                borderLeft: isFirst
                                                    ? '3px solid #ff1e56'
                                                    : '1px solid rgba(0,229,255,0.12)',
                                                clipPath: 'polygon(0 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%)',
                                                transform: 'skewX(-6deg)',
                                            }}
                                        >
                                            <span style={{ transform: 'skewX(6deg)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <Icon
                                                    className="flex-shrink-0"
                                                    style={{
                                                        width: '13px',
                                                        height: '13px',
                                                        color: isFirst ? '#ff1e56' : 'rgba(0,229,255,0.5)',
                                                    }}
                                                />
                                                <span
                                                    className="font-['Chakra_Petch'] font-bold uppercase tracking-wider leading-none"
                                                    style={{
                                                        fontSize: '12px',
                                                        color: isFirst ? '#010814' : 'rgba(203,213,225,0.8)',
                                                    }}
                                                >
                                                    {interest}
                                                </span>
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── NAVIGATION ────────────────────────────────────── */}
                <div className="relative z-10 flex justify-between items-center mt-12 pt-5"
                    style={{ borderTop: '1px solid rgba(0,229,255,0.08)' }}
                >
                    <SecondaryButton href="/" variant="dark-slate">
                        ← COMMAND DECK
                    </SecondaryButton>
                    <PrimaryButton href="/skills" variant="cyan-glow">
                        INSPECT ABILITIES
                    </PrimaryButton>
                </div>
            </div>
        </MainLayout>
    );
}
