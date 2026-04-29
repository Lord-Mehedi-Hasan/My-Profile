'use client';

import { useEffect, useRef } from 'react';
import styles from './About.module.css';
import GitHubHeatmap from './GitHubHeatmap';
import Magnetic from '@/components/ui/Magnetic';

const highlights = [
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        title: 'Competitive Programmer',
        desc: 'ICPC 4× and NCPC 2× participant — problem solver sharpened through collegiate-level algorithmic contests.',
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
        title: 'Full-Stack Engineer',
        desc: 'Production-ready apps with Next.js, NestJS, ASP.NET & C# across web and desktop platforms.',
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
        ),
        title: 'ML Researcher',
        desc: "Published in healthcare AI — Alzheimer's, CHD, Stroke prediction & NLP sentiment analysis.",
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
        ),
        title: 'Always Learning',
        desc: 'Exploring DevOps with Azure, Generative AI, and Angular to stay on the cutting edge.',
    },
];

const stats = [
    { num: '7',  suffix: '+', label: 'Projects Built' },
    { num: '4',  suffix: '×', label: 'ICPC Participations' },
    { num: '2',  suffix: '×', label: 'NCPC Competitions' },
    { num: '4',  suffix: '+', label: 'Research Papers' },
    { num: '4',  suffix: '+', label: 'Certifications' },
];

const chips = [
    {
        label: 'Mirpur, Dhaka',
        icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>,
    },
    {
        label: 'B.Sc. CSE — AIUB',
        icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
    },
    {
        label: 'Open to opportunities',
        icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
    },
];

export default function About() {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const sec = ref.current;
        const forceVisible = () => {
            if (!sec) return;
            sec.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        };
        const safeTimer = setTimeout(forceVisible, 2500);

        const init = async () => {
            try {
                const { gsap } = await import('gsap');
                const { ScrollTrigger } = await import('gsap/ScrollTrigger');
                gsap.registerPlugin(ScrollTrigger);
                if (!sec) { forceVisible(); return; }
                clearTimeout(safeTimer);

                const els = sec.querySelectorAll<HTMLElement>('[data-reveal]');
                els.forEach((el, i) => {
                    gsap.fromTo(el,
                        { y: 24, opacity: 0 },
                        {
                            y: 0, opacity: 1,
                            duration: 0.7,
                            ease: 'power3.out',
                            delay: i * 0.08,
                            scrollTrigger: {
                                trigger: sec,
                                start: 'top 75%',
                                toggleActions: 'play none none none',
                            },
                        }
                    );
                });
            } catch {
                forceVisible();
            }
        };
        init();
        return () => clearTimeout(safeTimer);
    }, []);

    return (
        <section id="about" className={`section ${styles.about}`} ref={ref} aria-labelledby="about-h">
            <div className="wrap">

                {/* Eyebrow */}
                <div className={styles.eyebrow} data-reveal>
                    <span className={styles.eyebrowLine} />
                    WHO I AM
                </div>

                {/* ── Bento Grid ── */}
                <div className={styles.bento}>

                    {/* A — Intro card */}
                    <div className={`${styles.card} ${styles.cardIntro}`} data-reveal>
                        <h2 className={styles.title} id="about-h">
                            Developer.<br />
                            <span className={styles.titleAccent}>Researcher.</span><br />
                            Builder.
                        </h2>

                        <p className={styles.introBio}>
                            CS graduate from <strong>AIUB</strong>, passionate about creating software
                            that solves real problems. My journey spans competitive programming arenas,
                            research labs, and production codebases — and I thrive in all three.
                        </p>

                        <div className={styles.introBottom}>
                            <div className={styles.infoChips}>
                                {chips.map(c => (
                                    <span key={c.label} className={styles.chip}>
                                        {c.icon}
                                        {c.label}
                                    </span>
                                ))}
                            </div>
                            <div className={styles.btnRow}>
                                <Magnetic strength={0.3}>
                                    <a href="/CV_WebDev_Mehedi_Hasan.pdf" download className={styles.cvBtn}>
                                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                        Web Dev CV
                                    </a>
                                </Magnetic>
                                <Magnetic strength={0.3}>
                                    <a href="/CV_Research_Mehedi_Hasan.pdf" download className={styles.cvBtn}>
                                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                        Research CV
                                    </a>
                                </Magnetic>
                            </div>
                        </div>
                    </div>

                    {/* B — Stats card (dark, spans 2 rows) */}
                    <div className={`${styles.card} ${styles.cardStats}`} data-reveal>
                        {stats.map(({ num, suffix, label }) => (
                            <div key={label} className={styles.statItem}>
                                <span className={styles.statNum}>
                                    {num}<span>{suffix}</span>
                                </span>
                                <span className={styles.statLabel}>{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* C — Highlight cards (2×2 grid, spans 2 cols) */}
                    <div className={`${styles.card} ${styles.cardHighlights}`} data-reveal>
                        {highlights.map((h) => (
                            <div key={h.title} className={styles.highlightCard}>
                                <div className={styles.hlIcon}>{h.icon}</div>
                                <h3 className={styles.hlTitle}>{h.title}</h3>
                                <p className={styles.hlDesc}>{h.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* D — GitHub heatmap (full width) */}
                    <div className={`${styles.card} ${styles.cardHeatmap}`} data-reveal>
                        <GitHubHeatmap />
                    </div>

                </div>
            </div>
        </section>
    );
}
