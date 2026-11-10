import React from 'react';
import { Head } from '@inertiajs/react';
import ScanlineOverlay from '../Components/Sees/ScanlineOverlay';
import AtmosphericParticles from '../Components/Sees/AtmosphericParticles';
import Reveal from '../Components/Sees/Reveal';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import { cn } from '../utils/cn';

export default function MainLayout({ title, children, className = '', fluid = false }) {
    return (
        <div className="min-h-screen p3r-water-bg text-slate-100 flex flex-col relative selection:bg-[#00e5ff] selection:text-[#010814] overflow-x-hidden">
            {title && <Head title={title} />}

            {/* Atmospheric particle field — z-0, behind all content */}
            <AtmosphericParticles />

            {/* CRT Scanline Overlay */}
            <ScanlineOverlay />

            {/* Floating P3R Crystal Shards */}
            <div className="p3r-shard top-20 left-10 w-8 h-14 animate-float-slow opacity-60" />
            <div className="p3r-shard top-1/3 right-16 w-12 h-20 animate-float-slow opacity-50" style={{ animationDelay: '2s' }} />
            <div className="p3r-shard bottom-32 left-1/4 w-10 h-16 animate-float-slow opacity-40" style={{ animationDelay: '4s' }} />
            <div className="p3r-shard bottom-20 right-1/3 w-6 h-10 animate-float-slow opacity-60" style={{ animationDelay: '1s' }} />

            {/* Ambient Tartarus Radial Glows */}
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#00e5ff]/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-[#0055ff]/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="fixed top-1/2 right-10 w-64 h-64 bg-[#ff1e56]/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Modular Navigation */}
            <div className="sticky top-0 z-40">
                <Navigation />
            </div>

            {/* Main Stage Content — wrapped in Reveal for page entrance */}
            <Reveal
                as="main"
                animationClass="animate-reveal-up"
                threshold={0.04}
                rootMargin="0px"
                className={cn(
                    'flex-1 relative z-10',
                    fluid
                        ? 'w-full'
                        : 'max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10',
                    className,
                )}
            >
                {children}
            </Reveal>

            {/* Modular Footer */}
            <Footer />
        </div>
    );
}

