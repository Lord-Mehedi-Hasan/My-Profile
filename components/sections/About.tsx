'use client';

import { useEffect, useRef } from 'react';
import styles from './About.module.css';

const highlights = [
    {
        num: '01',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        title: 'Competitive Programmer',
        desc: 'ICPC 4× and NCPC 2× participant — problem solver at heart, sharpened through collegiate-level algorithmic contests.',
    },
    {
        num: '02',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
        title: 'Full-Stack Engineer',
        desc: 'Production-ready apps with Next.js, NestJS, ASP.NET & C# across web and desktop platforms.',
    },
    {
        num: '03',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
        ),
        title: 'ML Researcher',
        desc: "Published work in healthcare AI — Alzheimer's, CHD, Stroke prediction, NLP sentiment analysis.",
    },
    {
        num: '04',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
        ),
        title: 'Always Learning',
        desc: 'Currently exploring DevOps with Azure, Generative AI, and Angular to stay on the cutting edge.',
    },
];

const info = [
    { label: 'Location', value: 'Mirpur, Dhaka, Bangladesh' },
    { label: 'Email', value: 'mh2822299@gmail.com' },
    { label: 'Degree', value: 'B.Sc. CSE — AIUB (2021–2025)' },
    { label: 'Status', value: 'Open to opportunities' },
];

export default function About() {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const sec = ref.current;

        // Failsafe — force all GSAP-animated elements visible after 2.5s
        // (About is off-screen initially so we give more time)
        const forceVisible = () => {
            if (!sec) return;
            const els = [
                sec.querySelector('[data-about-left]') as HTMLElement | null,
                sec.querySelector('[data-about-info]') as HTMLElement | null,
                ...Array.from(sec.querySelectorAll<HTMLElement>('[data-about-card]')),
            ];
            els.forEach(el => {
                if (!el) return;
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

                const left = sec.querySelector('[data-about-left]') as HTMLElement;
                const cards = sec.querySelectorAll<HTMLElement>('[data-about-card]');
                const infoEl = sec.querySelector('[data-about-info]') as HTMLElement;

                if (left) gsap.fromTo(left,
                    { x: -50, opacity: 0 },
                    {
                        x: 0, opacity: 1, duration: 1.0, ease: 'expo.out',
                        scrollTrigger: { trigger: sec, start: 'top 75%', toggleActions: 'play none none reverse' }
                    }
                );

                if (cards.length) gsap.fromTo(cards,
                    { y: 40, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1,
                        scrollTrigger: { trigger: sec, start: 'top 68%', toggleActions: 'play none none reverse' }
                    }
                );

                if (infoEl) gsap.fromTo(infoEl,
                    { y: 24, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2,
                        scrollTrigger: { trigger: sec, start: 'top 65%', toggleActions: 'play none none reverse' }
                    }
                );
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
                <div className={styles.eyebrow}>
                    <span className={styles.eyebrowLine} />
                    WHO I AM
                </div>

                {/* Two-column layout */}
                <div className={styles.grid}>

                    {/* Left */}
                    <div className={styles.left} data-about-left>

                        <h2 className={styles.title} id="about-h">
                            Developer<span className={styles.dot}>.</span><br />
                            <span className={styles.outline}>Researcher</span><br />
                            Builder
                        </h2>

                        <p className={styles.bio}>
                            I&apos;m a CS graduate from <strong>AIUB</strong>, passionate about creating software
                            that solves real problems. My journey spans competitive programming arenas, research
                            labs, and production codebases — and I thrive in all three.
                        </p>
                        <p className={styles.bio}>
                            Hands-on with <strong>C++, Python, Java, TypeScript</strong> and frameworks like{' '}
                            <strong>Next.js, NestJS, and ASP.NET</strong>. My research applies machine learning
                            to early disease detection in healthcare.
                        </p>

                        {/* Quick info grid */}
                        <div className={styles.infoGrid} data-about-info>
                            {info.map(({ label, value }) => (
                                <div key={label} className={styles.infoItem}>
                                    <span className={styles.infoLabel}>{label}</span>
                                    <span className={styles.infoValue}>{value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className={styles.actions}>
                            <a href="https://github.com/Lord-Mehedi-Hasan" target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                                GitHub
                            </a>
                            <a href="https://www.linkedin.com/in/mehedi-hasan-50b2ba2b2/" target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                LinkedIn
                            </a>
                            <a href="mailto:mh2822299@gmail.com" className={styles.actionBtn}>
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                Email
                            </a>
                        </div>
                    </div>

                    {/* Right — highlight cards grid */}
                    <div className={styles.right}>
                        {highlights.map((h) => (
                            <div key={h.num} className={styles.card} data-about-card>
                                <div className={styles.cardTop}>
                                    <div className={styles.cardIconWrap}>{h.icon}</div>
                                    <span className={styles.cardNum}>{h.num}</span>
                                </div>
                                <h3 className={styles.cardTitle}>{h.title}</h3>
                                <p className={styles.cardDesc}>{h.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
