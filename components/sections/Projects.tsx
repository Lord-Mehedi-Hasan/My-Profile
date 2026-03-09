'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { projects as allProjects } from '@/data/projects';
import styles from './Projects.module.css';

const cats = ['All', 'Web', 'Desktop', 'App'] as const;

export default function Projects() {
    const ref = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const [vis, setVis] = useState(false);
    const [cat, setCat] = useState<'All' | 'Web' | 'Desktop' | 'App'>('All');

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    /* ── GSAP z-depth stagger entrance ── */
    useEffect(() => {
        const init = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            const list = listRef.current;
            if (!list) return;

            const rows = list.querySelectorAll<HTMLElement>('li');

            gsap.fromTo(rows,
                { z: -120, rotateX: 18, opacity: 0, transformOrigin: 'top center', y: 30 },
                {
                    z: 0, rotateX: 0, opacity: 1, y: 0,
                    duration: 0.9, ease: 'expo.out', stagger: 0.1,
                    scrollTrigger: { trigger: list, start: 'top 82%', toggleActions: 'play none none reverse' },
                }
            );
        };
        init();
    }, [cat]);

    /* ── Mouse-move 3D tilt on each row ── */
    const onMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        el.style.transform = `perspective(900px) rotateX(${-dy * 7}deg) rotateY(${dx * 10}deg) translateZ(12px)`;
    };
    const onMouseLeave = (e: React.MouseEvent<HTMLLIElement>) => {
        e.currentTarget.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)';
    };

    const filtered = cat === 'All' ? allProjects : allProjects.filter(p => p.cat === cat);

    return (
        <section id="projects" className={`section ${styles.projects}`} ref={ref} aria-labelledby="proj-h">
            <div className="wrap">
                <div className={`s-label ${vis ? 'reveal in' : 'reveal'}`}>
                    <span>03</span>
                    Projects
                </div>

                <div className={`${styles.topRow} ${vis ? 'reveal in' : 'reveal'}`} style={{ transitionDelay: '0.05s' }}>
                    <h2 className={styles.title} id="proj-h">
                        Selected<br />
                        <span className={styles.outline}>Work</span>
                    </h2>

                    {/* Filter */}
                    <div className={styles.filter} role="group" aria-label="Filter projects">
                        {cats.map(c => (
                            <button
                                key={c}
                                className={`${styles.filterBtn} ${cat === c ? styles.filterActive : ''}`}
                                onClick={() => setCat(c)}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Row list — each row links to detail page */}
                <ul className={styles.list} ref={listRef} style={{ perspective: '1100px' }}>
                    {filtered.map((p, i) => (
                        <li
                            key={p.id}
                            className={styles.row}
                            style={{ transformStyle: 'preserve-3d', transition: 'transform 0.25s ease, box-shadow 0.25s ease' }}
                            onMouseMove={onMouseMove}
                            onMouseLeave={onMouseLeave}
                        >
                            <Link href={`/projects/${p.id}`} className={styles.rowLink} aria-label={`View ${p.title}`}>
                                <span className={styles.num}>{p.num}</span>
                                <div className={styles.body}>
                                    <h3 className={styles.rowTitle}>{p.title}</h3>
                                    <p className={styles.rowDesc}>{p.desc}</p>
                                </div>
                                <div className={styles.rowRight}>
                                    <span className={styles.catChip}>{p.cat}</span>
                                    <div className={styles.techList}>
                                        {p.tech.slice(0, 3).map(t => (
                                            <span key={t} className={styles.tech}>{t}</span>
                                        ))}
                                        {p.tech.length > 3 && <span className={styles.tech}>+{p.tech.length - 3}</span>}
                                    </div>
                                    <span className={styles.viewHint}>View →</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
