import { useEffect, useState } from 'react';

/**
 * useClock — live clock hook for HOSHI // SEES TERMINAL.
 *
 * Returns a snapshot of the current time, updated every second:
 *   - time: "HH:MM:SS"
 *   - date: "YYYY.MM.DD"
 *   - isDarkHour: true when the wall-clock hour is exactly 0 (midnight),
 *     matching the Persona 3 "Dark Hour" motif.
 *   - raw: the underlying Date object for custom formatting.
 *
 * Reused across the hero's digital date/time display. The Navigation
 * component keeps its own inline clock intentionally, to preserve
 * existing behavior.
 */
const pad = (n) => String(n).padStart(2, '0');

export function useClock() {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const date = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}`;
    const isDarkHour = now.getHours() === 0;

    return { time, date, isDarkHour, raw: now };
}

export default useClock;
