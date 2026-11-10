import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * Reveal — scroll-reveal wrapper component.
 *
 * Wraps any content in a div that starts invisible and animates in once it
 * enters the viewport. Uses `useScrollReveal` internally so the observer
 * lifecycle is fully managed (disconnect on trigger, cleanup on unmount).
 *
 * Usage:
 *   <Reveal>
 *     <SomeContent />
 *   </Reveal>
 *
 *   <Reveal delay={150} animationClass="animate-reveal-left" as="section">
 *     <SomeContent />
 *   </Reveal>
 *
 * Props:
 *   children        — content to reveal
 *   as              — HTML tag for the wrapper div (default: 'div')
 *   animationClass  — CSS animation class (default: 'animate-reveal-up')
 *   delay           — animation-delay in ms (default: 0)
 *   threshold       — IntersectionObserver threshold (default: 0.12)
 *   rootMargin      — IntersectionObserver rootMargin
 *   className       — additional classes on the wrapper
 */
export default function Reveal({
    children,
    as: Tag = 'div',
    animationClass = 'animate-reveal-up',
    delay = 0,
    threshold = 0.12,
    rootMargin = '0px 0px -40px 0px',
    className = '',
}) {
    const ref = useScrollReveal({ animationClass, delay, threshold, rootMargin });

    return (
        <Tag ref={ref} className={className}>
            {children}
        </Tag>
    );
}
