import React, { useState } from 'react';
import { playHoverSfx } from '../../utils/soundEffects';

/**
 * PersonaRadarChart — responsive SVG pentagon radar.
 *
 * The SVG now uses viewBox="0 0 280 280" + width="100%" so it scales
 * fluidly inside its container on every breakpoint — previously the
 * fixed width="280" caused overflow on mobile (<320px containers).
 */
export default function PersonaRadarChart({ stats }) {
    const [activeStat, setActiveStat] = useState(null);

    const statKeys = [
        { key: 'STR', label: 'STR (Strength)', index: 2 },
        { key: 'MAG', label: 'MAG (Magic)',    index: 1 },
        { key: 'END', label: 'END (Endurance)', index: 3 },
        { key: 'AGI', label: 'AGI (Agility)',  index: 0 },
        { key: 'LUK', label: 'LUK (Luck)',     index: 4 },
    ];

    const cx = 140;
    const cy = 140;
    const maxRadius = 90;

    const getPoint = (angleDeg, radius) => {
        const rad = (angleDeg - 90) * (Math.PI / 180);
        return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
    };

    const rings = [0.25, 0.5, 0.75, 1.0].map((scale) =>
        [0, 72, 144, 216, 288]
            .map((angle) => { const pt = getPoint(angle, maxRadius * scale); return `${pt.x},${pt.y}`; })
            .join(' ')
    );

    const statValues = statKeys.map((item, idx) => {
        const matching = stats ? stats[item.index] : null;
        const val = matching ? matching.value : 85;
        const pt = getPoint(idx * 72, (val / 100) * maxRadius);
        return { ...item, val, pt, angle: idx * 72 };
    });

    const polygonPoints = statValues.map((s) => `${s.pt.x},${s.pt.y}`).join(' ');

    return (
        <div className="bg-[#020c1e] border-2 border-[#00e5ff]/30 p-5 cut-corner-lg relative overflow-hidden shadow-[0_0_20px_rgba(0,229,255,0.1)]">
            <div className="absolute inset-0 stripe-blue opacity-20 pointer-events-none" aria-hidden="true" />

            <div className="relative z-10 flex items-center justify-between pb-3 mb-2 border-b border-[#00e5ff]/20">
                <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 bg-[#00e5ff] inline-block shadow-[0_0_8px_#00e5ff]" aria-hidden="true" />
                    <h4 className="font-['Chakra_Petch'] text-sm font-black text-white tracking-widest uppercase">
                        PERSONA PARAMETER RADAR // <span className="text-[#00e5ff]">PENTAGON</span>
                    </h4>
                </div>
                <span className="font-mono text-[10px] text-[#ffd000] font-bold">TYPE: BALANCED S-RANK</span>
            </div>

            {/* Responsive SVG: viewBox fixed, width=100% scales to container */}
            <div className="relative z-10 flex justify-center items-center py-2" aria-label="Persona parameter radar chart" role="img">
                <svg
                    viewBox="0 0 280 280"
                    width="100%"
                    style={{ maxWidth: '280px' }}
                    className="overflow-visible"
                    aria-hidden="true"
                >
                    {rings.map((points, idx) => (
                        <polygon
                            key={idx}
                            points={points}
                            fill="none"
                            stroke="#00e5ff"
                            strokeOpacity={0.12 + idx * 0.08}
                            strokeWidth="1"
                        />
                    ))}

                    {[0, 72, 144, 216, 288].map((angle, idx) => {
                        const pt = getPoint(angle, maxRadius);
                        return (
                            <line
                                key={idx}
                                x1={cx} y1={cy} x2={pt.x} y2={pt.y}
                                stroke="#00e5ff"
                                strokeOpacity="0.25"
                                strokeDasharray="2 2"
                            />
                        );
                    })}

                    <polygon
                        points={polygonPoints}
                        fill="rgba(0, 229, 255, 0.25)"
                        stroke="#00e5ff"
                        strokeWidth="2.5"
                        className="transition-all duration-300 drop-shadow-[0_0_10px_#00e5ff]"
                    />

                    {statValues.map((s, idx) => {
                        const labelPt = getPoint(s.angle, maxRadius + 24);
                        const isHovered = activeStat === s.key;
                        return (
                            <g
                                key={idx}
                                onMouseEnter={() => { playHoverSfx(); setActiveStat(s.key); }}
                                onMouseLeave={() => setActiveStat(null)}
                                className="cursor-pointer"
                                role="button"
                                tabIndex={0}
                                aria-label={`${s.label}: ${s.val}`}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveStat(isHovered ? null : s.key); }}
                            >
                                <circle
                                    cx={s.pt.x} cy={s.pt.y}
                                    r={isHovered ? 6 : 4}
                                    fill={isHovered ? '#ff1e56' : '#ffd000'}
                                    stroke="#ffffff"
                                    strokeWidth="1.5"
                                    className="transition-all"
                                />
                                <text
                                    x={labelPt.x} y={labelPt.y + 4}
                                    textAnchor="middle"
                                    fill={isHovered ? '#00e5ff' : '#ffffff'}
                                    fontSize="11"
                                    fontWeight="bold"
                                    fontFamily="Chakra Petch"
                                    className="transition-colors select-none"
                                >
                                    {s.key} {s.val}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            <div className="relative z-10 pt-2 border-t border-[#00e5ff]/20 flex justify-between items-center text-[11px] font-mono">
                <span className="text-slate-400">
                    {activeStat ? `INSPECTING ${activeStat}` : 'HOVER VERTEX TO AUDIT PARAMETER'}
                </span>
                <span className="text-[#ff1e56] font-bold">
                    {activeStat
                        ? `${statValues.find((s) => s.key === activeStat)?.label}`
                        : 'HYPERION SYNC: 100%'}
                </span>
            </div>
        </div>
    );
}
