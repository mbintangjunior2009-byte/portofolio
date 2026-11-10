import React, { memo } from 'react';
import { Shield } from 'lucide-react';

const Footer = memo(function Footer() {
    return (
        <footer className="relative z-30 border-t border-[#00e5ff]/25 bg-[#010814]/95 backdrop-blur-md">
            {/* Top Console Controller Prompts Bar (P3R In-Game UI Match) */}
            <div className="border-b border-[#00e5ff]/15 py-3 px-4 sm:px-8 text-xs font-mono">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
                    
                    {/* Left Guide Prompt */}
                    <div className="flex items-center space-x-2 text-slate-300">
                        <span className="p3r-skew bg-[#0055ff] text-white px-2 py-0.5 font-['Chakra_Petch'] font-black text-[10px]">
                            GUIDE
                        </span>
                        <span className="font-['Chakra_Petch'] font-bold tracking-wider text-white">
                            どの作戦・能力値を確認する？{' '}
                            <span className="text-[#00e5ff] hidden sm:inline">
                                // S.E.E.S. OPERATIONAL INTERFACE
                            </span>
                        </span>
                    </div>

                    {/* Right Controller Buttons */}
                    <div className="flex items-center space-x-4 text-[11px] text-slate-300 font-mono">
                        <div className="flex items-center space-x-1.5">
                            <span className="w-4 h-4 rounded-full border border-white flex items-center justify-center text-[9px] font-bold text-white bg-slate-800">
                                A
                            </span>
                            <span className="text-white font-bold">決定 (SELECT)</span>
                        </div>

                        <div className="flex items-center space-x-1.5">
                            <span className="w-4 h-4 rounded-full border border-white flex items-center justify-center text-[9px] font-bold text-white bg-slate-800">
                                B
                            </span>
                            <span className="text-slate-400">戻る (BACK)</span>
                        </div>

                        <div className="hidden sm:flex items-center space-x-1.5">
                            <span className="px-1.5 py-0.2 rounded border border-white text-[9px] font-bold text-white bg-slate-800">
                                L1 / R1
                            </span>
                            <span className="text-slate-400">TAB 切替</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Credits & LSP Certification Row */}
            <div className="py-4 px-4 sm:px-8 text-xs font-mono text-slate-400">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                    
                    {/* Left Branding */}
                    <div className="flex items-center space-x-2 text-center sm:text-left">
                        <span className="p3r-skew bg-[#ff1e56] text-[#010814] font-bold px-1.5 py-0.2 text-[10px]">
                            S.E.E.S.
                        </span>
                        <span>
                            HOSHI // TERMINAL © 2026 • OPERATOR BINTANG
                        </span>
                    </div>

                    {/* Center LSP Badge */}
                    <div className="flex items-center space-x-2 text-[#00e5ff] bg-[#020c1e] px-3 py-1 border border-[#00e5ff]/30 cut-corner-br">
                        <Shield className="w-3.5 h-3.5 text-[#00e5ff]" />
                        <span className="font-bold text-[11px]">LSP REKAYASA PERANGKAT LUNAK VERIFIED</span>
                    </div>

                    {/* Right Tech Specs */}
                    <div className="flex items-center space-x-2 text-slate-500 text-[10px]">
                        <span>LARAVEL 12</span>
                        <span>•</span>
                        <span>INERTIA 2</span>
                        <span>•</span>
                        <span>REACT 18</span>
                        <span>•</span>
                        <span>TAILWIND 4</span>
                    </div>

                </div>
            </div>
        </footer>
    );
});

export default Footer;
