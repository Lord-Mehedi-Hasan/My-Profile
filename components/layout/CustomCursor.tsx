'use client';

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

/**
 * Diamond cursor with WE-FLOW style thread trail:
 *  – Canvas spring-chain thread (20 nodes, each lerping toward the previous)
 *  – Small solid red inner diamond snapping to cursor
 *  – Glowing outer diamond that cycles through hue over time
 *  – On hover: outer diamond grows, thread brightens
 *  – On click:  everything compresses
 */
const NODES = 22;   // thread length
const LERP_HEAD = 0.28; // how fast each node chases previous
const LERP_INC = 0.012; // extra slowdown per successive node

export default function CustomCursor() {
    const innerRef = useRef<HTMLDivElement>(null);
    const outerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const inner = innerRef.current;
        const outer = outerRef.current;
        const canvas = canvasRef.current;
        if (!inner || !outer || !canvas) return;

        const ctx = canvas.getContext('2d')!;

        // Resize canvas to full viewport
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Spring chain: each node is {x, y}
        const nodes: { x: number; y: number }[] = Array.from({ length: NODES }, () => ({
            x: -300, y: -300,
        }));

        let mx = -300, my = -300;
        let isHover = false;
        let isClick = false;
        let hue = 0;   // for color cycling
        let raf: number;

        const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
        const onDown = () => { isClick = true; };
        const onUp = () => { isClick = false; };
        const onEnter = () => { isHover = true; };
        const onLeave = () => { isHover = false; };

        const addListeners = () => {
            document.querySelectorAll('a, button, [data-magnetic], input, textarea, select').forEach(el => {
                el.addEventListener('mouseenter', onEnter);
                el.addEventListener('mouseleave', onLeave);
            });
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);
        setTimeout(addListeners, 600);

        // ── Colour palette cycling ──────────────────────
        // Cycles through: red (#C51110) → purple → cyan → back
        const getHslColor = (h: number, alpha: number) =>
            `hsla(${h % 360}, 100%, 60%, ${alpha})`;

        const tick = () => {
            hue = (hue + 0.6) % 360;

            // ── Update spring chain ─────────────────────
            nodes[0].x += (mx - nodes[0].x) * (LERP_HEAD);
            nodes[0].y += (my - nodes[0].y) * (LERP_HEAD);
            for (let i = 1; i < NODES; i++) {
                const speed = LERP_HEAD - i * LERP_INC;
                const s = Math.max(speed, 0.04);
                nodes[i].x += (nodes[i - 1].x - nodes[i].x) * s;
                nodes[i].y += (nodes[i - 1].y - nodes[i].y) * s;
            }

            // ── Draw thread on canvas ───────────────────
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (mx > -200) {            // only draw once mouse entered
                // draw segments with tapering width and opacity
                for (let i = 0; i < NODES - 1; i++) {
                    const t = 1 - i / NODES;        // 1 at head, 0 at tail
                    const lineHue = (hue + i * 4) % 360;  // slight hue offset per segment
                    const alpha = isHover ? t * 0.85 : t * 0.45;
                    const width = isClick ? t * 1.2 : isHover ? t * 2.4 : t * 1.8;

                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[i + 1].x, nodes[i + 1].y);
                    ctx.strokeStyle = getHslColor(lineHue, alpha);
                    ctx.lineWidth = width;
                    ctx.lineCap = 'round';
                    ctx.shadowColor = getHslColor(lineHue, 0.6);
                    ctx.shadowBlur = isHover ? 12 : 6;
                    ctx.stroke();
                }
            }

            // ── Inner diamond ───────────────────────────
            const innerScale = isClick ? 0.5 : isHover ? 0 : 1;
            inner.style.transform = `translate(${mx - 4}px, ${my - 4}px) rotate(45deg) scale(${innerScale})`;

            // ── Outer diamond ───────────────────────────
            const outerScale = isClick ? 0.7 : isHover ? 2.0 : 1;
            const outerColor = `hsl(${hue % 360}, 100%, 60%)`;
            const glowSize = isHover ? 18 : 10;
            const glowAlpha = isHover ? 0.9 : 0.55;

            // Use CSS vars to push glow into the element
            outer.style.transform = `translate(${mx - 14}px, ${my - 14}px) rotate(45deg) scale(${outerScale})`;
            outer.style.borderColor = outerColor;
            outer.style.boxShadow = `0 0 ${glowSize}px ${glowSize / 2}px hsla(${hue % 360},100%,60%,${glowAlpha}), inset 0 0 ${glowSize / 2}px hsla(${hue % 360},100%,60%,0.15)`;
            outer.style.opacity = mx > -200 ? '1' : '0';

            raf = requestAnimationFrame(tick);
        };
        tick();

        document.documentElement.style.cursor = 'none';

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
            window.removeEventListener('resize', resize);
            document.documentElement.style.cursor = '';
        };
    }, []);

    return (
        <>
            {/* Full-screen canvas for the thread trail */}
            <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
            {/* Inner solid diamond */}
            <div ref={innerRef} className={styles.inner} aria-hidden="true" />
            {/* Outer glowing diamond */}
            <div ref={outerRef} className={styles.outer} aria-hidden="true" />
        </>
    );
}
