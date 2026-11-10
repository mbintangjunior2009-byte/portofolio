import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import SectionHeading from '../../Components/UI/SectionHeading';
import TerminalLabel from '../../Components/UI/TerminalLabel';
import PrimaryButton from '../../Components/UI/PrimaryButton';
import SecondaryButton from '../../Components/UI/SecondaryButton';
import { SOCIALS } from '../../data/portfolioData';
import { Send, Radio, Mail, Code2, Briefcase, Camera, MessageCircle, CheckCircle } from 'lucide-react';
import { playHoverSfx, playConfirmSfx, playSlashSfx } from '../../utils/soundEffects';

// Presentation-only icon map for social relays (icons are not stored in data).
const SOCIAL_ICON = {
    email: Mail,
    github: Code2,
    linkedin: Briefcase,
    instagram: Camera,
    discord: MessageCircle,
};

export default function Comms({ recentTransmissionsCount = 0 }) {
    const { flash, operator } = usePage().props;
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        sender: '',
        frequency: '',
        protocol: 'GENERAL INQUIRY',
        transmission: '',
        website: '',   // honeypot — must stay empty; bots that fill it are rejected server-side
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        playSlashSfx();
        post('/comms/transmit', {
            preserveScroll: true,
            onSuccess: () => {
                playConfirmSfx();
                reset();
            },
        });
    };

    return (
        <MainLayout title="TACTICAL COMMS">
            {/* Reusable Section Heading */}
            <SectionHeading
                category="TRANSCEIVER // VELVET FREQUENCY"
                ja="通信"
                title="SECURE"
                highlight="COMMS"
                subtitle={`ESTABLISH DIRECT TRANSMISSION WITH OPERATOR ${operator?.codename ?? 'HOSHI'}`}
                accent="cyan"
            />

            {/* Main Comms Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                
                {/* Left Form: Transmit Message */}
                <div className="lg:col-span-7 bg-[#03132e]/85 border-2 border-[#00e5ff]/30 p-6 sm:p-8 cut-corner-lg relative shadow-[0_0_20px_rgba(0,229,255,0.08)]">
                    <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#00e5ff]/20">
                        <div className="flex items-center space-x-2">
                            <Radio className="w-5 h-5 text-[#ff1e56] animate-pulse" />
                            <h3 className="font-['Chakra_Petch'] text-lg font-black text-white uppercase tracking-wider">
                                DISPATCH ENCRYPTED PACKET
                            </h3>
                        </div>

                        <TerminalLabel variant="gold" size="xs">
                            TOTAL DISPATCHES: {recentTransmissionsCount}
                        </TerminalLabel>
                    </div>

                    {/* Flash Success Message */}
                    {(recentlySuccessful || flash?.success) && (
                        <div className="mb-6 bg-[#00e5ff]/15 border-2 border-[#00e5ff] p-4 cut-corner-br flex items-center space-x-3 text-[#00e5ff] font-mono text-xs shadow-[0_0_20px_rgba(0,229,255,0.3)] animate-flicker">
                            <CheckCircle className="w-5 h-5 flex-shrink-0 text-[#00e5ff]" />
                            <div>
                                <strong className="block font-bold">TRANSMISSION CONFIRMED:</strong>
                                <span>{flash?.success || 'Your dispatch was encrypted and committed to the database log.'}</span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Sender Callsign / Name */}
                        <div>
                            <label htmlFor="comms-sender" className="block font-mono text-xs text-[#00e5ff] uppercase tracking-wider mb-1.5">
                                [01] SENDER IDENTIFIER / CALLSIGN
                            </label>
                            <input
                                id="comms-sender"
                                type="text"
                                required
                                value={data.sender}
                                onChange={(e) => setData('sender', e.target.value)}
                                placeholder="e.g. Commander Kirijo, Recruiter Name"
                                autoComplete="name"
                                className="w-full bg-[#051633] border border-[#00e5ff]/30 focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] text-white font-mono text-sm px-4 py-2.5 cut-corner-br transition-all outline-none"
                            />
                            {errors.sender && (
                                <p id="comms-sender-error" role="alert" className="font-mono text-xs text-[#ff1e56] mt-1">{errors.sender}</p>
                            )}
                        </div>

                        {/* Frequency / Email */}
                        <div>
                            <label htmlFor="comms-frequency" className="block font-mono text-xs text-[#00e5ff] uppercase tracking-wider mb-1.5">
                                [02] RETURN FREQUENCY / EMAIL ADDRESS
                            </label>
                            <input
                                id="comms-frequency"
                                type="email"
                                required
                                value={data.frequency}
                                onChange={(e) => setData('frequency', e.target.value)}
                                placeholder="e.g. yourname@domain.com"
                                autoComplete="email"
                                className="w-full bg-[#051633] border border-[#00e5ff]/30 focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] text-white font-mono text-sm px-4 py-2.5 cut-corner-br transition-all outline-none"
                            />
                            {errors.frequency && (
                                <p id="comms-frequency-error" role="alert" className="font-mono text-xs text-[#ff1e56] mt-1">{errors.frequency}</p>
                            )}
                        </div>

                        {/* Protocol Code */}
                        <div>
                            <label htmlFor="comms-protocol" className="block font-mono text-xs text-[#00e5ff] uppercase tracking-wider mb-1.5">
                                [03] MISSION PROTOCOL / SUBJECT
                            </label>
                            <select
                                id="comms-protocol"
                                value={data.protocol}
                                onChange={(e) => setData('protocol', e.target.value)}
                                className="w-full bg-[#051633] border border-[#00e5ff]/30 focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] text-white font-mono text-sm px-4 py-2.5 cut-corner-br transition-all outline-none"
                            >
                                <option value="GENERAL INQUIRY">PROTOCOL: GENERAL INQUIRY</option>
                                <option value="PROJECT COLLABORATION">PROTOCOL: PROJECT COLLABORATION</option>
                                <option value="APPRENTICESHIP / HIRE">PROTOCOL: APPRENTICESHIP / HIRE</option>
                                <option value="LSP CERTIFICATION AUDIT">PROTOCOL: LSP CERTIFICATION AUDIT</option>
                            </select>
                        </div>

                        {/* Transmission Message */}
                        <div>
                            <label htmlFor="comms-transmission" className="block font-mono text-xs text-[#00e5ff] uppercase tracking-wider mb-1.5">
                                [04] TRANSMISSION BODY (ENCRYPTED)
                            </label>
                            <textarea
                                id="comms-transmission"
                                required
                                rows={5}
                                value={data.transmission}
                                onChange={(e) => setData('transmission', e.target.value)}
                                placeholder="Type your message, opportunity details, or inquiry here..."
                                className="w-full bg-[#051633] border border-[#00e5ff]/30 focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] text-white font-mono text-sm px-4 py-2.5 cut-corner-br transition-all outline-none"
                            />
                            {errors.transmission && (
                                <p id="comms-transmission-error" role="alert" className="font-mono text-xs text-[#ff1e56] mt-1">{errors.transmission}</p>
                            )}
                        </div>

                        {/* Submit Button using PrimaryButton */}
                        <PrimaryButton
                            type="submit"
                            disabled={processing}
                            variant="cyan-glow"
                            className="w-full py-3"
                            icon={Send}
                        >
                            {processing ? 'TRANSMITTING ENCRYPTED PACKET...' : 'TRANSMIT PACKET // SEND'}
                        </PrimaryButton>

                        {/*
                          Honeypot — hidden from real users via absolute positioning
                          off-screen and aria-hidden. Bots that auto-fill all fields
                          will populate this; the server rejects any non-empty value.
                          Do NOT use display:none or visibility:hidden — some bots
                          detect and skip those. Off-screen positioning fools them.
                        */}
                        <div
                            aria-hidden="true"
                            style={{
                                position: 'absolute',
                                left: '-9999px',
                                width: '1px',
                                height: '1px',
                                overflow: 'hidden',
                            }}
                        >
                            <label htmlFor="website">Leave this field blank</label>
                            <input
                                id="website"
                                type="text"
                                name="website"
                                value={data.website}
                                onChange={(e) => setData('website', e.target.value)}
                                tabIndex={-1}
                                autoComplete="off"
                            />
                        </div>
                    </form>
                </div>

                {/* Right Direct Relays */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Social Hub */}
                    <div className="bg-[#03132e]/85 border-2 border-[#00e5ff]/30 p-6 cut-corner-lg space-y-4">
                        <div className="flex items-center space-x-2 pb-2 border-b border-[#00e5ff]/20">
                            <span className="w-2.5 h-2.5 bg-[#ffd000]" />
                            <h3 className="font-['Chakra_Petch'] text-lg font-black text-white uppercase tracking-wider">
                                DIRECT RELAYS & NETWORK
                            </h3>
                        </div>

                        <p className="text-xs font-mono text-slate-300">
                            Alternate channels for instantaneous contact and public code repository inspection.
                        </p>

                        <div className="space-y-3 pt-2">
                            {SOCIALS.map((s) => {
                                const Icon = SOCIAL_ICON[s.key] || MessageCircle;
                                const external = s.url.startsWith('http');
                                return (
                                    <a
                                        key={s.key}
                                        href={s.url}
                                        target={external ? '_blank' : undefined}
                                        rel={external ? 'noreferrer' : undefined}
                                        onMouseEnter={playHoverSfx}
                                        className="flex items-center justify-between p-3 bg-[#051633] border border-[#00e5ff]/20 hover:border-[#00e5ff] cut-corner-br group transition-all"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Icon className="w-5 h-5 text-[#00e5ff] group-hover:text-[#67e8f9]" />
                                            <span className="font-mono text-sm text-white group-hover:text-[#00e5ff]">
                                                {s.label}
                                            </span>
                                        </div>
                                        <span className="font-mono text-xs text-slate-400 group-hover:text-white">
                                            {s.handle} →
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Operational Notice Box */}
                    <div className="bg-[#03132e]/85 border-2 border-[#ff1e56]/40 p-5 cut-corner-br">
                        <div className="flex items-center space-x-2 text-[#ff1e56] mb-2">
                            <span className="w-2.5 h-2.5 bg-[#ff1e56]" />
                            <h4 className="font-['Chakra_Petch'] font-black text-sm uppercase tracking-wider">
                                S.E.E.S. DISPATCH PROTOCOL
                            </h4>
                        </div>
                        <p className="text-xs font-mono text-slate-300 leading-relaxed">
                            All incoming transmissions are stored securely in the SQLite archive. Typical transceiver response window is within 24 standard hours during non-Dark Hour operational periods.
                        </p>
                    </div>
                </div>

            </div>
        </MainLayout>
    );
}
