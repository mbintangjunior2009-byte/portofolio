import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn — canonical class-name composer for HOSHI // SEES TERMINAL.
 *
 * Combines `clsx` (conditional / array / object class inputs) with
 * `tailwind-merge` (resolves conflicting Tailwind utilities so the last
 * declaration wins, e.g. `cn('px-4', 'px-6')` -> `'px-6'`).
 *
 * Use this instead of raw template-string concatenation so consumer-provided
 * `className` props can safely override component defaults without conflicts.
 *
 * @example
 *   cn('p3r-skew cut-corner-br', isActive && 'bg-[#00e5ff]', className)
 *
 * @param {...any} inputs - clsx-compatible class inputs
 * @returns {string} merged, conflict-free class string
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default cn;
