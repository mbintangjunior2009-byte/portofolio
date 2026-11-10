import React from 'react';
import MainLayout from '../../Layouts/MainLayout';
import SectionHeading from '../../Components/UI/SectionHeading';
import TerminalLabel from '../../Components/UI/TerminalLabel';
import StatusIndicator from '../../Components/UI/StatusIndicator';
import PrimaryButton from '../../Components/UI/PrimaryButton';
import SecondaryButton from '../../Components/UI/SecondaryButton';
import { RECORDS } from '../../data/portfolioData';
import {
    GraduationCap,
    Briefcase,
    Award,
    Trophy,
    Calendar,
    ShieldCheck,
    ChevronRight,
    Code2,
} from 'lucide-react';

/* Presentation-only maps (icons & colors are not stored in data). */
const ENTRY_STYLE = {
    EDUCATION: { Icon: GraduationCap, color: '#00e5ff', badge: 'EDU' },
    WORK: { Icon: Briefcase, color: '#ff1e56', badge: 'EXP' },
    PROJECT: { Icon: Briefcase, color: '#0055ff', badge: 'PRJ' },
};

const CHRONICLE_STYLE = {
    MAJOR_EVENT: { color: '#ff2a85', label: 'MAJOR' },
    MILESTONE: { color: '#00e5ff', label: 'MILESTONE' },
    RELEASE: { color: '#ffd000', label: 'RELEASE' },
    COMMENCE: { color: '#0055ff', label: 'COMMENCE' },
};

export default function Records() {
    // Build a single chronicle rail from education + experience entries.
    const railEntries = [
        ...RECORDS.education.map((e) => ({ ...e, _kind: 'EDUCATION' })),
        ...RECORDS.experience.map((e) => ({ ...e, _kind: e.type || 'WORK' })),
    ];

    return (
        <MainLayout title="RECORDS // CHRONICLE">
            <SectionHeading
                category="EXPERIENCE LOG // CLASSIFIED CHRONICLE"
                ja="記録"
                title="RECORDS"
                highlight="ARCHIVE"
                subtitle="EDUCATION, FIELD EXPERIENCE, CERTIFICATIONS & OPERATIONAL MILESTONES"
                accent="gold"
            />

            {/* Telemetry strip (distinct from other sections' headers) */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
                <StatusIndicator status="standby" label="ARCHIVE: UNSEALED" sublabel="RECORDS DIVISION" />
                <TerminalLabel variant="cyan" size="sm">
                    ENTRIES: {railEntries.length + RECORDS.certifications.length + RECORDS.achievements.length}
                </TerminalLabel>
                <TerminalLabel variant="gold" size="sm">
                    CERTIFICATIONS: {RECORDS.certifications.length}
                </TerminalLabel>
                <TerminalLabel variant="red" size="sm">
                    ACHIEVEMENTS: {RECORDS.achievements.length}
                </TerminalLabel>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                {/* Left: Experience & Education timeline rail */}
                <div className="lg:col-span-8">
                    <div className="bg-[#03132e]/80 border-2 border-[#ffd000]/30 cut-corner-lg p-6 sm:p-8 relative overflow-hidden shadow-[0_0_20px_rgba(255,208,0,0.08)]">
                        <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#ffd000]/25">
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-5 h-5 text-[#ffd000]" />
                                <h3 className="font-['Chakra_Petch'] font-black text-lg text-white uppercase tracking-wider">
                                    EXPERIENCE & EDUCATION TIMELINE
                                </h3>
                            </div>
                            <TerminalLabel variant="gold" size="xs">
                                CHRONICLE RAIL
                            </TerminalLabel>
                        </div>

                        <div className="space-y-6">
                            {railEntries.map((entry, idx) => {
                                const style = ENTRY_STYLE[entry._kind] || ENTRY_STYLE.WORK;
                                const { Icon } = style;
                                return (
                                    <div
                                        key={idx}
                                        className="relative pl-8 pb-6 border-l-2 last:border-0 last:pb-0"
                                        style={{ borderColor: 'rgba(255,208,0,0.25)' }}
                                    >
                                        {/* Diamond node */}
                                        <div
                                            className="absolute -left-[7px] top-1 w-3 h-3 rotate-45"
                                            style={{ background: style.color, boxShadow: `0 0 10px ${style.color}` }}
                                        />

                                        {/* Top row: type badge + id + period + status */}
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span
                                                className="p3r-skew font-['Chakra_Petch'] font-black text-[10px] px-2 py-0.5 cut-corner-br text-[#010814]"
                                                style={{ background: style.color }}
                                            >
                                                <span className="p3r-unskew flex items-center gap-1">
                                                    <Icon className="w-3 h-3" />
                                                    {style.badge}
                                                </span>
                                            </span>
                                            {entry.id && (
                                                <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">
                                                    {entry.id}
                                                </span>
                                            )}
                                            <span className="font-mono text-xs text-[#ffd000] font-bold tabular-nums">
                                                {entry.period}
                                            </span>
                                            <span
                                                className="ml-auto font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 border"
                                                style={{ color: entry.status === 'ACTIVE' || entry.status === 'ONGOING' ? '#00e5ff' : '#64748b', borderColor: 'currentColor' }}
                                            >
                                                {entry.status}
                                            </span>
                                        </div>

                                        {/* Category label */}
                                        {entry.category && (
                                            <p className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-1">
                                                {entry.category}
                                            </p>
                                        )}

                                        <h4 className="font-['Chakra_Petch'] font-bold text-base sm:text-lg text-white uppercase tracking-wide leading-tight">
                                            {entry.role || entry.program}
                                        </h4>
                                        <p className="font-mono text-xs text-[#00e5ff] mt-0.5">
                                            {entry.org || entry.institution}
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1.5 font-sans leading-relaxed max-w-xl">
                                            {entry.detail}
                                        </p>

                                        {/* Tech / tags pills */}
                                        {entry.tags && entry.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                {entry.tags.map((tag, ti) => (
                                                    <span
                                                        key={ti}
                                                        className="font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 border border-[#00e5ff]/20 text-slate-500 cut-corner-br"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Project preview image — shown when available */}
                                        {entry.previewImage && (
                                            <div
                                                className="mt-3 relative overflow-hidden cut-corner-br border border-[#00e5ff]/20"
                                                style={{ maxHeight: '160px' }}
                                            >
                                                <img
                                                    src={entry.previewImage}
                                                    alt={`Preview of ${entry.org}`}
                                                    className="w-full object-cover object-top"
                                                    style={{ maxHeight: '160px' }}
                                                    loading="lazy"
                                                />
                                                {/* Gradient overlay — keeps it from clashing with dark palette */}
                                                <div
                                                    className="absolute inset-0 pointer-events-none"
                                                    style={{
                                                        background: 'linear-gradient(to bottom, transparent 55%, rgba(3,19,46,0.75) 100%)',
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {/* GitHub VIEW SOURCE button — shown when githubUrl is set */}
                                        {entry.githubUrl && (
                                            <div className="mt-3">
                                                <a
                                                    href={entry.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`View source code for ${entry.org} on GitHub (opens in new tab)`}
                                                    className="inline-flex items-center gap-2 p3r-skew bg-[#0a2552] hover:bg-[#103774] text-[#00e5ff] border-2 border-[#00e5ff]/40 hover:border-[#00e5ff] font-['Chakra_Petch'] font-black text-[10px] uppercase tracking-wider px-4 py-2 cut-corner-br shadow-[0_0_10px_rgba(0,229,255,0.12)] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all active:scale-[0.97]"
                                                >
                                                    <span className="p3r-unskew flex items-center gap-1.5">
                                                        <Code2 className="w-3.5 h-3.5 flex-shrink-0" />
                                                        VIEW SOURCE
                                                    </span>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right: Certifications + Achievements stacks */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Certifications */}
                    <div className="bg-[#03132e]/85 border-2 border-[#00e5ff]/30 cut-corner-br p-5 space-y-3">
                        <div className="flex items-center space-x-2 pb-2 border-b border-[#00e5ff]/20">
                            <ShieldCheck className="w-5 h-5 text-[#00e5ff]" />
                            <h3 className="font-['Chakra_Petch'] font-black text-base text-white uppercase tracking-wider">
                                CERTIFICATIONS
                            </h3>
                        </div>
                        {RECORDS.certifications.map((cert, idx) => (
                            <div
                                key={idx}
                                className="bg-[#020c1e] border border-[#00e5ff]/20 hover:border-[#00e5ff]/50 cut-corner-br p-3 transition-colors"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <p className="font-['Chakra_Petch'] font-bold text-sm text-white leading-tight">
                                            {cert.name}
                                        </p>
                                        <p className="font-mono text-[10px] text-[#00e5ff] mt-0.5">
                                            {cert.issuer}
                                        </p>
                                    </div>
                                    <Award className="w-4 h-4 text-[#ffd000] flex-shrink-0 mt-0.5" />
                                </div>
                                <div className="flex items-center justify-between mt-2 font-mono text-[9px] uppercase tracking-widest">
                                    <span className="text-slate-500">{cert.date}</span>
                                    <span className={cert.status === 'VERIFIED' ? 'text-[#00e5ff]' : 'text-[#ffd000]'}>
                                        {cert.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Achievements */}
                    <div className="bg-[#03132e]/85 border-2 border-[#ff1e56]/30 cut-corner-br p-5 space-y-3">
                        <div className="flex items-center space-x-2 pb-2 border-b border-[#ff1e56]/20">
                            <Trophy className="w-5 h-5 text-[#ff1e56]" />
                            <h3 className="font-['Chakra_Petch'] font-black text-base text-white uppercase tracking-wider">
                                ACHIEVEMENTS
                            </h3>
                        </div>
                        {RECORDS.achievements.map((ach, idx) => (
                            <div
                                key={idx}
                                className="bg-[#020c1e] border-l-2 border-[#ff1e56]/50 p-3"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-[10px] text-[#ffd000] font-bold">
                                        {ach.date}
                                    </span>
                                    <span className="font-mono text-[9px] text-[#ff2a85] uppercase tracking-widest">
                                        {ach.type}
                                    </span>
                                </div>
                                <p className="font-['Chakra_Petch'] font-bold text-sm text-white mt-1 leading-tight">
                                    {ach.title}
                                </p>
                                <p className="text-[11px] text-slate-400 mt-1 font-sans leading-relaxed">
                                    {ach.detail}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom: Operational chronicle (slim, distinct dot nodes) */}
            <div className="bg-[#03132e]/80 border border-[#00e5ff]/25 cut-corner-lg p-6 sm:p-8 mb-10">
                <div className="flex items-center space-x-2 pb-3 mb-5 border-b border-[#00e5ff]/20">
                    <ChevronRight className="w-5 h-5 text-[#00e5ff]" />
                    <h3 className="font-['Chakra_Petch'] font-black text-lg text-white uppercase tracking-wider">
                        OPERATIONAL CHRONICLE
                    </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {RECORDS.timeline.map((event, idx) => {
                        const cs = CHRONICLE_STYLE[event.type] || CHRONICLE_STYLE.MILESTONE;
                        return (
                            <div key={idx} className="relative bg-[#020c1e] border border-[#00e5ff]/15 cut-corner-br p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full"
                                        style={{ background: cs.color, boxShadow: `0 0 8px ${cs.color}` }}
                                    />
                                    <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: cs.color }}>
                                        {cs.label}
                                    </span>
                                </div>
                                <span className="font-mono text-[10px] text-[#ffd000] font-bold block">
                                    {event.date}
                                </span>
                                <p className="font-['Chakra_Petch'] font-bold text-sm text-white leading-tight mt-0.5">
                                    {event.title}
                                </p>
                                <p className="text-[11px] text-slate-400 mt-1 font-sans leading-relaxed">
                                    {event.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-2">
                <SecondaryButton href="/operations" variant="dark-slate">
                    ← OPERATIONS
                </SecondaryButton>
                <PrimaryButton href="/comms" variant="cyan-glow">
                    OPEN COMMS →
                </PrimaryButton>
            </div>
        </MainLayout>
    );
}
