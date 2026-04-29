'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Education.module.css';
import CertMarquee from './CertMarquee';

const education = [{
    degree: 'B.Sc. (Engg.) in Computer Science & Engineering',
    institution: 'American International University – Bangladesh',
    short: 'AIUB',
    period: '2021 – 2025',
    highlights: ['ICPC ×4', 'NCPC ×2', 'Full-Stack Web Dev', 'ML Research', "Dean's Award eligible"],
}];

const certs = [
    { name: 'DevOps with Azure Programming', org: 'Mind Luster', year: '2025' },
    { name: 'Prompt Engineering with Generative AI', org: 'Mind Luster', year: '2025' },
    { name: 'Web Development with Angular', org: 'Mind Luster', year: '2025' },
    { name: 'IT Essentials', org: 'CISCO', year: '2021' },
];

export default function Education() {
    const ref = useRef<HTMLElement>(null);
    const degRef = useRef<HTMLDivElement>(null);
    const certsRef = useRef<HTMLUListElement>(null);
    const [vis, setVis] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    /* ── GSAP 3D depth animations ── */
    useEffect(() => {
        const init = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            const sec = ref.current;
            const deg = degRef.current;
            const certsList = certsRef.current;
            if (!sec || !deg || !certsList) return;

            /* Degree block — zoom out from deep z-depth (like coming through the screen) */
            gsap.fromTo(deg,
                { z: -300, rotateX: 20, scale: 0.65, opacity: 0, transformOrigin: 'center center' },
                {
                    z: 0, rotateX: 0, scale: 1, opacity: 1,
                    duration: 1.3, ease: 'expo.out',
                    scrollTrigger: { trigger: sec, start: 'top 75%', toggleActions: 'play none none reverse' },
                }
            );

            /* Cert rows — alternating left/right with rotateY */
            const rows = certsList.querySelectorAll<HTMLElement>('li');
            rows.forEach((row, i) => {
                const dir = i % 2 === 0 ? -1 : 1;
                gsap.fromTo(row,
                    { x: dir * 70, rotateY: dir * 18, opacity: 0, transformOrigin: dir < 0 ? 'left center' : 'right center' },
                    {
                        x: 0, rotateY: 0, opacity: 1,
                        duration: 0.85, ease: 'power3.out',
                        delay: 0.12 * i,
                        scrollTrigger: { trigger: certsList, start: 'top 82%', toggleActions: 'play none none reverse' },
                    }
                );
            });
        };
        init();
    }, []);

    return (
        <section id="education" className={`section ${styles.edu}`} ref={ref} aria-labelledby="edu-h">
            <div className="wrap" style={{ perspective: '1000px' }}>
                <div className={`s-label ${vis ? 'reveal in' : 'reveal'}`}>
                    <span>05</span>
                    Education
                </div>

                <h2 className={`${styles.title} ${vis ? 'reveal in' : 'reveal'}`} id="edu-h" style={{ transitionDelay: '0.06s' }}>
                    Education &<br />
                    <span className={styles.outline}>Credentials</span>
                </h2>

                {/* Degree row — 3D z-depth entrance */}
                {education.map(e => (
                    <div
                        key={e.degree}
                        ref={degRef}
                        className={styles.degRow}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className={styles.degLeft}>
                            <span className={styles.period}>{e.period}</span>
                            <span className={styles.short}>{e.short}</span>
                        </div>
                        <div className={styles.degBody}>
                            <h3 className={styles.degree}>{e.degree}</h3>
                            <p className={styles.institution}>{e.institution}</p>
                            <div className={styles.highlights}>
                                {e.highlights.map(h => <span key={h} className={styles.chip}>{h}</span>)}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Certifications — alternating 3D slide-in */}
                <div className={`s-label ${vis ? 'reveal in' : 'reveal'}`} style={{ transitionDelay: '0.2s', marginTop: '64px' }}>
                    <span>Certifications</span>
                </div>
                <ul className={styles.certList} ref={certsRef} style={{ perspective: '800px' }}>
                    {certs.map((c, i) => (
                        <li
                            key={c.name}
                            className={styles.certRow}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className={styles.certBody}>
                                <span className={styles.certCheck} aria-hidden="true">✓</span>
                                <span className={styles.certName}>{c.name}</span>
                            </div>
                            <span className={styles.certMeta}>{c.org} · {c.year}</span>
                        </li>
                    ))}
                </ul>

                {/* Scrolling certificate marquee */}
                <div style={{ marginTop: '56px' }}>
                    <div className={`s-label ${vis ? 'reveal in' : 'reveal'}`} style={{ transitionDelay: '0.3s', marginBottom: '32px' }}>
                        <span>Certifications Gallery</span>
                    </div>
                    <CertMarquee />
                </div>
            </div>
        </section>
    );
}
