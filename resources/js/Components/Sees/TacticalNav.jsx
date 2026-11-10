import React from 'react';
import { Link } from '@inertiajs/react';
import { Terminal, User, Zap, Briefcase, Send } from 'lucide-react';

const NAV_ITEMS = [
    { name: 'DECK', path: '/', labelJa: 'デッキ', code: '01', icon: Terminal },
    { name: 'DOSSIER', path: '/dossier', labelJa: '調書', code: '02', icon: User },
    { name: 'PARAMETERS', path: '/skills', labelJa: '能力値', code: '03', icon: Zap },
    { name: 'OPERATIONS', path: '/operations', labelJa: '作戦録', code: '04', icon: Briefcase },
    { name: 'COMMS', path: '/comms', labelJa: '通信', code: '05', icon: Send },
];

export default function TacticalNav({ currentPath }) {
    return (
        <nav className="relative z-30 bg-[#040e1b]/95 border-b border-[#00f0ff]/30 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-start sm:justify-center overflow-x-auto py-2.5 space-x-2 sm:space-x-3 no-scrollbar">
                    {NAV_ITEMS.map((item) => {
                        const isActive = currentPath === item.path;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.code}
                                href={item.path}
                                className={`group relative p3r-skew px-4 sm:px-6 py-2 transition-all duration-200 cut-corner-br flex-shrink-0 ${
                                    isActive
                                        ? 'bg-gradient-to-r from-[#00f0ff] to-[#0088ff] text-[#020b14] font-black shadow-[0_0_20px_rgba(0,240,255,0.6)]'
                                        : 'bg-[#08172c] hover:bg-[#0f2342] text-slate-300 hover:text-white border border-[#00f0ff]/20 hover:border-[#00f0ff]/60'
                                }`}
                            >
                                <div className="p3r-unskew flex items-center space-x-2.5">
                                    <span
                                        className={`font-mono text-xs font-bold ${
                                            isActive ? 'text-[#ff1e56]' : 'text-[#00f0ff] group-hover:text-[#00f0ff]'
                                        }`}
                                    >
                                        {item.code}
                                    </span>

                                    <Icon
                                        className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                                            isActive ? 'text-[#020b14]' : 'text-slate-400 group-hover:text-[#00f0ff]'
                                        }`}
                                    />

                                    <div className="text-left font-['Chakra_Petch'] leading-tight">
                                        <span className="block text-sm font-bold tracking-wider uppercase">
                                            {item.name}
                                        </span>
                                        <span
                                            className={`block text-[9px] font-mono tracking-tighter ${
                                                isActive ? 'text-[#020b14]/80' : 'text-slate-500 group-hover:text-slate-300'
                                            }`}
                                        >
                                            {item.labelJa}
                                        </span>
                                    </div>
                                </div>

                                {/* Active red triangle accent indicator */}
                                {isActive && (
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#ff1e56] rotate-45 shadow-[0_0_8px_#ff1e56]" />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}

