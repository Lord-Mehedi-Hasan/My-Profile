import { useEffect, useRef } from 'react';

/**
 * Magnetic hover effect hook.
 * Apply to any element — it will gently move toward the mouse cursor
 * when the cursor is within the element's bounding box (+ padding).
 *
 * @param strength  How far it moves (0–1, default 0.4)
 * @param padding   Extra hover zone in px (default 32)
 */
export function useMagnetic<T extends HTMLElement>(
    strength = 0.4,
    padding = 32,
) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let raf: number;
        let tx = 0, ty = 0;
        let cx = 0, cy = 0;
        let active = false;

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const cx2 = rect.left + rect.width / 2;
            const cy2 = rect.top + rect.height / 2;
            const dx = e.clientX - cx2;
            const dy = e.clientY - cy2;

            const inZone =
                e.clientX > rect.left - padding &&
                e.clientX < rect.right + padding &&
                e.clientY > rect.top - padding &&
                e.clientY < rect.bottom + padding;

            active = inZone;
            tx = inZone ? dx * strength : 0;
            ty = inZone ? dy * strength : 0;
        };

        const tick = () => {
            cx = lerp(cx, tx, 0.18);
            cy = lerp(cy, ty, 0.18);
            el.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
            raf = requestAnimationFrame(tick);
        };

        window.addEventListener('mousemove', onMove);
        tick();

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf);
            el.style.transform = '';
        };
    }, [strength, padding]);

    return ref;
}
