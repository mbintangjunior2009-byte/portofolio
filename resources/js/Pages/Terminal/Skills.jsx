import React, { useState } from 'react';
import MainLayout from '../../Layouts/MainLayout';
import SectionHeading from '../../Components/UI/SectionHeading';
import TerminalLabel from '../../Components/UI/TerminalLabel';
import StatusIndicator from '../../Components/UI/StatusIndicator';
import PrimaryButton from '../../Components/UI/PrimaryButton';
import SecondaryButton from '../../Components/UI/SecondaryButton';
import PersonaRadarChart from '../../Components/Sees/PersonaRadarChart';
import PersonaStatCard from '../../Components/Sees/PersonaStatCard';
import { SKILL_CATEGORIES, PERSONA_STATS } from '../../data/portfolioData';
import {
    Cpu,
    Database,
    Wrench,
    Globe,
    Languages,
    Palette,
    Code2,
    Layers,
    Layout,
    Film,
    Clapperboard,
    PenTool,
    Minus,
    Plus,
    Gauge,
} from 'lucide-react';
import { playHoverSfx, playConfirmSfx } from '../../utils/soundEffects';

/* Presentation-only icon maps (kept out of the data file). */
const CATEGORY_ICON = {
    WEB:      Globe,
    LANGUAGE: Languages,
    CREATIVE: Palette,
    DEFAULT:  Cpu,
};
const categoryIconFor = (cat) => {
    if (/WEB/i.test(cat))      return CATEGORY_ICON.WEB;
    if (/LANGUAGE/i.test(cat)) return CATEGORY_ICON.LANGUAGE;
    if (/CREATIVE/i.test(cat)) return CATEGORY_ICON.CREATIVE;
    return CATEGORY_ICON.DEFAULT;
};

const SKILL_ICON = {
    'Junior Web Development': Globe,
    'Frontend Development':   Layout,
    'Backend Development':    Database,
    'Laravel':                Layers,
    'React':                  Code2,
    'Indonesian':             Languages,
    'English':                Languages,
    'Japanese':               Languages,
    'Video Editing':          Film,
    'Motion Editing':         Clapperboard,
    'Visual Design':          PenTool,
    'UI/UX Design':           Palette,
};
const skillIconFor = (name) => SKILL_ICON[name] || Globe;

const RANK_COLOR = {
    S:   '#00e5ff',
    MAX: '#ff1e56',
    A:   '#ffd000',
    B:   '#64748b',
};

export default function Skills() {
    const first = SKILL_CATEGORIES[0].skills[0];
    const [selected, setSelected] = useState(first);
    const [edits, setEdits] = useState({});

    const effLevel = (s) => Math.max(0, Math.min(100, edits[s.name] ?? s.level));
    const setLevel = (name, v) => setEdits((prev) => ({ ...prev, [name]: Math.max(0, Math.min(100, Math.round(v))) }));

    const handleSelect = (s) => {
        playConfirmSfx();
        setSelected(s);
    };

    const SelIcon = skillIconFor(selected.name);
    const level = effLevel(selected);

    return (
        <MainLayout title="ABILITIES // STATUS">
            <SectionHeading
                category="PARTY STATUS // ABILITY MATRIX"
                ja="能力値"
                title="ABILITIES"
                highlight="MATRIX"
                subtitle="TECHNICAL ARSENAL // SELECT A SKILL TO INSPECT & CALIBRATE PROFICIENCY"
                accent="cyan"
            />

            <div className="flex flex-wrap items-center gap-2 mb-8">
                <StatusIndicator status="combat" label="COMBAT READY" sublabel="ARSENAL ONLINE" />
                <TerminalLabel variant="cyan" size="sm">
                    CATEGORIES: {SKILL_CATEGORIES.length}
                </TerminalLabel>
                <TerminalLabel variant="gold" size="sm">
                    SKILLS: {SKILL_CATEGORIES.reduce((n, c) => n + c.skills.length, 0)}
                </TerminalLabel>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
                {/* Left: skill category bars (game party-status style) */}
                <div className="lg:col-span-7 space-y-8">
                    {SKILL_CATEGORIES.map((cat) => {
                        const CatIcon = categoryIconFor(cat.category);
                        return (
                            <div key={cat.category}>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="p3r-skew bg-[#0055ff] text-white p-1.5 cut-corner-br flex-shrink-0">
                                        <span className="p3r-unskew block">
                                            <CatIcon className="w-4 h-4" />
                                        </span>
                                    </div>
                                    <h3 className="font-['Chakra_Petch'] font-black text-base text-white uppercase tracking-wider">
                                        {cat.category}
                                    </h3>
                                    <span className="font-mono text-[10px] text-slate-500 hidden sm:inline">
                                        // {cat.blurb}
                                    </span>
                                </div>

                                <div className="space-y-2.5">
                                    {cat.skills.map((skill) => {
                                        const isSel = selected.name === skill.name;
                                        const lvl = effLevel(skill);
                                        const SkillIcon = skillIconFor(skill.name);
                                        const rankColor = RANK_COLOR[skill.rank] || RANK_COLOR.A;
                                        return (
                                            <div
                                                key={skill.name}
                                                role="button"
                                                tabIndex={0}
                                                onMouseEnter={playHoverSfx}
                                                onClick={() => handleSelect(skill)}
                                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelect(skill); } }}
                                                aria-pressed={isSel}
                                                aria-label={`Select ${skill.name}, rank ${skill.rank}, proficiency ${lvl}%`}
                                                className={`cursor-pointer p3r-party-bar p-3.5 transition-all duration-200 border-2 ${
                                                    isSel
                                                        ? 'bg-white text-[#010814] border-[#ff1e56] shadow-[0_0_25px_rgba(255,30,86,0.55)] translate-x-3'
                                                        : 'bg-[#03132e]/90 hover:bg-[#072457] text-white border-[#00e5ff]/20 hover:border-[#00e5ff]'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between gap-3 font-mono">
                                                    <div className="flex items-center gap-2.5 min-w-0">
                                                        <SkillIcon className={`w-4 h-4 flex-shrink-0 ${isSel ? 'text-[#ff1e56]' : 'text-[#00e5ff]'}`} />
                                                        <span className={`font-['Chakra_Petch'] font-black text-sm uppercase tracking-wide truncate ${isSel ? 'text-[#010814]' : 'text-white'}`}>
                                                            {skill.name}
                                                        </span>
                                                        <span
                                                            className="text-[9px] font-bold px-1.5 py-0.5 cut-corner-br flex-shrink-0"
                                                            style={{ background: rankColor, color: '#010814' }}
                                                        >
                                                            {skill.rank}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 flex-shrink-0">
                                                        <div className="w-16 sm:w-24 h-1.5 bg-slate-800 overflow-hidden">
                                                            <div
                                                                className="h-full transition-all duration-300"
                                                                style={{ width: `${lvl}%`, background: isSel ? '#ff1e56' : '#00e5ff' }}
                                                            />
                                                        </div>
                                                        <span className={`text-xs font-bold tabular-nums w-8 text-right ${isSel ? 'text-[#010814]' : 'text-[#00e5ff]'}`}>
                                                            {lvl}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Right: selected skill detail (editable proficiency) + radar */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-[#03132e]/90 border-2 border-[#ff1e56] p-6 cut-corner-lg p3r-skew-gentle shadow-[0_0_25px_rgba(255,30,86,0.3)]">
                        <div className="p3r-unskew-gentle space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b border-[#00e5ff]/30">
                                <TerminalLabel variant="red" size="xs">
                                    ACTIVE SELECTION
                                </TerminalLabel>
                                <span className="font-mono text-[10px] text-slate-400 uppercase">
                                    {selected.type}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p3r-skew bg-[#010814] border border-[#00e5ff] p-2 cut-corner-br flex-shrink-0">
                                    <span className="p3r-unskew block">
                                        <SelIcon className="w-5 h-5 text-[#00e5ff]" />
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-['Chakra_Petch'] text-xl font-black uppercase text-white leading-tight">
                                        {selected.name}
                                    </h3>
                                    <span className="font-mono text-[10px] text-[#ffd000] font-bold">
                                        RANK {selected.rank}
                                    </span>
                                </div>
                            </div>

                            <p className="font-mono text-xs text-slate-300 leading-relaxed">
                                {selected.desc}
                            </p>

                            {/* Editable proficiency indicator */}
                            <div className="bg-[#010814] border border-[#00e5ff]/30 p-4 cut-corner-br space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-[10px] text-[#00e5ff] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                        <Gauge className="w-3.5 h-3.5" />
                                        Proficiency Calibration
                                    </span>
                                    <span className="font-['Chakra_Petch'] text-2xl font-black text-[#00e5ff] tabular-nums">
                                        {level}%
                                    </span>
                                </div>

                                <div className="h-2.5 bg-[#020b14] border border-[#00e5ff]/30 overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#0088ff] via-[#00e5ff] to-[#ffd000] transition-all duration-200 shadow-[0_0_10px_rgba(0,229,255,0.6)]"
                                        style={{ width: `${level}%` }}
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setLevel(selected.name, level - 5)}
                                        className="p3r-skew bg-[#051633] hover:bg-[#0a2552] border border-[#00e5ff]/40 text-[#00e5ff] w-9 h-9 flex items-center justify-center cut-corner-br transition-colors"
                                        aria-label="Decrease proficiency"
                                    >
                                        <span className="p3r-unskew"><Minus className="w-4 h-4" /></span>
                                    </button>
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        step={1}
                                        value={level}
                                        onChange={(e) => setLevel(selected.name, Number(e.target.value))}
                                        className="flex-1 accent-[#00e5ff] cursor-pointer"
                                        aria-label="Proficiency slider"
                                    />
                                    <button
                                        onClick={() => setLevel(selected.name, level + 5)}
                                        className="p3r-skew bg-[#051633] hover:bg-[#0a2552] border border-[#00e5ff]/40 text-[#00e5ff] w-9 h-9 flex items-center justify-center cut-corner-br transition-colors"
                                        aria-label="Increase proficiency"
                                    >
                                        <span className="p3r-unskew"><Plus className="w-4 h-4" /></span>
                                    </button>
                                </div>
                                <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest text-center">
                                    Calibrate live // changes are session-only
                                </p>
                            </div>
                        </div>
                    </div>

                    <PersonaRadarChart stats={PERSONA_STATS} />
                    <PersonaStatCard stats={PERSONA_STATS} />
                </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-2">
                <SecondaryButton href="/dossier" variant="dark-slate">
                    ← PROFILE
                </SecondaryButton>
                <PrimaryButton href="/operations" variant="cyan-glow">
                    VIEW OPERATIONS →
                </PrimaryButton>
            </div>
        </MainLayout>
    );
}
