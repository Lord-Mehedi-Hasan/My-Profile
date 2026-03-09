'use client';

import { useEffect, useRef } from 'react';
import styles from './Services.module.css';

const services = [
    {
        id: 'frontend',
        num: '01',
        title: 'Frontend Development',
        desc: 'Crafting pixel-perfect, responsive, and accessible user interfaces that delight users and drive engagement across all modern devices.',
        tech: ['React', 'Next.js', 'TypeScript', 'CSS / Tailwind'],
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
    {
        id: 'backend',
        num: '02',
        title: 'Backend Architecture',
        desc: 'Architecting scalable, secure, and high-performance server-side systems to power your applications with robust data management.',
        tech: ['Node.js', 'NestJS', 'PostgreSQL', 'REST APIs'],
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
        ),
    },
    {
        id: 'competitive',
        num: '03',
        title: 'Algorithm & Problem Solving',
        desc: 'Applying advanced data structures and algorithms to solve complex computational problems efficiently, honed through years of competitive programming.',
        tech: ['C++', 'Dynamic Programming', 'Graph Theory', 'ICPC 4×'],
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
        ),
    },
    {
        id: 'ml',
        num: '04',
        title: 'ML & Research',
        desc: 'Researching and implementing machine learning models, with a focus on natural language processing and intelligent data-driven applications.',
        tech: ['Python', 'TensorFlow', 'NLP', 'Data Analysis'],
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
        ),
    },
    {
        id: 'fullstack',
        num: '05',
        title: 'Full-Stack Applications',
        desc: 'Delivering complete, production-ready web applications from database design to deployment, ensuring seamless end-to-end experiences.',
        tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Docker'],
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
    },
    {
        id: 'consulting',
        num: '06',
        title: 'Technical Consulting',
        desc: 'Providing expert guidance on system architecture, code review, tech stack selection, and engineering best practices for growing teams.',
        tech: ['Architecture Design', 'Code Review', 'Mentoring', 'Agile'],
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
        ),
    },
];

export default function Services() {
    const ref = useRef<HTMLElement>(null);
    const headRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const init = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);
            const sec = ref.current;
            const head = headRef.current;
            if (!sec || !head) return;

            gsap.fromTo(head.querySelectorAll('[data-word]'),
                { rotateX: -80, y: '50%', opacity: 0, transformOrigin: 'top center' },
                {
                    rotateX: 0, y: '0%', opacity: 1, duration: 1.0, ease: 'expo.out', stagger: 0.14,
                    scrollTrigger: { trigger: sec, start: 'top 78%', toggleActions: 'play none none reverse' }
                }
            );

            gsap.fromTo(sec.querySelectorAll('[data-card]'),
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1,
                    scrollTrigger: { trigger: sec, start: 'top 60%', toggleActions: 'play none none reverse' }
                }
            );
        };
        init();
    }, []);

    return (
        <section id="services" className={`section ${styles.services}`} ref={ref} aria-labelledby="services-h">
            <div className="wrap">

                {/* Watermark */}
                <div className={styles.watermark} aria-hidden="true">SERVICES</div>

                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.eyebrow}>
                        <span className={styles.eyebrowLine} />
                        WHAT I DO
                    </div>
                    <h2 className={styles.title} id="services-h" ref={headRef} style={{ perspective: '600px' }}>
                        <span className={styles.wordClip}><span data-word>Solving Problems</span></span>
                        <br />
                        <span className={styles.wordClip}><span data-word>With</span></span>
                        {' '}
                        <span className={`${styles.wordClip} ${styles.outline}`}><span data-word>Intelligent Code</span></span>
                    </h2>
                    <blockquote className={styles.quote}>
                        I don&apos;t just write code; I build sustainable digital ecosystems.
                        From concept to deployment, I ensure every line serves a purpose
                        and every function processes with efficiency.
                    </blockquote>
                </div>

                {/* Cards */}
                <div className={styles.grid}>
                    {services.map((s) => (
                        <div key={s.id} className={styles.card} data-card>
                            <span className={styles.cardNum} aria-hidden="true">{s.num}</span>
                            <div className={styles.cardIconWrap}>{s.icon}</div>
                            <h3 className={styles.cardTitle}>{s.title}</h3>
                            <p className={styles.cardDesc}>{s.desc}</p>
                            <div className={styles.techList}>
                                {s.tech.map((t) => (
                                    <span key={t} className={styles.techPill}>{t}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
