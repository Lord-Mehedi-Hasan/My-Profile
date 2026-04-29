'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Projects.module.css';
import WorkShowcase from './WorkShowcase';

export default function Projects() {
    const ref = useRef<HTMLElement>(null);
    const [vis, setVis] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

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
                </div>

                {/* Sticky image showcase */}
                <WorkShowcase />
            </div>
        </section>
    );
}
