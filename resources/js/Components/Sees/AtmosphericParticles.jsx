import React, { useEffect, useRef } from 'react';

/**
 * AtmosphericParticles — lightweight canvas particle field.
 *
 * Renders ~30 small dots that drift slowly across the dark background,
 * creating subtle atmospheric depth without overwhelming the content.
 *
 * Technical constraints respected:
 *  - requestAnimationFrame loop is cancelled on unmount — no leaks.
 *  - prefers-reduced-motion: if set, the canvas is not rendered at all
 *    (returns null) so there is zero performance cost.
 *  - Canvas is sized to the window and resizes on window resize — the
 *    listener is removed on unmount.
 *  - No external dependencies — pure browser APIs only.
 *  - Particles are rendered at 0.06–0.25 opacity; the canvas itself sits
 *    at z-0 behind all content, pointer-events: none, aria-hidden.
 *
 * Design intent: the particles read as distant light specks — a nod to the
 * Tartarus atmosphere in P3R — not as a distracting foreground element.
 */

const PARTICLE_COUNT = 30;
const BASE_SPEED = 0.18;   // pixels per frame at 60fps
const MIN_RADIUS = 0.8;
const MAX_RADIUS = 1.8;

function makeParticle(width, height) {
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS),
        // Each particle has a unique drift direction and speed.
        vx: (Math.random() - 0.5) * BASE_SPEED * 2,
        vy: -(BASE_SPEED * 0.4 + Math.random() * BASE_SPEED),
        opacity: 0.06 + Math.random() * 0.19,
        // Color: mostly cyan (#00e5ff), occasionally blue (#0055ff).
        hue: Math.random() > 0.25 ? '0,229,255' : '0,85,255',
    };
}

export default function AtmosphericParticles() {
    // Check reduced-motion preference before mounting.
    const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvasRef = useRef(null);

    useEffect(() => {
        if (prefersReduced) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let width = window.innerWidth;
        let height = window.innerHeight;
        let rafId;

        // Size the canvas to the full viewport.
        const setSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        setSize();

        // Initialise particle pool.
        const particles = Array.from({ length: PARTICLE_COUNT }, () =>
            makeParticle(width, height)
        );

        const draw = () => {
            // Clear with full transparency — the background is behind the canvas.
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p) => {
                // Drift.
                p.x += p.vx;
                p.y += p.vy;

                // Wrap: when a particle exits the viewport, respawn at the opposite edge.
                if (p.y < -4) { p.y = height + 4; p.x = Math.random() * width; }
                if (p.x < -4) { p.x = width + 4; }
                if (p.x > width + 4) { p.x = -4; }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.hue},${p.opacity})`;
                ctx.fill();
            });

            rafId = requestAnimationFrame(draw);
        };

        draw();

        const onResize = () => {
            setSize();
            // Redistribute particles when viewport changes so they don't clump.
            particles.forEach((p) => {
                p.x = Math.random() * width;
                p.y = Math.random() * height;
            });
        };
        window.addEventListener('resize', onResize, { passive: true });

        // Pause animation when the tab is hidden — saves CPU/battery.
        const onVisibilityChange = () => {
            if (document.hidden) {
                cancelAnimationFrame(rafId);
            } else {
                draw();
            }
        };
        document.addEventListener('visibilitychange', onVisibilityChange);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', onResize);
            document.removeEventListener('visibilitychange', onVisibilityChange);
        };
    }, [prefersReduced]);

    if (prefersReduced) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0, opacity: 0.85 }}
            aria-hidden="true"
        />
    );
}
