import React, { useState, useEffect } from 'react';
import { Shield, Moon, Radio, Terminal, Cpu } from 'lucide-react';

export default function TerminalHeader({ currentPath }) {
    const [currentTime, setCurrentTime] = useState('');
    const [darkHourActive, setDarkHourActive] = useState(false);

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}:${seconds}`);
            
            // Easter egg: between 00:00 and 01:00 is Dark Hour
            if (now.getHours() === 0) {
                setDarkHourActive(true);
            }
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="relative z-40 border-b border-[#00f0ff]/20 bg-[#020b14]/90 backdrop-blur-md">
            {/* Top Tactical Alert Bar */}
            <div className="bg-[#ff1e56] text-[#020b14] px-4 py-0.5 text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className="inline-block w-2 h-2 bg-[#020b14] animate-ping" />
                    <span>S.E.E.S. TACTICAL OS // REV 2026.11</span>
                </div>
                <div className="hidden sm:flex items-center space-x-4">
                    <span>SECURITY: MAXIMUM CLEARANCE</span>
                    <span>•</span>
                    <span className="text-white">OPERATOR: HOSHI (星)</span>
                </div>
            </div>

            {/* Main Header Row */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    
                    {/* Brand / Logo */}
                    <div className="flex items-center space-x-3">
                        {/* P3R Angled Badge */}
                        <div className="relative p3r-skew bg-gradient-to-r from-[#00f0ff] to-[#0088ff] text-[#020b14] font-black px-3 py-1.5 font-['Chakra_Petch'] text-lg tracking-wider cut-corner-br flex items-center shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                            <span className="p3r-unskew flex items-center space-x-1.5">
                                <Terminal className="w-5 h-5 text-[#020b14]" />
                                <span>S.E.E.S.</span>
                            </span>
                        </div>

                        <div>
                            <div className="flex items-center space-x-2">
                                <h1 className="text-xl font-['Chakra_Petch'] font-black tracking-widest text-white uppercase glow-text-cyan">
                                    HOSHI <span className="text-[#00f0ff] font-normal">//</span> TERMINAL
                                </h1>
                                <span className="px-1.5 py-0.2 bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] text-[10px] font-mono tracking-tighter">
                                    P3R_EDITION
                                </span>
                            </div>
                            <p className="text-[11px] font-mono text-slate-400 tracking-wider">
                                PERSONA 3 RELOAD ARCHITECTURE // VOCATIONAL CADET
                            </p>
                        </div>
                    </div>

                    {/* Telemetry / Clock / Moon Tracker */}
                    <div className="flex items-center space-x-4 sm:space-x-6 w-full sm:w-auto justify-between sm:justify-end">
                        
                        {/* Moon Phase Status */}
                        <div className="flex items-center space-x-2 bg-[#040e1b] border border-[#00f0ff]/20 px-3 py-1.5 cut-corner-br">
                            <Moon className="w-4 h-4 text-[#ffd000] animate-pulse" />
                            <div className="text-left font-mono text-[11px]">
                                <span className="text-[#ffd000] font-bold block leading-none">WAXING GIBBOUS</span>
                                <span className="text-[9px] text-slate-400 uppercase tracking-tighter">
                                    FULL MOON IN 4 DAYS
                                </span>
                            </div>
                        </div>

                        {/* Tactical Clock */}
                        <div className="flex items-center space-x-2 bg-[#040e1b] border border-[#ff1e56]/40 px-3 py-1.5 cut-corner-br">
                            <Radio className="w-4 h-4 text-[#ff1e56] animate-pulse" />
                            <div className="text-left font-mono">
                                <div className="text-xs font-bold text-white tracking-widest flex items-center space-x-1">
                                    <span>{currentTime || '00:00:00'}</span>
                                    {darkHourActive && (
                                        <span className="text-[#ff1e56] text-[10px] animate-ping">DARK HOUR</span>
                                    )}
                                </div>
                                <span className="text-[9px] text-[#ff1e56] font-semibold block leading-none tracking-tight">
                                    IWATODAI TIME
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </header>
    );
}

