'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Skills.module.css';
import SkillGlobe from './SkillGlobe';

/* ── Devicons CDN — guaranteed correct brand logos ─── */
const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const skills = [
    { id: 'cpp', name: 'C++', desc: 'High-performance systems and competitive programming.', experience: '4+ Years', projects: '30+', logo: `${CDN}/cplusplus/cplusplus-original.svg` },
    { id: 'python', name: 'Python', desc: 'Machine learning, automation, and backend scripting.', experience: '4+ Years', projects: '25+', logo: `${CDN}/python/python-original.svg` },
    { id: 'java', name: 'Java', desc: 'Object-oriented programming and enterprise-grade apps.', experience: '3+ Years', projects: '12+', logo: `${CDN}/java/java-original.svg` },
    { id: 'javascript', name: 'JavaScript', desc: 'Dynamic scripting for interactive web experiences.', experience: '3+ Years', projects: '20+', logo: `${CDN}/javascript/javascript-original.svg` },
    { id: 'typescript', name: 'TypeScript', desc: 'Type-safe development for scalable, maintainable code.', experience: '2+ Years', projects: '12+', logo: `${CDN}/typescript/typescript-original.svg` },
    { id: 'nextjs', name: 'Next.js', desc: 'Full-stack React framework with SSR, SSG, and App Router.', experience: '2+ Years', projects: '10+', logo: `${CDN}/nextjs/nextjs-original.svg` },
    { id: 'react', name: 'React', desc: 'Component-driven UIs with hooks, context and state.', experience: '2+ Years', projects: '10+', logo: `${CDN}/react/react-original.svg` },
    { id: 'nodejs', name: 'Node.js', desc: 'Fast, event-driven server-side JavaScript runtime.', experience: '2+ Years', projects: '8+', logo: `${CDN}/nodejs/nodejs-original.svg` },
    { id: 'nestjs', name: 'NestJS', desc: 'Progressive Node.js framework for scalable server-side apps.', experience: '1+ Years', projects: '4+', logo: `${CDN}/nestjs/nestjs-original.svg` },
    { id: 'php', name: 'PHP', desc: 'Server-side scripting and web application development.', experience: '2+ Years', projects: '8+', logo: `${CDN}/php/php-original.svg` },
    { id: 'db', name: 'Databases', desc: 'PostgreSQL, MySQL, Oracle — query optimisation, schema design.', experience: '3+ Years', projects: '15+', logo: `${CDN}/postgresql/postgresql-original.svg` },
    { id: 'tools', name: 'Dev Tools', desc: 'Git, Docker, Postman, Figma, VS Code, Azure, Jupyter & more.', experience: '3+ Years', projects: '30+', logo: `${CDN}/git/git-original.svg` },
];

/* ── Marquee rows ─── */
const row1 = ['C++', 'Python', 'Java', 'JavaScript', 'TypeScript', 'PHP', 'Next.js', 'React', 'Node.js', 'NestJS', 'Angular', 'ASP.NET'];
const row2 = ['PostgreSQL', 'MySQL', 'Oracle', 'Git', 'Docker', 'Postman', 'Figma', 'Azure', 'Jupyter', 'REST APIs', 'GraphQL', 'LeetCode', 'ICPC 4×', 'Codeforces'];

export default function Skills() {
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
                    y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.07,
                    scrollTrigger: { trigger: sec, start: 'top 65%', toggleActions: 'play none none reverse' }
                }
            );
        };
        init();
    }, []);

    return (
        <section id="skills" className={`section ${styles.skills}`} ref={ref} aria-labelledby="skills-h">
            <div className="wrap">

                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.eyebrow}>
                        <span className={styles.eyebrowLine} />
                        MY TOOLKIT
                    </div>
                    <h2 className={styles.title} id="skills-h" ref={headRef} style={{ perspective: '600px' }}>
                        <span className={styles.wordClip}><span data-word>Technical</span></span>
                        {' '}
                        <span className={`${styles.wordClip} ${styles.outline}`}><span data-word>Proficiency</span></span>
                    </h2>
                    <p className={styles.subtitle}>
                        A curated set of languages, frameworks and tools I use to ship fast, reliable products.
                    </p>
                </div>

                {/* Watermark */}
                <div className={styles.watermark} aria-hidden="true">EXPERTISE</div>

                {/* Card Grid */}
                <div className={styles.grid}>
                    {skills.map((s) => (
                        <div key={s.id} className={styles.card} data-card>
                            <div className={styles.cardIcon}>
                                <Image src={s.logo} alt={s.name} width={42} height={42} unoptimized />
                            </div>
                            <h3 className={styles.cardName}>{s.name}</h3>
                            <p className={styles.cardDesc}>{s.desc}</p>
                            <div className={styles.cardStats}>
                                <div className={styles.stat}>
                                    <span className={styles.statLabel}>EXPERIENCE</span>
                                    <span className={styles.statValue}>{s.experience}</span>
                                </div>
                                <div className={styles.stat}>
                                    <span className={styles.statLabel}>PROJECTS</span>
                                    <span className={styles.statValue}>{s.projects}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dual Marquee */}
                <div className={styles.marqueeWrap}>
                    <p className={styles.marqueeLabel}>EXPERTISE EXTENDED</p>

                    <div className={styles.marqueeTrack}>
                        <div className={styles.marqueeInner}>
                            {[...row1, ...row1].map((item, i) => (
                                <span key={i} className={styles.marqueeItem}>{item} —</span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.marqueeTrack}>
                        <div className={`${styles.marqueeInner} ${styles.marqueeReverse}`}>
                            {[...row2, ...row2].map((item, i) => (
                                <span key={i} className={styles.marqueeItem}>{item} —</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Interactive 3D Skill Globe */}
                <div className={styles.globeSection}>
                    <p className={styles.marqueeLabel} style={{ marginBottom: '24px' }}>INTERACTIVE SKILL GLOBE</p>
                    <SkillGlobe />
                </div>

            </div>
        </section>
    );
}
