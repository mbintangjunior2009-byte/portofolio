import React, { memo } from 'react';

export default memo(function TerminalLabel({
    children,
    code,
    variant = 'cyan',
    size = 'xs',
    bracket = true,
    className = '',
}) {
    const variantStyles = {
        cyan: 'text-[#00e5ff] border-[#00e5ff]/30 bg-[#00e5ff]/10',
        red: 'text-[#ff1e56] border-[#ff1e56]/40 bg-[#ff1e56]/10',
        gold: 'text-[#ffd000] border-[#ffd000]/40 bg-[#ffd000]/10',
        white: 'text-white border-white/30 bg-white/10',
        muted: 'text-slate-400 border-slate-700 bg-slate-900/40',
    };

    const sizeStyles = {
        xs: 'text-[10px] px-2 py-0.5',
        sm: 'text-xs px-2.5 py-1',
        md: 'text-sm px-3 py-1.5',
    };

    const chosenVariant = variantStyles[variant] || variantStyles.cyan;
    const chosenSize = sizeStyles[size] || sizeStyles.xs;

    return (
        <span
            className={`inline-flex items-center space-x-1.5 font-mono font-bold uppercase tracking-wider border cut-corner-br ${chosenVariant} ${chosenSize} ${className}`}
        >
            {code && <span className="opacity-75">{code}</span>}
            <span>
                {bracket ? `[${children}]` : children}
            </span>
        </span>
    );
});