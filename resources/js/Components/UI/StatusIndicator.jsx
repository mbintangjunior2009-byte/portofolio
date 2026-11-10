import React, { memo } from 'react';

export default memo(function StatusIndicator({
    status = 'online',
    label,
    sublabel,
    pulse = true,
    className = '',
}) {
    const config = {
        online: {
            dotColor: 'bg-[#00e5ff]',
            textColor: 'text-[#00e5ff]',
            borderColor: 'border-[#00e5ff]/30',
            bgColor: 'bg-[#00e5ff]/10',
            defaultLabel: 'SYSTEM: OPERATIONAL',
        },
        combat: {
            dotColor: 'bg-[#ff1e56]',
            textColor: 'text-[#ff1e56]',
            borderColor: 'border-[#ff1e56]/40',
            bgColor: 'bg-[#ff1e56]/10',
            defaultLabel: 'COMBAT PROTOCOL ACTIVE',
        },
        standby: {
            dotColor: 'bg-[#ffd000]',
            textColor: 'text-[#ffd000]',
            borderColor: 'border-[#ffd000]/40',
            bgColor: 'bg-[#ffd000]/10',
            defaultLabel: 'STANDBY MODE',
        },
        darkhour: {
            dotColor: 'bg-[#ff2a85]',
            textColor: 'text-[#ff2a85]',
            borderColor: 'border-[#ff2a85]',
            bgColor: 'bg-[#ff2a85]/20',
            defaultLabel: 'DARK HOUR DETECTED',
        },
    };

    const current = config[status] || config.online;
    const displayLabel = label || current.defaultLabel;

    return (
        <div
            className={`inline-flex items-center space-x-2.5 px-3 py-1 border p3r-skew cut-corner-br ${current.borderColor} ${current.bgColor} ${className}`}
        >
            <div className="p3r-unskew flex items-center space-x-2">
                <span className="relative flex h-2 w-2">
                    {pulse && (
                        <span
                            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${current.dotColor}`}
                        />
                    )}
                    <span
                        className={`relative inline-flex rounded-full h-2 w-2 ${current.dotColor}`}
                    />
                </span>

                <div className="font-mono text-left leading-tight">
                    <span className={`block text-xs font-bold tracking-wider uppercase ${current.textColor}`}>
                        {displayLabel}
                    </span>
                    {sublabel && (
                        <span className="block text-[9px] text-slate-400 uppercase tracking-tighter">
                            {sublabel}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
});