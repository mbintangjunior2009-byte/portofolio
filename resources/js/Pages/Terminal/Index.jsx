import React from 'react';
import MainLayout from '../../Layouts/MainLayout';
import Hero from '../../Components/Sees/Hero';

/**
 * Terminal/Index — the HOSHI // SEES TERMINAL homepage.
 *
 * Renders the cinematic Dark Hour hero inside a full-bleed MainLayout.
 * The controller still passes terminalStatus / securityLevel /
 * clearedMissionsCount / timestamp; the first two feed the hero's status
 * cluster, the rest are accepted to preserve the backend contract.
 */
export default function Index({
    terminalStatus = 'ONLINE',
    securityLevel = 'LEVEL 4 S-RANK',
    clearedMissionsCount = 0,
    timestamp = null,
}) {
    return (
        <MainLayout fluid title="COMMAND DECK">
            <Hero
                terminalStatus={terminalStatus}
                securityLevel={securityLevel}
            />
        </MainLayout>
    );
}
