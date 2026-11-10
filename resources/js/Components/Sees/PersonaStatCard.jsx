import React from 'react';

export default function PersonaStatCard({ stats }) {
    return (
        <div className="bg-[#040e1b] border-2 border-[#00e5ff]/30 p-5 cut-corner-lg relative overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.1)]">
            {/* Background cyber stripes */}
            <div className="absolute inset-0 stripe-blue pointer-events-none opacity-25" />
            
            {/* Header */}
            <div className="relative z-10 flex items-center justify-between pb-3 mb-4 border-b border-[#00e5ff]/20">
                <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 bg-[#ff1e56] inline-block shadow-[0_0_8px_#ff1e56]" />
                    <h3 className="font-['Chakra_Petch'] text-lg font-bold text-white tracking-widest uppercase">
                        PERSONA PARAMETERS // <span className="text-[#00e5ff]">HYPERION</span>
                    </h3>
                </div>
                <span className="font-mono text-xs px-2 py-0.5 bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30">
                    DIAGNOSTIC: PEAK
                </span>
            </div>

            {/* Parameter Bars */}
            <div className="relative z-10 space-y-3.5">
                {stats.map((item, index) => {
                    const percentage = Math.min(Math.max(item.value, 0), 100);
                    return (
                        <div key={index} className="space-y-1">
                            <div className="flex justify-between items-baseline font-mono text-xs">
                                <span className="font-bold text-white tracking-wider flex items-center space-x-2">
                                    <span className="text-[#00e5ff] font-['Chakra_Petch'] text-sm">
                                        {item.stat.substring(0, 3)}
                                    </span>
                                    <span className="text-slate-300 font-normal">{item.label}</span>
                                </span>
                                <span className="font-bold text-[#ffd000] text-sm">
                                    {item.value} <span className="text-[10px] text-slate-500 font-normal">/ 100</span>
                                </span>
                            </div>

                            {/* Neon Bar Track */}
                            <div className="h-2.5 bg-[#020b14] border border-[#00e5ff]/30 p-0.5 p3r-skew overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#0088ff] via-[#00e5ff] to-[#ffd000] transition-all duration-700 shadow-[0_0_10px_rgba(0,240,255,0.6)]"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>

                            <p className="text-[11px] font-mono text-slate-400 pl-1">
                                {item.detail}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Bottom S.E.E.S. Seal */}
            <div className="relative z-10 mt-5 pt-3 border-t border-[#00e5ff]/20 flex justify-between items-center text-[10px] font-mono text-slate-400">
                <span>AUTHENTICATED BY S.E.E.S. ARCHIVE</span>
                <span className="text-[#ff1e56] font-bold">ALL SYSTEMS COMBAT-READY</span>
            </div>
        </div>
    );
}

