import React from 'react';

export default function ScanlineOverlay() {
    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {/* CRT Scanline pattern */}
            <div className="absolute inset-0 scanline-bg opacity-30" />
            {/* Vignette border */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(2,11,20,0.8)_100%)]" />
        </div>
    );
}

