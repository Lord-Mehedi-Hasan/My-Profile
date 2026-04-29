'use client';

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

/**
 * Cursor with silk-thread trail effect.
 * - Inner dot: snaps instantly to cursor
 * - Outer ring: lerps behind for depth
 * - Thread: canvas of N spring-physics nodes — each lags its predecessor,
 *   creating an organic trailing thread that feels like silk dragging.
 */

const NODES = 20;       // thread length (number of points)
const LERP  = 0.18;     // spring tightness per node (cumulative lag)

export default function CustomCursor() {
    const dotRef    = useRef<HTMLDivElement>(null);
    const ringRef   = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const dot    = dotRef.current;
        const ring   = ringRef.current;
        const canvas = canvasRef.current;
        if (!dot || !ring || !canvas) return;

        /* ── Canvas setup ── */
        const resize = () => {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize, { passive: true });

        const ctx = canvas.getContext('2d')!;

        /* ── State ── */
        let mx = -300, my = -300;
        let rx = -300, ry = -300;
        let isHover = false;
        let isDown  = false;
        let raf: number;

        // Thread nodes — each point [x, y]
        const pts: [number, number][] = Array.from({ length: NODES }, () => [-300, -300]);

        /* ── Mouse ── */
        const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
        const onDown = () => { isDown = true; };
        const onUp   = () => { isDown = false; };

        /* ── Hover detection ── */
        const setHover = (v: boolean) => () => { isHover = v; };
        const bindHover = () => {
            document.querySelectorAll('a, button, [role="button"], input, textarea, select').forEach(el => {
                el.addEventListener('mouseenter', setHover(true));
                el.addEventListener('mouseleave', setHover(false));
            });
        };
        const t = setTimeout(bindHover, 800);

        /* ── Lerp helper ── */
        const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

        /* ── RAF loop ── */
        const tick = () => {
            raf = requestAnimationFrame(tick);

            /* dot — instant */
            const ds = isDown ? 0.5 : 1;
            dot.style.transform = `translate3d(${mx - 4}px,${my - 4}px,0) scale(${ds})`;

            /* ring — lags */
            rx = lerp(rx, mx, 0.18);
            ry = lerp(ry, my, 0.18);
            const rs = isHover ? 2.2 : isDown ? 0.6 : 1;
            ring.style.transform = `translate3d(${rx - 16}px,${ry - 16}px,0) scale(${rs})`;
            ring.style.opacity   = isHover ? '0.6' : '0.9';

            /* thread — spring chain */
            pts[0][0] = lerp(pts[0][0], mx, LERP);
            pts[0][1] = lerp(pts[0][1], my, LERP);
            for (let i = 1; i < NODES; i++) {
                pts[i][0] = lerp(pts[i][0], pts[i - 1][0], LERP);
                pts[i][1] = lerp(pts[i][1], pts[i - 1][1], LERP);
            }

            /* draw */
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (mx > -100) { // only draw when cursor is on screen
                ctx.beginPath();
                ctx.moveTo(mx, my);
                for (let i = 0; i < NODES; i++) {
                    ctx.lineTo(pts[i][0], pts[i][1]);
                }

                // Gradient along thread: opaque near cursor → transparent at tail
                const grad = ctx.createLinearGradient(mx, my, pts[NODES - 1][0], pts[NODES - 1][1]);
                grad.addColorStop(0,    isHover ? 'rgba(74,144,217,0.55)' : 'rgba(74,144,217,0.40)');
                grad.addColorStop(0.4,  isHover ? 'rgba(46,204,138,0.30)' : 'rgba(74,144,217,0.20)');
                grad.addColorStop(1,    'rgba(74,144,217,0)');

                ctx.strokeStyle = grad;
                ctx.lineWidth   = isHover ? 1.8 : 1.2;
                ctx.lineCap     = 'round';
                ctx.lineJoin    = 'round';
                ctx.stroke();
            }
        };
        tick();

        document.documentElement.style.cursor = 'none';
        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mousedown', onDown, { passive: true });
        window.addEventListener('mouseup',   onUp,   { passive: true });

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(t);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
            document.documentElement.style.cursor = '';
        };
    }, []);

    return (
        <>
            {/* Thread canvas — fixed, full-screen, pointer-events:none */}
            <canvas
                ref={canvasRef}
                className={styles.threadCanvas}
                aria-hidden="true"
            />
            {/* Inner dot */}
            <div ref={dotRef}  className={styles.dot}  aria-hidden="true" />
            {/* Outer ring */}
            <div ref={ringRef} className={styles.ring} aria-hidden="true" />
        </>
    );
}
