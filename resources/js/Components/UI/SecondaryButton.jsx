import React from 'react';
import { Link } from '@inertiajs/react';
import { playHoverSfx, playConfirmSfx } from '../../utils/soundEffects';

export default function SecondaryButton({
    children,
    href,
    onClick,
    icon: Icon,
    variant = 'outline-cyan',
    type = 'button',
    disabled = false,
    className = '',
}) {
    const variants = {
        'outline-cyan':
            'p3r-skew bg-[#051633]/80 hover:bg-[#0a2552] text-white border-2 border-[#00e5ff]/40 hover:border-[#00e5ff] font-["Chakra_Petch"] font-bold px-6 py-2.5 text-sm sm:text-base uppercase tracking-wider cut-corner-br transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] shadow-[0_0_15px_rgba(0,229,255,0.15)] hover:shadow-[0_0_25px_rgba(0,229,255,0.3)]',
        'dark-slate':
            'p3r-skew bg-[#020c1e] hover:bg-[#071d42] text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 font-["Chakra_Petch"] font-bold px-5 py-2 text-sm uppercase tracking-wider cut-corner-br transition-all active:scale-[0.97]',
        'outline-red':
            'p3r-skew bg-[#ff1e56]/10 hover:bg-[#ff1e56] text-[#ff1e56] hover:text-[#010814] border-2 border-[#ff1e56]/50 hover:border-[#ff1e56] font-["Chakra_Petch"] font-bold px-5 py-2.5 text-sm uppercase tracking-wider cut-corner-br transition-all shadow-[0_0_15px_rgba(255,30,86,0.2)] active:scale-[0.97]',
    };

    const chosenVariant = variants[variant] || variants['outline-cyan'];

    const handleClick = (e) => {
        playConfirmSfx();
        if (onClick) onClick(e);
    };

    const innerContent = (
        <span className="p3r-unskew inline-flex items-center space-x-2">
            {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
            <span>{children}</span>
        </span>
    );

    if (href) {
        return (
            <Link
                href={href}
                onMouseEnter={playHoverSfx}
                onClick={handleClick}
                className={`group inline-flex items-center justify-center ${chosenVariant} ${
                    disabled ? 'opacity-50 pointer-events-none' : ''
                } ${className}`}
            >
                {innerContent}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onMouseEnter={playHoverSfx}
            onClick={handleClick}
            disabled={disabled}
            className={`group inline-flex items-center justify-center ${chosenVariant} ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
            } ${className}`}
        >
            {innerContent}
        </button>
    );
}
