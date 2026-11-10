import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — IntersectionObserver-based scroll reveal hook.
 *
 * Adds `animate-reveal-up` (or a custom animationClass) to the referenced
 * element once it enters the viewport. The observer disconnects immediately
 * after the first trigger (once = true, no repeated re-animation on scroll
 * back up) and is cleaned up on unmount.
 *
 * prefers-reduced-motion: when the user has requested reduced motion the
 * hook still removes `reveal-hidden` (so content is always visible) but
 * never adds the animation class — CSS handles the animation:none override
 * as a fallback, but we avoid even setting the class to prevent a single-
 * frame layout flash on low-power devices.
 *
 * @param {object} options
 * @param {string}  [options.animationClass='animate-reveal-up'] — CSS class to apply
 * @param {number}  [options.threshold=0.12]  — how much of the element must be visible
 * @param {string}  [options.rootMargin='0px 0px -40px 0px'] — shrinks trigger zone slightly
 * @param {number}  [options.delay=0]  — optional delay in ms, applied via animation-delay
 *
 * @returns {React.RefObject} — attach to the element you want to reveal
 */
export function useScrollReveal({
    animationClass = 'animate-reveal-up',
    threshold = 0.12,
    rootMargin = '0px 0px -40px 0px',
    delay = 0,
} = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Respect prefers-reduced-motion at the JS level too.
        const prefersReduced =
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReduced) {
            // Ensure content is visible even without the animation.
            el.classList.remove('reveal-hidden');
            return;
        }

        // Start hidden; the CSS class sets opacity:0 + translateY.
        el.classList.add('reveal-hidden');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    el.classList.remove('reveal-hidden');
                    if (delay > 0) {
                        el.style.animationDelay = `${delay}ms`;
                    }
                    el.classList.add(animationClass);
                    // One-shot: disconnect after firing.
                    observer.disconnect();
                });
            },
            { threshold, rootMargin }
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
            // Clean up inline style to avoid leaking delay values.
            if (el) {
                el.style.animationDelay = '';
                el.classList.remove('reveal-hidden', animationClass);
            }
        };
    }, [animationClass, threshold, rootMargin, delay]);

    return ref;
}

export default useScrollReveal;
