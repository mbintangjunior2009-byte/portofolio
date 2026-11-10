import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Terminal } from 'lucide-react';

/**
 * LoadingScreen — S.E.E.S. Tactical OS boot sequence.
 *
 * A fullscreen overlay shown once on initial app load. It renders its
 * children (the Inertia <App/>) immediately beneath the overlay so the
 * app hydrates without delay, then fades out to reveal the homepage.
 *
 * - Shows only once per browser session (sessionStorage guard), so reloads
 *   within the same tab skip the intro and Inertia soft-navigations never
 *   re-trigger it (this component lives at the app root, above <App/>).
 * - Sequenced mono initialization messages cycle while an angular P3R
 *   progress bar fills 0 -> 100%.
 * - Skip via button click or Enter / Escape / Space.
 * - Smooth opacity fade into the homepage.
 */

const INIT_MESSAGES = [
    'INITIALIZING S.E.E.S. TACTICAL OS // REV 2026.11',
    'DECRYPTING OPERATOR DOSSIER // ARCANA XVII - THE STAR',
    'CALIBRATING PERSONA PARAMETERS // LSP KERNEL MODULE',
    'ESTABLISHING VELVET FREQUENCY // COMMS UPLINK',
    'SYNCHRONIZING DARK HOUR CLOCK // 00:00 STANDBY',
    'SYSTEM ONLINE // WELCOME, OPERATOR',
];

const BOOT_MS = 3600;
const MSG_INTERVAL = 600;

export default function LoadingScreen({ children }) {
    const [stage, setStage] = useState(() => {
        if (typeof window !== 'undefined' && sessionStorage.getItem('hoshi_intro_seen') === '1') {
            return 'done';
        }
        return 'active';
    });
    const [msgIndex, setMsgIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const completedRef = useRef(false);

    const complete = useCallback(() => {
        if (completedRef.current) return;
        completedRef.current = true;
        if (typeof window !== 'undefined') sessionStorage.setItem('hoshi_intro_seen', '1');
        setStage('fading');
        window.setTimeout(() => setStage('done'), 700);
    }, []);

    const skip = useCallback(() => {
        setProgress(100);
        complete();
    }, [complete]);

    // Sequence the init messages.
    useEffect(() => {
        if (stage !== 'active') return;
        let m = 0;
        const id = setInterval(() => {
            m += 1;
            if (m < INIT_MESSAGES.length) {
                setMsgIndex(m);
            } else {
                clearInterval(id);
            }
        }, MSG_INTERVAL);
        return () => clearInterval(id);
    }, [stage]);

    // Drive the progress bar to completion.
    useEffect(() => {
        if (stage !== 'active') return;
        const start = Date.now();
        const id = setInterval(() => {
            const elapsed = Date.now() - start;
            const pct = Math.min(100, (elapsed / BOOT_MS) * 100);
            setProgress(pct);
            if (pct >= 100) {
                clearInterval(id);
                complete();
            }
        }, 40);
        return () => clearInterval(id);
    }, [stage, complete]);

    // Keyboard skip: Enter / Escape / Space.
    useEffect(() => {
        if (stage !== 'active') return;
        const onKey = (e) => {
            if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
                e.preventDefault();
                skip();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [stage, skip]);

    if (stage === 'done') {
        return <>{children}</>;
    }

    return (
        <>
            {children}
            <div
                className={`fixed inset-0 z-[100] flex flex-col items-center justify-center p3r-water-bg overflow-hidden`}
                style={{
                    transition: 'opacity 0.75s cubic-bezier(0.4, 0, 0.2, 1), transform 0.75s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: stage === 'fading' ? 0 : 1,
                    transform: stage === 'fading' ? 'translateY(-12px)' : 'translateY(0)',
                    pointerEvents: stage === 'fading' ? 'none' : 'auto',
                }}
                role="status"
                aria-live="polite"
                aria-label="S.E.E.S. Tactical OS initializing"
            >
                {/* CRT scanlines */}
                <div className="absolute inset-0 scanline-bg opacity-25 pointer-events-none" />

                {/* Ambient glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00e5ff]/10 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0055ff]/10 rounded-full blur-[140px] pointer-events-none" />

                {/* Giant watermark */}
                <div className="absolute inset-0 flex items-center justify-center text-[18vw] font-['Chakra_Petch'] font-black italic tracking-tighter p3r-watermark select-none pointer-events-none">
                    SEES
                </div>

                {/* Center content */}
                <div className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center">
                    {/* Brand emblem */}
                    <div className="flex items-center justify-center gap-3 mb-8 animate-hero-rise">
                        <div className="p3r-skew bg-gradient-to-r from-[#00e5ff] to-[#0055ff] text-[#010814] px-3 py-2 cut-corner-br shadow-[0_0_25px_rgba(0,229,255,0.5)]">
                            <span className="p3r-unskew flex items-center gap-1">
                                <Terminal className="w-5 h-5" />
                                <span className="font-['Chakra_Petch'] text-2xl font-black">星</span>
                            </span>
                        </div>
                        <div className="text-left">
                            <div className="font-['Chakra_Petch'] font-black text-3xl sm:text-4xl tracking-widest text-white glow-white leading-none">
                                HOSHI
                            </div>
                            <div className="font-mono text-[10px] text-[#00e5ff] tracking-widest mt-1">
                                // SEES TERMINAL
                            </div>
                        </div>
                    </div>

                    {/* Tagline */}
                    <p className="font-mono text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest mb-10 animate-hero-rise" style={{ animationDelay: '0.1s' }}>
                        Persona 3 Reload // Operator Dossier
                    </p>

                    {/* Angular progress bar */}
                    <div className="w-full max-w-md mx-auto animate-hero-rise" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-between mb-2 font-mono text-[10px] text-[#00e5ff] uppercase tracking-widest">
                            <span className="flex items-center gap-1.5">
                                <span className="inline-block w-2 h-2 bg-[#00e5ff] animate-ping" />
                                System Boot
                            </span>
                            <span className="font-bold tabular-nums">{Math.floor(progress)}%</span>
                        </div>
                        <div className="relative h-2.5 bg-[#051633] border border-[#00e5ff]/30 cut-corner-br overflow-hidden">
                            <div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00e5ff] to-[#0055ff] shadow-[0_0_15px_rgba(0,229,255,0.7)] transition-[width] duration-100 ease-linear"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Current init message */}
                    <div className="font-mono text-xs text-slate-300 uppercase tracking-wider h-5 mt-5 animate-hero-rise" style={{ animationDelay: '0.3s' }}>
                        <span className="text-[#00e5ff]">&gt; </span>
                        {INIT_MESSAGES[msgIndex]}
                        <span className="ml-0.5 inline-block w-2 h-3.5 bg-[#00e5ff] animate-pulse align-middle" />
                    </div>

                    {/* Skip button */}
                    <button
                        onClick={skip}
                        className="mt-10 p3r-skew bg-[#051633]/80 hover:bg-[#0a2552] text-slate-300 hover:text-white border border-[#00e5ff]/40 hover:border-[#00e5ff] px-5 py-2 font-['Chakra_Petch'] font-bold text-xs uppercase tracking-widest cut-corner-br transition-all hover:-translate-y-0.5 animate-hero-rise"
                        style={{ animationDelay: '0.4s' }}
                    >
                        <span className="p3r-unskew flex items-center gap-2">
                            Skip <span className="font-mono text-[10px] text-[#00e5ff]">[ENTER]</span>
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
}
