import React, { memo } from 'react';

export default memo(function SectionHeading({
    title,
    highlight,
    subtitle,
    category,
    ja,
    accent = 'cyan',
    align = 'left',
    className = '',
}) {
    const accentStyles = {
        cyan: {
            pill: 'bg-[#00e5ff] text-[#010814]',
            glow: 'text-[#00e5ff] glow-cyan',
            border: 'border-[#00e5ff]/30',
            dot: 'bg-[#00e5ff]',
        },
        red: {
            pill: 'bg-[#ff1e56] text-white',
            glow: 'text-[#ff1e56] glow-red',
            border: 'border-[#ff1e56]/40',
            dot: 'bg-[#ff1e56]',
        },
        gold: {
            pill: 'bg-[#ffd000] text-[#010814]',
            glow: 'text-[#ffd000]',
            border: 'border-[#ffd000]/40',
            dot: 'bg-[#ffd000]',
        },
    };

    const currentAccent = accentStyles[accent] || accentStyles.cyan;
    const isCenter = align === 'center';

    return (
        <div
            className={`relative mb-8 pb-4 border-b-2 ${currentAccent.border} ${
                isCenter ? 'text-center' : 'text-left'
            } ${className}`}
        >
            {/* Top Category Badge */}
            {category && (
                <div className={`mb-2 flex ${isCenter ? 'justify-center' : 'justify-start'}`}>
                    <div
                        className={`inline-block p3r-skew ${currentAccent.pill} font-['Chakra_Petch'] font-black px-3 py-0.5 text-xs uppercase tracking-widest cut-corner-br shadow-sm`}
                    >
                        <span className="p3r-unskew flex items-center space-x-1.5">
                            <span>{category}</span>
                            {ja && <span className="opacity-80">({ja})</span>}
                        </span>
                    </div>
                </div>
            )}

            {/* Main Title Heading */}
            <h2 className="text-3xl sm:text-5xl font-['Chakra_Petch'] font-black uppercase text-white tracking-wide leading-tight">
                {title}{' '}
                {highlight && (
                    <span className={currentAccent.glow}>
                        {highlight}
                    </span>
                )}
            </h2>

            {/* Subtitle / Description */}
            {subtitle && (
                <p className="font-mono text-xs text-slate-400 mt-1.5 uppercase tracking-wider max-w-2xl">
                    {subtitle}
                </p>
            )}
        </div>
    );
});