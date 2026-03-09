import { useEffect, useRef, useState } from 'react';

/**
 * Counts up from 0 to `end` when the element enters the viewport.
 * Supports suffixes like "4×", "7+", "5+".
 */
export function useCountUp(rawValue: string, duration = 1400) {
    const ref = useRef<HTMLElement>(null);
    const [display, setDisplay] = useState('0');

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Parse numeric part and suffix
        const match = rawValue.match(/^(\d+)(.*)$/);
        if (!match) { setDisplay(rawValue); return; }
        const end = parseInt(match[1], 10);
        const suffix = match[2];

        let start: number | null = null;
        let raf: number;

        const obs = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            obs.disconnect();

            const animate = (ts: number) => {
                if (start === null) start = ts;
                const progress = Math.min((ts - start) / duration, 1);
                // Ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                setDisplay(`${Math.round(eased * end)}${suffix}`);
                if (progress < 1) raf = requestAnimationFrame(animate);
            };
            raf = requestAnimationFrame(animate);
        }, { threshold: 0.5 });

        obs.observe(el);
        return () => { obs.disconnect(); cancelAnimationFrame(raf); };
    }, [rawValue, duration]);

    return { ref, display };
}
