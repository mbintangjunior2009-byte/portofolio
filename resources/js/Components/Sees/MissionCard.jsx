import React from 'react';
import { ExternalLink, CheckCircle2, ShieldAlert, Award, Layers } from 'lucide-react';

export default function MissionCard({ mission }) {
    const isApex = mission.metrics.difficulty === 'S-RANK' || mission.metrics.difficulty === 'LUNATIC';

    return (
        <div className="group relative bg-[#040e1b] border-2 border-[#00f0ff]/30 hover:border-[#00f0ff] p3r-skew-card cut-corner-lg p-6 transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.08)] hover:shadow-[0_0_30px_rgba(0,240,255,0.25)]">
            {/* Background cyber grid */}
            <div className="absolute inset-0 tartarus-grid opacity-20 pointer-events-none" />

            {/* Top Badges */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs px-2.5 py-0.5 bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/40 font-bold uppercase tracking-wider">
                    {mission.block}
                </span>

                <div className="flex items-center space-x-2">
                    <span
                        className={`font-mono text-xs px-2 py-0.5 font-bold uppercase cut-corner-br ${
                            isApex
                                ? 'bg-[#ff1e56] text-white shadow-[0_0_10px_#ff1e56]'
                                : 'bg-[#ffd000] text-[#020b14]'
                        }`}
                    >
                        {mission.metrics.difficulty}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                        {mission.date}
                    </span>
                </div>
            </div>

            {/* Title */}
            <div className="relative z-10 mb-3">
                <h3 className="font-['Chakra_Petch'] text-xl font-black text-white group-hover:text-[#00f0ff] transition-colors tracking-wide uppercase">
                    {mission.codename}
                </h3>
                <p className="font-mono text-xs text-[#0088ff] font-semibold uppercase tracking-wider">
                    {mission.category}
                </p>
            </div>

            {/* Summary */}
            <p className="relative z-10 text-sm text-slate-300 mb-4 leading-relaxed font-sans">
                {mission.summary}
            </p>

            {/* Key Highlights */}
            <div className="relative z-10 space-y-1.5 mb-5 font-mono text-xs text-slate-400">
                {mission.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                        <span className="text-[#00f0ff] mt-0.5">◆</span>
                        <span>{highlight}</span>
                    </div>
                ))}
            </div>

            {/* Tech Stack Tags */}
            <div className="relative z-10 flex flex-wrap gap-1.5 mb-5">
                {mission.tags.map((tag, idx) => (
                    <span
                        key={idx}
                        className="text-[11px] font-mono px-2 py-0.5 bg-[#08172c] text-slate-300 border border-[#00f0ff]/20"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Footer / Status Indicator */}
            <div className="relative z-10 pt-3 border-t border-[#00f0ff]/20 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs font-mono text-[#ffd000]">
                    <Award className="w-4 h-4 text-[#ffd000]" />
                    <span className="font-bold">{mission.badge}</span>
                </div>

                <div className="flex items-center space-x-1 text-xs font-mono text-[#00f0ff] group-hover:translate-x-1 transition-transform">
                    <span className="font-bold">INSPECT MISSION</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                </div>
            </div>
        </div>
    );
}

