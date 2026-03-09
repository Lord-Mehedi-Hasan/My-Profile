'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { type Project } from '@/data/projects';
import styles from './page.module.css';

interface Props {
    project: Project;
    prev: Project | null;
    next: Project | null;
}

export default function ProjectContent({ project, prev, next }: Props) {
    const headerRef = useRef<HTMLElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    /* ── GSAP entry animation on route load ── */
    useEffect(() => {
        const init = async () => {
            const { gsap } = await import('gsap');

            const header = headerRef.current;
            const body = bodyRef.current;
            if (!header || !body) return;

            const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

            tl.fromTo(header,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.0 },
            ).fromTo(
                Array.from(body.children),
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
                '-=0.5',
            );
        };
        init();
    }, []);

    return (
        <main className={styles.main}>
            {/* Back link */}
            <Link href="/#projects" className={styles.back}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Back to projects
            </Link>

            {/* Header — animated in by GSAP */}
            <header ref={headerRef} className={styles.header}>
                <div className={styles.meta}>
                    <span className={styles.num}>{project.num}</span>
                    <span className={styles.cat}>{project.cat}</span>
                    <span className={styles.year}>{project.year}</span>
                </div>
                <h1 className={styles.title}>{project.title}</h1>
                <p className={styles.lead}>{project.desc}</p>
            </header>

            <div className={styles.divider} />

            {/* Body — children stagger in */}
            <div ref={bodyRef} className={styles.body}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Overview</h2>
                    <p className={styles.longDesc}>{project.longDesc}</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Highlights</h2>
                    <ul className={styles.highlights}>
                        {project.highlights.map((h, i) => (
                            <li key={i} className={styles.highlight}>
                                <span className={styles.hNum}>0{i + 1}</span>
                                {h}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Tech Stack</h2>
                    <div className={styles.techGrid}>
                        {project.tech.map(t => (
                            <span key={t} className={styles.techTag}>{t}</span>
                        ))}
                    </div>
                </section>

                {project.github && (
                    <section className={styles.section}>
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.ghLink}
                        >
                            View on GitHub
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                        </a>
                    </section>
                )}
            </div>

            {/* Prev / Next */}
            <nav className={styles.pager} aria-label="Project navigation">
                {prev ? (
                    <Link href={`/projects/${prev.id}`} className={styles.pagerItem}>
                        <span className={styles.pagerDir}>← Previous</span>
                        <span className={styles.pagerName}>{prev.title}</span>
                    </Link>
                ) : <div />}
                {next ? (
                    <Link href={`/projects/${next.id}`} className={`${styles.pagerItem} ${styles.pagerRight}`}>
                        <span className={styles.pagerDir}>Next →</span>
                        <span className={styles.pagerName}>{next.title}</span>
                    </Link>
                ) : <div />}
            </nav>
        </main>
    );
}
