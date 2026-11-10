import React, { useState } from 'react';
import MainLayout from '../../Layouts/MainLayout';
import SectionHeading from '../../Components/UI/SectionHeading';
import TerminalLabel from '../../Components/UI/TerminalLabel';
import StatusIndicator from '../../Components/UI/StatusIndicator';
import PrimaryButton from '../../Components/UI/PrimaryButton';
import SecondaryButton from '../../Components/UI/SecondaryButton';
import MissionModal from '../../Components/Sees/MissionModal';
import { PROJECTS } from '../../data/portfolioData';
import { ExternalLink, Code2, Award, Eye } from 'lucide-react';
import { playHoverSfx, playConfirmSfx, playSlashSfx } from '../../utils/soundEffects';

export default function Operations() {
    const [selected, setSelected] = useState(PROJECTS[0]);
    const [modalOpen, setModalOpen] = useState(false);

    const handleSelect = (p) => {
        playConfirmSfx();
        setSelected(p);
    };
    const handleOpenModal = () => {
        playSlashSfx();
        setModalOpen(true);
    };

    return (
        <MainLayout title="OPERATIONS // ARCHIVE">
            <MissionModal mission={selected} isOpen={modalOpen} onClose={() => setModalOpen(false)} />

            {/* Watermark */}
            <div className="fixed -right-10 top-1/3 text-[140px] md:text-[220px] font-black italic tracking-tighter p3r-watermark opacity-[0.03] select-none rotate-12 pointer-events-none">
                COMMU
            </div>

            <SectionHeading
                category="MISSION DATABASE // CLEARED SECTORS"
                ja="作戦録"
                title="TARTARUS"
                highlight="OPERATIONS"
                subtitle="PRODUCTION CODE, VOCATIONAL DELIVERABLES & EXPERIMENTAL LABS"
                accent="cyan"
            />

            <div className="flex flex-wrap items-center gap-2 mb-8">
                <StatusIndicator status="online" label="ARCHIVE: OPERATIONAL" sublabel="MISSION LOG" />
                <TerminalLabel variant="cyan" size="sm">
                    OPERATIONS: {PROJECTS.length}
                </TerminalLabel>
                <TerminalLabel variant="gold" size="sm">
                    CLICK A CARD TO INSPECT
                </TerminalLabel>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
                {/* Left: project preview cards (Social-Link style) */}
                <div className="lg:col-span-6 space-y-3">
                    {PROJECTS.map((mission) => {
                        const isSel = selected.id === mission.id;
                        const isMax = mission.rank.startsWith('RANK 10') || mission.rank === 'MAX';
                        return (
                            <div
                                key={mission.id}
                                role="button"
                                tabIndex={0}
                                onMouseEnter={playHoverSfx}
                                onClick={() => handleSelect(mission)}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelect(mission); } }}
                                aria-pressed={isSel}
                                aria-label={`Select operation ${mission.arcanaName}, rank ${mission.rank.replace('RANK ', '')}`}
                                className={`cursor-pointer p3r-commu-card transition-all duration-200 border-2 p-4 ${
                                    isSel
                                        ? 'bg-white text-[#010814] border-[#ff1e56] shadow-[0_0_25px_rgba(255,30,86,0.5)] translate-x-3'
                                        : 'bg-[#051633]/90 hover:bg-[#0a2552] text-white border-[#00e5ff]/30 hover:border-[#00e5ff]'
                                }`}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center space-x-3 min-w-0">
                                        <div
                                            className={`w-9 h-9 font-['Chakra_Petch'] font-black text-sm flex items-center justify-center p3r-skew border flex-shrink-0 ${
                                                isSel
                                                    ? 'bg-[#010814] text-[#00e5ff] border-[#00e5ff]'
                                                    : 'bg-[#020c1e] text-white border-[#00e5ff]/40'
                                            }`}
                                        >
                                            <span className="p3r-unskew">{mission.arcanaNum}</span>
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center space-x-2">
                                                <h3 className={`font-['Chakra_Petch'] font-black text-base uppercase tracking-wide truncate ${isSel ? 'text-[#010814]' : 'text-white'}`}>
                                                    {mission.arcanaName}
                                                </h3>
                                                <span className={`text-xs font-bold font-mono flex-shrink-0 ${isSel ? 'text-[#ff1e56]' : 'text-[#00e5ff]'}`}>
                                                    ({mission.arcanaJa})
                                                </span>
                                            </div>
                                            <span className={`text-[11px] font-mono block truncate ${isSel ? 'text-slate-700 font-semibold' : 'text-slate-400'}`}>
                                                {mission.codename}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <div className="flex items-baseline space-x-1 justify-end">
                                            <span className={`text-[9px] font-mono ${isSel ? 'text-slate-600' : 'text-slate-400'}`}>RANK</span>
                                            <span className={`text-lg font-black italic ${isMax ? (isSel ? 'text-[#ff1e56]' : 'text-[#ffd000]') : (isSel ? 'text-[#010814]' : 'text-[#00e5ff]')}`}>
                                                {mission.rank.replace('RANK ', '')}
                                            </span>
                                        </div>
                                        <span className={`text-[9px] font-mono uppercase tracking-widest ${isSel ? 'text-slate-600' : 'text-[#ff1e56]/80'}`}>
                                            {mission.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Right: project detail dossier */}
                <div className="lg:col-span-6">
                    <div
                        key={selected.id}
                        className="bg-[#03132e]/90 border-2 border-[#00e5ff] cut-corner-lg p3r-skew-gentle shadow-[0_0_30px_rgba(0,229,255,0.2)] animate-panel-in overflow-hidden"
                    >
                        <div className="p3r-unskew-gentle">
                            {/* Project preview image — shown when available */}
                            {selected.previewImage && (
                                <div className="relative w-full overflow-hidden border-b-2 border-[#00e5ff]/20"
                                    style={{ maxHeight: '180px' }}
                                >
                                    <img
                                        src={selected.previewImage}
                                        alt={`Preview of ${selected.codename}`}
                                        className="w-full h-full object-cover object-top"
                                        style={{ maxHeight: '180px' }}
                                        loading="lazy"
                                    />
                                    {/* Subtle overlay so the image doesn't overpower the P3R palette */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#03132e]/70 pointer-events-none" />
                                </div>
                            )}

                            <div className="p-6 sm:p-8 space-y-5">
                                <div className="flex items-center justify-between pb-3 border-b border-[#00e5ff]/30">
                                    <TerminalLabel variant="red" size="sm">
                                        {selected.block}
                                    </TerminalLabel>
                                    <span className="font-mono text-xs text-[#ffd000] font-bold">
                                        DEPLOYED: {selected.date}
                                    </span>
                                </div>

                                <div>
                                    <span className="font-mono text-xs text-[#00e5ff] font-bold uppercase tracking-wider block">
                                        SOCIAL LINK ARCHIVE // ARCANA {selected.arcanaNum}
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-['Chakra_Petch'] font-black uppercase text-white tracking-tight glow-white leading-tight">
                                        {selected.codename}
                                    </h2>
                                    <p className="font-mono text-xs text-[#ffd000] font-semibold mt-0.5">
                                        {selected.category} // {selected.categoryJa}
                                    </p>
                                </div>

                                <p className="text-slate-300 text-sm leading-relaxed font-sans">
                                    {selected.summary}
                                </p>

                                {/* Highlights */}
                                <div className="space-y-2 bg-[#010814]/80 p-4 border-l-4 border-[#00e5ff]">
                                    <span className="text-[10px] font-mono text-[#00e5ff] font-bold uppercase block tracking-widest">
                                        OPERATION OBJECTIVES:
                                    </span>
                                    {selected.highlights.map((h, i) => (
                                        <div key={i} className="flex items-start space-x-2 text-xs font-mono text-slate-300">
                                            <span className="text-[#ff1e56] font-bold">◆</span>
                                            <span>{h}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Tech stack */}
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {selected.tags.map((tag, i) => (
                                        <TerminalLabel key={i} variant="cyan" size="xs">
                                            {tag}
                                        </TerminalLabel>
                                    ))}
                                </div>

                                {/* Status + links */}
                                <div className="pt-4 border-t border-[#00e5ff]/20 space-y-3">
                                    {/* Badge row */}
                                    <div className="flex items-center space-x-2 font-mono text-xs text-[#ffd000]">
                                        <Award className="w-4 h-4" />
                                        <span className="font-bold">{selected.badge}</span>
                                    </div>

                                    {/* Action buttons row */}
                                    <div className="flex flex-wrap gap-2">
                                        {/* DEMO button */}
                                        <a
                                            href={selected.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onMouseEnter={playHoverSfx}
                                            className="p3r-skew bg-gradient-to-r from-[#00e5ff] to-[#0088ff] text-[#010814] font-['Chakra_Petch'] font-black px-4 py-2.5 text-xs uppercase tracking-wider cut-corner-br shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:shadow-[0_0_28px_rgba(0,229,255,0.75)] hover:from-[#38bdf8] hover:to-[#0066ff] transition-all active:scale-[0.97] inline-flex items-center gap-1.5"
                                        >
                                            <span className="p3r-unskew flex items-center gap-1.5">
                                                <ExternalLink className="w-3.5 h-3.5" /> DEMO
                                            </span>
                                        </a>

                                        {/* VIEW SOURCE / GitHub button — prominent, clearly labelled */}
                                        <a
                                            href={selected.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onMouseEnter={playHoverSfx}
                                            aria-label={`View source code for ${selected.codename} on GitHub (opens in new tab)`}
                                            className="p3r-skew bg-[#0a2552] hover:bg-[#103774] text-[#00e5ff] border-2 border-[#00e5ff]/50 hover:border-[#00e5ff] font-['Chakra_Petch'] font-black px-4 py-2.5 text-xs uppercase tracking-wider cut-corner-br shadow-[0_0_10px_rgba(0,229,255,0.15)] hover:shadow-[0_0_22px_rgba(0,229,255,0.45)] transition-all active:scale-[0.97] inline-flex items-center gap-1.5"
                                        >
                                            <span className="p3r-unskew flex items-center gap-1.5">
                                                <Code2 className="w-3.5 h-3.5" />
                                                VIEW SOURCE
                                            </span>
                                        </a>
                                    </div>
                                </div>

                                {/* Detail interaction */}
                                <div>
                                    <SecondaryButton onClick={handleOpenModal} variant="outline-cyan" icon={Eye} className="w-full">
                                        INSPECT BRIEFING // FULL DOSSIER
                                    </SecondaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-2">
                <SecondaryButton href="/skills" variant="dark-slate">
                    ← ABILITIES
                </SecondaryButton>
                <PrimaryButton href="/records" variant="cyan-glow">
                    VIEW RECORDS →
                </PrimaryButton>
            </div>
        </MainLayout>
    );
}
