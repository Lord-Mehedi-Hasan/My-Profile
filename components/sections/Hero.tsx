'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useMagnetic } from '@/hooks/useMagnetic';
import { useCountUp } from '@/hooks/useCountUp';
import styles from './Hero.module.css';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

const roles = ['Full-Stack Engineer', 'Competitive Programmer', 'ML Researcher', 'Problem Solver'];

const stats = [
    { v: '4×', l: 'ICPC' },
    { v: '7+', l: 'Projects' },
    { v: '4', l: 'Papers' },
    { v: '5+', l: 'Languages' },
];

function StatCount({ v, l }: { v: string; l: string }) {
    const { ref, display } = useCountUp(v, 1200);
    return (
        <div className={styles.stat}>
            <strong ref={ref as React.Ref<HTMLElement>}>{display}</strong>
            <span>{l}</span>
        </div>
    );
}

export default function Hero() {
    const secRef = useRef<HTMLElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const stripRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    const magnetPrimary = useMagnetic<HTMLButtonElement>(0.45, 40);
    const magnetGhost = useMagnetic<HTMLAnchorElement>(0.45, 40);

    /* Mouse parallax on canvas orb */
    useEffect(() => {
        const el = canvasRef.current;
        if (!el) return;
        const onMove = (e: MouseEvent) => {
            const rx = (e.clientX / window.innerWidth - 0.5) * 18;
            const ry = (e.clientY / window.innerHeight - 0.5) * 10;
            el.style.transform = `translate(${rx * 0.35}px, ${ry * 0.25}px)`;
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    /* GSAP entry animations only — NO scroll parallax.
       Scroll parallax was the cause of the blank-page bug:
       when loading at a different section GSAP's scrub ScrollTrigger
       immediately applied opacity≈0 to the hero content. */
    useEffect(() => {
        const left = leftRef.current;
        const right = rightRef.current;
        const strip = stripRef.current;

        // Failsafe — force visibility if GSAP hasn't run within 1.8 s
        const forceVisible = () => {
            [left, right, strip].forEach(el => {
                if (!el) return;
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        };
        const safeTimer = setTimeout(forceVisible, 1800);

        const init = async () => {
            try {
                const { gsap } = await import('gsap');
                if (!left || !right || !strip) { forceVisible(); return; }
                clearTimeout(safeTimer);

                /* One-shot slide-in entry animations.
                   After completion elements stay at opacity:1 forever —
                   no scroll-based override, so navigating back always works. */
                gsap.fromTo(left, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1.0, ease: 'expo.out', delay: 0.1 });
                gsap.fromTo(right, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1.0, ease: 'expo.out', delay: 0.25 });
                gsap.fromTo(strip, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.4 });
            } catch {
                forceVisible();
            }
        };
        init();
        return () => clearTimeout(safeTimer);
    }, []);

    const scrollTo = (id: string) =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <section id="home" ref={secRef} className={styles.hero} aria-label="Introduction">

            {/* Background layers */}
            <div className={styles.gridBg} aria-hidden="true" />
            <div className={styles.noise} aria-hidden="true" />
            {/* Gradient orbs */}
            <div className={styles.orbBlue} aria-hidden="true" />
            <div className={styles.orbGreen} aria-hidden="true" />

            {/* ── Main split layout ── */}
            <div className={styles.layout}>

                {/* Left — text */}
                <div ref={leftRef} className={styles.left}>

                    {/* Availability badge */}
                    <div className={styles.badge}>
                        <span className={styles.badgeDot} aria-hidden="true" />
                        Available for opportunities
                    </div>

                    {/* Greeting + name */}
                    <p className={styles.greeting}>Hi, I&apos;m</p>
                    <h1 className={styles.name} aria-label="Mehedi Hasan">
                        Mehedi<br />
                        <span className={styles.nameOutline}>Hasan</span>
                    </h1>

                    {/* Role pill strip */}
                    <div className={styles.rolePills} aria-label="Roles">
                        {roles.map(r => (
                            <span key={r} className={styles.pill}>{r}</span>
                        ))}
                    </div>

                    {/* Short bio */}
                    <p className={styles.bio}>
                        CS graduate from <strong>AIUB</strong>, blending competitive programming,
                        full-stack engineering and machine learning research to build products that matter.
                    </p>

                    {/* CTAs */}
                    <div className={styles.ctas}>
                        <button
                            ref={magnetPrimary}
                            className={styles.ctaPrimary}
                            onClick={() => scrollTo('projects')}
                        >
                            View Projects
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </button>
                        <a
                            ref={magnetGhost}
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.ctaGhost}
                        >
                            Resume ↗
                        </a>
                    </div>

                    {/* Socials */}
                    <div className={styles.socials}>
                        <a href="https://github.com/Lord-Mehedi-Hasan" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.socialLink}>
                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                        </a>
                        <a href="https://www.linkedin.com/in/mehedi-hasan-50b2ba2b2/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialLink}>
                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                        </a>
                        <a href="mailto:mh2822299@gmail.com" aria-label="Email" className={styles.socialLink}>
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        </a>
                    </div>
                </div>

                {/* Right — 3D canvas + floating cards */}
                <div ref={rightRef} className={styles.right}>
                    <div ref={canvasRef} className={styles.canvasWrap} aria-hidden="true">
                        <HeroCanvas />
                    </div>

                    {/* Floating stat cards */}
                    <div className={styles.floatCard} style={{ top: '12%', right: '-4%' }}>
                        <span className={styles.floatCardNum}>4×</span>
                        <span className={styles.floatCardLabel}>ICPC Participant</span>
                    </div>
                    <div className={styles.floatCard} style={{ bottom: '22%', left: '-6%' }}>
                        <span className={styles.floatCardNum}>7+</span>
                        <span className={styles.floatCardLabel}>Projects Shipped</span>
                    </div>
                    <div className={styles.floatCard} style={{ bottom: '5%', right: '4%' }}>
                        <span className={styles.floatCardNum}>4</span>
                        <span className={styles.floatCardLabel}>Research Papers</span>
                    </div>
                </div>
            </div>

            {/* Bottom stats strip */}
            <div ref={stripRef} className={styles.statsStrip}>
                {stats.map(s => <StatCount key={s.l} v={s.v} l={s.l} />)}
                <div className={styles.scrollCue} onClick={() => scrollTo('about')} role="button" tabIndex={0} aria-label="Scroll down">
                    <span className={styles.scrollLine} />
                    <span className={styles.scrollText}>scroll</span>
                </div>
            </div>
        </section>
    );
}
