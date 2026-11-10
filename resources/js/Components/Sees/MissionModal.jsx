import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, ShieldCheck, Award, Layers, Code2, CheckCircle2 } from 'lucide-react';
import TerminalLabel from '../UI/TerminalLabel';
import PrimaryButton from '../UI/PrimaryButton';
import SecondaryButton from '../UI/SecondaryButton';
import { playCancelSfx } from '../../utils/soundEffects';

/**
 * MissionModal — Operation briefing overlay.
 *
 * Accessibility:
 *  - role="dialog" + aria-modal="true" signals a modal to AT.
 *  - aria-labelledby points to the mission codename heading.
 *  - Focus is moved to the modal container on open and returned to
 *    the trigger element on close (returnFocusRef).
 *  - Escape key closes (existing behaviour preserved).
 *  - Tab focus is trapped inside the modal while it is open.
 */
export default function MissionModal({ mission, isOpen, onClose }) {
    const modalRef = useRef(null);
    const returnFocusRef = useRef(null);

    // Capture the element that triggered the modal before it opens.
    useEffect(() => {
        if (isOpen) {
            returnFocusRef.current = document.activeElement;
            // Defer focus move so the DOM is ready.
            const id = setTimeout(() => modalRef.current?.focus(), 50);
            return () => clearTimeout(id);
        }
    }, [isOpen]);

    // Keyboard handling: Escape closes, Tab is trapped.
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                playCancelSfx();
                onClose();
                return;
            }

            if (e.key === 'Tab') {
                const el = modalRef.current;
                if (!el) return;
                const focusable = el.querySelectorAll(
                    'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])'
                );
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last?.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first?.focus();
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Return focus on close.
    useEffect(() => {
        if (!isOpen && returnFocusRef.current) {
            returnFocusRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen || !mission) return null;

    const handleClose = () => {
        playCancelSfx();
        onClose();
    };

    const titleId = `mission-modal-title-${mission.id ?? 'modal'}`;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#010611]/85 backdrop-blur-lg animate-panel-in"
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
            aria-label="Mission briefing backdrop"
        >
            {/* Modal card */}
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                className="relative w-full max-w-3xl bg-[#020c1e] border-2 border-[#00e5ff] p-6 cut-corner-lg shadow-[0_0_50px_rgba(0,229,255,0.3)] overflow-hidden outline-none"
            >
                {/* Decorative layers */}
                <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00e5ff]/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

                {/* Top Tactical Bar */}
                <div className="bg-[#ff1e56] text-[#010814] px-4 py-1.5 flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-[#010814] animate-ping" aria-hidden="true" />
                        <span>S.E.E.S. CLASSIFIED OPERATION BRIEFING // {mission.arcanaNum}</span>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-1 hover:bg-[#010814] hover:text-[#ff1e56] transition-colors"
                        aria-label="Close mission briefing"
                    >
                        <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                </div>

                {/* Scrollable body */}
                <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#00e5ff]/25">
                        <div>
                            <div className="flex items-center space-x-2 mb-1">
                                <TerminalLabel variant="red" size="xs">
                                    {mission.block}
                                </TerminalLabel>
                                <span className="font-mono text-xs text-[#ffd000] font-bold">
                                    STATUS: {mission.rank}
                                </span>
                            </div>
                            <h2
                                id={titleId}
                                className="text-2xl sm:text-4xl font-['Chakra_Petch'] font-black uppercase text-white tracking-wide glow-white"
                            >
                                {mission.codename}
                            </h2>
                            <p className="font-mono text-xs text-[#00e5ff] font-semibold mt-1">
                                {mission.category} // {mission.categoryJa}
                            </p>
                        </div>

                        <div className="p3r-skew bg-[#051633] border border-[#ffd000] px-4 py-2 cut-corner-br flex-shrink-0 text-center font-mono">
                            <span className="p3r-unskew text-[10px] text-slate-400 block">DIFFICULTY</span>
                            <span className="p3r-unskew text-lg font-black text-[#ffd000]">
                                {mission.metrics?.difficulty || 'S-RANK'}
                            </span>
                        </div>
                    </div>

                    {/* Mission Summary */}
                    <div>
                        <h3 className="font-['Chakra_Petch'] text-sm font-black text-[#00e5ff] uppercase tracking-wider mb-2">
                            // OPERATIONAL DEBRIEF
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed font-sans">
                            {mission.summary}
                        </p>
                    </div>

                    {/* Objectives */}
                    <div className="bg-[#010814] border border-[#00e5ff]/30 p-4 cut-corner-br space-y-3">
                        <div className="flex items-center justify-between font-mono text-xs pb-2 border-b border-[#00e5ff]/20">
                            <span className="text-[#00e5ff] font-bold uppercase">KEY ARCHITECTURAL DELIVERABLES:</span>
                            <span className="text-[#ffd000]">100% VERIFIED</span>
                        </div>
                        <ul className="space-y-2">
                            {mission.highlights?.map((h, i) => (
                                <li key={i} className="flex items-start space-x-2 text-xs font-mono text-slate-300">
                                    <CheckCircle2 className="w-4 h-4 text-[#00e5ff] flex-shrink-0 mt-0.5" aria-hidden="true" />
                                    <span>{h}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tech tags */}
                    <div>
                        <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-2">
                            DEPLOYED TECHNOLOGIES & PACKAGES:
                        </p>
                        <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                            {mission.tags?.map((t, i) => (
                                <TerminalLabel key={i} variant="cyan" size="sm">
                                    {t}
                                </TerminalLabel>
                            ))}
                        </div>
                    </div>

                    {/* LSP stamp */}
                    <div className="p-3 bg-[#03132e] border-l-4 border-[#ffd000] flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                        <div className="flex items-center space-x-2 text-[#ffd000]">
                            <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                            <span>LSP VOCATIONAL SOFTWARE ENGINEERING COMPLIANT</span>
                        </div>
                        <span className="text-white font-bold">S-GRADE AUDIT</span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#00e5ff]/20">
                        <SecondaryButton onClick={handleClose} variant="dark-slate">
                            [ESC] 戻る (CLOSE BRIEFING)
                        </SecondaryButton>
                        <div className="flex flex-wrap items-center gap-3">
                            <a
                                href={mission.demoUrl}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`Live demo for ${mission.codename} (opens in new tab)`}
                                className="p3r-skew bg-gradient-to-r from-[#00e5ff] to-[#0088ff] text-[#010814] font-['Chakra_Petch'] font-black px-4 py-2 text-xs uppercase tracking-wider cut-corner-br shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:shadow-[0_0_25px_rgba(0,229,255,0.7)] transition-all inline-flex items-center gap-1.5"
                            >
                                <span className="p3r-unskew flex items-center gap-1.5">
                                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" /> DEMO
                                </span>
                            </a>
                            <a
                                href={mission.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`Source code for ${mission.codename} (opens in new tab)`}
                                className="p3r-skew bg-[#051633]/80 hover:bg-[#0a2552] text-white border-2 border-[#00e5ff]/40 hover:border-[#00e5ff] font-['Chakra_Petch'] font-bold px-4 py-2 text-xs uppercase tracking-wider cut-corner-br transition-all inline-flex items-center gap-1.5"
                            >
                                <span className="p3r-unskew flex items-center gap-1.5">
                                    <Code2 className="w-3.5 h-3.5" aria-hidden="true" /> CODE
                                </span>
                            </a>
                            <PrimaryButton href="/comms" variant="slash-badge">
                                TRANSMIT INQUIRY
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
