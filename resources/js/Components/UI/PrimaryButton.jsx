import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { playHoverSfx, playConfirmSfx, playSlashSfx } from '../../utils/soundEffects';

export default function PrimaryButton({
    children,
    href,
    onClick,
    icon: Icon = ChevronRight,
    variant = 'cyan-glow',
    type = 'button',
    disabled = false,
    className = '',
}) {
    const variants = {
        'slash-badge':
            'p3r-slash-badge px-6 py-2.5 text-sm font-["Chakra_Petch"] font-black uppercase tracking-wider active:scale-[0.97] active:brightness-90',
        'cyan-glow':
            'p3r-skew bg-gradient-to-r from-[#00e5ff] to-[#0088ff] hover:from-[#38bdf8] hover:to-[#0066ff] text-[#010814] font-["Chakra_Petch"] font-black px-6 py-3 text-sm sm:text-base uppercase tracking-wider cut-corner-br shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_35px_rgba(0,229,255,0.7)] transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] active:shadow-none',
        'red-evoker':
            'p3r-skew bg-gradient-to-r from-[#ff1e56] to-[#d90429] hover:from-[#ff3366] hover:to-[#b90322] text-white font-["Chakra_Petch"] font-black px-6 py-3 text-sm sm:text-base uppercase tracking-wider cut-corner-br shadow-[0_0_20px_rgba(255,30,86,0.4)] hover:shadow-[0_0_35px_rgba(255,30,86,0.7)] transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] active:shadow-none',
    };

    const chosenVariant = variants[variant] || variants['cyan-glow'];
    const isSlash = variant === 'slash-badge';

    const handleClick = (e) => {
        if (isSlash) {
            playSlashSfx();
        } else {
            playConfirmSfx();
        }
        if (onClick) onClick(e);
    };

    const innerContent = (
        <span className={`${isSlash ? '' : 'p3r-unskew'} inline-flex items-center space-x-2`}>
            <span>{children}</span>
            {Icon && <Icon className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1" />}
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
